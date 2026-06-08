const API = import.meta.env.PROD
  ? 'https://ydl-backend.onrender.com'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001');

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export function getToken() {
  return localStorage.getItem('ydl_token');
}

export function setToken(token: string) {
  localStorage.setItem('ydl_token', token);
}

export function clearToken() {
  localStorage.removeItem('ydl_token');
}

export function getUser() {
  const raw = localStorage.getItem('ydl_user');
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user: any) {
  localStorage.setItem('ydl_user', JSON.stringify(user));
}

export async function getMe() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) { clearToken(); return null; }
  return res.json();
}

export async function api(path: string, options?: RequestInit) {
  const token = getToken();
  const res = await fetch(`${API}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}
