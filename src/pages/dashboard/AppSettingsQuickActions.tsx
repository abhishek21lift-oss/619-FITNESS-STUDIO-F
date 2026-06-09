import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, GripVertical, Zap, Bell, Mail, MessageSquare, Calendar, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'
import ActionMenu from '../../components/shared/ActionMenu'

const iconMap: Record<string, any> = { Zap, Bell, Mail, MessageSquare, Calendar, Shield }

interface QuickAction {
  id: number
  name: string
  icon: string
  route: string
  status: 'Active' | 'Inactive'
  order: number
}

const initialActions: QuickAction[] = [
  { id: 1, name: 'Quick Check-in', icon: 'Zap', route: '/checkin', status: 'Active', order: 1 },
  { id: 2, name: 'Add Member', icon: 'Bell', route: '/members/add', status: 'Active', order: 2 },
  { id: 3, name: 'New Enquiry', icon: 'Mail', route: '/enquiry/add', status: 'Active', order: 3 },
  { id: 4, name: 'Send Notification', icon: 'MessageSquare', route: '/notifications', status: 'Inactive', order: 4 },
  { id: 5, name: 'View Reports', icon: 'Calendar', route: '/analysis', status: 'Active', order: 5 },
]

export default function AppSettingsQuickActions() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [actions, setActions] = useState<QuickAction[]>(initialActions)

  const toggleStatus = (id: number) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a))
    toast('Status updated.', 'info')
  }

  const removeAction = (id: number) => {
    setActions(prev => prev.filter(a => a.id !== id))
    toast('Action removed.', 'info')
  }

  const moveUp = (id: number) => {
    setActions(prev => {
      const idx = prev.findIndex(a => a.id === id)
      if (idx === 0) return prev
      const arr = [...prev]
      ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
      return arr.map((a, i) => ({ ...a, order: i + 1 }))
    })
  }

  const moveDown = (id: number) => {
    setActions(prev => {
      const idx = prev.findIndex(a => a.id === id)
      if (idx === prev.length - 1) return prev
      const arr = [...prev]
      ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
      return arr.map((a, i) => ({ ...a, order: i + 1 }))
    })
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Quick Actions</h1><p className="text-xs text-gray-500 mt-0.5">Customize the quick action bar buttons.</p></div>
        <button onClick={() => navigate('/dashboard/app-settings/quick-actions/create')} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Action
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
              <th className="w-12 px-2 py-3" />
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Icon</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Route</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-center px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Order</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ydl-dark-border/50">
            {actions.map((a, i) => {
              const Icon = iconMap[a.icon] || Zap
              return (
                <motion.tr key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-2 py-3">
                    <div className="flex flex-col items-center gap-0.5">
                      <button onClick={() => moveUp(a.id)} className="text-gray-600 hover:text-gray-400"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg></button>
                      <GripVertical className="w-3.5 h-3.5 text-gray-600 cursor-grab" />
                      <button onClick={() => moveDown(a.id)} className="text-gray-600 hover:text-gray-400"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-white">{a.name}</td>
                  <td className="px-4 py-3"><Icon className="w-4 h-4 text-ydl-yellow" /></td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{a.route}</td>
                  <td className="px-4 py-3">
                    <div onClick={() => toggleStatus(a.id)} className={`w-8 h-4 rounded-full relative cursor-pointer ${a.status === 'Active' ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                      <div className={`w-3 h-3 rounded-full absolute top-0.5 transition-all ${a.status === 'Active' ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-400">#{a.order}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu actions={[
                      { label: 'Edit', icon: Edit3, onClick: () => toast('Edit quick action', 'info') },
                      { label: 'Delete', icon: Trash2, onClick: () => removeAction(a.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
