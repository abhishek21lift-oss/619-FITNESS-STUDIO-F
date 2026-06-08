import { api } from './client'

export const enquiriesApi = {
  list: (params?: Record<string, string>) => api.get(`/enquiries?${new URLSearchParams(params)}`),
  get: (id: number | string) => api.get(`/enquiries/${id}`),
  create: (data: unknown) => api.post('/enquiries', data),
  update: (id: number | string, data: unknown) => api.put(`/enquiries/${id}`, data),
  delete: (id: number | string) => api.delete(`/enquiries/${id}`),
  bulkDelete: (ids: (number | string)[]) => api.post('/enquiries/bulk-delete', { ids }),
  tap: (ids: (number | string)[]) => api.post('/enquiries/tap', { ids }),
}
