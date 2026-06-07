import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

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
}

const AuthContext = createContext<AuthContextType | null>(null)

const ADMIN_CREDENTIALS = { mobile: '919651924262', password: 'fit123' }
const ADMIN_USER: User = { name: 'Awash Vikash', mobile: '919651924262', email: 'admin@ydl.com', branch: '619 FITNESS STUDIO (Kalyanpur)' }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('ydl_user')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('ydl_user', JSON.stringify(user))
    else localStorage.removeItem('ydl_user')
  }, [user])

  const login = async (mobile: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))
    if (mobile === ADMIN_CREDENTIALS.mobile && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_USER)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
