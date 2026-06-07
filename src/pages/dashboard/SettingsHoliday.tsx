import { motion } from 'framer-motion'
import { Sun, Plus, Calendar, Edit3, Trash2 } from 'lucide-react'

const holidays = [
  { name: 'Independence Day', date: '15 Aug 2026', day: 'Saturday', type: 'National Holiday' },
  { name: 'Raksha Bandhan', date: '28 Aug 2026', day: 'Friday', type: 'Festival' },
  { name: 'Diwali', date: '07 Nov 2026', day: 'Saturday', type: 'Festival' },
  { name: 'Christmas', date: '25 Dec 2026', day: 'Friday', type: 'National Holiday' },
  { name: 'Republic Day', date: '26 Jan 2027', day: 'Tuesday', type: 'National Holiday' },
]

export default function SettingsHoliday() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Holiday Management</h1><p className="text-xs text-gray-500 mt-0.5">Set gym holidays and off days.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Holiday</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Holiday</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Day</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {holidays.map((h, i) => (
                <motion.tr key={h.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Sun className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-xs font-medium text-white">{h.name}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{h.date}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{h.day}</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-2 py-0.5 rounded-md">{h.type}</span></td>
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
