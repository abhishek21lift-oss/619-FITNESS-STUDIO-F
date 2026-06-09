import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  RefreshCw, TrendingUp, Target, Download,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const staffOptions = ['All Staff', 'Rahul S.', 'Priya M.', 'Amit K.', 'Sneha R.']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const renewalsData = [45, 52, 38, 61, 55, 48]
const targetData = [60, 60, 60, 70, 70, 70]
const renewalTable = [
  { month: 'Jan', renewals: 45, target: 60, rate: '75%', staff: 'Rahul S.' },
  { month: 'Feb', renewals: 52, target: 60, rate: '87%', staff: 'Priya M.' },
  { month: 'Mar', renewals: 38, target: 60, rate: '63%', staff: 'Amit K.' },
  { month: 'Apr', renewals: 61, target: 70, rate: '87%', staff: 'Rahul S.' },
  { month: 'May', renewals: 55, target: 70, rate: '79%', staff: 'Sneha R.' },
  { month: 'Jun', renewals: 48, target: 70, rate: '69%', staff: 'Priya M.' },
]

export default function AnalysisRenewal() {
  const [from, setFrom] = useState('2026-01-01')
  const [to, setTo] = useState('2026-06-30')
  const [staff, setStaff] = useState('All Staff')
  const [exportOpen, setExportOpen] = useState(false)

  const totalRenewals = renewalsData.reduce((a, b) => a + b, 0)
  const totalTarget = targetData.reduce((a, b) => a + b, 0)
  const renewalRate = totalTarget > 0 ? Math.round((totalRenewals / totalTarget) * 100) : 0

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Renewal Analysis</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Track membership renewals vs targets.</p>
        </div>
        <button onClick={() => setExportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-apple-blue/10 border border-ydl-yellow/30 text-apple-blue rounded-lg hover:bg-apple-blue/20 transition-all">
          <Download className="w-3 h-3" /> Export
        </button>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Staff">
          <FilterSelect options={staffOptions} value={staff} onChange={e => setStaff(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Renewals" value={totalRenewals} icon={RefreshCw} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" index={0} />
        <StatsCard label="Renewal Rate" value={`${renewalRate}%`} icon={TrendingUp} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Target" value={totalTarget} icon={Target} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Monthly Renewal vs Target</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={months.map((m, i) => ({ month: m, Renewals: renewalsData[i], Target: targetData[i] }))} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(0, 122, 255, 0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#007AFF' }} />
              <Bar dataKey="Renewals" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Target" fill="#007AFF" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-apple-gray-200">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-blue-500/60" /><span className="text-[10px] text-apple-gray-400">Renewals</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-ydl-yellow/50" /><span className="text-[10px] text-apple-gray-400">Target</span></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Month', accessor: r => r.month },
            { header: 'Renewals', accessor: r => <span className="text-[#007AFF] font-medium">{r.renewals}</span> },
            { header: 'Target', accessor: r => r.target },
            { header: 'Rate', accessor: r => <span className={`font-medium ${parseInt(r.rate) >= 80 ? 'text-emerald-400' : parseInt(r.rate) >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>{r.rate}</span> },
            { header: 'Staff', accessor: r => r.staff },
          ]}
          data={renewalTable}
          keyExtractor={r => r.month}
        />
      </motion.div>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Renewal Report" size="sm">
        <p className="text-xs text-apple-gray-400 mb-3">Download renewal analysis:</p>
        <div className="flex gap-2">
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 hover:bg-white/10 transition-all">CSV</button>
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 hover:bg-white/10 transition-all">PDF</button>
        </div>
      </Modal>
    </div>
  )
}
