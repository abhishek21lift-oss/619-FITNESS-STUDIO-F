import { motion } from 'framer-motion'
import { Award, Trophy, Medal, TrendingUp, DollarSign, UserCheck } from 'lucide-react'

const rankings = [
  { rank: 1, name: 'Riya Singh', deals: 34, revenue: '₹ 4,82,000', conversion: '87%', trend: 'up' },
  { rank: 2, name: 'Awash Vikash', deals: 28, revenue: '₹ 3,96,000', conversion: '82%', trend: 'up' },
  { rank: 3, name: 'Shivani Verma', deals: 22, revenue: '₹ 3,12,000', conversion: '83%', trend: 'up' },
  { rank: 4, name: 'Abhishek Katiyar', deals: 18, revenue: '₹ 2,54,000', conversion: '75%', trend: 'down' },
  { rank: 5, name: 'Rajat Katiyar', deals: 15, revenue: '₹ 2,10,000', conversion: '76%', trend: 'up' },
  { rank: 6, name: 'Narayan Chandel', deals: 11, revenue: '₹ 1,56,000', conversion: '71%', trend: 'down' },
]

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-ydl-yellow" />
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />
  return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-500">#{rank}</span>
}

export default function AnalysisSalesLeaderboard() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Sales Leaderboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Staff performance rankings by revenue.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20">
          <Award className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-[10px] font-semibold text-ydl-yellow">This Month</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {rankings.map((r, i) => (
          <motion.div
            key={r.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              r.rank === 1
                ? 'bg-ydl-yellow/5 border-ydl-yellow/20'
                : 'bg-white/[0.02] border-ydl-dark-border hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex-shrink-0 w-8 text-center">
              <RankIcon rank={r.rank} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{r.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-gray-500"><UserCheck className="w-3 h-3 inline mr-0.5" />{r.deals} deals</span>
                <span className="text-[10px] text-gray-500"><DollarSign className="w-3 h-3 inline mr-0.5" />{r.revenue}</span>
                <span className="text-[10px] text-ydl-yellow">{r.conversion} conversion</span>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-medium ${r.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              {r.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function TrendingDown(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg> }
