import { motion } from 'framer-motion'
import { Plus, Dumbbell, Edit3, Trash2 } from 'lucide-react'

const programs = [
  { name: 'Fat Loss Program', duration: '12 Weeks', sessions: '36', level: 'Intermediate', active: true },
  { name: 'Muscle Building', duration: '8 Weeks', sessions: '24', level: 'Advanced', active: true },
  { name: 'Yoga for Beginners', duration: '4 Weeks', sessions: '12', level: 'Beginner', active: true },
  { name: 'Cardio Endurance', duration: '6 Weeks', sessions: '18', level: 'All Levels', active: false },
]

export default function BatchesProgram() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Program Management</h1><p className="text-xs text-gray-500 mt-0.5">Create and manage fitness programs.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Program</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {programs.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center"><Dumbbell className="w-4 h-4 text-ydl-yellow" /></div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${p.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{p.active ? 'Active' : 'Inactive'}</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{p.name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-gray-500">Duration: <span className="text-gray-300">{p.duration}</span></p>
              <p className="text-[10px] text-gray-500">Sessions: <span className="text-gray-300">{p.sessions}</span></p>
              <p className="text-[10px] text-gray-500">Level: <span className="text-gray-300">{p.level}</span></p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-ydl-dark-border">
              <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-[10px] text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><Edit3 className="w-3 h-3" /> Edit</button>
              <button className="flex items-center justify-center px-2 py-1 text-[10px] text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3 h-3" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
