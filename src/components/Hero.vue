<template>
  <section class="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Hassle-Free
            <span class="block text-primary">Expense Management</span>
          </h1>
          <p class="text-xl text-gray-600 mt-6 leading-relaxed">
            Streamline your receipt tracking and expense reporting. Our intuitive system
            ensures you stay organized and compliant.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <router-link to="/expenses" class="btn btn-primary btn-lg bg-black hover:bg-gray-800">
              Start Managing Expenses
            </router-link>
            <button class="btn btn-outline btn-lg">
              Learn More
            </button>
          </div>

          <div class="grid grid-cols-3 gap-6 mt-12">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Shield class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-sm">Secure</h3>
              <p class="text-xs text-gray-600 mt-1">Your data is protected</p>
            </div>
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Clock class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-sm">Efficient</h3>
              <p class="text-xs text-gray-600 mt-1">Quick entry & processing</p>
            </div>
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <CheckCircle class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-sm">Organized</h3>
              <p class="text-xs text-gray-600 mt-1">Categorize and track easily</p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-8">
            <!-- Placeholder for image or expense card demo -->
            <div class="w-full h-80 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
              Expense Dashboard Preview
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium">Expenses recorded daily</span>
            </div>
            <p class="text-2xl font-bold text-gray-900 mt-1">1,234</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Shield, Clock, CheckCircle } from 'lucide-vue-next'
</script>
