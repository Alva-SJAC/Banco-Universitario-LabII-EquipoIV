import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/public/Home.vue'
import RegisterPage from '../views/auth/RegisterPage.vue'
import ForgotPasswordPage from '../views/auth/ForgotPasswordPage.vue'

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