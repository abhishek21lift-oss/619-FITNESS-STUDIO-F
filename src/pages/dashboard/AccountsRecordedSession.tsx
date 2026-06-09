import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Activity, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface RecordedSession {
  id: number
  date: string
  member: string
  trainer: string
  sessionType: string
  duration: number
  notes: string
}

const initialData: RecordedSession[] = [
  { id: 1, date: '07 Jun 2026', member: 'Priya Singh', trainer: 'Amit', sessionType: 'Personal Training', duration: 60, notes: 'Focus on upper body' },
  { id: 2, date: '07 Jun 2026', member: 'Rahul Sharma', trainer: 'Neha', sessionType: 'Cardio', duration: 45, notes: 'Treadmill intervals' },
  { id: 3, date: '06 Jun 2026', member: 'Sneha Patel', trainer: 'Ravi', sessionType: 'Yoga', duration: 50, notes: 'Morning stretch' },
  { id: 4, date: '05 Jun 2026', member: 'Vikram Joshi', trainer: 'Amit', sessionType: 'Strength Training', duration: 60, notes: 'Leg day' },
  { id: 5, date: '04 Jun 2026', member: 'Anita Desai', trainer: 'Neha', sessionType: 'Pilates', duration: 40, notes: 'Core workout' },
]

export default function AccountsRecordedSession() {
  const [data, setData] = useState<RecordedSession[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<RecordedSession | null>(null)
  const [form, setForm] = useState({ date: '', member: '', trainer: '', sessionType: '', duration: '', notes: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase()) && !d.trainer.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalDuration = data.reduce((s, d) => s + d.duration, 0)
  const avgDuration = data.length ? Math.round(totalDuration / data.length) : 0

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', trainer: '', sessionType: '', duration: '', notes: '' })
    setModalOpen(true)
  }

  const openEdit = (item: RecordedSession) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, trainer: item.trainer, sessionType: item.sessionType, duration: String(item.duration), notes: item.notes })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.sessionType) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, date: form.date, member: form.member, trainer: form.trainer, sessionType: form.sessionType, duration: Number(form.duration), notes: form.notes } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, trainer: form.trainer, sessionType: form.sessionType, duration: Number(form.duration), notes: form.notes }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Trainer', 'Session Type', 'Duration (min)', 'Notes']
    const rows = filtered.map(d => [d.date, d.member, d.trainer, d.sessionType, String(d.duration), d.notes])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `recorded-sessions-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Recorded Sessions</h1><p className="text-xs text-gray-500 mt-0.5">Session logs with duration and notes.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Sessions" value={data.length} icon={Activity} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Total Duration (min)" value={totalDuration} icon={Clock} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
        <StatsCard label="Avg Duration (min)" value={avgDuration} icon={Users} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search sessions..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
          <span className="text-[10px] text-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Trainer</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Session Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Duration</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Notes</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.trainer}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.sessionType}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.duration} min</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">{d.notes}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'Edit', onClick: () => openEdit(d) },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Session' : 'Add Recorded Session'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Duration (min)</label>
              <input type="number" value={form.duration} onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Member</label>
              <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Member name..." />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Trainer</label>
              <input value={form.trainer} onChange={e => setForm(prev => ({ ...prev, trainer: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Trainer name..." />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Session Type</label>
            <input value={form.sessionType} onChange={e => setForm(prev => ({ ...prev, sessionType: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Personal Training, Yoga..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Session notes..." />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Session'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
