import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, Clock, Eye,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const staffOptions = ['All Staff', 'Rahul S.', 'Priya M.', 'Amit K.', 'Sneha R.']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dailyCol = [12500, 14800, 11200, 16200, 13800, 9500, 0]
const maxDaily = Math.max(...dailyCol, 1)

const collectionList = [
  { id: 'INV-001', client: 'Amit Sharma', amount: 2500, method: 'Cash', staff: 'Rahul S.', date: '01-Jun-2026', status: 'Paid' },
  { id: 'INV-002', client: 'Neha Gupta', amount: 4500, method: 'Card', staff: 'Priya M.', date: '01-Jun-2026', status: 'Paid' },
  { id: 'INV-003', client: 'Vikram S.', amount: 3000, method: 'UPI', staff: 'Amit K.', date: '02-Jun-2026', status: 'Paid' },
  { id: 'INV-004', client: 'Pooja R.', amount: 1800, method: 'Cash', staff: 'Sneha R.', date: '02-Jun-2026', status: 'Pending' },
  { id: 'INV-005', client: 'Rohan M.', amount: 5200, method: 'Card', staff: 'Rahul S.', date: '03-Jun-2026', status: 'Paid' },
  { id: 'INV-006', client: 'Deepa K.', amount: 2200, method: 'UPI', staff: 'Priya M.', date: '03-Jun-2026', status: 'Pending' },
  { id: 'INV-007', client: 'Arjun D.', amount: 4100, method: 'Cash', staff: 'Amit K.', date: '04-Jun-2026', status: 'Paid' },
  { id: 'INV-008', client: 'Sara I.', amount: 3600, method: 'Card', staff: 'Sneha R.', date: '04-Jun-2026', status: 'Paid' },
  { id: 'INV-009', client: 'Karan J.', amount: 2800, method: 'UPI', staff: 'Rahul S.', date: '05-Jun-2026', status: 'Pending' },
  { id: 'INV-010', client: 'Maya T.', amount: 4900, method: 'Cash', staff: 'Priya M.', date: '05-Jun-2026', status: 'Paid' },
]

export default function AnalysisCollection() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-07')
  const [staff, setStaff] = useState('All Staff')
  const [detailsOpen, setDetailsOpen] = useState(false)

  const totalCollection = collectionList.reduce((s, c) => s + c.amount, 0)
  const todayCol = collectionList.filter(c => c.date === '07-Jun-2026').reduce((s, c) => s + c.amount, 0)
  const pendingCol = collectionList.filter(c => c.status === 'Pending').reduce((s, c) => s + c.amount, 0)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Collection Analysis</h1>
          <p className="text-xs text-gray-500 mt-0.5">Payment collections and daily revenue.</p>
        </div>
        <button onClick={() => setDetailsOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-ydl-yellow/10 border border-ydl-yellow/30 text-ydl-yellow rounded-lg hover:bg-ydl-yellow/20 transition-all">
          <Eye className="w-3 h-3" /> View Details
        </button>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Staff">
          <FilterSelect options={staffOptions} value={staff} onChange={e => setStaff(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Collection" value={`₹ ${totalCollection.toLocaleString()}`} icon={DollarSign} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={0} />
        <StatsCard label="Today" value={`₹ ${todayCol.toLocaleString()}`} icon={TrendingUp} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={1} />
        <StatsCard label="Pending" value={`₹ ${pendingCol.toLocaleString()}`} icon={Clock} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Daily Collection</h2>
        <div className="flex items-end gap-3 h-40">
          {days.map((d, i) => (
            <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex items-end justify-center">
                <div className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-emerald-500/40 to-emerald-500/20" style={{ height: `${(dailyCol[i] / maxDaily) * 130}px` }} />
              </div>
              <span className="text-[9px] text-gray-500">{d}</span>
              <span className="text-[9px] font-medium text-gray-400">₹{dailyCol[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="text-xs font-semibold text-white mb-3">Daily Breakdown</h3>
        <Table
          columns={[
            { header: 'Day', accessor: i => days[i] },
            { header: 'Amount', accessor: i => <span className="text-emerald-400 font-medium">₹{dailyCol[i].toLocaleString()}</span> },
            { header: 'Bar', accessor: i => (
              <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-500/30" style={{ width: `${(dailyCol[i] / maxDaily) * 100}%` }} />
              </div>
            )},
          ]}
          data={days.map((_, i) => i)}
          keyExtractor={i => i}
        />
      </motion.div>

      <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)} title="All Collection Records" size="xl">
        <Table
          columns={[
            { header: 'Invoice', accessor: r => r.id },
            { header: 'Client', accessor: r => r.client },
            { header: 'Amount', accessor: r => <span className="text-emerald-400 font-medium">₹{r.amount.toLocaleString()}</span> },
            { header: 'Method', accessor: r => r.method },
            { header: 'Staff', accessor: r => r.staff },
            { header: 'Date', accessor: r => r.date },
            { header: 'Status', accessor: r => (
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${r.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>{r.status}</span>
            )},
          ]}
          data={collectionList}
          keyExtractor={r => r.id}
        />
      </Modal>
    </div>
  )
}
