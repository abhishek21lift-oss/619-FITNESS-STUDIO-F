import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Plus, Calendar, Edit3, Trash2, List, Grid3X3 } from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import ActionMenu from '../../../components/shared/ActionMenu'

interface Holiday {
  id: number
  name: string
  date: string
  day: string
  type: 'Public' | 'Closed' | 'Optional'
  status: 'Active' | 'Inactive'
}

const initialHolidays: Holiday[] = [
  { id: 1, name: 'Independence Day', date: '2026-08-15', day: 'Saturday', type: 'Public', status: 'Active' },
  { id: 2, name: 'Raksha Bandhan', date: '2026-08-28', day: 'Friday', type: 'Optional', status: 'Active' },
  { id: 3, name: 'Diwali', date: '2026-11-07', day: 'Saturday', type: 'Closed', status: 'Active' },
  { id: 4, name: 'Christmas', date: '2026-12-25', day: 'Friday', type: 'Public', status: 'Active' },
  { id: 5, name: 'Republic Day', date: '2027-01-26', day: 'Tuesday', type: 'Public', status: 'Active' },
  { id: 6, name: 'Holi', date: '2026-03-24', day: 'Tuesday', type: 'Closed', status: 'Inactive' },
]

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function SettingsHoliday() {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays)
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [modalOpen, setModalOpen] = useState(false)
  const [editHoliday, setEditHoliday] = useState<Holiday | null>(null)
  const [form, setForm] = useState({ name: '', date: '', type: 'Public' as Holiday['type'], status: 'Active' as Holiday['status'] })

  const openAdd = () => {
    setEditHoliday(null)
    setForm({ name: '', date: '', type: 'Public', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (h: Holiday) => {
    setEditHoliday(h)
    setForm({ name: h.name, date: h.date, type: h.type, status: h.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    const dateObj = new Date(form.date)
    const day = dayNames[dateObj.getDay()]
    if (editHoliday) {
      setHolidays(prev => prev.map(h => h.id === editHoliday.id ? { ...h, ...form, day } : h))
    } else {
      setHolidays(prev => [...prev, { ...form, id: Date.now(), day }])
    }
    setModalOpen(false)
  }

  const removeHoliday = (id: number) => {
    setHolidays(prev => prev.filter(h => h.id !== id))
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const activeCount = holidays.filter(h => h.status === 'Active').length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Holiday Management</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Set gym holidays and off days. ({activeCount} active)</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/[0.03] rounded-lg border border-apple-gray-200">
            <button onClick={() => setView('list')} className={`p-1.5 ${view === 'list' ? 'text-apple-blue bg-apple-blue/10' : 'text-apple-gray-500'} rounded-l-lg`}><List className="w-3.5 h-3.5" /></button>
            <button onClick={() => setView('calendar')} className={`p-1.5 ${view === 'calendar' ? 'text-apple-blue bg-apple-blue/10' : 'text-apple-gray-500'} rounded-r-lg`}><Grid3X3 className="w-3.5 h-3.5" /></button>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Holiday</button>
        </div>
      </div>

      {view === 'list' ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Holiday</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Day</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {holidays.map((h, i) => (
                <motion.tr key={h.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Sun className="w-3.5 h-3.5 text-apple-blue" /><span className="text-xs font-medium text-[#1C1C1E]">{h.name}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-apple-gray-500" /><span className="text-xs text-apple-gray-400">{formatDate(h.date)}</span></div></td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{h.day}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      h.type === 'Closed' ? 'text-red-400 bg-red-500/10' : h.type === 'Public' ? 'text-[#007AFF] bg-blue-500/10' : 'text-amber-400 bg-amber-500/10'
                    }`}>{h.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${h.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-apple-gray-400 bg-gray-500/10'}`}>{h.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu actions={[
                      { label: 'Edit', icon: Edit3, onClick: () => openEdit(h) },
                      { label: h.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => setHolidays(prev => prev.map(hh => hh.id === h.id ? { ...hh, status: hh.status === 'Active' ? 'Inactive' : 'Active' } : hh)), color: h.status === 'Active' ? 'text-red-400' : 'text-emerald-400' },
                      { label: 'Delete', icon: Trash2, onClick: () => removeHoliday(h.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-[10px] font-medium text-apple-gray-500 py-2">{d}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1
              const monthHolidays = holidays.filter(h => {
                const d = new Date(h.date)
                return d.getMonth() === 5 && d.getDate() === day
              })
              return (
                <div key={i} className={`min-h-[60px] rounded-lg p-1 text-[10px] ${monthHolidays.length ? 'bg-apple-blue/10 border border-ydl-yellow/20' : 'bg-white/[0.02] border border-apple-gray-200/30'}`}>
                  <span className="text-apple-gray-500">{day}</span>
                  {monthHolidays.map(h => (
                    <div key={h.id} className="text-[8px] text-apple-blue truncate mt-0.5">{h.name}</div>
                  ))}
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editHoliday ? 'Edit Holiday' : 'Add Holiday'} size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Occasion Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Holiday name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as Holiday['type'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Public</option><option>Closed</option><option>Optional</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Holiday['status'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name || !form.date} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editHoliday ? 'Update' : 'Add'} Holiday</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

