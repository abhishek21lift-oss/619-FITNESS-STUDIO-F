import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, CreditCard, Home, Zap, Wifi, TrendingUp, Plus, Trash2,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const categoryOptions = ['All Categories', 'Rent', 'Utilities', 'Staff Salary', 'Equipment', 'Marketing', 'Other']

interface ExpenseItem {
  id: number
  category: string
  amount: number
  date: string
  note: string
}

const initialExpenses: ExpenseItem[] = [
  { id: 1, category: 'Rent', amount: 20000, date: '01-Jun-2026', note: 'Monthly rent' },
  { id: 2, category: 'Utilities', amount: 4000, date: '03-Jun-2026', note: 'Electricity bill' },
  { id: 3, category: 'Staff Salary', amount: 10000, date: '05-Jun-2026', note: 'June salary' },
  { id: 4, category: 'Equipment', amount: 3000, date: '10-Jun-2026', note: 'Dumbbells set' },
  { id: 5, category: 'Marketing', amount: 2000, date: '15-Jun-2026', note: 'Instagram ads' },
  { id: 6, category: 'Utilities', amount: 1500, date: '20-Jun-2026', note: 'Water bill' },
  { id: 7, category: 'Other', amount: 1200, date: '25-Jun-2026', note: 'Miscellaneous' },
]

export default function AnalysisExpense() {
  const [catFilter, setCatFilter] = useState('All Categories')
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-30')
  const [addOpen, setAddOpen] = useState(false)
  const [expenses, setExpenses] = useState(initialExpenses)

  // Add form state
  const [newCategory, setNewCategory] = useState('Rent')
  const [newAmount, setNewAmount] = useState('')
  const [newDate, setNewDate] = useState('2026-06-28')
  const [newNote, setNewNote] = useState('')

  const categories = [
    { name: 'Rent', amount: expenses.filter(e => e.category === 'Rent').reduce((s, e) => s + e.amount, 0), icon: Home },
    { name: 'Utilities', amount: expenses.filter(e => e.category === 'Utilities').reduce((s, e) => s + e.amount, 0), icon: Zap },
    { name: 'Staff Salary', amount: expenses.filter(e => e.category === 'Staff Salary').reduce((s, e) => s + e.amount, 0), icon: CreditCard },
    { name: 'Equipment', amount: expenses.filter(e => e.category === 'Equipment').reduce((s, e) => s + e.amount, 0), icon: DollarSign },
    { name: 'Marketing', amount: expenses.filter(e => e.category === 'Marketing').reduce((s, e) => s + e.amount, 0), icon: TrendingUp },
    { name: 'Other', amount: expenses.filter(e => e.category === 'Other').reduce((s, e) => s + e.amount, 0), icon: Wifi },
  ]

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0)
  const thisMonth = expenses.filter(e => e.date.includes('Jun')).reduce((s, e) => s + e.amount, 0)
  const filteredExpenses = catFilter === 'All Categories' ? expenses : expenses.filter(e => e.category === catFilter)

  const handleAdd = () => {
    if (!newAmount || parseFloat(newAmount) <= 0) return
    const exp: ExpenseItem = {
      id: Date.now(),
      category: newCategory,
      amount: parseFloat(newAmount),
      date: new Date(newDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      note: newNote || 'No note',
    }
    setExpenses([exp, ...expenses])
    setNewAmount('')
    setNewNote('')
    setAddOpen(false)
  }

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Expense Analysis</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Track and categorize business expenses.</p>
        </div>
        <button onClick={() => setAddOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-apple-blue/10 border border-ydl-yellow/30 text-apple-blue rounded-lg hover:bg-apple-blue/20 transition-all">
          <Plus className="w-3 h-3" /> Add Expense
        </button>
      </div>

      <FilterBar>
        <FilterField label="Category">
          <FilterSelect options={categoryOptions} value={catFilter} onChange={e => setCatFilter(e.target.value)} />
        </FilterField>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Expense" value={`₹ ${totalExpense.toLocaleString()}`} icon={DollarSign} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" index={0} />
        <StatsCard label="This Month" value={`₹ ${thisMonth.toLocaleString()}`} icon={CreditCard} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" index={1} />
        <StatsCard label="Budget Used" value={`${Math.round((thisMonth / 100000) * 100)}%`} icon={TrendingUp} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Category Breakdown</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#D1D5DB', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(0, 122, 255, 0.3)', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#007AFF' }} formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, 'Amount']} />
                <Bar dataKey="amount" fill="#EF4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-[#1C1C1E]">Expense Records</h2>
            <span className="text-[10px] text-apple-gray-500">{filteredExpenses.length} entries</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <Table
              columns={[
                { header: 'Category', accessor: r => r.category },
                { header: 'Amount', accessor: r => <span className="text-red-400 font-medium">₹{r.amount.toLocaleString()}</span> },
                { header: 'Date', accessor: r => r.date },
                { header: 'Note', accessor: r => <span className="text-apple-gray-500 text-[10px]">{r.note}</span> },
                { header: '', accessor: r => (
                  <button onClick={() => handleDelete(r.id)} className="text-red-400/50 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )},
              ]}
              data={filteredExpenses}
              keyExtractor={r => r.id}
            />
          </div>
        </motion.div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Expense" size="md">
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-medium text-apple-gray-500 block mb-1">Category</label>
            <FilterSelect options={['Rent', 'Utilities', 'Staff Salary', 'Equipment', 'Marketing', 'Other']} value={newCategory} onChange={e => setNewCategory(e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] font-medium text-apple-gray-500 block mb-1">Amount (₹)</label>
            <input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="0" className="w-full h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/30" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-apple-gray-500 block mb-1">Date</label>
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-apple-gray-500 block mb-1">Note</label>
            <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Optional note" className="w-full h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/30" />
          </div>
          <button onClick={handleAdd} className="w-full py-2 text-[11px] font-medium bg-apple-blue/10 border border-ydl-yellow/30 text-apple-blue rounded-lg hover:bg-apple-blue/20 transition-all">
            Add Expense
          </button>
        </div>
      </Modal>
    </div>
  )
}
