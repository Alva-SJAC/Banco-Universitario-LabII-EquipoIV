import api from './api'

export const authService = {
  // Iniciar sesión en el sistema
  async login(email, password) {
    localStorage.removeItem('bu_profile_override')
    localStorage.removeItem('bu_notification_settings')

    const response = await api.post('/v1/public/client/user/login', { email, password })
    
    if (response.data?.data) {
      const backendData = response.data.data
      const userPayload = backendData.user || backendData

      if (backendData.jwt && !userPayload.jwt) {
        userPayload.jwt = backendData.jwt
      }

      const token = backendData.jwt || userPayload.jwt

      if (token) {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('bu_token', token)
      }

      localStorage.setItem('user_data', JSON.stringify(userPayload))
      localStorage.setItem('bu_user', JSON.stringify(userPayload))
    }
    return response.data
  },

  // Registrar nuevo usuario
  async register(userData) {
    localStorage.removeItem('bu_profile_override')
    localStorage.removeItem('bu_notification_settings')

    const response = await api.post('/v1/public/client/user/register', userData)
    return response.data
  },

  // Solicitar código de recuperación de contraseña
  async forgotPassword(email) {
    const response = await api.post('/v1/public/client/user/forgot-password', { email })
    return response.data
  },

  // Restablecer contraseña usando código enviado por correo
  async resetPassword(email, code, newPassword) {
    const payload = {
      email,
      code,
      new_password: newPassword
    }

    const response = await api.post('/v1/public/client/user/reset-password', payload)
    return response.data
  },

  // Cerrar sesión activa
  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    localStorage.removeItem('bu_token')
    localStorage.removeItem('bu_user')
    localStorage.removeItem('bu_profile_override')
    localStorage.removeItem('bu_notification_settings')
  },

  // Obtener datos del usuario logueado
  getCurrentUser() {
    const userJson = localStorage.getItem('bu_user') || localStorage.getItem('user_data')
    try {
      return userJson ? JSON.parse(userJson) : null
    } catch (e) {
      return null
    }
  },

  // Actualizar perfil tanto en Backend como en LocalStorage por ID de usuario
  async updateProfile(profileData) {
    let updatedFromBackend = null

    try {
      const response = await api.put('/v1/client/user/profile', profileData)
      if (response.data?.data) {
        updatedFromBackend = response.data.data
      }
    } catch (error) {
      console.warn('No se pudo persistir en backend, aplicando cambios localmente:', error)
    }

    const rawUser = this.getCurrentUser() || {}
    const currentUser = rawUser.user ? { ...rawUser, ...rawUser.user } : rawUser

    const mergedUser = {
      ...currentUser,
      ...(updatedFromBackend || profileData)
    }

    localStorage.setItem('user_data', JSON.stringify(mergedUser))
    localStorage.setItem('bu_user', JSON.stringify(mergedUser))

    // Guardar respaldo persistente específico de este usuario
    const userId = currentUser.id || currentUser.email || 'default'
    const overrides = JSON.parse(localStorage.getItem(`bu_override_${userId}`) || '{}')
    const newOverride = { ...overrides, ...profileData }
    localStorage.setItem(`bu_override_${userId}`, JSON.stringify(newOverride))

    return mergedUser
  },

  // Alias de compatibilidad para evitar TypeErrors si algún componente invoca updateCurrentUser
  updateCurrentUser(updatedFields) {
    const rawUser = this.getCurrentUser() || {}
    const currentUser = rawUser.user ? { ...rawUser, ...rawUser.user } : rawUser

    const userId = currentUser.id || currentUser.email || 'default'
    const overrides = JSON.parse(localStorage.getItem(`bu_override_${userId}`) || '{}')
    const newOverride = { ...overrides, ...updatedFields }
    
    localStorage.setItem(`bu_override_${userId}`, JSON.stringify(newOverride))

    const mergedUser = { ...currentUser, ...updatedFields }
    localStorage.setItem('user_data', JSON.stringify(mergedUser))
    localStorage.setItem('bu_user', JSON.stringify(mergedUser))

    return mergedUser
  },

  // Cambiar contraseña en el backend
  async changePassword(currentPassword, newPassword) {
    const payload = {
      password: currentPassword,
      new_password: newPassword
    }
    
    const response = await api.patch('/v1/client/user/password', payload)
    return response.data
  },

  // Validar si la sesión sigue activa
  isAuthenticated() {
    return !!(localStorage.getItem('bu_token') || localStorage.getItem('auth_token'))
  }
}