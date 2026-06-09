import { User } from './types';
import { useAuthStore } from './store/authStore';

const API = import.meta.env.PROD
  ? 'https://ydl-backend.onrender.com'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001');

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  
  const { setAuth } = useAuthStore.getState();
  setAuth(data.user, data.token);
  
  return data;
}

export function getToken() {
  return useAuthStore.getState().token;
}

export function setToken(token: string) {
  useAuthStore.getState().setAuth(useAuthStore.getState().user!, token);
}

export function clearToken() {
  useAuthStore.getState().clearAuth();
}

export function getUser(): User | null {
  return useAuthStore.getState().user;
}

export function setUser(user: User) {
  useAuthStore.getState().setAuth(user, useAuthStore.getState().token || '');
}

export async function getMe(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) { clearToken(); return null; }
  return res.json();
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
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
