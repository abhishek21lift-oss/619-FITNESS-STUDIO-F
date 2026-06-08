import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserPlus, TrendingDown, Download,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const newData = [32, 28, 41, 36, 48, 52]
const churnData = [18, 22, 15, 20, 23, 17]

const memberTypes = [
  { type: 'Regular', count: 412, pct: 42 },
  { type: 'Premium', count: 285, pct: 29 },
  { type: 'Corporate', count: 178, pct: 18 },
  { type: 'Student', count: 116, pct: 11 },
]

export default function AnalysisMembers() {
  const [gender, setGender] = useState('All')
  const [dateFilter, setDateFilter] = useState('Last 6 Months')
  const [exportOpen, setExportOpen] = useState(false)

  const totalActive = 991
  const newMembers = newData.reduce((a, b) => a + b, 0)
  const churned = churnData.reduce((a, b) => a + b, 0)
  const churnRate = totalActive > 0 ? ((churned / (totalActive + churned)) * 100).toFixed(1) : '0'

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Members Analysis</h1>
          <p className="text-xs text-gray-500 mt-0.5">Member growth, retention, and composition.</p>
        </div>
        <button onClick={() => setExportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-ydl-yellow/10 border border-ydl-yellow/30 text-ydl-yellow rounded-lg hover:bg-ydl-yellow/20 transition-all">
          <Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <FilterBar>
        <FilterField label="Period">
          <FilterSelect options={['Last 3 Months', 'Last 6 Months', 'This Year', 'All Time']} value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
        </FilterField>
        <FilterField label="Gender">
          <FilterSelect options={['All', 'Male', 'Female']} value={gender} onChange={e => setGender(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="New Members" value={newMembers} icon={UserPlus} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={0} />
        <StatsCard label="Total Active" value={totalActive} icon={Users} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={1} />
        <StatsCard label="Churn Rate" value={`${churnRate}%`} icon={TrendingDown} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">New vs Churned</h2>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={months.map((m, i) => ({ month: m, New: newData[i], Churned: churnData[i] }))} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(212,175,52,0.3)', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#D4AF34' }} />
                <Legend wrapperStyle={{ fontSize: 10, color: '#9CA3AF' }} />
                <Bar dataKey="New" fill="#10B981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Churned" fill="#EF4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Member Type Breakdown</h2>
          <Table
            columns={[
              { header: 'Type', accessor: r => r.type },
              { header: 'Count', accessor: r => <span className="text-white font-medium">{r.count}</span> },
              { header: '%', accessor: r => r.pct + '%' },
              { header: 'Bar', accessor: r => (
                <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-ydl-yellow/60 to-ydl-yellow/30" style={{ width: `${r.pct * 1.6}%` }} />
                </div>
              )},
            ]}
            data={memberTypes}
            keyExtractor={r => r.type}
          />
        </motion.div>
      </div>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Members Report" size="sm">
        <p className="text-xs text-gray-400 mb-3">Download member analysis as CSV:</p>
        <button onClick={() => { setExportOpen(false) }} className="w-full px-3 py-2 text-[11px] font-medium bg-ydl-yellow/10 border border-ydl-yellow/30 text-ydl-yellow rounded-lg hover:bg-ydl-yellow/20 transition-all">Download CSV</button>
      </Modal>
    </div>
  )
}
