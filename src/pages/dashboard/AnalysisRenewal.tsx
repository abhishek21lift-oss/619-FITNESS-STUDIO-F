import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  RefreshCw, TrendingUp, Target, Download,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const staffOptions = ['All Staff', 'Rahul S.', 'Priya M.', 'Amit K.', 'Sneha R.']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const renewalsData = [45, 52, 38, 61, 55, 48]
const targetData = [60, 60, 60, 70, 70, 70]
const maxRenewal = Math.max(...renewalsData, ...targetData, 1)

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
          <h1 className="text-lg font-bold text-white">Renewal Analysis</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track membership renewals vs targets.</p>
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
        <FilterField label="Staff">
          <FilterSelect options={staffOptions} value={staff} onChange={e => setStaff(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Renewals" value={totalRenewals} icon={RefreshCw} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={0} />
        <StatsCard label="Renewal Rate" value={`${renewalRate}%`} icon={TrendingUp} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Target" value={totalTarget} icon={Target} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Monthly Renewal vs Target</h2>
        <div className="flex items-end gap-3 h-40">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-0.5">
                <div className="w-[35%] rounded-t-sm bg-blue-500/60" style={{ height: `${(renewalsData[i] / maxRenewal) * 130}px` }} title={`Renewals: ${renewalsData[i]}`} />
                <div className="w-[35%] rounded-t-sm bg-ydl-yellow/50" style={{ height: `${(targetData[i] / maxRenewal) * 130}px` }} title={`Target: ${targetData[i]}`} />
              </div>
              <span className="text-[9px] text-gray-500">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ydl-dark-border">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-blue-500/60" /><span className="text-[10px] text-gray-400">Renewals</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-ydl-yellow/50" /><span className="text-[10px] text-gray-400">Target</span></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Month', accessor: r => r.month },
            { header: 'Renewals', accessor: r => <span className="text-blue-400 font-medium">{r.renewals}</span> },
            { header: 'Target', accessor: r => r.target },
            { header: 'Rate', accessor: r => <span className={`font-medium ${parseInt(r.rate) >= 80 ? 'text-emerald-400' : parseInt(r.rate) >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>{r.rate}</span> },
            { header: 'Staff', accessor: r => r.staff },
          ]}
          data={renewalTable}
          keyExtractor={r => r.month}
        />
      </motion.div>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Renewal Report" size="sm">
        <p className="text-xs text-gray-400 mb-3">Download renewal analysis:</p>
        <div className="flex gap-2">
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 hover:bg-white/10 transition-all">CSV</button>
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 hover:bg-white/10 transition-all">PDF</button>
        </div>
      </Modal>
    </div>
  )
}
