import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Download, FileText, Image, Filter } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { useToast } from '../../components/ui/Toast'

interface Expense {
  id: number
  date: string
  category: string
  description: string
  amount: number
  paymentMethod: string
  note: string
  hasBill: boolean
}

const initialExpenses: Expense[] = [
  { id: 1, date: '07 Jun 2026', category: 'Utilities', description: 'Electricity Bill - June', amount: 12000, paymentMethod: 'UPI', note: 'Bill ID: ELEC-001', hasBill: true },
  { id: 2, date: '06 Jun 2026', category: 'Rent', description: 'Office Rent - June', amount: 40000, paymentMethod: 'Bank Transfer', note: 'Landlord: Mr. Sharma', hasBill: true },
  { id: 3, date: '05 Jun 2026', category: 'Equipment', description: 'Dumbbell Set (10kg x 4)', amount: 8500, paymentMethod: 'Cash', note: 'From Fitness Store', hasBill: false },
  { id: 4, date: '04 Jun 2026', category: 'Marketing', description: 'Instagram Ads - May', amount: 5000, paymentMethod: 'Card', note: 'Campaign ID: IG-0526', hasBill: true },
  { id: 5, date: '03 Jun 2026', category: 'Supplies', description: 'Cleaning Supplies', amount: 2400, paymentMethod: 'Cash', note: 'Monthly supplies', hasBill: false },
  { id: 6, date: '02 Jun 2026', category: 'Utilities', description: 'Water Bill - June', amount: 3500, paymentMethod: 'UPI', note: '', hasBill: true },
  { id: 7, date: '01 Jun 2026', category: 'Maintenance', description: 'AC Service', amount: 6000, paymentMethod: 'Cash', note: '3 AC units serviced', hasBill: false },
]

const categoryOptions = ['All Categories', 'Utilities', 'Rent', 'Equipment', 'Marketing', 'Supplies', 'Maintenance', 'Salary', 'Insurance', 'Miscellaneous']
const paymentOptions = ['All Methods', 'Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']

export default function AccountsExpense() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [paymentFilter, setPaymentFilter] = useState('All Methods')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editExpense, setEditExpense] = useState<Expense | null>(null)
  const [form, setForm] = useState({ date: '', category: 'Utilities', description: '', amount: '', paymentMethod: 'Cash', note: '' })
  const { toast } = useToast()

  const filtered = expenses.filter(e => {
    if (categoryFilter !== 'All Categories' && e.category !== categoryFilter) return false
    if (paymentFilter !== 'All Methods' && e.paymentMethod !== paymentFilter) return false
    if (search && !e.description.toLowerCase().includes(search.toLowerCase()) && !e.category.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0)
  const thisMonthExpense = expenses.filter(e => e.date.startsWith('Jun')).reduce((sum, e) => sum + e.amount, 0)
  const categoriesCount = new Set(expenses.map(e => e.category)).size

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  const openAdd = () => {
    setEditExpense(null)
    setForm({ date: new Date().toISOString().split('T')[0], category: 'Utilities', description: '', amount: '', paymentMethod: 'Cash', note: '' })
    setModalOpen(true)
  }

  const openEdit = (e: Expense) => {
    setEditExpense(e)
    setForm({ date: e.date, category: e.category, description: e.description, amount: String(e.amount), paymentMethod: e.paymentMethod, note: e.note })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.description || !form.amount) return
    if (editExpense) {
      setExpenses(prev => prev.map(e => e.id === editExpense.id ? { ...e, date: form.date, category: form.category, description: form.description, amount: Number(form.amount), paymentMethod: form.paymentMethod, note: form.note } : e))
    } else {
      const newId = Math.max(...expenses.map(e => e.id)) + 1
      setExpenses(prev => [...prev, { id: newId, date: form.date, category: form.category, description: form.description, amount: Number(form.amount), paymentMethod: form.paymentMethod, note: form.note, hasBill: false }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const exportData = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount', 'Payment Method', 'Note']
    const rows = filtered.map(e => [e.date, e.category, e.description, `₹${e.amount}`, e.paymentMethod, e.note])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Expense Tracking</h1><p className="text-xs text-gray-500 mt-0.5">Log and manage all business expenses.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportData} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Expense" value={fmt(totalExpense)} icon={FileText} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="This Month" value={fmt(thisMonthExpense)} icon={Filter} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
        <StatsCard label="Categories" value={categoriesCount} icon={Image} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
      </div>

      <FilterBar>
        <FilterField label="Search">
          <input value={search} onChange={e => setSearch(e.target.value)} className="h-7 px-2.5 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/30" placeholder="Search expenses..." />
        </FilterField>
        <FilterField label="Category">
          <FilterSelect options={categoryOptions} value={categoryFilter} onChange={(e: any) => setCategoryFilter(e.target.value)} />
        </FilterField>
        <FilterField label="Payment Method">
          <FilterSelect options={paymentOptions} value={paymentFilter} onChange={(e: any) => setPaymentFilter(e.target.value)} />
        </FilterField>
        <FilterField label="From">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="h-7 px-2.5 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30 [color-scheme:dark]" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="h-7 px-2.5 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30 [color-scheme:dark]" />
        </FilterField>
      </FilterBar>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Payment</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Bill</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{e.date}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-medium text-gray-300 bg-white/5 px-2 py-0.5 rounded-md">{e.category}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-white">{e.description}
                    {e.note && <span className="text-[9px] text-gray-600 block">{e.note}</span>}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-400">{fmt(e.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.paymentMethod}</td>
                  <td className="px-4 py-3">
                    {e.hasBill ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md"><Image className="w-3 h-3" />Attached</span>
                    ) : (
                      <span className="text-[10px] text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label="Actions"
                      actions={[
                        { label: 'Edit', onClick: () => openEdit(e), icon: Edit3 },
                        { label: 'View Bill', onClick: () => toast(e.hasBill ? `Viewing bill for: ${e.description}` : 'No bill attached', 'info'), icon: FileText },
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editExpense ? 'Edit Expense' : 'Add Expense'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                {categoryOptions.filter(c => c !== 'All Categories').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Description</label>
            <input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Enter expense description..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Payment Method</label>
              <select value={form.paymentMethod} onChange={e => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option><option>Cheque</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Bill/Receipt Upload</label>
            <div className="border-2 border-dashed border-ydl-dark-border rounded-lg p-4 text-center cursor-pointer hover:border-ydl-yellow/30 transition-colors">
              <Image className="w-6 h-6 text-gray-500 mx-auto mb-1" />
              <p className="text-[10px] text-gray-500">Click to upload bill/receipt</p>
              <p className="text-[9px] text-gray-600">PDF, JPG or PNG (max 5MB)</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Note (optional)</label>
            <textarea value={form.note} onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Additional notes..." />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editExpense ? 'Update Expense' : 'Add Expense'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
