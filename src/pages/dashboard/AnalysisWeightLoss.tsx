import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Weight, TrendingDown, ArrowDown, Download,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField } from '../../components/shared/FilterBar'

const weightData = [
  { name: 'Rahul Sharma', start: 95, current: 82, target: 75, lost: 13, pct: 13.7 },
  { name: 'Priya Singh', start: 78, current: 68, target: 60, lost: 10, pct: 12.8 },
  { name: 'Amit Verma', start: 110, current: 95, target: 85, lost: 15, pct: 13.6 },
  { name: 'Sneha Patel', start: 72, current: 65, target: 58, lost: 7, pct: 9.7 },
  { name: 'Vikram Yadav', start: 88, current: 80, target: 72, lost: 8, pct: 9.1 },
  { name: 'Neha Gupta', start: 68, current: 62, target: 55, lost: 6, pct: 8.8 },
  { name: 'Arun Kumar', start: 105, current: 88, target: 80, lost: 17, pct: 16.2 },
  { name: 'Pooja Jain', start: 82, current: 74, target: 65, lost: 8, pct: 9.8 },
  { name: 'Rohan Mehra', start: 120, current: 102, target: 90, lost: 18, pct: 15 },
  { name: 'Ananya Kapoor', start: 65, current: 58, target: 52, lost: 7, pct: 10.8 },
]

export default function AnalysisWeightLoss() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-30')

  const totalParticipants = weightData.length
  const avgLoss = weightData.reduce((s, d) => s + d.lost, 0) / totalParticipants
  const maxLoss = Math.max(...weightData.map(d => d.lost))

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Weight Loss Tracking</h1>
        <p className="text-xs text-gray-500 mt-0.5">Monitor member weight loss progress.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Participants" value={totalParticipants} icon={Weight} color="from-ydl-yellow/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-ydl-yellow" index={0} />
        <StatsCard label="Avg Loss (kg)" value={avgLoss.toFixed(1)} icon={TrendingDown} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={1} />
        <StatsCard label="Max Loss (kg)" value={maxLoss} icon={ArrowDown} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Name', accessor: r => <span className="text-white font-medium">{r.name}</span> },
            { header: 'Start Weight', accessor: r => `${r.start} kg` },
            { header: 'Current', accessor: r => <span className="text-blue-400 font-medium">{r.current} kg</span> },
            { header: 'Target', accessor: r => `${r.target} kg` },
            { header: 'Lost', accessor: r => <span className="text-emerald-400 font-medium">{r.lost} kg</span> },
            { header: '%', accessor: r => <span className="text-ydl-yellow font-medium">{r.pct}%</span> },
          ]}
          data={weightData}
          keyExtractor={r => r.name}
        />
      </motion.div>
    </div>
  )
}
