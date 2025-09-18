<template>
  <div class="relative">
    <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
    <div class="relative">
      <button
        @click="togglePicker"
        class="form-input flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors"
        :class="{ 'border-primary ring-2 ring-primary/20': isOpen }"
      >
        <span class="text-sm">
          {{ displayText }}
        </span>
        <Calendar class="h-4 w-4 text-gray-400" />
      </button>
      
      <!-- Date Picker Dropdown -->
      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[320px]"
      >
        <!-- Quick Selection Buttons -->
        <div class="grid grid-cols-2 gap-2 mb-4">
          <button
            @click="setQuickRange('today')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'today' }"
          >
            Today
          </button>
          <button
            @click="setQuickRange('yesterday')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'yesterday' }"
          >
            Yesterday
          </button>
          <button
            @click="setQuickRange('week')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'week' }"
          >
            This Week
          </button>
          <button
            @click="setQuickRange('lastWeek')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'lastWeek' }"
          >
            Last Week
          </button>
          <button
            @click="setQuickRange('month')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'month' }"
          >
            This Month
          </button>
          <button
            @click="setQuickRange('lastMonth')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'lastMonth' }"
          >
            Last Month
          </button>
          <button
            @click="setQuickRange('last7days')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'last7days' }"
          >
            Last 7 Days
          </button>
          <button
            @click="setQuickRange('last30days')"
            class="btn btn-outline btn-sm text-xs"
            :class="{ 'btn-primary': quickRange === 'last30days' }"
          >
            Last 30 Days
          </button>
        </div>

        <!-- Custom Date Inputs -->
        <div class="border-t pt-4">
          <div class="text-sm font-medium text-gray-700 mb-3">Custom Range</div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-600 mb-1">From</label>
              <input
                v-model="startDate"
                type="date"
                class="form-input text-sm"
                @change="updateCustomRange"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-600 mb-1">To</label>
              <input
                v-model="endDate"
                type="date"
                class="form-input text-sm"
                @change="updateCustomRange"
              />
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between items-center mt-4 pt-4 border-t">
          <button
            @click="clearRange"
            class="btn btn-outline btn-sm"
          >
            Clear
          </button>
          <div class="flex gap-2">
            <button
              @click="closePicker"
              class="btn btn-outline btn-sm"
            >
              Cancel
            </button>
            <button
              @click="applyRange"
              class="btn btn-primary btn-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Calendar } from 'lucide-vue-next'

interface Props {
  startDate?: string
  endDate?: string
}

interface Emits {
  (e: 'update:startDate', value: string): void
  (e: 'update:endDate', value: string): void
  (e: 'change', range: { startDate: string; endDate: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isOpen = ref(false)
const quickRange = ref<string>('')
const startDate = ref(props.startDate || '')
const endDate = ref(props.endDate || '')

const displayText = computed(() => {
  if (!startDate.value && !endDate.value) {
    return 'Select date range'
  }
  
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
    const end = new Date(endDate.value).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
    return `${start} - ${end}`
  }
  
  if (startDate.value) {
    return `From ${new Date(startDate.value).toLocaleDateString()}`
  }
  
  if (endDate.value) {
    return `Until ${new Date(endDate.value).toLocaleDateString()}`
  }
  
  return 'Select date range'
})

const togglePicker = () => {
  isOpen.value = !isOpen.value
}

const closePicker = () => {
  isOpen.value = false
}

const setQuickRange = (range: string) => {
  quickRange.value = range
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  
  let start = ''
  let end = ''
  
  switch (range) {
    case 'today':
      start = end = todayStr
      break
    case 'yesterday':
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)
      start = end = yesterday.toISOString().split('T')[0]
      break
    case 'week':
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      start = startOfWeek.toISOString().split('T')[0]
      end = todayStr
      break
    case 'lastWeek':
      const lastWeekStart = new Date(today)
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7)
      const lastWeekEnd = new Date(lastWeekStart)
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6)
      start = lastWeekStart.toISOString().split('T')[0]
      end = lastWeekEnd.toISOString().split('T')[0]
      break
    case 'month':
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      start = startOfMonth.toISOString().split('T')[0]
      end = todayStr
      break
    case 'lastMonth':
      const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
      start = lastMonthStart.toISOString().split('T')[0]
      end = lastMonthEnd.toISOString().split('T')[0]
      break
    case 'last7days':
      const last7Days = new Date(today)
      last7Days.setDate(today.getDate() - 7)
      start = last7Days.toISOString().split('T')[0]
      end = todayStr
      break
    case 'last30days':
      const last30Days = new Date(today)
      last30Days.setDate(today.getDate() - 30)
      start = last30Days.toISOString().split('T')[0]
      end = todayStr
      break
  }
  
  startDate.value = start
  endDate.value = end
}

const updateCustomRange = () => {
  quickRange.value = ''
}

const clearRange = () => {
  startDate.value = ''
  endDate.value = ''
  quickRange.value = ''
}

const applyRange = () => {
  emit('update:startDate', startDate.value)
  emit('update:endDate', endDate.value)
  emit('change', { startDate: startDate.value, endDate: endDate.value })
  closePicker()
}

// Close picker when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for prop changes
watch(() => props.startDate, (newVal) => {
  startDate.value = newVal || ''
})

watch(() => props.endDate, (newVal) => {
  endDate.value = newVal || ''
})
</script>
