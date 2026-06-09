import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightLeft, DollarSign, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Transfer {
  id: number
  date: string
  member: string
  fromPlan: string
  toPlan: string
  transferFee: number
  staff: string
}

const initialData: Transfer[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', fromPlan: 'Quarterly Basic', toPlan: 'Annual Gold', transferFee: 500, staff: 'Amit' },
  { id: 2, date: '06 Jun 2026', member: 'Priya Singh', fromPlan: 'Monthly Basic', toPlan: 'Monthly Premium', transferFee: 0, staff: 'Neha' },
  { id: 3, date: '05 Jun 2026', member: 'Sneha Patel', fromPlan: 'Annual Gold', toPlan: 'Annual Platinum', transferFee: 1000, staff: 'Ravi' },
  { id: 4, date: '04 Jun 2026', member: 'Amit Verma', fromPlan: 'Monthly Premium', toPlan: 'Quarterly Premium', transferFee: 0, staff: 'Amit' },
  { id: 5, date: '03 Jun 2026', member: 'Deepak Yadav', fromPlan: 'Basic Trial', toPlan: 'Monthly Basic', transferFee: 0, staff: 'Neha' },
]

export default function AccountsTransfer() {
  const [data, setData] = useState<Transfer[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Transfer | null>(null)
  const [form, setForm] = useState({ date: '', member: '', fromPlan: '', toPlan: '', transferFee: '', staff: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalFees = data.reduce((s, d) => s + d.transferFee, 0)

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', fromPlan: '', toPlan: '', transferFee: '', staff: '' })
    setModalOpen(true)
  }

  const openEdit = (item: Transfer) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, fromPlan: item.fromPlan, toPlan: item.toPlan, transferFee: String(item.transferFee), staff: item.staff })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.fromPlan || !form.toPlan) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, transferFee: Number(form.transferFee) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, fromPlan: form.fromPlan, toPlan: form.toPlan, transferFee: Number(form.transferFee), staff: form.staff }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'From Plan', 'To Plan', 'Transfer Fee', 'Staff']
    const rows = filtered.map(d => [d.date, d.member, d.fromPlan, d.toPlan, `₹${d.transferFee}`, d.staff])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `transfers-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Plan Transfers</h1><p className="text-xs text-apple-gray-500 mt-0.5">Member plan change records.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Transfer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatsCard label="Transfers" value={data.length} icon={ArrowRightLeft} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Total Transfer Fees" value={fmt(totalFees)} icon={DollarSign} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search transfers..." />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">From Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">To Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Transfer Fee</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Staff</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.fromPlan}</td>
                  <td className="px-4 py-3 text-xs text-emerald-400">{d.toPlan}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-purple-400">{fmt(d.transferFee)}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Transfer' : 'Add Transfer'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Transfer Fee (₹)</label>
              <input type="number" value={form.transferFee} onChange={e => setForm(prev => ({ ...prev, transferFee: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Member</label>
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">From Plan</label>
              <input value={form.fromPlan} onChange={e => setForm(prev => ({ ...prev, fromPlan: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">To Plan</label>
              <input value={form.toPlan} onChange={e => setForm(prev => ({ ...prev, toPlan: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Staff</label>
            <input value={form.staff} onChange={e => setForm(prev => ({ ...prev, staff: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Transfer'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
