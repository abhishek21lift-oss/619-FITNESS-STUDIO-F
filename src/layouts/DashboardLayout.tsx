import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../api'

export default function DashboardLayout() {
  if (!getToken()) return <Navigate to="/fitness-center/login" replace />
  return (
    <div className="min-h-screen bg-black text-white">
      <Outlet />
    </div>
  )
}
