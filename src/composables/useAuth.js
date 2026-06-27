import { ref } from 'vue'

const token = ref(localStorage.getItem('bu_token') || null)
const user = ref(null)

export const useAuth = () => {
  const setSession = (newToken, userData = null) => {
    token.value = newToken
    user.value = userData

    localStorage.setItem('bu_token', newToken)

    if (userData) {
      localStorage.setItem('bu_user', JSON.stringify(userData))
    }
  }

  const logout = () => {
    token.value = null
    user.value = null

    localStorage.removeItem('bu_token')
    localStorage.removeItem('bu_user')
  }

  const isAuthenticated = () => {
    return Boolean(token.value || localStorage.getItem('bu_token'))
  }

  return {
    token,
    user,
    setSession,
    logout,
    isAuthenticated
  }
}