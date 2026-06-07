import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, Dumbbell, Bell, Search, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 h-12 px-3 lg:px-5 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-ydl-dark-border">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-6 h-6 rounded-lg bg-ydl-gradient flex items-center justify-center">
              <Dumbbell className="w-3 h-3 text-black" />
            </div>
          </div>

          <div className="flex-1" />

          <div className="relative max-w-xs w-full hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for Name, Mobile number..."
              className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-ydl-yellow/30 transition-colors"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-medium text-black bg-ydl-gradient rounded hover:opacity-90 transition-opacity">
              Go!
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 hidden sm:block">619 FITNESS STUDIO</span>
            <span className="text-[10px] text-ydl-yellow/70 hidden sm:block">(Kalyanpur)</span>
          </div>

          <button className="relative p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button onClick={handleLogout} className="flex items-center gap-1 px-2 py-1 text-[10px] text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <LogOut className="w-3 h-3" /> {user?.name ? `Logout (${user.name})` : 'Logout'}
          </button>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
