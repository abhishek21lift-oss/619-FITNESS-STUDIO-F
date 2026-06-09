import { useState } from 'react'
import { motion } from 'framer-motion'
import { Repeat, DollarSign, CheckCircle, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Recurring {
  id: number
  member: string
  plan: string
  amount: number
  frequency: string
  nextDate: string
  status: 'Active' | 'Paused' | 'Cancelled'
}

const initialData: Recurring[] = [
  { id: 1, member: 'Rahul Sharma', plan: 'Annual Gold', amount: 7999, frequency: 'Yearly', nextDate: '07 Jun 2027', status: 'Active' },
  { id: 2, member: 'Priya Singh', plan: 'Monthly Premium', amount: 1999, frequency: 'Monthly', nextDate: '07 Jul 2026', status: 'Active' },
  { id: 3, member: 'Sneha Patel', plan: 'Quarterly Basic', amount: 3500, frequency: 'Quarterly', nextDate: '06 Sep 2026', status: 'Paused' },
  { id: 4, member: 'Amit Verma', plan: 'Monthly Basic', amount: 999, frequency: 'Monthly', nextDate: '10 Jul 2026', status: 'Active' },
  { id: 5, member: 'Deepak Yadav', plan: 'Annual Platinum', amount: 14999, frequency: 'Yearly', nextDate: '15 May 2027', status: 'Cancelled' },
]

export default function AccountsRecurring() {
  const [data, setData] = useState<Recurring[]>(initialData)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Recurring | null>(null)
  const [form, setForm] = useState({ member: '', plan: '', amount: '', frequency: 'Monthly', nextDate: '', status: 'Active' as Recurring['status'] })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalMonthly = data.filter(d => d.status === 'Active').reduce((s, d) => {
    if (d.frequency === 'Monthly') return s + d.amount
    if (d.frequency === 'Yearly') return s + d.amount / 12
    if (d.frequency === 'Quarterly') return s + d.amount / 3
    return s
  }, 0)
  const activeCount = data.filter(d => d.status === 'Active').length

  const openAdd = () => {
    setEditItem(null)
    setForm({ member: '', plan: '', amount: '', frequency: 'Monthly', nextDate: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (item: Recurring) => {
    setEditItem(item)
    setForm({ member: item.member, plan: item.plan, amount: String(item.amount), frequency: item.frequency, nextDate: item.nextDate, status: item.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.amount) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, amount: Number(form.amount) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, member: form.member, plan: form.plan, amount: Number(form.amount), frequency: form.frequency, nextDate: form.nextDate, status: form.status }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Member', 'Plan', 'Amount', 'Frequency', 'Next Date', 'Status']
    const rows = filtered.map(d => [d.member, d.plan, `₹${d.amount}`, d.frequency, d.nextDate, d.status])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `recurring-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Recurring Payments</h1><p className="text-xs text-apple-gray-500 mt-0.5">Subscription billing schedules.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Recurring
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Monthly Recurring Rev" value={fmt(totalMonthly)} icon={DollarSign} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Active Subscriptions" value={activeCount} icon={CheckCircle} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Total Plans" value={data.length} icon={Repeat} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search recurring..." />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Frequency</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Next Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.plan}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-400">{fmt(d.amount)}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.frequency}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.nextDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                      d.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                      d.status === 'Paused' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                      'text-red-400 bg-red-500/10 border-red-500/20'
                    }`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'Edit', onClick: () => openEdit(d) },
                      { label: 'Pause/Resume', onClick: () => {} },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Recurring' : 'Add Recurring'} size="md">
        <div className="space-y-4">
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
              <label className="text-[11px] font-medium text-apple-gray-400">Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Frequency</label>
              <select value={form.frequency} onChange={e => setForm(prev => ({ ...prev, frequency: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Monthly</option><option>Quarterly</option><option>Yearly</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as Recurring['status'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Paused</option><option>Cancelled</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Next Date</label>
            <input type="date" value={form.nextDate} onChange={e => setForm(prev => ({ ...prev, nextDate: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Recurring'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
