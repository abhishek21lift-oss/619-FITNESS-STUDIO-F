import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, TrendingUp,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { PieChart, Pie, Cell, BarChart, Bar, Tooltip, ResponsiveContainer, Legend } from 'recharts'

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
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={filtered} dataKey="leads" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={30} paddingAngle={3}>
                  {filtered.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(212,175,52,0.3)', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#D4AF34' }} />
                <Legend wrapperStyle={{ fontSize: 10, color: '#9CA3AF' }} />
              </PieChart>
            </ResponsiveContainer>
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
                  <div className="w-20 h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[{ name: '', rate }]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Bar dataKey="rate" fill="#D4AF34" radius={[2, 2, 2, 2]} />
                      </BarChart>
                    </ResponsiveContainer>
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
