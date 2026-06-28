import api from './api'

export const movementService = {
  // Obtener la lista de movimientos desde el backend de Go
  async getMovements(accountId = 'all') {
    const url = accountId === 'all' ? '/client/movement' : `/client/movement?accountId=${accountId}`
    const response = await api.get(url)
    return response.data
  }
}
