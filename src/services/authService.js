import api from './api'

export const authService = {
  // Iniciar sesión en el sistema
  async login(email, password) {
    const response = await api.post('/v1/public/client/user/login', { email, password })
    if (response.data?.data?.jwt) {
      localStorage.setItem('auth_token', response.data.data.jwt)
      localStorage.setItem('user_data', JSON.stringify(response.data.data))
    }
    return response.data
  },

  // Registrar nuevo usuario
  async register(userData) {
    const response = await api.post('/v1/public/client/user/register', userData)
    // El backend responde con Status 201 y la entidad User creada, sin JWT.
    return response.data
  },

  // Cerrar sesión activa
  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    localStorage.removeItem('bu_token')
    localStorage.removeItem('bu_user')
  },

  // Obtener datos del usuario logueado
  getCurrentUser() {
    const userJson = localStorage.getItem('bu_user') || localStorage.getItem('user_data')
    return userJson ? JSON.parse(userJson) : null
  },

  // Validar si la sesión sigue activa
  isAuthenticated() {
    return !!(localStorage.getItem('bu_token') || localStorage.getItem('auth_token'))
  }
}
