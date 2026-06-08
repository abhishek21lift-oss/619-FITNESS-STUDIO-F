import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authApi } from '../api/auth'

interface User {
  name: string
  mobile: string
  email: string
  branch: string
}

interface AuthContextType {
  user: User | null
  login: (mobile: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('ydl_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) localStorage.setItem('ydl_user', JSON.stringify(user))
    else localStorage.removeItem('ydl_user')
  }, [user])

  const login = async (mobile: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const data = await authApi.login(mobile, password)
      if (data.token) localStorage.setItem('ydl_token', data.token)
      setUser(data.user)
      return true
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('ydl_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
