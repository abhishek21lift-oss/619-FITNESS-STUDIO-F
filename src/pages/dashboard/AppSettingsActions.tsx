import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Plus, Edit3, Trash2, GripVertical, Bell, Mail, MessageSquare, Calendar, Shield } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface ActionItem {
  id: number
  title: string
  icon: string
  route: string
  status: 'Active' | 'Inactive'
  order: number
}

const iconMap: Record<string, any> = { Zap, Bell, Mail, MessageSquare, Calendar, Shield }

const initialActions: ActionItem[] = [
  { id: 1, title: 'Send Birthday Wish', icon: 'Bell', route: '/actions/birthday', status: 'Active', order: 1 },
  { id: 2, title: 'Expiry Reminder', icon: 'Calendar', route: '/actions/expiry', status: 'Active', order: 2 },
  { id: 3, title: 'Follow-up Reminder', icon: 'Mail', route: '/actions/followup', status: 'Active', order: 3 },
  { id: 4, title: 'Renewal Offer', icon: 'MessageSquare', route: '/actions/renewal', status: 'Inactive', order: 4 },
  { id: 5, title: 'New Member Welcome', icon: 'Zap', route: '/actions/welcome', status: 'Active', order: 5 },
  { id: 6, title: 'Payment Reminder', icon: 'Shield', route: '/actions/payment', status: 'Active', order: 6 },
]

const iconOptions = ['Zap', 'Bell', 'Mail', 'MessageSquare', 'Calendar', 'Shield']

export default function AppSettingsActions() {
  const [actions, setActions] = useState<ActionItem[]>(initialActions)
  const [modalOpen, setModalOpen] = useState(false)
  const [editAction, setEditAction] = useState<ActionItem | null>(null)
  const [form, setForm] = useState({ title: '', icon: 'Zap', route: '', status: 'Active' as ActionItem['status'] })

  const openAdd = () => {
    setEditAction(null)
    setForm({ title: '', icon: 'Zap', route: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (a: ActionItem) => {
    setEditAction(a)
    setForm({ title: a.title, icon: a.icon, route: a.route, status: a.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editAction) {
      setActions(prev => prev.map(a => a.id === editAction.id ? { ...a, ...form } : a))
    } else {
      setActions(prev => [...prev, { ...form, id: Date.now(), order: prev.length + 1 }])
    }
    setModalOpen(false)
  }

  const toggleStatus = (id: number) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a))
  }

  const removeAction = (id: number) => {
    setActions(prev => prev.filter(a => a.id !== id))
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
        <div><h1 className="text-lg font-bold text-white">Action Items</h1><p className="text-xs text-gray-500 mt-0.5">Automated and manual system actions.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Action</button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
              <th className="w-10 px-2 py-3" />
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Route / Link</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
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
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Icon className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-xs font-medium text-white">{a.title}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{a.route}</td>
                  <td className="px-4 py-3">
                    <div onClick={() => toggleStatus(a.id)} className={`w-8 h-4 rounded-full relative cursor-pointer ${a.status === 'Active' ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                      <div className={`w-3 h-3 rounded-full absolute top-0.5 transition-all ${a.status === 'Active' ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu actions={[
                      { label: 'Edit', icon: Edit3, onClick: () => openEdit(a) },
                      { label: 'Delete', icon: Trash2, onClick: () => removeAction(a.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editAction ? 'Edit Action' : 'Add Action'} size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Action Title</label>
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Send Birthday Wish" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Icon</label>
            <div className="flex gap-2">
              {iconOptions.map(io => {
                const Ico = iconMap[io]
                return (
                  <button key={io} onClick={() => setForm(p => ({ ...p, icon: io }))} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${form.icon === io ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-white'}`}>
                    <Ico className="w-4 h-4" />
                  </button>
                )
              })}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Route / Link</label>
            <input value={form.route} onChange={e => setForm(p => ({ ...p, route: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="/actions/birthday" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as ActionItem['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.title} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editAction ? 'Update' : 'Add'} Action</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
