<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Expense Reports</h1>
        <p class="text-gray-600">Comprehensive analytics and insights for your expense management</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-1">Total Expenses</h3>
              <p class="text-3xl font-bold text-gray-900">${{ totalExpenses.toFixed(2) }}</p>
              <p class="text-sm text-gray-500">{{ totalEntries }} entries</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-1">Average per Entry</h3>
              <p class="text-3xl font-bold text-gray-900">${{ averagePerEntry.toFixed(2) }}</p>
              <p class="text-sm text-gray-500">All time average</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp class="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-1">Top Category</h3>
              <p class="text-2xl font-bold text-gray-900">{{ topCategory.name }}</p>
              <p class="text-sm text-gray-500">${{ topCategory.amount.toFixed(2) }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Tag class="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-1">This Month</h3>
              <p class="text-3xl font-bold text-gray-900">${{ thisMonthTotal.toFixed(2) }}</p>
              <p class="text-sm text-gray-500">{{ thisMonthEntries }} entries</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar class="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Category Breakdown -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart class="h-5 w-5 mr-2" />
            Category Breakdown
          </h3>
          <div class="space-y-4">
            <div v-for="category in categoryBreakdown" :key="category.name" class="flex items-center justify-between">
              <div class="flex items-center">
                <div 
                  class="w-4 h-4 rounded-full mr-3" 
                  :style="{ backgroundColor: category.color }"
                ></div>
                <span class="text-sm font-medium text-gray-700">{{ category.name }}</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">${{ category.amount.toFixed(2) }}</span>
                <span class="text-xs text-gray-500 ml-2">({{ category.percentage }}%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Trend -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart class="h-5 w-5 mr-2" />
            Monthly Trend
          </h3>
          <div class="space-y-3">
            <div v-for="month in monthlyTrend" :key="month.name" class="flex items-center">
              <div class="w-20 text-xs text-gray-600">{{ month.name }}</div>
              <div class="flex-1 mx-3">
                <div class="bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${month.percentage}%` }"
                  ></div>
                </div>
              </div>
              <div class="w-16 text-xs text-gray-900 text-right">${{ month.amount.toFixed(0) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Reports -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Top Expenses -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award class="h-5 w-5 mr-2" />
            Top Expenses
          </h3>
          <div class="space-y-3">
            <div v-for="(expense, index) in topExpenses" :key="expense.id" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div class="flex items-center">
                <span class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 mr-3">
                  {{ index + 1 }}
                </span>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ expense.title }}</p>
                  <p class="text-xs text-gray-500">{{ expense.category }}</p>
                </div>
              </div>
              <span class="text-sm font-semibold text-gray-900">${{ expense.amount.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock class="h-5 w-5 mr-2" />
            Recent Activity
          </h3>
          <div class="space-y-3">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center py-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-500">{{ formatRelativeTime(activity.created_at) }}</p>
              </div>
              <span class="text-xs text-gray-600">${{ activity.amount.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Export Options -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Download class="h-5 w-5 mr-2" />
            Export Reports
          </h3>
          <div class="space-y-3">
            <button @click="exportReport('summary')" class="btn btn-outline btn-md w-full">
              <FileText class="h-4 w-4 mr-2" />
              Summary Report
            </button>
            <button @click="exportReport('detailed')" class="btn btn-outline btn-md w-full">
              <Table class="h-4 w-4 mr-2" />
              Detailed Report
            </button>
            <button @click="exportReport('category')" class="btn btn-outline btn-md w-full">
              <PieChart class="h-4 w-4 mr-2" />
              Category Analysis
            </button>
            <button @click="exportReport('monthly')" class="btn btn-outline btn-md w-full">
              <Calendar class="h-4 w-4 mr-2" />
              Monthly Report
            </button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { 
  DollarSign, 
  TrendingUp, 
  Tag, 
  Calendar, 
  PieChart, 
  BarChart, 
  Award, 
  Clock, 
  Download, 
  FileText, 
  Table 
} from 'lucide-vue-next'
import moment from 'moment'

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

interface CategoryBreakdown {
  name: string
  amount: number
  percentage: number
  color: string
}

interface MonthlyTrend {
  name: string
  amount: number
  percentage: number
}

const entries = ref<ExpenseEntry[]>([])
const loading = ref(true)

// Color palette for categories
const colors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
]

const totalExpenses = computed(() => 
  entries.value.reduce((sum, entry) => sum + entry.amount, 0)
)

const totalEntries = computed(() => entries.value.length)

const averagePerEntry = computed(() => 
  totalEntries.value > 0 ? totalExpenses.value / totalEntries.value : 0
)

const topCategory = computed(() => {
  const categoryTotals: { [key: string]: number } = {}
  entries.value.forEach(entry => {
    categoryTotals[entry.category] = (categoryTotals[entry.category] || 0) + entry.amount
  })
  
  const sorted = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)
  return {
    name: sorted[0]?.[0] || 'No data',
    amount: sorted[0]?.[1] || 0
  }
})

const thisMonthTotal = computed(() => {
  const thisMonth = moment().format('YYYY-MM')
  return entries.value
    .filter(entry => moment(entry.expense_date || entry.created_at).format('YYYY-MM') === thisMonth)
    .reduce((sum, entry) => sum + entry.amount, 0)
})

const thisMonthEntries = computed(() => {
  const thisMonth = moment().format('YYYY-MM')
  return entries.value.filter(entry => 
    moment(entry.expense_date || entry.created_at).format('YYYY-MM') === thisMonth
  ).length
})

const categoryBreakdown = computed((): CategoryBreakdown[] => {
  const categoryTotals: { [key: string]: number } = {}
  entries.value.forEach(entry => {
    categoryTotals[entry.category] = (categoryTotals[entry.category] || 0) + entry.amount
  })
  
  const total = totalExpenses.value
  return Object.entries(categoryTotals)
    .map(([name, amount], index) => ({
      name,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: colors[index % colors.length]
    }))
    .sort((a, b) => b.amount - a.amount)
})

const monthlyTrend = computed((): MonthlyTrend[] => {
  const monthlyTotals: { [key: string]: number } = {}
  entries.value.forEach(entry => {
    const month = moment(entry.expense_date || entry.created_at).format('MMM YYYY')
    monthlyTotals[month] = (monthlyTotals[month] || 0) + entry.amount
  })
  
  const maxAmount = Math.max(...Object.values(monthlyTotals))
  return Object.entries(monthlyTotals)
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: maxAmount > 0 ? Math.round((amount / maxAmount) * 100) : 0
    }))
    .sort((a, b) => moment(a.name, 'MMM YYYY').valueOf() - moment(b.name, 'MMM YYYY').valueOf())
    .slice(-6) // Last 6 months
})

const topExpenses = computed(() => 
  [...entries.value]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
)

const recentActivity = computed(() => 
  [...entries.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
)

const formatRelativeTime = (dateString: string) => {
  return moment(dateString).fromNow()
}

const loadEntries = async () => {
  try {
    const response = await fetch('/api/entries')
    if (!response.ok) throw new Error('Failed to fetch entries')
    const data = await response.json()
    entries.value = data
  } catch (error: any) {
    console.error('Error loading entries:', error)
  } finally {
    loading.value = false
  }
}

const exportReport = async (type: string) => {
  try {
    const response = await fetch(`/api/export-report?type=${type}`)
    if (!response.ok) throw new Error('Failed to export report')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expense-report-${type}-${moment().format('YYYY-MM-DD')}.pdf`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error: any) {
    console.error('Error exporting report:', error)
  }
}

onMounted(() => {
  loadEntries()
})
</script>

<style scoped>
/* Add any component specific styles here */
</style>
