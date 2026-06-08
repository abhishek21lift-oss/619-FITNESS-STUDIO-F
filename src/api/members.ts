import { api } from './client'

export const membersApi = {
  list: (params?: Record<string, string>) => api.get(`/members?${new URLSearchParams(params)}`),
  get: (id: number | string) => api.get(`/members/${id}`),
  create: (data: unknown) => api.post('/members', data),
  update: (id: number | string, data: unknown) => api.put(`/members/${id}`, data),
  delete: (id: number | string) => api.delete(`/members/${id}`),
  birthdays: () => api.get('/members/birthdays'),
  referrals: () => api.get('/members/referrals'),
}
