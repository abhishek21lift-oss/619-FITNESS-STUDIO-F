import { motion } from 'framer-motion'
import { Award, Trophy, Medal, Calendar } from 'lucide-react'

const leaderboard = [
  { rank: 1, name: 'Sneha Patel', checkins: 189, streak: '45 days', plan: 'Annual Platinum' },
  { rank: 2, name: 'Rahul Sharma', checkins: 142, streak: '32 days', plan: 'Annual Gold' },
  { rank: 3, name: 'Neha Gupta', checkins: 138, streak: '28 days', plan: 'Annual Gold' },
  { rank: 4, name: 'Arun Kumar', checkins: 87, streak: '18 days', plan: 'Quarterly Pro' },
  { rank: 5, name: 'Priya Singh', checkins: 38, streak: '10 days', plan: 'Monthly Basic' },
]

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-ydl-yellow" />
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />
  return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-500">#{rank}</span>
}

export default function AttendanceLeaderboard() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Check-ins Leaderboard</h1><p className="text-xs text-gray-500 mt-0.5">Most consistent members this month.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20">
          <Award className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-[10px] font-semibold text-ydl-yellow">This Month</span>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {leaderboard.map((l, i) => (
          <motion.div key={l.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={`flex items-center gap-4 p-4 rounded-xl border ${l.rank === 1 ? 'bg-ydl-yellow/5 border-ydl-yellow/20' : 'bg-white/[0.02] border-ydl-dark-border hover:bg-white/[0.04]'}`}>
            <div className="flex-shrink-0 w-8 text-center"><RankIcon rank={l.rank} /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-white">{l.name}</p><div className="flex items-center gap-3 mt-1"><span className="text-[10px] text-gray-500"><Calendar className="w-3 h-3 inline mr-0.5" />{l.checkins} check-ins</span><span className="text-[10px] text-ydl-yellow">Streak: {l.streak}</span></div></div>
            <div className="text-right"><p className="text-[10px] text-gray-500">{l.plan}</p></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
