import { useState } from 'react'
import { Navigate, Outlet, NavLink } from 'react-router-dom'
import { Menu, Dumbbell, LogOut, LayoutDashboard, Users, CalendarDays } from 'lucide-react'
import { getToken, clearToken, getUser } from '../api'

const navItems = [
  { to: '/trainer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trainer/clients', icon: Users, label: 'Clients' },
  { to: '/trainer/schedule', icon: CalendarDays, label: 'Schedule' },
]

export default function TrainerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  if (!getToken()) return <Navigate to="/trainer-dashboard/login" replace />
  const user = getUser()

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1C1C1E] flex">
      {/* Sidebar */}
      <>
        {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-apple-gray-200 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="flex items-center gap-3 p-5 border-b border-apple-gray-200">
            <div className="w-9 h-9 rounded-lg bg-apple-blue flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-sm font-bold text-[#1C1C1E] tracking-tight">YOUR DIGITAL</h1>
              <p className="text-[10px] text-apple-blue tracking-widest -mt-0.5">TRAINER</p>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive ? 'bg-apple-blue/10 text-apple-blue border border-apple-blue/20' : 'text-apple-gray-500 hover:text-[#1C1C1E] hover:bg-apple-gray-100 border border-transparent'}`
                }>
                <item.icon className="w-4.5 h-4.5 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-apple-gray-200">
            <p className="text-[10px] text-apple-gray-400 text-center">v1.0.0 &middot; Trainer</p>
          </div>
        </aside>
      </>

      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 lg:px-6 bg-white/90 backdrop-blur-xl border-b border-apple-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-apple-gray-400 hover:text-[#1C1C1E]">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-apple-blue flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold">Trainer</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-apple-gray-400 hidden sm:block">{user?.name || 'Trainer'}</span>
            <button onClick={() => { clearToken(); window.location.href = '/trainer-dashboard/login' }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-apple-gray-400 hover:text-apple-red hover:bg-apple-red/10 rounded-lg transition-all">
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
