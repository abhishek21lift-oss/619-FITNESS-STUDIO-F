import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy, TrendingUp, IndianRupee, Percent, Download,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField } from '../../components/shared/FilterBar'

const leaderboardData = [
  { rank: 1, name: 'Awash Vikash', sales: 185000, sessions: 48, conversions: 18, rate: 40 },
  { rank: 2, name: 'Riya Singh', sales: 162000, sessions: 55, conversions: 16, rate: 42.1 },
  { rank: 3, name: 'Abhishek Katiyar', sales: 158000, sessions: 32, conversions: 22, rate: 42.3 },
  { rank: 4, name: 'Rajat Katiyar', sales: 142000, sessions: 41, conversions: 14, rate: 34.1 },
  { rank: 5, name: 'Narayan Chandel', sales: 128000, sessions: 38, conversions: 12, rate: 36.4 },
  { rank: 6, name: 'Shivani Verma', sales: 115000, sessions: 29, conversions: 10, rate: 35.7 },
  { rank: 7, name: 'Vikram Yadav', sales: 98000, sessions: 25, conversions: 8, rate: 32 },
  { rank: 8, name: 'Neha Gupta', sales: 85000, sessions: 22, conversions: 7, rate: 31.8 },
]

export default function AnalysisLeaderboard() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-30')

  const topPerformer = leaderboardData[0]
  const totalSales = leaderboardData.reduce((s, d) => s + d.sales, 0)
  const avgRate = Math.round(leaderboardData.reduce((s, d) => s + d.rate, 0) / leaderboardData.length)

  const formatRupee = (n: number) => `₹${n.toLocaleString('en-IN')}`

  const rankBadge = (rank: number) => {
    const colors: Record<number, string> = {
      1: 'text-ydl-yellow bg-ydl-yellow/10 border-ydl-yellow/30',
      2: 'text-gray-300 bg-gray-500/10 border-gray-500/30',
      3: 'text-amber-600 bg-amber-500/10 border-amber-500/30',
    }
    return <span className={`inline-flex items-center justify-center w-6 h-6 text-[10px] font-bold rounded-full border ${colors[rank] || 'text-gray-500 bg-white/5 border-ydl-dark-border'}`}>{rank}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Leaderboard</h1>
        <p className="text-xs text-gray-500 mt-0.5">Top performing staff and trainers.</p>
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
        <StatsCard label="Top Performer" value={topPerformer.name} icon={Trophy} color="from-ydl-yellow/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-ydl-yellow" index={0} />
        <StatsCard label="Total Sales" value={formatRupee(totalSales)} icon={IndianRupee} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Avg Conversion" value={`${avgRate}%`} icon={Percent} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Rank', accessor: r => rankBadge(r.rank) },
            { header: 'Name', accessor: r => <span className="text-white font-medium">{r.name}</span> },
            { header: 'Sales', accessor: r => formatRupee(r.sales) },
            { header: 'Sessions', accessor: r => r.sessions },
            { header: 'Conversions', accessor: r => r.conversions },
            { header: 'Conversion Rate', accessor: r => <span className="text-ydl-yellow font-medium">{r.rate}%</span> },
          ]}
          data={leaderboardData}
          keyExtractor={r => r.rank}
        />
      </motion.div>
    </div>
  )
}
