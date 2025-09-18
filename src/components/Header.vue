<template>
  <header class="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <h1 class="font-bold text-xl">📊 Expense Manager</h1>
            <span class="text-muted-foreground text-sm hidden sm:block">Professional Receipt Tracking</span>
          </router-link>
        </div>

        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-sm hover:text-primary transition-colors">Home</router-link>
          <router-link to="/expenses" class="text-sm hover:text-primary transition-colors">Expenses</router-link>
          <a href="#reports" class="text-sm hover:text-primary transition-colors">Reports</a>
          <a href="#settings" class="text-sm hover:text-primary transition-colors">Settings</a>
          <button class="btn btn-outline btn-md">Sign In</button>
        </nav>

        <button
          class="md:hidden"
          @click="toggleMenu"
        >
          <Menu v-if="!isMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>

      <div v-if="isMenuOpen" class="md:hidden py-4 border-t">
        <nav class="flex flex-col space-y-4">
          <router-link to="/" class="text-sm hover:text-primary transition-colors">Home</router-link>
          <router-link to="/expenses" class="text-sm hover:text-primary transition-colors">Expenses</router-link>
          <a href="#reports" class="text-sm hover:text-primary transition-colors">Reports</a>
          <a href="#settings" class="text-sm hover:text-primary transition-colors">Settings</a>
          <button class="btn btn-outline btn-md w-fit">Sign In</button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
