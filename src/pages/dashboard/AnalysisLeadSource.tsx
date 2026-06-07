import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, TrendingUp,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const groupOptions = ['All Groups', 'Online', 'Offline', 'Referral']
const sourceOptions = [
  { name: 'Walk-in', group: 'Offline', leads: 120, converted: 42 },
  { name: 'Instagram', group: 'Online', leads: 95, converted: 28 },
  { name: 'Facebook', group: 'Online', leads: 68, converted: 18 },
  { name: 'Google', group: 'Online', leads: 55, converted: 22 },
  { name: 'Friend Referral', group: 'Referral', leads: 45, converted: 25 },
  { name: 'Website', group: 'Online', leads: 38, converted: 12 },
  { name: 'Email', group: 'Online', leads: 28, converted: 8 },
  { name: 'Other', group: 'Offline', leads: 35, converted: 9 },
]

const pieColors = ['#D4AF34', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#6B7280']

export default function AnalysisLeadSource() {
  const [from, setFrom] = useState('2026-01-01')
  const [to, setTo] = useState('2026-06-30')
  const [group, setGroup] = useState('All Groups')

  const filtered = group === 'All Groups' ? sourceOptions : sourceOptions.filter(s => s.group === group)
  const totalLeads = filtered.reduce((s, d) => s + d.leads, 0)
  const totalConverted = filtered.reduce((s, d) => s + d.converted, 0)
  const overallRate = totalLeads > 0 ? Math.round((totalConverted / totalLeads) * 100) : 0
  const total = totalLeads
  let cumulative = 0

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Lead Source Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Break down leads by source and track conversion.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Source Group">
          <FilterSelect options={groupOptions} value={group} onChange={e => setGroup(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Leads" value={totalLeads} icon={Users} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={0} />
        <StatsCard label="Converted" value={totalConverted} icon={UserCheck} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Conversion Rate" value={`${overallRate}%`} icon={TrendingUp} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Lead Distribution</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
              {filtered.map((d, i) => {
                const pct = total > 0 ? (d.leads / total) * 100 : 0
                const start = cumulative
                cumulative += pct
                const angle1 = (start / 100) * 360 - 90
                const angle2 = ((start + pct) / 100) * 360 - 90
                const x1 = 50 + 50 * Math.cos((angle1 * Math.PI) / 180)
                const y1 = 50 + 50 * Math.sin((angle1 * Math.PI) / 180)
                const x2 = 50 + 50 * Math.cos((angle2 * Math.PI) / 180)
                const y2 = 50 + 50 * Math.sin((angle2 * Math.PI) / 180)
                const large = pct > 50 ? 1 : 0
                return (
                  <svg key={d.name} className="absolute inset-0 w-full h-full">
                    <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${large} 1 ${x2} ${y2} Z`} fill={pieColors[i % pieColors.length]} opacity={0.8} />
                  </svg>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {filtered.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
                <span className="text-[10px] text-gray-400">{d.name} ({d.leads})</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-xs font-semibold text-white mb-3">Source-wise Table</h2>
          <Table
            columns={[
              { header: 'Source', accessor: r => r.name },
              { header: 'Group', accessor: r => (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                  r.group === 'Online' ? 'bg-blue-500/10 text-blue-400' : r.group === 'Offline' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-purple-500/10 text-purple-400'
                }`}>{r.group}</span>
              )},
              { header: 'Leads', accessor: r => r.leads },
              { header: 'Converted', accessor: r => <span className="text-emerald-400 font-medium">{r.converted}</span> },
              { header: 'Rate %', accessor: r => {
                const rate = r.leads > 0 ? Math.round((r.converted / r.leads) * 100) : 0
                return (
                  <span className={`font-medium ${rate >= 40 ? 'text-emerald-400' : rate >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {rate}%
                  </span>
                )
              }},
              { header: 'Bar', accessor: r => {
                const rate = r.leads > 0 ? Math.round((r.converted / r.leads) * 100) : 0
                return (
                  <div className="w-20 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-ydl-yellow/60 to-ydl-yellow/30" style={{ width: `${rate * 1.6}%` }} />
                  </div>
                )
              }},
            ]}
            data={filtered}
            keyExtractor={r => r.name}
          />
        </motion.div>
      </div>
    </div>
  )
}
