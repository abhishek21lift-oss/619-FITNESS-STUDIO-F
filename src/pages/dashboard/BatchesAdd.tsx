import { motion } from 'framer-motion'
import { Clock, Users, Dumbbell, Save } from 'lucide-react'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const trainers = ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']
const batchTypes = ['Cardio', 'HIIT', 'Yoga', 'Zumba', 'Strength', 'CrossFit', 'Pilates', 'Boxing']

export default function BatchesAdd() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Add Batch</h1>
        <p className="text-xs text-gray-500 mt-0.5">Create a new batch/class schedule.</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Batch Name</label>
            <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="e.g. Morning HIIT" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Batch Type</label>
            <div className="relative"><Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">{batchTypes.map(t => <option key={t}>{t}</option>)}</select></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Trainer</label>
            <div className="relative"><Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">{trainers.map(t => <option key={t}>{t}</option>)}</select></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Start Time</label>
            <div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input type="time" className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">End Time</label>
            <div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input type="time" className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" /></div>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Repeat On</label>
            <div className="flex flex-wrap gap-2">
              {weekdays.map(d => (
                <label key={d} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg cursor-pointer hover:text-white hover:border-gray-600 transition-colors">
                  <input type="checkbox" className="w-3 h-3 accent-ydl-yellow" />{d.slice(0, 3)}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Save className="w-3.5 h-3.5" /> Save Batch</button>
          <button className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}
