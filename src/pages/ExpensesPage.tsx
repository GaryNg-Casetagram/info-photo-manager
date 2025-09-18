import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Plus, Download, Search, Filter, Calendar, DollarSign, FileText, Trash2, Edit, Eye } from 'lucide-react'

interface Expense {
  id: number
  title: string
  description: string
  category: string
  amount: number
  expense_date: string
  created_at: string
  updated_at: string
  files: File[]
}

interface SummaryStats {
  totalAmount: number
  monthlyAmount: number
  weeklyAmount: number
  dailyAverage: number
}

export function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
  const [summaryStats, setSummaryStats] = useState<SummaryStats>({
    totalAmount: 0,
    monthlyAmount: 0,
    weeklyAmount: 0,
    dailyAverage: 0
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    amount: '',
    expense_date: '',
    files: [] as File[]
  })
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
    amountRange: '',
    search: ''
  })
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses()
    loadCategories()
  }, [])

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters()
  }, [expenses, filters])

  const loadExpenses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/entries')
      const data = await response.json()
      setExpenses(data)
      calculateSummaryStats(data)
    } catch (error) {
      console.error('Error loading expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const calculateSummaryStats = (expenseData: Expense[]) => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())

    const totalAmount = expenseData.reduce((sum, expense) => sum + expense.amount, 0)
    const monthlyAmount = expenseData
      .filter(expense => new Date(expense.expense_date) >= startOfMonth)
      .reduce((sum, expense) => sum + expense.amount, 0)
    const weeklyAmount = expenseData
      .filter(expense => new Date(expense.expense_date) >= startOfWeek)
      .reduce((sum, expense) => sum + expense.amount, 0)
    const dailyAverage = totalAmount / Math.max(1, expenseData.length)

    setSummaryStats({
      totalAmount,
      monthlyAmount,
      weeklyAmount,
      dailyAverage
    })
  }

  const applyFilters = () => {
    let filtered = [...expenses]

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter(expense => 
        new Date(expense.expense_date) >= new Date(filters.startDate)
      )
    }
    if (filters.endDate) {
      filtered = filtered.filter(expense => 
        new Date(expense.expense_date) <= new Date(filters.endDate)
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(expense => expense.category === filters.category)
    }

    // Amount range filter
    if (filters.amountRange) {
      const [min, max] = filters.amountRange.split('-').map(Number)
      filtered = filtered.filter(expense => {
        if (max) {
          return expense.amount >= min && expense.amount <= max
        } else {
          return expense.amount >= min
        }
      })
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(searchLower) ||
        expense.description.toLowerCase().includes(searchLower)
      )
    }

    setFilteredExpenses(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('category', formData.category)
    formDataToSend.append('amount', formData.amount)
    formDataToSend.append('expense_date', formData.expense_date)
    
    formData.files.forEach(file => {
      formDataToSend.append('files', file)
    })

    try {
      const url = editingExpense ? `/api/entries/${editingExpense.id}` : '/api/entries'
      const method = editingExpense ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })

      if (response.ok) {
        setIsModalOpen(false)
        setFormData({
          title: '',
          description: '',
          category: '',
          amount: '',
          expense_date: '',
          files: []
        })
        setEditingExpense(null)
        loadExpenses()
      }
    } catch (error) {
      console.error('Error saving expense:', error)
    }
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setFormData({
      title: expense.title,
      description: expense.description,
      category: expense.category,
      amount: expense.amount.toString(),
      expense_date: expense.expense_date,
      files: []
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await fetch(`/api/entries/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          loadExpenses()
        }
      } catch (error) {
        console.error('Error deleting expense:', error)
      }
    }
  }

  const handleExport = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)
      if (filters.category) params.append('category', filters.category)

      const response = await fetch(`/api/export?${params}`)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `expense_manager_export_${new Date().toISOString().split('T')[0]}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      category: '',
      amountRange: '',
      search: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
            <p className="text-gray-600 mt-2">Track and manage your business expenses</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Expense
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryStats.totalAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryStats.monthlyAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Current month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryStats.weeklyAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Current week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryStats.dailyAverage.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Per day</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search expenses..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Expense List */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
            <CardDescription>
              {filteredExpenses.length} expenses found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading expenses...</span>
              </div>
            ) : filteredExpenses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No expenses found. Add your first expense to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{expense.title}</h3>
                        <p className="text-sm text-muted-foreground">{expense.category}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(expense.expense_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(expense)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(expense.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</CardTitle>
                <CardDescription>
                  {editingExpense ? 'Update expense details' : 'Fill in the expense details below'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount *</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expense_date">Expense Date *</Label>
                      <Input
                        id="expense_date"
                        type="date"
                        value={formData.expense_date}
                        onChange={(e) => setFormData({...formData, expense_date: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="files">Receipt Files</Label>
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setFormData({...formData, files})
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingExpense ? 'Update Expense' : 'Save Expense'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
