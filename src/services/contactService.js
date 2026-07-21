import api from './api'

export const contactService = {
  async getContacts(alias = '') {
    const params = alias ? { alias } : {}
    const response = await api.get('/v1/client/contact', { params })
    return response.data
  },

  async getContactById(contactId) {
    const response = await api.get(`/v1/client/contact/${contactId}`)
    return response.data
  },

  async createContact(contactData) {
    const response = await api.post('/v1/client/contact', {
      alias: contactData.alias,
      account_number: contactData.account_number,
      description: contactData.description || null
    })

    return response.data
  },

  async updateContact(contactId, contactData) {
    const response = await api.patch(`/v1/client/contact/${contactId}`, {
      alias: contactData.alias,
      description: contactData.description || null
    })

    return response.data
  },

  async deleteContact(contactId) {
    const response = await api.delete(`/v1/client/contact/${contactId}`)
    return response.data
  }
}