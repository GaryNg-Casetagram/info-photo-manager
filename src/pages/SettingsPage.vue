<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p class="text-gray-600">Manage your preferences and system configuration</p>
      </div>

      <!-- Alert -->
      <div v-if="alert.message" :class="`p-4 mb-6 rounded-md ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
        {{ alert.message }}
      </div>

      <div class="space-y-8">
        <!-- General Settings -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <Settings class="h-5 w-5 mr-2" />
              General Settings
            </h2>
          </div>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                <select v-model="settings.currency" class="form-select">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                <select v-model="settings.dateFormat" class="form-select">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                <select v-model="settings.defaultView" class="form-select">
                  <option value="table">Table View</option>
                  <option value="cards">Card View</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Default Grouping</label>
                <select v-model="settings.defaultGrouping" class="form-select">
                  <option value="month">Group by Month</option>
                  <option value="week">Group by Week</option>
                </select>
              </div>
            </div>

            <div class="flex items-center">
              <input 
                v-model="settings.autoSave" 
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-700">
                Auto-save form data
              </label>
            </div>
          </div>
        </div>

        <!-- Expense Categories -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <Tag class="h-5 w-5 mr-2" />
              Expense Categories
            </h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="(category, index) in settings.categories" :key="index" class="flex items-center space-x-3">
                <input 
                  v-model="category.name" 
                  type="text" 
                  class="form-input flex-1"
                  placeholder="Category name"
                />
                <input 
                  v-model="category.color" 
                  type="color" 
                  class="w-10 h-10 rounded border border-gray-300"
                />
                <button 
                  @click="removeCategory(index)"
                  class="btn btn-destructive btn-sm"
                  :disabled="settings.categories.length <= 1"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
              <button @click="addCategory" class="btn btn-outline btn-md">
                <Plus class="h-4 w-4 mr-2" />
                Add Category
              </button>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <Bell class="h-5 w-5 mr-2" />
              Notifications
            </h2>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-700">Email Notifications</h3>
                <p class="text-sm text-gray-500">Receive notifications about expense reports</p>
              </div>
              <input 
                v-model="settings.emailNotifications" 
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-700">Weekly Summary</h3>
                <p class="text-sm text-gray-500">Get weekly expense summaries</p>
              </div>
              <input 
                v-model="settings.weeklySummary" 
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-700">Monthly Report</h3>
                <p class="text-sm text-gray-500">Receive monthly expense reports</p>
              </div>
              <input 
                v-model="settings.monthlyReport" 
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <!-- Data Management -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <Database class="h-5 w-5 mr-2" />
              Data Management
            </h2>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button @click="exportAllData" class="btn btn-outline btn-md">
                <Download class="h-4 w-4 mr-2" />
                Export All Data
              </button>
              <button @click="importData" class="btn btn-outline btn-md">
                <Upload class="h-4 w-4 mr-2" />
                Import Data
              </button>
            </div>
            
            <div class="border-t pt-4">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Danger Zone</h3>
              <div class="space-y-2">
                <button @click="clearAllData" class="btn btn-destructive btn-md">
                  <Trash2 class="h-4 w-4 mr-2" />
                  Clear All Data
                </button>
                <p class="text-xs text-gray-500">This will permanently delete all expenses and cannot be undone.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- System Information -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <Info class="h-5 w-5 mr-2" />
              System Information
            </h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-2">Application Version</h3>
                <p class="text-sm text-gray-900">1.0.0</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-2">Database Size</h3>
                <p class="text-sm text-gray-900">{{ databaseSize }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-2">Total Entries</h3>
                <p class="text-sm text-gray-900">{{ totalEntries }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-2">Last Backup</h3>
                <p class="text-sm text-gray-900">{{ lastBackup }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button @click="saveSettings" class="btn btn-primary btn-lg">
            <Save class="h-5 w-5 mr-2" />
            Save Settings
          </button>
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
  Settings, 
  Tag, 
  Bell, 
  Database, 
  Download, 
  Upload, 
  Trash2, 
  Info, 
  Save, 
  Plus 
} from 'lucide-vue-next'
import moment from 'moment'

interface Category {
  name: string
  color: string
}

interface AppSettings {
  currency: string
  dateFormat: string
  defaultView: string
  defaultGrouping: string
  autoSave: boolean
  categories: Category[]
  emailNotifications: boolean
  weeklySummary: boolean
  monthlyReport: boolean
}

const alert = ref<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' })
const totalEntries = ref(0)
const databaseSize = ref('0 KB')
const lastBackup = ref('Never')

const settings = ref<AppSettings>({
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  defaultView: 'table',
  defaultGrouping: 'month',
  autoSave: true,
  categories: [
    { name: 'Food & Dining', color: '#3B82F6' },
    { name: 'Transportation', color: '#EF4444' },
    { name: 'Shopping', color: '#10B981' },
    { name: 'Entertainment', color: '#F59E0B' },
    { name: 'Utilities', color: '#8B5CF6' },
    { name: 'Healthcare', color: '#EC4899' },
    { name: 'Travel', color: '#06B6D4' },
    { name: 'Other', color: '#84CC16' }
  ],
  emailNotifications: false,
  weeklySummary: false,
  monthlyReport: false
})

const showAlert = (message: string, type: 'success' | 'error') => {
  alert.value = { message, type }
  setTimeout(() => alert.value = { message: '', type: '' }, 3000)
}

const addCategory = () => {
  settings.value.categories.push({
    name: '',
    color: '#6B7280'
  })
}

const removeCategory = (index: number) => {
  if (settings.value.categories.length > 1) {
    settings.value.categories.splice(index, 1)
  }
}

const saveSettings = async () => {
  try {
    // In a real app, this would save to localStorage or send to server
    localStorage.setItem('expenseManagerSettings', JSON.stringify(settings.value))
    showAlert('Settings saved successfully!', 'success')
  } catch (error: any) {
    console.error('Error saving settings:', error)
    showAlert('Error saving settings: ' + error.message, 'error')
  }
}

const exportAllData = async () => {
  try {
    const response = await fetch('/api/export')
    if (!response.ok) throw new Error('Failed to export data')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expense-data-${moment().format('YYYY-MM-DD')}.zip`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    showAlert('Data exported successfully!', 'success')
  } catch (error: any) {
    console.error('Error exporting data:', error)
    showAlert('Error exporting data: ' + error.message, 'error')
  }
}

const importData = () => {
  // In a real app, this would open a file picker and process the import
  showAlert('Import functionality would be implemented here', 'success')
}

const clearAllData = async () => {
  if (!window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
    return
  }
  
  try {
    // In a real app, this would call an API to clear all data
    showAlert('Clear data functionality would be implemented here', 'success')
  } catch (error: any) {
    console.error('Error clearing data:', error)
    showAlert('Error clearing data: ' + error.message, 'error')
  }
}

const loadSettings = () => {
  try {
    const saved = localStorage.getItem('expenseManagerSettings')
    if (saved) {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    }
  } catch (error) {
    console.error('Error loading settings:', error)
  }
}

const loadSystemInfo = async () => {
  try {
    const response = await fetch('/api/stats')
    if (response.ok) {
      const data = await response.json()
      totalEntries.value = data.totalEntries || 0
      databaseSize.value = data.databaseSize || '0 KB'
      lastBackup.value = data.lastBackup || 'Never'
    }
  } catch (error) {
    console.error('Error loading system info:', error)
  }
}

onMounted(() => {
  loadSettings()
  loadSystemInfo()
})
</script>

<style scoped>
/* Add any component specific styles here */
</style>
