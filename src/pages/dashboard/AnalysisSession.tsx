import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays, Users, IndianRupee,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const trainers = ['All Trainers', 'Rajesh Kumar', 'Sunita Verma', 'Amit Yadav', 'Priya Singh']

const sessionData = [
  { trainer: 'Rajesh Kumar', sessions: 48, ptMembers: 12, revenue: 72000 },
  { trainer: 'Sunita Verma', sessions: 55, ptMembers: 15, revenue: 82500 },
  { trainer: 'Amit Yadav', sessions: 32, ptMembers: 8, revenue: 48000 },
  { trainer: 'Priya Singh', sessions: 41, ptMembers: 10, revenue: 61500 },
]

const sessionTimeline = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(2026, 5, i + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
  sessions: Math.round(15 + Math.random() * 25),
}))

export default function AnalysisSession() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-07')
  const [trainer, setTrainer] = useState('All Trainers')

  const totalSessions = sessionData.reduce((s, d) => s + d.sessions, 0)
  const totalPT = sessionData.reduce((s, d) => s + d.ptMembers, 0)
  const totalRevenue = sessionData.reduce((s, d) => s + d.revenue, 0)

  const formatRupee = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Session Analysis</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Analyse trainer sessions and PT revenue.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Trainer">
          <FilterSelect options={trainers} value={trainer} onChange={e => setTrainer(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Sessions" value={totalSessions} icon={CalendarDays} color="from-apple-blue/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-apple-blue" index={0} />
        <StatsCard label="Active PT Members" value={totalPT} icon={Users} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" index={1} />
        <StatsCard label="Revenue" value={formatRupee(totalRevenue)} icon={IndianRupee} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Session Timeline</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionTimeline} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(0, 122, 255, 0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#007AFF' }} />
                <Bar dataKey="sessions" fill="#007AFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Trainer Revenue</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="trainer" tick={{ fill: '#9CA3AF', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(0, 122, 255, 0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#007AFF' }} />
                <Bar dataKey="revenue" fill="#34D399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Trainer', accessor: r => <span className="text-[#1C1C1E] font-medium">{r.trainer}</span> },
            { header: 'Sessions', accessor: r => r.sessions },
            { header: 'Active PT Members', accessor: r => r.ptMembers },
            { header: 'Revenue', accessor: r => <span className="text-apple-blue font-medium">{formatRupee(r.revenue)}</span> },
          ]}
          data={sessionData}
          keyExtractor={r => r.trainer}
        />
      </motion.div>
    </div>
  )
}
