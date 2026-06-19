import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/public/Home.vue'
import RegisterPage from '../views/auth/RegisterPage.vue'
import ForgotPasswordPage from '../views/auth/ForgotPasswordPage.vue'
import DashboardLayout from '../views/dashboard/DashboardLayout.vue'
import DashboardHome from '../views/dashboard/Home.vue'
import Movements from '../views/dashboard/Movements.vue'
import Transfers from '../views/dashboard/Transfers.vue'
import Cards from '../views/dashboard/Cards.vue'
import Contacts from '../views/dashboard/Contacts.vue'
import Profile from '../views/dashboard/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registro',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/recuperar-contrasena',
    name: 'ForgotPassword',
    component: ForgotPasswordPage
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: DashboardHome
      },
      {
        path: 'movements',
        name: 'Movements',
        component: Movements
      },
      {
        path: 'transfers',
        name: 'Transfers',
        component: Transfers
      },
      {
        path: 'cards',
        name: 'Cards',
        component: Cards
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: Contacts
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router