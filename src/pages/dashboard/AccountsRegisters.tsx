import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, ArrowUpRight, ArrowDownRight, Plus, Search, Download, FileText } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Entry {
  id: number
  date: string
  description: string
  type: 'Income' | 'Expense'
  amount: number
  paymentMethod: string
  note: string
}

const initialEntries: Entry[] = [
  { id: 1, date: '07 Jun 2026', description: 'Membership - Rahul Sharma', type: 'Income', amount: 7999, paymentMethod: 'UPI', note: 'Annual Gold payment' },
  { id: 2, date: '07 Jun 2026', description: 'PT Session - Priya Singh', type: 'Income', amount: 1500, paymentMethod: 'Cash', note: 'Single PT session' },
  { id: 3, date: '06 Jun 2026', description: 'Electricity Bill', type: 'Expense', amount: 12000, paymentMethod: 'Bank Transfer', note: 'June bill' },
  { id: 4, date: '06 Jun 2026', description: 'Membership - Sneha Patel', type: 'Income', amount: 14999, paymentMethod: 'Card', note: 'Annual Platinum' },
  { id: 5, date: '05 Jun 2026', description: 'Staff Salary', type: 'Expense', amount: 45000, paymentMethod: 'Bank Transfer', note: 'June salaries' },
  { id: 6, date: '05 Jun 2026', description: 'Equipment Purchase', type: 'Expense', amount: 18000, paymentMethod: 'UPI', note: 'Dumbbell set' },
]

const paymentMethods = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']

export default function AccountsRegisters() {
  const [entries, setEntries] = useState<Entry[]>(initialEntries)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editEntry, setEditEntry] = useState<Entry | null>(null)
  const [form, setForm] = useState({ date: '', description: '', type: 'Income' as 'Income' | 'Expense', amount: '', paymentMethod: 'Cash', note: '' })

  const filtered = entries.filter(e => {
    if (typeFilter !== 'All' && e.type !== typeFilter) return false
    if (search && !e.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalIncome = entries.filter(e => e.type === 'Income').reduce((sum, e) => sum + e.amount, 0)
  const totalExpense = entries.filter(e => e.type === 'Expense').reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpense

  const openAdd = () => {
    setEditEntry(null)
    setForm({ date: new Date().toISOString().split('T')[0], description: '', type: 'Income', amount: '', paymentMethod: 'Cash', note: '' })
    setModalOpen(true)
  }

  const openEdit = (e: Entry) => {
    setEditEntry(e)
    setForm({ date: e.date, description: e.description, type: e.type, amount: String(e.amount), paymentMethod: e.paymentMethod, note: e.note })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.description || !form.amount) return
    if (editEntry) {
      setEntries(prev => prev.map(e => e.id === editEntry.id ? { ...e, date: form.date, description: form.description, type: form.type, amount: Number(form.amount), paymentMethod: form.paymentMethod, note: form.note } : e))
    } else {
      const newId = Math.max(...entries.map(e => e.id)) + 1
      setEntries(prev => [...prev, { id: newId, date: form.date, description: form.description, type: form.type, amount: Number(form.amount), paymentMethod: form.paymentMethod, note: form.note }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Type', 'Amount', 'Payment Method', 'Note']
    const rows = filtered.map(e => [e.date, e.description, e.type, `₹${e.amount}`, e.paymentMethod, e.note])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `accounts-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Account Registers</h1><p className="text-xs text-gray-500 mt-0.5">General ledger and accounting entries.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Income" value={fmt(totalIncome)} icon={ArrowUpRight} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Total Expense" value={fmt(totalExpense)} icon={ArrowDownRight} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Balance" value={fmt(balance)} icon={DollarSign} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search entries..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
          <span className="text-[10px] text-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-ydl-dark-border bg-white/[0.02] p-0.5">
          {(['All', 'Income', 'Expense'] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${typeFilter === t ? 'text-black bg-ydl-gradient' : 'text-gray-400 hover:text-white'}`}>{t}</button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Payment Method</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{e.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{e.description}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${e.type === 'Income' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                      {e.type === 'Income' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {e.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-xs font-semibold ${e.type === 'Income' ? 'text-emerald-400' : 'text-red-400'}`}>{fmt(e.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.paymentMethod}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label="Actions"
                      actions={[
                        { label: 'Edit', onClick: () => openEdit(e) },
                        { label: 'View Receipt', onClick: () => alert(`Receipt for ${e.description} — ${fmt(e.amount)} (${e.paymentMethod})`), icon: FileText },
                        { label: 'Delete', onClick: () => handleDelete(e.id), color: 'text-red-400' },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editEntry ? 'Edit Entry' : 'Add Entry'} size="md">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {(['Income', 'Expense'] as const).map(t => (
              <label key={t} className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg cursor-pointer border transition-colors ${form.type === t ? (t === 'Income' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-red-400 bg-red-500/10 border-red-500/30') : 'text-gray-400 bg-white/5 border-ydl-dark-border hover:text-white'}`}>
                <input type="radio" name="type" checked={form.type === t} onChange={() => setForm(prev => ({ ...prev, type: t }))} className="w-3.5 h-3.5 accent-ydl-yellow" />
                {t === 'Income' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {t}
              </label>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Description</label>
            <input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Enter description..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Payment Method</label>
              <select value={form.paymentMethod} onChange={e => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                {paymentMethods.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Note (optional)</label>
            <textarea value={form.note} onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Additional notes..." />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editEntry ? 'Update Entry' : 'Add Entry'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
