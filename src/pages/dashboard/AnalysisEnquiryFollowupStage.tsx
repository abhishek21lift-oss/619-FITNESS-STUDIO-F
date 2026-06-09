import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare, UserCheck, TrendingUp,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const branches = ['All Branches', 'Kalyanpur', 'Gomti Nagar', 'Indira Nagar']

const stageData = [
  { stage: 'New', count: 48, color: '#D4AF34' },
  { stage: 'Contacted', count: 62, color: '#60A5FA' },
  { stage: 'Followed Up', count: 35, color: '#A78BFA' },
  { stage: 'Converted', count: 24, color: '#34D399' },
  { stage: 'Lost', count: 18, color: '#F87171' },
]

const stageBreakdown = Array.from({ length: 20 }, (_, i) => ({
  id: `E-${String(i + 1).padStart(3, '0')}`,
  name: ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Sneha Patel', 'Vikram Yadav', 'Neha Gupta', 'Arun Kumar', 'Pooja Jain', 'Rohan Mehra', 'Ananya Kapoor'][i % 10],
  stage: ['New', 'Contacted', 'Followed Up', 'Converted', 'Lost'][i % 5],
  date: new Date(2026, i % 11, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  branch: branches[(i % 3) + 1],
}))

export default function AnalysisEnquiryFollowupStage() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-30')
  const [branch, setBranch] = useState('All Branches')

  const total = stageData.reduce((s, d) => s + d.count, 0)
  const underFollowUp = stageData.filter(d => d.stage === 'Contacted' || d.stage === 'Followed Up').reduce((s, d) => s + d.count, 0)
  const converted = stageData.find(d => d.stage === 'Converted')?.count || 0

  const stageBadge = (s: string) => {
    const colors: Record<string, string> = {
      New: 'text-ydl-yellow bg-ydl-yellow/10 border-ydl-yellow/30',
      Contacted: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      'Followed Up': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      Converted: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Lost: 'text-red-400 bg-red-500/10 border-red-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${colors[s] || ''}`}>{s}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Enquiry Follow-up Stage</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track enquiries across follow-up stages.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Branch">
          <FilterSelect options={branches} value={branch} onChange={e => setBranch(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Enquiries" value={total} icon={MessageSquare} color="from-ydl-yellow/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-ydl-yellow" index={0} />
        <StatsCard label="Under Follow-up" value={underFollowUp} icon={UserCheck} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={1} />
        <StatsCard label="Converted" value={converted} icon={TrendingUp} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Enquiry Stage Distribution</h2>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageData} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="stage" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(212,175,52,0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#D4AF34' }} />
              <Bar dataKey="count" fill="#D4AF34" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Enquiry ID', accessor: r => <span className="text-ydl-yellow font-medium">{r.id}</span> },
            { header: 'Name', accessor: r => r.name },
            { header: 'Stage', accessor: r => stageBadge(r.stage) },
            { header: 'Date', accessor: r => r.date },
            { header: 'Branch', accessor: r => r.branch },
          ]}
          data={stageBreakdown}
          keyExtractor={r => r.id}
        />
      </motion.div>
    </div>
  )
}
