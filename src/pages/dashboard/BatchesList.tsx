import { motion } from 'framer-motion'
import { Clock, Dumbbell, Edit3, Trash2 } from 'lucide-react'

const batches = [
  { name: 'Morning HIIT', type: 'HIIT', trainer: 'Riya Singh', time: '06:00 - 07:00', days: 'Mon, Wed, Fri', capacity: 20, enrolled: 18, active: true },
  { name: 'Yoga Flow', type: 'Yoga', trainer: 'Shivani Verma', time: '07:30 - 08:30', days: 'Mon-Sat', capacity: 25, enrolled: 22, active: true },
  { name: 'Evening Strength', type: 'Strength', trainer: 'Abhishek Katiyar', time: '17:00 - 18:00', days: 'Tue, Thu, Sat', capacity: 15, enrolled: 12, active: true },
  { name: 'Boxing Basics', type: 'Boxing', trainer: 'Rajat Katiyar', time: '18:30 - 19:30', days: 'Mon, Wed, Fri', capacity: 20, enrolled: 8, active: false },
  { name: 'Zumba Dance', type: 'Zumba', trainer: 'Awash Vikash', time: '08:00 - 09:00', days: 'Tue, Thu', capacity: 30, enrolled: 27, active: true },
]

export default function BatchesList() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Batch List</h1>
        <p className="text-xs text-gray-500 mt-0.5">All scheduled batches and classes.</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Trainer</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Time</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Days</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Enrolled</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {batches.map((b, i) => (
                <motion.tr key={b.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{b.name}</td>
                  <td className="px-4 py-3"><span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 border border-ydl-yellow/20 rounded-md"><Dumbbell className="w-3 h-3" />{b.type}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.trainer}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{b.time}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.days}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.enrolled}/{b.capacity}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${b.active ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{b.active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1"><button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button><button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
