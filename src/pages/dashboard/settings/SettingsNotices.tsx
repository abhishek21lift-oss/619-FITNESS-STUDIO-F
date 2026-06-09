import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Plus, Edit3, Trash2, Pin, PinOff } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface Notice {
  id: number
  title: string
  content: string
  date: string
  status: 'Active' | 'Inactive'
  priority: 'High' | 'Medium' | 'Low'
  pinned: boolean
}

const initialNotices: Notice[] = [
  { id: 1, title: 'Gym Closed on 15th June', content: 'The gym will remain closed for maintenance on 15th June 2026.', date: '07 Jun 2026', status: 'Active', priority: 'High', pinned: true },
  { id: 2, title: 'New Batch Schedule', content: 'Evening HIIT batch timings changed to 5:30 PM - 6:30 PM.', date: '05 Jun 2026', status: 'Active', priority: 'Medium', pinned: false },
  { id: 3, title: 'Annual Maintenance Fee', content: 'Annual maintenance fee of ₹2,000 is due for all members by 30th June.', date: '01 Jun 2026', status: 'Active', priority: 'High', pinned: true },
  { id: 4, title: 'Diwali Celebration Event', content: 'Join us for the Diwali celebration on 7th Nov. Special fun activities planned!', date: '28 May 2026', status: 'Inactive', priority: 'Low', pinned: false },
]

const priorityColors: Record<string, string> = {
  High: 'text-red-400 bg-red-500/10 border-red-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low: 'text-[#007AFF] bg-blue-500/10 border-blue-500/20',
}

export default function SettingsNotices() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices)
  const [modalOpen, setModalOpen] = useState(false)
  const [editNotice, setEditNotice] = useState<Notice | null>(null)
  const [form, setForm] = useState({ title: '', content: '', priority: 'Medium' as Notice['priority'], status: 'Active' as Notice['status'], publishDate: '' })

  const sorted = [...notices].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  const openAdd = () => {
    setEditNotice(null)
    setForm({ title: '', content: '', priority: 'Medium', status: 'Active', publishDate: '' })
    setModalOpen(true)
  }

  const openEdit = (n: Notice) => {
    setEditNotice(n)
    setForm({ title: n.title, content: n.content, priority: n.priority, status: n.status, publishDate: n.date })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editNotice) {
      setNotices(prev => prev.map(n => n.id === editNotice.id ? { ...n, ...form, date: form.publishDate || n.date } : n))
    } else {
      setNotices(prev => [...prev, { ...form, id: Date.now(), date: form.publishDate || 'Just now', pinned: false }])
    }
    setModalOpen(false)
  }

  const togglePin = (id: number) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))
  }

  const toggleStatus = (id: number) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, status: n.status === 'Active' ? 'Inactive' : 'Active' } : n))
  }

  const removeNotice = (id: number) => {
    setNotices(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Notices & Rules</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage gym notices and house rules.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Notice</button>
      </div>

      <div className="space-y-3">
        {sorted.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`rounded-xl border bg-white/[0.02] p-4 ${n.pinned ? 'border-ydl-yellow/30' : 'border-apple-gray-200'}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {n.pinned ? <Pin className="w-4 h-4 text-apple-blue flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 text-apple-gray-500 flex-shrink-0" />}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold text-[#1C1C1E]">{n.title}</h3>
                      <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded-full border ${priorityColors[n.priority]}`}>{n.priority}</span>
                    </div>
                    <p className="text-[10px] text-apple-gray-500 mt-0.5">{n.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 ml-6">
                  <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded-md ${n.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-apple-gray-400 bg-gray-500/10'}`}>{n.status}</span>
                  <span className="text-[9px] text-apple-gray-400">{n.date}</span>
                </div>
              </div>
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(n) },
                { label: n.pinned ? 'Unpin' : 'Pin', icon: n.pinned ? PinOff : Pin, onClick: () => togglePin(n.id), color: n.pinned ? 'text-amber-400' : 'text-apple-blue' },
                { label: n.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => toggleStatus(n.id), color: n.status === 'Active' ? 'text-red-400' : 'text-emerald-400' },
                { label: 'Delete', icon: Trash2, onClick: () => removeNotice(n.id), color: 'text-red-400' },
              ]} />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editNotice ? 'Edit Notice' : 'Add Notice'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Title</label>
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Notice title" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Content</label>
            <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={3} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Priority</label>
              <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as Notice['priority'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Notice['status'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Publish Date</label>
              <input type="date" value={form.publishDate} onChange={e => setForm(p => ({ ...p, publishDate: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.title || !form.content} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editNotice ? 'Update' : 'Add'} Notice</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
