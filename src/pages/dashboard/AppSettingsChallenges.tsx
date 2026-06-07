import { motion } from 'framer-motion'
import { Plus, Calendar, Trophy, Users, Edit3, Trash2 } from 'lucide-react'

const challenges = [
  { name: 'Summer Shred Challenge', type: 'Weight Loss', start: '01 Jun 2026', end: '30 Jun 2026', participants: 24, prize: '1 Month Free', active: true },
  { name: 'Push-up Marathon', type: 'Endurance', start: '15 Jun 2026', end: '15 Jul 2026', participants: 18, prize: 'PT Session', active: true },
  { name: 'Deadlift Competition', type: 'Strength', start: '01 May 2026', end: '31 May 2026', participants: 12, prize: 'Merchandise', active: false },
]

export default function AppSettingsChallenges() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Challenges</h1><p className="text-xs text-gray-500 mt-0.5">Create and manage fitness challenges.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Challenge</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-ydl-yellow" /></div>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${c.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{c.active ? 'Active' : 'Ended'}</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{c.name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-gray-500">Type: <span className="text-gray-300">{c.type}</span></p>
              <p className="text-[10px] text-gray-500"><Calendar className="inline w-3 h-3 mr-0.5" />{c.start} - {c.end}</p>
              <p className="text-[10px] text-gray-500"><Users className="inline w-3 h-3 mr-0.5" />{c.participants} participants</p>
              <p className="text-[10px] font-medium text-ydl-yellow">Prize: {c.prize}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-ydl-dark-border">
              <button className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><Edit3 className="w-3 h-3" /> Edit</button>
              <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
