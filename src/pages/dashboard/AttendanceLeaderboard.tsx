import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Award, Trophy, Medal, Calendar, Star,
  TrendingUp, Crown
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import FilterBar from '../../components/shared/FilterBar'
import { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const initialLeaderboard = [
  { rank: 1, name: 'Sneha Patel', membership: 'Annual Platinum', checkins: 189, streak: 45, lastCheckin: '07 Jun 2026' },
  { rank: 2, name: 'Rahul Sharma', membership: 'Annual Gold', checkins: 142, streak: 32, lastCheckin: '07 Jun 2026' },
  { rank: 3, name: 'Neha Gupta', membership: 'Annual Gold', checkins: 138, streak: 28, lastCheckin: '07 Jun 2026' },
  { rank: 4, name: 'Amit Verma', membership: 'Annual Gold', checkins: 112, streak: 22, lastCheckin: '06 Jun 2026' },
  { rank: 5, name: 'Arun Kumar', membership: 'Quarterly Pro', checkins: 87, streak: 18, lastCheckin: '07 Jun 2026' },
  { rank: 6, name: 'Priya Singh', membership: 'Monthly Basic', checkins: 38, streak: 10, lastCheckin: '06 Jun 2026' },
  { rank: 7, name: 'Vikram Yadav', membership: 'Monthly Premium', checkins: 29, streak: 7, lastCheckin: '05 Jun 2026' },
  { rank: 8, name: 'Pooja Jain', membership: 'Quarterly Pro', checkins: 22, streak: 5, lastCheckin: '04 Jun 2026' },
  { rank: 9, name: 'Rohan Mehra', membership: 'Monthly Basic', checkins: 15, streak: 3, lastCheckin: '03 Jun 2026' },
  { rank: 10, name: 'Ananya Kapoor', membership: 'Annual Platinum', checkins: 8, streak: 2, lastCheckin: '02 Jun 2026' },
]

const branches = ['All Branches', 'Lucknow', 'Jaipur', 'Delhi']
const dateRanges = ['This Month', 'Last Month', 'This Quarter', 'This Year']

export default function AttendanceLeaderboard() {
  const [leaderboard] = useState(initialLeaderboard)
  const [dateRange, setDateRange] = useState('This Month')
  const [branch, setBranch] = useState('All Branches')

  const topMember = leaderboard[0]
  const avgCheckins = Math.round(leaderboard.reduce((s, m) => s + m.checkins, 0) / leaderboard.length)
  const highestStreak = Math.max(...leaderboard.map(m => m.streak))

  const RankBadge = ({ rank }: { rank: number }) => {
    if (rank === 1) return (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ydl-yellow/30 to-amber-600/20 border border-ydl-yellow/30 flex items-center justify-center shadow-lg shadow-ydl-yellow/10">
        <Trophy className="w-4 h-4 text-ydl-yellow" />
      </div>
    )
    if (rank === 2) return (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-300/20 to-gray-400/10 border border-gray-300/30 flex items-center justify-center">
        <Medal className="w-4 h-4 text-gray-300" />
      </div>
    )
    if (rank === 3) return (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-700/20 to-amber-800/10 border border-amber-700/30 flex items-center justify-center">
        <Medal className="w-4 h-4 text-amber-700" />
      </div>
    )
    return (
      <div className="w-8 h-8 rounded-xl bg-white/5 border border-ydl-dark-border flex items-center justify-center">
        <span className="text-xs font-bold text-gray-500">#{rank}</span>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Check-ins Leaderboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Most consistent members ranked by attendance.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20">
          <Award className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-[10px] font-semibold text-ydl-yellow">{dateRange}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Top Member" value={topMember?.name || '-'} icon={Crown} color="from-ydl-yellow/20 to-amber-600/5" border="border-ydl-yellow/30" text="text-ydl-yellow" />
        <StatsCard label="Average Check-ins" value={avgCheckins} icon={TrendingUp} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Highest Streak" value={`${highestStreak} days`} icon={Star} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <FilterBar>
        <FilterField label="Date Range">
          <FilterSelect options={dateRanges} value={dateRange} onChange={(e: any) => setDateRange(e.target.value)} />
        </FilterField>
        <FilterField label="Branch">
          <FilterSelect options={branches} value={branch} onChange={(e: any) => setBranch(e.target.value)} />
        </FilterField>
      </FilterBar>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {leaderboard.map((m, i) => {
          const isTop3 = m.rank <= 3
          return (
            <motion.div
              key={m.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                isTop3
                  ? m.rank === 1
                    ? 'bg-ydl-yellow/5 border-ydl-yellow/20 shadow-sm shadow-ydl-yellow/5'
                    : m.rank === 2
                      ? 'bg-gray-300/5 border-gray-300/20'
                      : 'bg-amber-700/5 border-amber-700/20'
                  : 'bg-white/[0.02] border-ydl-dark-border hover:bg-white/[0.04]'
              }`}
            >
              <RankBadge rank={m.rank} />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${isTop3 ? 'text-white' : 'text-gray-300'}`}>{m.name}</span>
                  {isTop3 && <Star className={`w-3 h-3 ${m.rank === 1 ? 'text-ydl-yellow' : m.rank === 2 ? 'text-gray-300' : 'text-amber-700'}`} />}
                </div>
                <div className="flex items-center gap-4 mt-0.5">
                  <span className="text-[10px] text-gray-500">
                    <Calendar className="w-3 h-3 inline mr-0.5" />
                    {m.checkins} check-ins
                  </span>
                  <span className="text-[10px] text-ydl-yellow">
                    <Star className="w-3 h-3 inline mr-0.5" />
                    Streak: {m.streak} days
                  </span>
                  <span className="text-[10px] text-gray-600">
                    Last: {m.lastCheckin}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-gray-500">{m.membership}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex-1 max-w-[80px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        m.rank === 1 ? 'bg-ydl-yellow/60' : m.rank === 2 ? 'bg-gray-300/60' : m.rank === 3 ? 'bg-amber-700/60' : 'bg-blue-500/40'
                      }`}
                      style={{ width: `${Math.min((m.checkins / leaderboard[0].checkins) * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${isTop3 ? 'text-white' : 'text-gray-500'}`}>
                    {Math.round((m.checkins / leaderboard[0].checkins) * 100)}%
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
