import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import EditView from '@/views/EditView.vue'
import ArchivedNotes from '@/views/ArchivedNotes.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',

    component: CreateView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView
  },
  {
    path: '/archived',
    name: 'archived',
    component: ArchivedNotes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
