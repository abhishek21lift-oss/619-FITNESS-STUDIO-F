import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy, DollarSign, Target, Eye, Star, MessageSquare,
} from 'lucide-react'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { useToast } from '../../components/ui/Toast'

const branchOptions = ['All Branches', 'Main Branch', 'Sector 62', 'Gomti Nagar']

interface StaffRank {
  rank: number
  name: string
  branch: string
  sales: number
  target: number
  achievement: number
  deals: number
}

const staffData: StaffRank[] = [
  { rank: 1, name: 'Rahul S.', branch: 'Main Branch', sales: 185000, target: 200000, achievement: 93, deals: 18 },
  { rank: 2, name: 'Priya M.', branch: 'Sector 62', sales: 162000, target: 180000, achievement: 90, deals: 15 },
  { rank: 3, name: 'Amit K.', branch: 'Main Branch', sales: 148000, target: 175000, achievement: 85, deals: 14 },
  { rank: 4, name: 'Sneha R.', branch: 'Gomti Nagar', sales: 135000, target: 160000, achievement: 84, deals: 12 },
  { rank: 5, name: 'Vikas P.', branch: 'Sector 62', sales: 112000, target: 150000, achievement: 75, deals: 10 },
  { rank: 6, name: 'Neha K.', branch: 'Gomti Nagar', sales: 98000, target: 140000, achievement: 70, deals: 9 },
  { rank: 7, name: 'Deepak M.', branch: 'Main Branch', sales: 85000, target: 130000, achievement: 65, deals: 7 },
]

export default function AnalysisSalesLeaderboard() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-30')
  const [branch, setBranch] = useState('All Branches')
  const { toast } = useToast()

  const filtered = branch === 'All Branches' ? staffData : staffData.filter(s => s.branch === branch)
  const totalSales = staffData.reduce((s, d) => s + d.sales, 0)
  const avgAchievement = Math.round(staffData.reduce((s, d) => s + d.achievement, 0) / staffData.length)

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-400" />
    if (rank === 2) return <Trophy className="w-4 h-4 text-gray-400" />
    if (rank === 3) return <Trophy className="w-4 h-4 text-amber-600" />
    return <span className="text-[10px] text-gray-500 w-4 text-center inline-block">{rank}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Sales Leaderboard</h1>
        <p className="text-xs text-gray-500 mt-0.5">Staff rankings by sales performance.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Branch">
          <FilterSelect options={branchOptions} value={branch} onChange={e => setBranch(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Top Performer" value={filtered[0]?.name || '-'} icon={Trophy} color="from-yellow-500/20 to-yellow-600/5" border="border-yellow-500/30" text="text-yellow-400" index={0} />
        <StatsCard label="Total Sales" value={`₹ ${totalSales.toLocaleString()}`} icon={DollarSign} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Avg Achievement" value={`${avgAchievement}%`} icon={Target} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xs font-semibold text-white mb-3">Staff Rankings</h2>
        <Table
          columns={[
            { header: 'Rank', accessor: r => getRankBadge(r.rank) },
            { header: 'Name', accessor: r => <span className="text-white font-medium">{r.name}</span> },
            { header: 'Branch', accessor: r => r.branch },
            { header: 'Sales', accessor: r => <span className="text-emerald-400 font-medium">₹{r.sales.toLocaleString()}</span> },
            { header: 'Target', accessor: r => `₹${r.target.toLocaleString()}` },
            { header: 'Achievement', accessor: r => {
              let color = 'text-red-400'
              if (r.achievement >= 90) color = 'text-emerald-400'
              else if (r.achievement >= 80) color = 'text-yellow-400'
              return (
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${r.achievement >= 90 ? 'bg-emerald-500/60' : r.achievement >= 80 ? 'bg-yellow-500/60' : 'bg-red-500/60'}`} style={{ width: `${r.achievement}%` }} />
                  </div>
                  <span className={`text-[10px] font-medium ${color}`}>{r.achievement}%</span>
                </div>
              )
            }},
            { header: 'Deals', accessor: r => r.deals },
            { header: '', accessor: r => (
              <ActionMenu
                label="Actions"
                actions={[
                  { label: 'View Details', icon: Eye, onClick: () => toast(`Viewing ${r.name}'s details`, 'info') },
                  { label: 'Send Appreciation', icon: Star, onClick: () => toast(`Appreciation sent to ${r.name}`, 'success') },
                  { label: 'Message', icon: MessageSquare, onClick: () => toast(`Messaging ${r.name}`, 'info') },
                ]}
              />
            )},
          ]}
          data={filtered}
          keyExtractor={r => r.rank}
        />
      </motion.div>
    </div>
  )
}
