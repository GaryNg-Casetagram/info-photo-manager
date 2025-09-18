<template>
  <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
    <!-- Table Header -->
    <div class="bg-gray-50 border-b">
      <div class="grid grid-cols-12 gap-2 p-3 text-sm font-semibold text-gray-700 border-b">
        <div class="col-span-1 px-2">ID</div>
        <div class="col-span-2 px-2">Date</div>
        <div class="col-span-3 px-2">Title</div>
        <div class="col-span-2 px-2">Category</div>
        <div class="col-span-2 px-2">Description</div>
        <div class="col-span-1 px-2 text-right">Amount</div>
        <div class="col-span-1 px-2 text-center">Actions</div>
      </div>
    </div>

    <!-- Table Body -->
    <div class="divide-y divide-gray-200">
      <div 
        v-for="entry in entries" 
        :key="entry.id"
        class="grid grid-cols-12 gap-2 p-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100"
      >
        <!-- ID Column -->
        <div class="col-span-1 px-2 text-gray-600 font-mono text-xs">
          {{ entry.id }}
        </div>

        <!-- Date Column -->
        <div class="col-span-2 px-2">
          <div class="text-gray-900 font-medium text-xs">
            {{ formatDate(entry.expense_date || entry.created_at) }}
          </div>
          <div class="text-xs text-gray-500">
            {{ formatTime(entry.created_at) }}
          </div>
        </div>

        <!-- Title Column -->
        <div class="col-span-3 px-2">
          <div class="font-medium text-gray-900 text-sm truncate" :title="entry.title">
            {{ entry.title }}
          </div>
        </div>

        <!-- Category Column -->
        <div class="col-span-2 px-2">
          <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {{ entry.category }}
          </span>
        </div>

        <!-- Description Column -->
        <div class="col-span-2 px-2">
          <div class="text-gray-600 text-sm truncate" :title="entry.description">
            {{ entry.description || '-' }}
          </div>
        </div>

        <!-- Amount Column -->
        <div class="col-span-1 px-2 text-right">
          <span class="font-semibold text-gray-900 text-sm">
            ${{ entry.amount.toFixed(2) }}
          </span>
        </div>

        <!-- Actions Column -->
        <div class="col-span-1 px-2">
          <div class="flex justify-center space-x-2">
            <button
              @click="$emit('edit', entry)"
              class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Edit Expense"
            >
              <Edit class="h-4 w-4" />
            </button>
            <button
              @click="$emit('delete', entry.id)"
              class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete Expense"
            >
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="entries.length === 0" class="p-8 text-center text-gray-500">
        <div class="text-4xl mb-2">📊</div>
        <p>No expenses found</p>
        <p class="text-sm">Add your first expense to get started</p>
      </div>
    </div>

    <!-- Summary Row -->
    <div v-if="entries.length > 0" class="bg-gray-100 border-t">
      <div class="grid grid-cols-12 gap-2 p-3 text-sm font-semibold">
        <div class="col-span-8 px-2 text-gray-700">
          Total ({{ entries.length }} entries)
        </div>
        <div class="col-span-2 px-2"></div>
        <div class="col-span-1 px-2 text-right text-gray-900">
          ${{ totalAmount.toFixed(2) }}
        </div>
        <div class="col-span-1 px-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Edit, Trash2 } from 'lucide-vue-next'

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

interface Props {
  entries: ExpenseEntry[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [entry: ExpenseEntry]
  delete: [id: number]
}>()

const totalAmount = computed(() => 
  props.entries.reduce((sum, entry) => sum + entry.amount, 0)
)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
