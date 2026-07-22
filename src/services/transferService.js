import api from './api'

export const transferService = {
  // Crear una transferencia (en el backend esto se registra como un movimiento)
  async createTransfer(transferData) {
    const payload = {
      account_number: transferData.toAccount,
      amount: Number(transferData.amount),
      description: transferData.description || 'Transferencia'
    }
    const response = await api.post('/v1/client/movement', payload)
    return response.data
  }
}
