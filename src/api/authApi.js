import apiClient from './axios'

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/v1/public/client/user/login', credentials)
  return response.data
}