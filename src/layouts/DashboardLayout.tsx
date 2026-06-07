import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Menu, Dumbbell, LogOut } from 'lucide-react'
import { getToken, clearToken, getUser } from '../api'
import Sidebar from '../components/dashboard/Sidebar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  if (!getToken()) return <Navigate to="/fitness-center/login" replace />
  const user = getUser()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 lg:px-6 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#D4AF34]/10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-[#D4AF34] flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-bold">YDL</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.name || 'User'}</span>
            <button onClick={() => { clearToken(); window.location.href = '/fitness-center/login' }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
