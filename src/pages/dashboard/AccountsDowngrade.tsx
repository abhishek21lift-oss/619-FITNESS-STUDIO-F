import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, DollarSign, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Downgrade {
  id: number
  date: string
  member: string
  fromPlan: string
  toPlan: string
  diffAmount: number
  staff: string
}

const initialData: Downgrade[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', fromPlan: 'Annual Platinum', toPlan: 'Annual Gold', diffAmount: -7000, staff: 'Amit' },
  { id: 2, date: '06 Jun 2026', member: 'Priya Singh', fromPlan: 'Monthly Premium', toPlan: 'Monthly Basic', diffAmount: -1000, staff: 'Neha' },
  { id: 3, date: '05 Jun 2026', member: 'Sneha Patel', fromPlan: 'Quarterly Premium', toPlan: 'Quarterly Basic', diffAmount: -2000, staff: 'Ravi' },
  { id: 4, date: '04 Jun 2026', member: 'Amit Verma', fromPlan: 'Annual Gold', toPlan: 'Monthly Premium', diffAmount: -6000, staff: 'Amit' },
  { id: 5, date: '03 Jun 2026', member: 'Deepak Yadav', fromPlan: 'Monthly Premium', toPlan: 'Monthly Basic', diffAmount: -1000, staff: 'Neha' },
]

export default function AccountsDowngrade() {
  const [data, setData] = useState<Downgrade[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Downgrade | null>(null)
  const [form, setForm] = useState({ date: '', member: '', fromPlan: '', toPlan: '', diffAmount: '', staff: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalDowngrade = data.reduce((s, d) => s + Math.abs(d.diffAmount), 0)

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', fromPlan: '', toPlan: '', diffAmount: '', staff: '' })
    setModalOpen(true)
  }

  const openEdit = (item: Downgrade) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, fromPlan: item.fromPlan, toPlan: item.toPlan, diffAmount: String(Math.abs(item.diffAmount)), staff: item.staff })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.fromPlan || !form.toPlan) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, diffAmount: -Math.abs(Number(form.diffAmount)) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, fromPlan: form.fromPlan, toPlan: form.toPlan, diffAmount: -Math.abs(Number(form.diffAmount)), staff: form.staff }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'From Plan', 'To Plan', 'Diff Amount', 'Staff']
    const rows = filtered.map(d => [d.date, d.member, d.fromPlan, d.toPlan, `-₹${Math.abs(d.diffAmount)}`, d.staff])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `downgrades-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Plan Downgrades</h1><p className="text-xs text-gray-500 mt-0.5">Members who downgraded their plans.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Downgrade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatsCard label="Downgrades" value={data.length} icon={TrendingDown} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Revenue Lost" value={fmt(totalDowngrade)} icon={DollarSign} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">From Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">To Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Diff Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Staff</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.fromPlan}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.toPlan}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-400">-{fmt(Math.abs(d.diffAmount))}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Downgrade' : 'Add Downgrade'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Diff Amount (₹)</label>
              <input type="number" value={form.diffAmount} onChange={e => setForm(prev => ({ ...prev, diffAmount: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Member</label>
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">From Plan</label>
              <input value={form.fromPlan} onChange={e => setForm(prev => ({ ...prev, fromPlan: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">To Plan</label>
              <input value={form.toPlan} onChange={e => setForm(prev => ({ ...prev, toPlan: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Staff</label>
            <input value={form.staff} onChange={e => setForm(prev => ({ ...prev, staff: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Downgrade'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
