import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard, Clock, AlertTriangle, Eye,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const planTypes = ['All Plans', 'Monthly', 'Quarterly', 'Yearly', 'Corporate']
const planData = [
  { plan: 'Monthly', active: 245, expired: 32, aboutExpire: 18, revenue: 245000 },
  { plan: 'Quarterly', active: 180, expired: 21, aboutExpire: 12, revenue: 432000 },
  { plan: 'Yearly', active: 95, expired: 8, aboutExpire: 5, revenue: 684000 },
  { plan: 'Corporate', active: 42, expired: 3, aboutExpire: 2, revenue: 504000 },
]
const allSubscriptions = planData.flatMap(p => [
  ...Array.from({ length: p.active }, (_, i) => ({ id: `${p.plan}-A${i}`, client: `Client ${i + 1}`, plan: p.plan, status: 'Active' as const, expiry: '2026-08-01', amount: Math.round(p.revenue / p.active) })),
  ...Array.from({ length: p.expired }, (_, i) => ({ id: `${p.plan}-E${i}`, client: `Client ${i + p.active}`, plan: p.plan, status: 'Expired' as const, expiry: '2026-05-01', amount: Math.round(p.revenue / p.active) })),
]).slice(0, 20)

export default function AnalysisSubscriptions() {
  const [planFilter, setPlanFilter] = useState('All Plans')
  const [from, setFrom] = useState('2026-01-01')
  const [to, setTo] = useState('2026-12-31')
  const [detailModal, setDetailModal] = useState(false)
  const [detailStatus, setDetailStatus] = useState<'Active' | 'Expired' | 'About to Expire'>('Active')

  const activeSubs = planData.reduce((s, p) => s + p.active, 0)
  const expiredSubs = planData.reduce((s, p) => s + p.expired, 0)
  const aboutExpire = planData.reduce((s, p) => s + p.aboutExpire, 0)

  const filteredPlans = planFilter === 'All Plans' ? planData : planData.filter(p => p.plan === planFilter)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Subscription Analysis</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Track subscriptions, renewals, and plan performance.</p>
      </div>

      <FilterBar>
        <FilterField label="Plan Type">
          <FilterSelect options={planTypes} value={planFilter} onChange={e => setPlanFilter(e.target.value)} />
        </FilterField>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Active Subscriptions" value={activeSubs} icon={CreditCard} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={0} />
        <StatsCard label="Expired" value={expiredSubs} icon={Clock} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" index={1} />
        <StatsCard label="About to Expire" value={aboutExpire} icon={AlertTriangle} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xs font-semibold text-[#1C1C1E] mb-3">Plan-wise Breakdown</h2>
        <Table
          columns={[
            { header: 'Plan', accessor: r => r.plan },
            { header: 'Active', accessor: r => <span className="text-emerald-400 font-medium">{r.active}</span> },
            { header: 'Expired', accessor: r => <span className="text-red-400">{r.expired}</span> },
            { header: 'About to Expire', accessor: r => <span className="text-orange-400">{r.aboutExpire}</span> },
            { header: 'Revenue', accessor: r => <span className="text-[#1C1C1E] font-medium">₹{r.revenue.toLocaleString()}</span> },
            { header: '', accessor: () => (
              <button onClick={() => { setDetailStatus('Active'); setDetailModal(true) }} className="text-apple-blue/70 hover:text-apple-blue transition-colors">
                <Eye className="w-3 h-3" />
              </button>
            )},
          ]}
          data={filteredPlans}
          keyExtractor={r => r.plan}
        />
      </motion.div>

      <Modal open={detailModal} onClose={() => setDetailModal(false)} title={`${detailStatus} Subscriptions`} size="lg">
        <div className="flex gap-2 mb-3">
          {(['Active', 'Expired', 'About to Expire'] as const).map(s => (
            <button key={s} onClick={() => setDetailStatus(s)} className={`px-2.5 py-1 text-[10px] font-medium rounded-lg border transition-all ${
              detailStatus === s ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500'
            }`}>{s}</button>
          ))}
        </div>
        <Table
          columns={[
            { header: 'Client', accessor: r => r.client },
            { header: 'Plan', accessor: r => r.plan },
            { header: 'Amount', accessor: r => <span className="text-[#1C1C1E] font-medium">₹{r.amount.toLocaleString()}</span> },
            { header: 'Expiry', accessor: r => r.expiry },
            { header: 'Status', accessor: r => (
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                r.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}>{r.status}</span>
            )},
          ]}
          data={allSubscriptions.filter(s => s.status === detailStatus).slice(0, 10)}
          keyExtractor={r => r.id}
        />
      </Modal>
    </div>
  )
}
