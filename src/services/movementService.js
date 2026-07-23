import api from './api'

export const movementService = {
  // Obtener la lista de movimientos desde el backend de Go
  async getMovements(page = 1, pageSize = 10, multiplier = null) {
    const url = '/v1/client/movement'
    const params = {
      page,
      page_size: pageSize
    }

    if (multiplier !== null && multiplier !== undefined) {
      params.multiplier = multiplier
    }

    const response = await api.get(url, { params })

    return {
      data: response.data?.data || [],
      pagination: {
        totalCount: Number(response.headers['x-pagination-total-count'] || 0),
        pageCount: Number(response.headers['x-pagination-page-count'] || 0),
        currentPage: Number(response.headers['x-pagination-current-page'] || page),
        pageSize: Number(response.headers['x-pagination-page-size'] || pageSize)
      }
    }
  }
}
