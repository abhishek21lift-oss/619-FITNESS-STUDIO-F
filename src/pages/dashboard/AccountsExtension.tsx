import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarPlus, Calendar, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Extension {
  id: number
  date: string
  member: string
  plan: string
  extendedTo: string
  daysAdded: number
  staff: string
}

const initialData: Extension[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', plan: 'Annual Gold', extendedTo: '06 Aug 2027', daysAdded: 60, staff: 'Amit' },
  { id: 2, date: '06 Jun 2026', member: 'Priya Singh', plan: 'Monthly Premium', extendedTo: '05 Sep 2026', daysAdded: 30, staff: 'Neha' },
  { id: 3, date: '05 Jun 2026', member: 'Sneha Patel', plan: 'Quarterly Basic', extendedTo: '30 Sep 2026', daysAdded: 45, staff: 'Ravi' },
  { id: 4, date: '04 Jun 2026', member: 'Amit Verma', plan: 'Annual Platinum', extendedTo: '14 Aug 2027', daysAdded: 90, staff: 'Amit' },
  { id: 5, date: '03 Jun 2026', member: 'Deepak Yadav', plan: 'Monthly Basic', extendedTo: '05 Aug 2026', daysAdded: 15, staff: 'Neha' },
]

export default function AccountsExtension() {
  const [data, setData] = useState<Extension[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Extension | null>(null)
  const [form, setForm] = useState({ date: '', member: '', plan: '', extendedTo: '', daysAdded: '', staff: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalDays = data.reduce((s, d) => s + d.daysAdded, 0)

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', plan: '', extendedTo: '', daysAdded: '', staff: '' })
    setModalOpen(true)
  }

  const openEdit = (item: Extension) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, plan: item.plan, extendedTo: item.extendedTo, daysAdded: String(item.daysAdded), staff: item.staff })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.extendedTo) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, daysAdded: Number(form.daysAdded) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, plan: form.plan, extendedTo: form.extendedTo, daysAdded: Number(form.daysAdded), staff: form.staff }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Plan', 'Extended To', 'Days Added', 'Staff']
    const rows = filtered.map(d => [d.date, d.member, d.plan, d.extendedTo, String(d.daysAdded), d.staff])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `extensions-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Plan Extensions</h1><p className="text-xs text-apple-gray-500 mt-0.5">Membership extension records.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Extension
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatsCard label="Extensions" value={data.length} icon={CalendarPlus} color="from-green-500/20 to-green-600/5" border="border-green-500/30" text="text-green-400" />
        <StatsCard label="Total Days Added" value={totalDays} icon={Calendar} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark]" />
          <span className="text-[10px] text-apple-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark]" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Extended To</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Days Added</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Staff</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.plan}</td>
                  <td className="px-4 py-3 text-xs text-emerald-400">{d.extendedTo}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-green-400">+{d.daysAdded}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.staff}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Extension' : 'Add Extension'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Days Added</label>
              <input type="number" value={form.daysAdded} onChange={e => setForm(prev => ({ ...prev, daysAdded: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Member</label>
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Plan</label>
              <input value={form.plan} onChange={e => setForm(prev => ({ ...prev, plan: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Staff</label>
              <input value={form.staff} onChange={e => setForm(prev => ({ ...prev, staff: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Extended To</label>
            <input type="date" value={form.extendedTo} onChange={e => setForm(prev => ({ ...prev, extendedTo: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Extension'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
