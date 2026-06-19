import api from './api'

export const authService = {
  // Iniciar sesión en el sistema
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('user_data', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Registrar nuevo usuario
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('user_data', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Cerrar sesión activa
  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  },

  // Obtener datos del usuario logueado
  getCurrentUser() {
    const userJson = localStorage.getItem('user_data')
    return userJson ? JSON.parse(userJson) : null
  },

  // Validar si la sesión sigue activa
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  }
}
