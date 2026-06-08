const API_URL = import.meta.env.PROD
  ? 'https://ydl-backend.onrender.com/api'
  : 'http://localhost:3001/api'

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('ydl_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  }
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const api = {
  get: (url: string) => request(url),
  post: (url: string, data?: unknown) => request(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url: string, data?: unknown) => request(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url: string) => request(url, { method: 'DELETE' }),
}
