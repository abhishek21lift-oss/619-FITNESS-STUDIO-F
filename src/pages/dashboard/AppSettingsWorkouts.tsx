import { motion } from 'framer-motion'
import { Dumbbell, Plus, Edit3, Trash2, Play } from 'lucide-react'

const workouts = [
  { name: 'Full Body Blast', duration: '45 min', level: 'Intermediate', exercises: 8, category: 'Strength' },
  { name: 'HIIT Cardio', duration: '30 min', level: 'Advanced', exercises: 12, category: 'Cardio' },
  { name: 'Yoga Flow', duration: '60 min', level: 'Beginner', exercises: 15, category: 'Yoga' },
  { name: 'Core Crusher', duration: '20 min', level: 'All Levels', exercises: 6, category: 'Core' },
  { name: 'Lower Body Pump', duration: '40 min', level: 'Intermediate', exercises: 7, category: 'Strength' },
]

const diets = [
  { name: 'Weight Loss Plan', type: 'Vegetarian', calories: '1,800', meals: 5, duration: '12 weeks' },
  { name: 'Muscle Gain Plan', type: 'Non-Vegetarian', calories: '3,200', meals: 6, duration: '8 weeks' },
  { name: 'Maintenance Plan', type: 'Vegetarian', calories: '2,400', meals: 4, duration: 'Ongoing' },
]

export default function AppSettingsWorkouts() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Workouts & Diet Plans</h1><p className="text-xs text-gray-500 mt-0.5">Manage exercise and nutrition content.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add</button>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-white mb-3">Workout Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {workouts.map((w, i) => (
            <motion.div key={w.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2"><Dumbbell className="w-4 h-4 text-ydl-yellow" /><div><p className="text-xs font-medium text-white">{w.name}</p><p className="text-[9px] text-gray-500">{w.duration} · {w.level}</p></div></div>
                <button className="w-7 h-7 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center hover:bg-ydl-yellow/20"><Play className="w-3 h-3 text-ydl-yellow" /></button>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-ydl-dark-border">
                <span className="text-[9px] text-gray-500">{w.exercises} exercises</span>
                <span className="text-[9px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-1.5 py-0.5 rounded">{w.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-ydl-dark-border">
        <h2 className="text-xs font-semibold text-white mb-3">Diet Plans</h2>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Calories</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Meals</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Duration</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
              <tbody className="divide-y divide-ydl-dark-border/50">
                {diets.map((d, i) => (
                  <motion.tr key={d.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-white">{d.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{d.type}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{d.calories}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{d.meals} meals</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{d.duration}</td>
                    <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1"><button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button><button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
