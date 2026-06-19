import api from './api'

export const movementService = {
  // Obtener la lista de movimientos filtrados
  async getMovements(accountId = 'all') {
    const response = await api.get('/movements', {
      params: { accountId }
    })
    return response.data
  },

  // Obtener estadísticas de ingresos y egresos
  async getStats(accountId = 'all') {
    const response = await api.get('/movements/stats', {
      params: { accountId }
    })
    return response.data
  }
}
