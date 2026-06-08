import { api } from './client'

function crud(prefix: string) {
  return {
    list: (params?: Record<string, string>) => api.get(`/${prefix}?${new URLSearchParams(params || {})}`),
    get: (id: number | string) => api.get(`/${prefix}/${id}`),
    create: (data: unknown) => api.post(`/${prefix}`, data),
    update: (id: number | string, data: unknown) => api.put(`/${prefix}/${id}`, data),
    delete: (id: number | string) => api.delete(`/${prefix}/${id}`),
  }
}

export const trainersApi = {
  trainers: crud('trainers'),
  commission: crud('trainers/commission'),
}
