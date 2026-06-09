import { useState } from 'react'
import { motion } from 'framer-motion'
import { Snowflake, Calendar, Users, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface FreezeEntry {
  id: number
  date: string
  member: string
  plan: string
  freezeStart: string
  freezeEnd: string
  days: number
  staff: string
}

const initialData: FreezeEntry[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', plan: 'Annual Gold', freezeStart: '10 Jun 2026', freezeEnd: '20 Jun 2026', days: 10, staff: 'Amit' },
  { id: 2, date: '06 Jun 2026', member: 'Priya Singh', plan: 'Monthly Premium', freezeStart: '15 Jun 2026', freezeEnd: '05 Jul 2026', days: 20, staff: 'Neha' },
  { id: 3, date: '05 Jun 2026', member: 'Sneha Patel', plan: 'Quarterly Premium', freezeStart: '01 Jul 2026', freezeEnd: '15 Jul 2026', days: 15, staff: 'Ravi' },
  { id: 4, date: '04 Jun 2026', member: 'Amit Verma', plan: 'Annual Platinum', freezeStart: '20 Jun 2026', freezeEnd: '20 Jul 2026', days: 30, staff: 'Amit' },
  { id: 5, date: '03 Jun 2026', member: 'Deepak Yadav', plan: 'Monthly Basic', freezeStart: '05 Jun 2026', freezeEnd: '15 Jun 2026', days: 10, staff: 'Neha' },
]

export default function AccountsFreeze() {
  const [data, setData] = useState<FreezeEntry[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<FreezeEntry | null>(null)
  const [form, setForm] = useState({ date: '', member: '', plan: '', freezeStart: '', freezeEnd: '', days: '', staff: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalDays = data.reduce((s, d) => s + d.days, 0)

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', plan: '', freezeStart: '', freezeEnd: '', days: '', staff: '' })
    setModalOpen(true)
  }

  const openEdit = (item: FreezeEntry) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, plan: item.plan, freezeStart: item.freezeStart, freezeEnd: item.freezeEnd, days: String(item.days), staff: item.staff })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.freezeStart) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, days: Number(form.days) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, plan: form.plan, freezeStart: form.freezeStart, freezeEnd: form.freezeEnd, days: Number(form.days), staff: form.staff }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Plan', 'Freeze Start', 'Freeze End', 'Days', 'Staff']
    const rows = filtered.map(d => [d.date, d.member, d.plan, d.freezeStart, d.freezeEnd, String(d.days), d.staff])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `freezes-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Freeze Records</h1><p className="text-xs text-gray-500 mt-0.5">Membership freeze/pause records.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Freeze
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatsCard label="Freezes" value={data.length} icon={Snowflake} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Total Freeze Days" value={totalDays} icon={Calendar} color="from-cyan-500/20 to-cyan-600/5" border="border-cyan-500/30" text="text-cyan-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search..." />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Freeze Start</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Freeze End</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Days</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Staff</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.plan}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.freezeStart}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.freezeEnd}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-cyan-400">{d.days}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.staff}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Freeze' : 'Add Freeze'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Days</label>
              <input type="number" value={form.days} onChange={e => setForm(prev => ({ ...prev, days: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Member</label>
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Plan</label>
              <input value={form.plan} onChange={e => setForm(prev => ({ ...prev, plan: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Staff</label>
              <input value={form.staff} onChange={e => setForm(prev => ({ ...prev, staff: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Freeze Start</label>
              <input type="date" value={form.freezeStart} onChange={e => setForm(prev => ({ ...prev, freezeStart: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Freeze End</label>
              <input type="date" value={form.freezeEnd} onChange={e => setForm(prev => ({ ...prev, freezeEnd: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Freeze'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
