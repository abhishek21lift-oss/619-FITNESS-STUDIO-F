import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, Target,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const sourceOptions = ['All Sources', 'Walk-in', 'Instagram', 'Facebook', 'Google', 'Friend Referral', 'Other']
const sourceData = [
  { source: 'Walk-in', leads: 120, converted: 42, rate: 35 },
  { source: 'Instagram', leads: 95, converted: 28, rate: 29 },
  { source: 'Facebook', leads: 68, converted: 18, rate: 26 },
  { source: 'Google', leads: 55, converted: 22, rate: 40 },
  { source: 'Friend Referral', leads: 45, converted: 25, rate: 56 },
  { source: 'Other', leads: 35, converted: 9, rate: 26 },
]
const pieColors = ['#D4AF34', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6', '#6B7280']

export default function AnalysisConversion() {
  const [from, setFrom] = useState('2026-01-01')
  const [to, setTo] = useState('2026-06-30')
  const [source, setSource] = useState('All Sources')

  const filtered = source === 'All Sources' ? sourceData : sourceData.filter(s => s.source === source)
  const totalLeads = sourceData.reduce((s, d) => s + d.leads, 0)
  const totalConverted = sourceData.reduce((s, d) => s + d.converted, 0)
  const convRate = totalLeads > 0 ? Math.round((totalConverted / totalLeads) * 100) : 0
  const total = filtered.reduce((s, d) => s + d.leads, 0)
  let cumulative = 0

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Conversion Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Lead-to-member conversion tracking by source.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Source">
          <FilterSelect options={sourceOptions} value={source} onChange={e => setSource(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Leads" value={totalLeads} icon={Users} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={0} />
        <StatsCard label="Converted" value={totalConverted} icon={UserCheck} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Conversion Rate" value={`${convRate}%`} icon={Target} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Conversion by Source (Pie)</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
              {pieColors.map((color, i) => {
                const d = filtered[i] || sourceData[i]
                if (!d) return null
                const pct = (d.leads / (total || 1)) * 100
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
                  <svg key={d.source} className="absolute inset-0 w-full h-full">
                    <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${large} 1 ${x2} ${y2} Z`} fill={color} opacity={0.8} />
                  </svg>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sourceData.map((d, i) => (
              <div key={d.source} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                <span className="text-[10px] text-gray-400">{d.source} ({d.rate}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-xs font-semibold text-white mb-3">Source-wise Conversion</h2>
          <Table
            columns={[
              { header: 'Source', accessor: r => r.source },
              { header: 'Leads', accessor: r => r.leads },
              { header: 'Converted', accessor: r => <span className="text-emerald-400 font-medium">{r.converted}</span> },
              { header: 'Rate %', accessor: r => (
                <span className={`font-medium ${r.rate >= 40 ? 'text-emerald-400' : r.rate >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>{r.rate}%</span>
              )},
              { header: 'Bar', accessor: r => (
                <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.rate * 1.6}%`, backgroundColor: pieColors[sourceData.indexOf(r)] }} />
                </div>
              )},
            ]}
            data={filtered}
            keyExtractor={r => r.source}
          />
        </motion.div>
      </div>
    </div>
  )
}
