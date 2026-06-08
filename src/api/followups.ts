import { api } from './client'

export const followupsApi = {
  list: (params?: Record<string, string>) => api.get(`/followups?${new URLSearchParams(params)}`),
  create: (data: unknown) => api.post('/followups', data),
  update: (id: number | string, data: unknown) => api.put(`/followups/${id}`, data),
  delete: (id: number | string) => api.delete(`/followups/${id}`),
  bulkTransfer: (ids: (number | string)[], rep: string) => api.post('/followups/bulk-transfer', { ids, rep }),
  markDone: (ids: (number | string)[]) => api.post('/followups/mark-done', { ids }),
}
