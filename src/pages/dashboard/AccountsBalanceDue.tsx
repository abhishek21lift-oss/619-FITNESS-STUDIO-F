import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, Users, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface BalanceDue {
  id: number
  member: string
  plan: string
  dueAmount: number
  dueDate: string
  daysOverdue: number
  lastPayment: string
}

const initialData: BalanceDue[] = [
  { id: 1, member: 'Amit Verma', plan: 'Quarterly Basic', dueAmount: 3500, dueDate: '31 Mar 2026', daysOverdue: 68, lastPayment: '01 Jan 2026' },
  { id: 2, member: 'Deepak Yadav', plan: 'Monthly Premium', dueAmount: 1999, dueDate: '19 Mar 2026', daysOverdue: 80, lastPayment: '20 Feb 2026' },
  { id: 3, member: 'Neha Kapoor', plan: 'Annual Gold', dueAmount: 7999, dueDate: '14 Dec 2025', daysOverdue: 175, lastPayment: '15 Dec 2024' },
  { id: 4, member: 'Rohan Gupta', plan: 'Monthly Basic', dueAmount: 999, dueDate: '09 Apr 2026', daysOverdue: 60, lastPayment: '10 Mar 2026' },
  { id: 5, member: 'Pooja Mehta', plan: 'Quarterly Premium', dueAmount: 5500, dueDate: '04 May 2026', daysOverdue: 35, lastPayment: '05 Feb 2026' },
]

export default function AccountsBalanceDue() {
  const [data, setData] = useState<BalanceDue[]>(initialData)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ member: '', plan: '', dueAmount: '', dueDate: '', daysOverdue: '', lastPayment: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalDue = data.reduce((s, d) => s + d.dueAmount, 0)
  const totalOverdue = data.reduce((s, d) => s + d.daysOverdue, 0)

  const openAdd = () => {
    setForm({ member: '', plan: '', dueAmount: '', dueDate: '', daysOverdue: '', lastPayment: '' })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member) return
    setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, member: form.member, plan: form.plan, dueAmount: Number(form.dueAmount), dueDate: form.dueDate, daysOverdue: Number(form.daysOverdue), lastPayment: form.lastPayment }])
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Member', 'Plan', 'Due Amount', 'Due Date', 'Days Overdue', 'Last Payment']
    const rows = filtered.map(d => [d.member, d.plan, `₹${d.dueAmount}`, d.dueDate, String(d.daysOverdue), d.lastPayment])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `balance-due-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Balance Due</h1><p className="text-xs text-apple-gray-500 mt-0.5">Members with outstanding dues.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Due
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Dues" value={fmt(totalDue)} icon={DollarSign} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Members in Arrears" value={data.length} icon={Users} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" />
        <StatsCard label="Avg Overdue (Days)" value={data.length ? Math.round(totalOverdue / data.length) : 0} icon={Calendar} color="from-yellow-500/20 to-yellow-600/5" border="border-yellow-500/30" text="text-yellow-400" />
      </div>

      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search members..." />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Due Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Due Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Days Overdue</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Last Payment</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.plan}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-400">{fmt(d.dueAmount)}</td>
                  <td className="px-4 py-3 text-xs text-red-400">{d.dueDate}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-orange-400">{d.daysOverdue}d</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.lastPayment}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'View', onClick: () => {} },
                      { label: 'Send Reminder', onClick: () => {} },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Balance Due" size="md">
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
              <label className="text-[11px] font-medium text-apple-gray-400">Due Amount (₹)</label>
              <input type="number" value={form.dueAmount} onChange={e => setForm(prev => ({ ...prev, dueAmount: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Due Date</label>
              <input type="date" value={form.dueDate} onChange={e => setForm(prev => ({ ...prev, dueDate: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Days Overdue</label>
              <input type="number" value={form.daysOverdue} onChange={e => setForm(prev => ({ ...prev, daysOverdue: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Last Payment</label>
              <input type="date" value={form.lastPayment} onChange={e => setForm(prev => ({ ...prev, lastPayment: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">Add Due</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
