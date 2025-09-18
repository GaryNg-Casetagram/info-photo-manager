import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

// Import pages
import HomePage from './pages/HomePage.vue'
import ExpensesPage from './pages/ExpensesPage.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/expenses', component: ExpensesPage }
  ]
})

// Create Vue app
const app = createApp(App)
app.use(router)
app.mount('#app')
