<template>
  <footer class="bg-gray-900 text-gray-300 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Info -->
        <div>
          <h3 class="text-lg font-bold text-white mb-4">📊 Expense Manager</h3>
          <p class="text-sm">
            Streamlining your financial tracking with ease and precision.
          </p>
          <div class="flex space-x-4 mt-4">
            <!-- Social Links Placeholder -->
            <a href="#" class="text-gray-400 hover:text-white transition-colors">FB</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">TW</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">LI</a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><router-link to="/expenses" class="text-sm hover:text-white transition-colors">Expenses</router-link></li>
            <li><a href="#reports" class="text-sm hover:text-white transition-colors">Reports</a></li>
            <li><a href="#settings" class="text-sm hover:text-white transition-colors">Settings</a></li>
            <li><a href="#support" class="text-sm hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-white font-semibold mb-4">Resources</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-sm hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" class="text-sm hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" class="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="text-sm hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-white font-semibold mb-4">Stay Updated</h4>
          <p class="text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
          <form class="flex">
            <input
              type="email"
              placeholder="Your email"
              class="px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" class="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
        &copy; {{ currentYear }} Expense Manager. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
