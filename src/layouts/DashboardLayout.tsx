import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Outlet />
    </div>
  )
}
