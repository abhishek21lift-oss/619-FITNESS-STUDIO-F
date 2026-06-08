import { api } from './client'

export const notificationsApi = {
  list: (params?: Record<string, string>) => api.get(`/notifications?${new URLSearchParams(params || {})}`),
  create: (data: unknown) => api.post('/notifications', data),
  markRead: (id: number | string) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
  delete: (id: number | string) => api.delete(`/notifications/${id}`),
}
