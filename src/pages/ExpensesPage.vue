<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Alert -->
      <div v-if="alert.message" :class="`p-4 mb-4 rounded-md ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
        {{ alert.message }}
      </div>

      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-900">Expense Dashboard</h2>
        <div class="flex flex-col sm:flex-row gap-3">
          <button @click="openAddModal" class="btn btn-primary btn-lg">
            <Plus class="h-5 w-5 mr-2" /> Add New Expense
          </button>
          <button @click="exportData" class="btn btn-outline btn-lg">
            <Download class="h-5 w-5 mr-2" /> Export Filtered Data
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold mb-2">Total Expenses</h3>
          <p class="text-2xl font-bold">${{ overallTotal.toFixed(2) }}</p>
          <p class="text-sm text-gray-500">{{ entries.length }} entries</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold mb-2">Daily Average</h3>
          <p class="text-2xl font-bold">${{ dailyAverage.toFixed(2) }}</p>
          <p class="text-sm text-gray-500">Based on current filters</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold mb-2">Weekly Average</h3>
          <p class="text-2xl font-bold">${{ weeklyAverage.toFixed(2) }}</p>
          <p class="text-sm text-gray-500">Based on current filters</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold mb-2">Monthly Average</h3>
          <p class="text-2xl font-bold">${{ monthlyAverage.toFixed(2) }}</p>
          <p class="text-sm text-gray-500">Based on current filters</p>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h3 class="text-lg font-semibold mb-4 flex items-center">
          <Filter class="h-5 w-5 mr-2" /> Advanced Filters
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DateRangePicker
            :start-date="currentFilters.startDate"
            :end-date="currentFilters.endDate"
            @update:start-date="currentFilters.startDate = $event"
            @update:end-date="currentFilters.endDate = $event"
            @change="handleDateRangeChange"
          />

          <div class="filter-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select v-model="currentFilters.category" class="form-select">
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
            <select v-model="currentFilters.amountRange" class="form-select">
              <option value="">All Amounts</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500+">$500+</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              type="text" 
              v-model="currentFilters.search" 
              placeholder="Search by title or description"
              class="form-input"
            />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button @click="clearFilters" class="btn btn-outline btn-md">Clear Filters</button>
        </div>
      </div>

      <!-- Expense List -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold">Expense List</h3>
          <div class="flex flex-col sm:flex-row gap-2">
            <button @click="toggleGrouping" class="btn btn-outline btn-md">
              <CalendarDays class="h-4 w-4 mr-2" /> Group by {{ currentGrouping === 'month' ? 'Week' : 'Month' }}
            </button>
            <button @click="toggleView" class="btn btn-outline btn-md">
              <LayoutGrid v-if="viewMode === 'table'" class="h-4 w-4 mr-2" />
              <List v-else class="h-4 w-4 mr-2" />
              {{ viewMode === 'table' ? 'Card View' : 'Table View' }}
            </button>
          </div>
        </div>

        <!-- Table View -->
        <SortableTable 
          v-if="viewMode === 'table'"
          :entries="entries"
          @edit="openEditModal"
          @delete="deleteEntry"
        />

        <!-- Card View (Grouped) -->
        <div v-else>
          <div v-if="Object.keys(grouped).length === 0" class="text-center text-gray-500 py-12">
            <div class="text-6xl mb-4">📊</div>
            <h3 class="text-lg font-medium mb-2">No expenses found</h3>
            <p class="text-sm">Try adjusting your filters or add a new expense</p>
          </div>

          <div v-else>
            <div v-for="groupKey in sortedGroupKeys" :key="groupKey" class="mb-8 last:mb-0">
              <!-- Group Header -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-100">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="text-xl font-bold text-gray-800">{{ groupKey }}</h3>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ totals[groupKey].count }} {{ totals[groupKey].count === 1 ? 'expense' : 'expenses' }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-blue-600">${{ totals[groupKey].subtotal.toFixed(2) }}</p>
                    <p class="text-sm text-gray-500">Subtotal</p>
                  </div>
                </div>
              </div>

              <!-- Expense Cards -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="entry in grouped[groupKey]" :key="entry.id" class="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors shadow-sm hover:shadow-md">
                  <!-- Card Header -->
                  <div class="p-4 border-b border-gray-100">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-semibold text-gray-900 text-sm leading-tight">{{ entry.title }}</h4>
                      <span class="text-lg font-bold text-green-600">${{ entry.amount.toFixed(2) }}</span>
                    </div>
                    <p v-if="entry.description" class="text-xs text-gray-600 line-clamp-2">{{ entry.description }}</p>
                  </div>

                  <!-- Card Body -->
                  <div class="p-4">
                    <div class="flex items-center justify-between mb-3">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ entry.category }}
                      </span>
                      <span class="text-xs text-gray-500 font-mono">#{{ entry.id }}</span>
                    </div>

                    <!-- Date Info -->
                    <div class="space-y-1 mb-4">
                      <div v-if="entry.expense_date" class="flex items-center text-xs text-gray-600">
                        <CalendarDays class="h-3 w-3 mr-1" />
                        Expense: {{ formatCardDate(entry.expense_date) }}
                      </div>
                      <div class="flex items-center text-xs text-gray-500">
                        <CalendarDays class="h-3 w-3 mr-1" />
                        Added: {{ formatCardDate(entry.created_at) }}
                      </div>
                    </div>

                    <!-- File Attachments -->
                    <div v-if="entry.files && entry.files.length > 0" class="mb-4">
                      <div class="flex items-center text-xs text-gray-600 mb-2">
                        <Upload class="h-3 w-3 mr-1" />
                        {{ entry.files.length }} {{ entry.files.length === 1 ? 'attachment' : 'attachments' }}
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <span v-for="file in entry.files.slice(0, 3)" :key="file.filename" class="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          {{ file.original_name }}
                        </span>
                        <span v-if="entry.files.length > 3" class="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          +{{ entry.files.length - 3 }} more
                        </span>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2 pt-3 border-t border-gray-100">
                      <button @click="openEditModal(entry)" class="btn btn-outline btn-sm flex-1">
                        <Edit class="h-3 w-3 mr-1" />
                        Edit
                      </button>
                      <button @click="deleteEntry(entry.id)" class="btn btn-destructive btn-sm flex-1">
                        <Trash2 class="h-3 w-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Expense Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
          <h3 class="text-lg font-semibold mb-4">{{ editingEntry ? 'Edit Expense' : 'Add New Expense' }}</h3>
          
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Title</label>
                <input 
                  v-model="form.title" 
                  required 
                  class="form-input"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Amount</label>
                <input 
                  v-model="form.amount" 
                  type="number" 
                  step="0.01" 
                  required 
                  class="form-input"
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                v-model="form.description" 
                class="form-textarea"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <select v-model="form.category" required class="form-select">
                  <option value="">Select a category</option>
                  <option v-for="cat in expenseCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Expense Date</label>
                <input 
                  v-model="form.expense_date" 
                  type="date" 
                  class="form-input"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Attachments</label>
              <div
                :class="`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${dragOver ? 'border-primary bg-blue-50' : 'border-gray-300 bg-white'}`"
                @dragover.prevent="dragOver = true"
                @dragleave="dragOver = false"
                @drop.prevent="handleDrop"
                @click="$refs.fileInput.click()"
              >
                <Upload class="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p class="text-sm text-gray-600">Drag & drop files here, or click to select</p>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  @change="handleFileChange"
                  class="hidden"
                />
              </div>
              <div class="mt-4 grid grid-cols-3 gap-2">
                <div v-for="(preview, index) in filePreviews" :key="index" class="relative group">
                  <img :src="preview" alt="File preview" class="w-full h-24 object-cover rounded-md border" />
                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X class="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <button type="button" @click="closeModal" class="btn btn-outline btn-md">Cancel</button>
              <button type="submit" class="btn btn-primary btn-md">Save Expense</button>
            </div>
          </form>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SortableTable from '../components/SortableTable.vue'
import DateRangePicker from '../components/DateRangePicker.vue'
import { Plus, Upload, Search, Filter, Download, Trash2, Edit, CalendarDays, X, LayoutGrid, List } from 'lucide-vue-next'

interface ExpenseEntry {
  id: number
  title: string
  description: string
  category: string
  amount: number
  expense_date: string
  created_at: string
  updated_at: string
  files: { filename: string; original_name: string; file_type: string }[]
}

interface FilterState {
  category?: string
  amountRange?: string
  search?: string
  startDate?: string
  endDate?: string
}

const entries = ref<ExpenseEntry[]>([])
const categories = ref<string[]>([])
const expenseCategories = ref<string[]>([])
const currentFilters = ref<FilterState>({
  category: '',
  amountRange: '',
  search: '',
  startDate: '',
  endDate: ''
})
const isModalOpen = ref(false)
const editingEntry = ref<ExpenseEntry | null>(null)
const form = ref({
  title: '',
  description: '',
  category: '',
  amount: '',
  expense_date: '',
  files: [] as File[]
})
const filePreviews = ref<string[]>([])
const dragOver = ref(false)
const alert = ref<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' })
const currentGrouping = ref<'month' | 'week'>('month')
const viewMode = ref<'table' | 'cards'>('table')

const showAlert = (message: string, type: 'success' | 'error') => {
  alert.value = { message, type }
  setTimeout(() => alert.value = { message: '', type: '' }, 3000)
}

const loadEntries = async () => {
  const queryParams = new URLSearchParams()
  if (currentFilters.value.category) queryParams.append('category', currentFilters.value.category)
  if (currentFilters.value.amountRange) queryParams.append('amountRange', currentFilters.value.amountRange)
  if (currentFilters.value.search) queryParams.append('search', currentFilters.value.search)
  if (currentFilters.value.startDate) queryParams.append('startDate', currentFilters.value.startDate)
  if (currentFilters.value.endDate) queryParams.append('endDate', currentFilters.value.endDate)

  try {
    const response = await fetch(`/api/entries?${queryParams.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch entries')
    const data = await response.json()
    entries.value = data
  } catch (error: any) {
    console.error('Error loading entries:', error)
    showAlert('Error loading entries: ' + error.message, 'error')
  }
}

const loadCategories = async () => {
  try {
    const response = await fetch('/api/categories')
    if (!response.ok) throw new Error('Failed to fetch categories')
    const data = await response.json()
    categories.value = data
  } catch (error: any) {
    console.error('Error loading categories:', error)
  }
}

const loadExpenseCategories = async () => {
  try {
    const response = await fetch('/api/expense-categories')
    if (!response.ok) throw new Error('Failed to fetch expense categories')
    const data = await response.json()
    expenseCategories.value = data
  } catch (error: any) {
    console.error('Error loading expense categories:', error)
  }
}

const handleDateRangeChange = (range: { startDate: string; endDate: string }) => {
  currentFilters.value.startDate = range.startDate
  currentFilters.value.endDate = range.endDate
  loadEntries()
}

const clearFilters = () => {
  currentFilters.value = {
    category: '',
    amountRange: '',
    search: '',
    startDate: '',
    endDate: ''
  }
  loadEntries()
}

const toggleGrouping = () => {
  currentGrouping.value = currentGrouping.value === 'month' ? 'week' : 'month'
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'table' ? 'cards' : 'table'
}

const openAddModal = () => {
  editingEntry.value = null
  form.value = {
    title: '',
    description: '',
    category: '',
    amount: '',
    expense_date: '',
    files: []
  }
  filePreviews.value = []
  isModalOpen.value = true
}

const openEditModal = (entry: ExpenseEntry) => {
  editingEntry.value = entry
  form.value = {
    title: entry.title,
    description: entry.description,
    category: entry.category,
    amount: entry.amount.toString(),
    expense_date: entry.expense_date ? entry.expense_date.split(' ')[0] : '',
    files: []
  }
  filePreviews.value = entry.files.map(f => `/uploads/${f.filename}`)
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingEntry.value = null
  form.value = {
    title: '',
    description: '',
    category: '',
    amount: '',
    expense_date: '',
    files: []
  }
  filePreviews.value = []
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    const newFiles = Array.from(target.files)
    form.value.files = [...form.value.files, ...newFiles]
    newFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        filePreviews.value = [...filePreviews.value, reader.result as string]
      }
      reader.readAsDataURL(file)
    })
  }
}

const handleDrop = (e: DragEvent) => {
  dragOver.value = false
  if (e.dataTransfer?.files) {
    const newFiles = Array.from(e.dataTransfer.files)
    form.value.files = [...form.value.files, ...newFiles]
    newFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        filePreviews.value = [...filePreviews.value, reader.result as string]
      }
      reader.readAsDataURL(file)
    })
  }
}

const removeFile = (index: number) => {
  form.value.files.splice(index, 1)
  filePreviews.value.splice(index, 1)
}

const submitForm = async () => {
  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('category', form.value.category)
  formData.append('amount', form.value.amount)
  formData.append('expense_date', form.value.expense_date)
  form.value.files.forEach((file) => {
    formData.append('files', file)
  })

  const url = editingEntry.value ? `/api/entries/${editingEntry.value.id}` : '/api/entries'
  const method = editingEntry.value ? 'PUT' : 'POST'

  try {
    const response = await fetch(url, {
      method,
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to save entry')
    }

    showAlert('Entry saved successfully!', 'success')
    closeModal()
    loadEntries()
  } catch (error: any) {
    console.error('Error saving entry:', error)
    showAlert('Error saving entry: ' + error.message, 'error')
  }
}

const deleteEntry = async (id: number) => {
  if (!window.confirm('Are you sure you want to delete this entry?')) return

  try {
    const response = await fetch(`/api/entries/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to delete entry')
    }

    showAlert('Entry deleted successfully!', 'success')
    loadEntries()
  } catch (error: any) {
    console.error('Error deleting entry:', error)
    showAlert('Error deleting entry: ' + error.message, 'error')
  }
}

const exportData = async () => {
  try {
    // Build query parameters from current filters
    const queryParams = new URLSearchParams()
    if (currentFilters.value.category) queryParams.append('category', currentFilters.value.category)
    if (currentFilters.value.amountRange) queryParams.append('amountRange', currentFilters.value.amountRange)
    if (currentFilters.value.search) queryParams.append('search', currentFilters.value.search)
    if (currentFilters.value.startDate) queryParams.append('startDate', currentFilters.value.startDate)
    if (currentFilters.value.endDate) queryParams.append('endDate', currentFilters.value.endDate)
    
    const response = await fetch(`/api/export?${queryParams.toString()}`)
    if (!response.ok) throw new Error('Failed to export data')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    
    // Create filename with filter info
    let filename = `expenses-${new Date().toISOString().split('T')[0]}`
    if (currentFilters.value.category || currentFilters.value.amountRange || currentFilters.value.search || currentFilters.value.startDate || currentFilters.value.endDate) {
      filename += '-filtered'
    }
    filename += '.zip'
    
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    showAlert('Filtered data exported successfully!', 'success')
  } catch (error: any) {
    console.error('Error exporting data:', error)
    showAlert('Error exporting data: ' + error.message, 'error')
  }
}

const groupEntries = (entries: ExpenseEntry[]) => {
  const grouped: { [key: string]: ExpenseEntry[] } = {}
  entries.forEach(entry => {
    const date = new Date(entry.expense_date || entry.created_at)
    let key: string
    if (currentGrouping.value === 'month') {
      key = date.toLocaleString('en-US', { year: 'numeric', month: 'long' })
    } else { // week
      // Get start of week (Monday)
      const startOfWeek = new Date(date)
      const day = startOfWeek.getDay()
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
      startOfWeek.setDate(diff)
      
      // Get end of week (Sunday)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      
      // Format the week range
      const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' })
      const startDay = startOfWeek.getDate()
      const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' })
      const endDay = endOfWeek.getDate()
      const year = startOfWeek.getFullYear()
      
      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        key = `${startMonth} ${startDay}-${endDay}, ${year}`
      } else {
        key = `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
      }
    }
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(entry)
  })
  return grouped
}

const calculateTotals = (groupedEntries: { [key: string]: ExpenseEntry[] }) => {
  const totals: { [key: string]: { subtotal: number; count: number } } = {}
  for (const key in groupedEntries) {
    const subtotal = groupedEntries[key].reduce((sum, entry) => sum + entry.amount, 0)
    totals[key] = { subtotal, count: groupedEntries[key].length }
  }
  return totals
}

const grouped = computed(() => groupEntries(entries.value))
const totals = computed(() => calculateTotals(grouped.value))
const overallTotal = computed(() => entries.value.reduce((sum, entry) => sum + entry.amount, 0))

const monthlyAverage = computed(() => {
  if (entries.value.length === 0) return 0
  
  // Group entries by month
  const monthlyTotals: { [key: string]: number } = {}
  entries.value.forEach(entry => {
    const date = new Date(entry.expense_date || entry.created_at)
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`
    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + entry.amount
  })
  
  const months = Object.keys(monthlyTotals).length
  return months > 0 ? Object.values(monthlyTotals).reduce((sum, total) => sum + total, 0) / months : 0
})

const weeklyAverage = computed(() => {
  if (entries.value.length === 0) return 0
  
  // Group entries by week
  const weeklyTotals: { [key: string]: number } = {}
  entries.value.forEach(entry => {
    const date = new Date(entry.expense_date || entry.created_at)
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay()) // Sunday
    const weekKey = `${startOfWeek.getFullYear()}-W${Math.ceil((startOfWeek.getDate() + startOfWeek.getDay()) / 7)}`
    weeklyTotals[weekKey] = (weeklyTotals[weekKey] || 0) + entry.amount
  })
  
  const weeks = Object.keys(weeklyTotals).length
  return weeks > 0 ? Object.values(weeklyTotals).reduce((sum, total) => sum + total, 0) / weeks : 0
})

const dailyAverage = computed(() => {
  if (entries.value.length === 0) return 0
  
  // Group entries by day
  const dailyTotals: { [key: string]: number } = {}
  entries.value.forEach(entry => {
    const date = new Date(entry.expense_date || entry.created_at)
    const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    dailyTotals[dayKey] = (dailyTotals[dayKey] || 0) + entry.amount
  })
  
  const days = Object.keys(dailyTotals).length
  return days > 0 ? Object.values(dailyTotals).reduce((sum, total) => sum + total, 0) / days : 0
})

const formatCardDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const sortedGroupKeys = computed(() => {
  const keys = Object.keys(grouped.value)
  return keys.sort((a, b) => {
    // For month grouping, sort by date
    if (currentGrouping.value === 'month') {
      return new Date(b).getTime() - new Date(a).getTime()
    }
    // For week grouping, extract the start date and sort
    const aStart = a.split(',')[0].split(' ')[1] // Extract day from "Jan 1-7, 2024"
    const bStart = b.split(',')[0].split(' ')[1]
    const aDate = new Date(a.replace(/^[^,]+, /, '')) // Extract year
    const bDate = new Date(b.replace(/^[^,]+, /, ''))
    aDate.setMonth(a.split(' ')[0] === 'Jan' ? 0 : a.split(' ')[0] === 'Feb' ? 1 : 2) // Simplified month mapping
    bDate.setMonth(b.split(' ')[0] === 'Jan' ? 0 : b.split(' ')[0] === 'Feb' ? 1 : 2)
    aDate.setDate(parseInt(aStart.split('-')[0]))
    bDate.setDate(parseInt(bStart.split('-')[0]))
    return bDate.getTime() - aDate.getTime()
  })
})

onMounted(() => {
  loadEntries()
  loadCategories()
  loadExpenseCategories()
})

watch(currentFilters, () => {
  loadEntries()
}, { deep: true })
</script>
