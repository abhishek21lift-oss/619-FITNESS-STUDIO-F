import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, CreditCard, Clock, Download, Eye,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const methodOptions = ['All Methods', 'Cash', 'Card', 'UPI', 'Net Banking']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dailyBilling = [18500, 21200, 16800, 23400, 19800, 14200, 0]
const maxDaily = Math.max(...dailyBilling, 1)

const methodData = [
  { method: 'Cash', amount: 42500, pct: 32 },
  { method: 'Card', amount: 38500, pct: 29 },
  { method: 'UPI', amount: 35200, pct: 26 },
  { method: 'Net Banking', amount: 17300, pct: 13 },
]

const billingRecords = [
  { id: 'BILL-001', client: 'Amit S.', amount: 2500, method: 'Cash', date: '01-Jun-2026', status: 'Paid' as const },
  { id: 'BILL-002', client: 'Neha G.', amount: 4500, method: 'Card', date: '01-Jun-2026', status: 'Paid' as const },
  { id: 'BILL-003', client: 'Vikram S.', amount: 800, method: 'UPI', date: '02-Jun-2026', status: 'Pending' as const },
  { id: 'BILL-004', client: 'Pooja R.', amount: 3000, method: 'Cash', date: '02-Jun-2026', status: 'Paid' as const },
  { id: 'BILL-005', client: 'Rohan M.', amount: 1200, method: 'Net Banking', date: '03-Jun-2026', status: 'Paid' as const },
  { id: 'BILL-006', client: 'Deepa K.', amount: 2200, method: 'UPI', date: '03-Jun-2026', status: 'Pending' as const },
  { id: 'BILL-007', client: 'Arjun D.', amount: 4100, method: 'Card', date: '04-Jun-2026', status: 'Paid' as const },
  { id: 'BILL-008', client: 'Sara I.', amount: 950, method: 'Cash', date: '04-Jun-2026', status: 'Paid' as const },
  { id: 'BILL-009', client: 'Karan J.', amount: 2800, method: 'UPI', date: '05-Jun-2026', status: 'Pending' as const },
  { id: 'BILL-010', client: 'Maya T.', amount: 4900, method: 'Net Banking', date: '05-Jun-2026', status: 'Paid' as const },
]

export default function AnalysisBilling() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-07')
  const [method, setMethod] = useState('All Methods')
  const [exportOpen, setExportOpen] = useState(false)
  const [detailModal, setDetailModal] = useState<{ open: boolean; method: string }>({ open: false, method: '' })

  const totalBilled = billingRecords.reduce((s, r) => s + r.amount, 0)
  const collected = billingRecords.filter(r => r.status === 'Paid').reduce((s, r) => s + r.amount, 0)
  const pending = billingRecords.filter(r => r.status === 'Pending').reduce((s, r) => s + r.amount, 0)

  const filteredMethods = method === 'All Methods' ? methodData : methodData.filter(m => m.method === method)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Billing Analysis</h1>
          <p className="text-xs text-gray-500 mt-0.5">Billing metrics, payment methods, and trends.</p>
        </div>
        <button onClick={() => setExportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-ydl-yellow/10 border border-ydl-yellow/30 text-ydl-yellow rounded-lg hover:bg-ydl-yellow/20 transition-all">
          <Download className="w-3 h-3" /> Export
        </button>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Payment Method">
          <FilterSelect options={methodOptions} value={method} onChange={e => setMethod(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Billed" value={`₹ ${totalBilled.toLocaleString()}`} icon={DollarSign} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={0} />
        <StatsCard label="Collected" value={`₹ ${collected.toLocaleString()}`} icon={CreditCard} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Pending" value={`₹ ${pending.toLocaleString()}`} icon={Clock} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Payment Method Breakdown</h2>
          <div className="space-y-3">
            {filteredMethods.map(m => (
              <div key={m.method}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300">{m.method}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">₹{m.amount.toLocaleString()}</span>
                    <span className="text-[10px] font-medium text-gray-400">{m.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-ydl-yellow/60 to-ydl-yellow/30" style={{ width: `${m.pct * 3.33}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Daily Billing Trend</h2>
          <div className="flex items-end gap-3 h-36">
            {days.map((d, i) => (
              <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end justify-center">
                  <div className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-blue-500/40 to-blue-500/20" style={{ height: `${(dailyBilling[i] / maxDaily) * 120}px` }} />
                </div>
                <span className="text-[9px] text-gray-500">{d}</span>
                <span className="text-[9px] font-medium text-gray-400">₹{dailyBilling[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xs font-semibold text-white mb-3">Recent Billing Records</h2>
        <Table
          columns={[
            { header: 'ID', accessor: r => r.id },
            { header: 'Client', accessor: r => r.client },
            { header: 'Amount', accessor: r => <span className="text-white font-medium">₹{r.amount.toLocaleString()}</span> },
            { header: 'Method', accessor: r => r.method },
            { header: 'Date', accessor: r => r.date },
            { header: 'Status', accessor: r => (
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${r.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>{r.status}</span>
            )},
            { header: '', accessor: r => (
              <button onClick={() => setDetailModal({ open: true, method: r.id })} className="text-ydl-yellow/70 hover:text-ydl-yellow transition-colors">
                <Eye className="w-3 h-3" />
              </button>
            )},
          ]}
          data={billingRecords}
          keyExtractor={r => r.id}
        />
      </motion.div>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Billing Report" size="sm">
        <p className="text-xs text-gray-400 mb-3">Download billing analysis:</p>
        <div className="flex gap-2">
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 hover:bg-white/10 transition-all">CSV</button>
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 hover:bg-white/10 transition-all">PDF</button>
        </div>
      </Modal>

      <Modal open={detailModal.open} onClose={() => setDetailModal({ open: false, method: '' })} title={`Billing Detail - ${detailModal.method}`} size="lg">
        <p className="text-xs text-gray-400 mb-3">Full billing record details.</p>
        <Table
          columns={[
            { header: 'Field', accessor: i => ['Client', 'Amount', 'Method', 'Date', 'Status'][i] },
            { header: 'Value', accessor: i => {
              const record = billingRecords.find(r => r.id === detailModal.method)
              if (!record) return ''
              const vals = [record.client, `₹${record.amount.toLocaleString()}`, record.method, record.date, record.status]
              return <span className="text-white">{vals[i]}</span>
            }},
          ]}
          data={[0, 1, 2, 3, 4]}
          keyExtractor={i => i}
        />
      </Modal>
    </div>
  )
}
