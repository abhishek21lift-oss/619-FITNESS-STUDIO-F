import { api } from './client'

export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data: unknown) => api.put('/settings', data),
  backup: () => api.post('/settings/backup'),
  restore: (data: unknown) => api.post('/settings/restore', data),
}
