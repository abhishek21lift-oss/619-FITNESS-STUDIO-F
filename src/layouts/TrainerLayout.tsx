import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../api'

export default function TrainerLayout() {
  if (!getToken()) return <Navigate to="/trainer-dashboard/login" replace />
  return (
    <div className="min-h-screen bg-black text-white">
      <Outlet />
    </div>
  )
}
