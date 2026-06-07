import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const today = 7

const events: Record<number, { name: string; type: string; time: string; color: string }[]> = {
  2: [{ name: 'Morning HIIT', type: 'HIIT', time: '06:00', color: 'bg-ydl-yellow/20 border-ydl-yellow/40' }],
  4: [{ name: 'Yoga Flow', type: 'Yoga', time: '07:30', color: 'bg-emerald-500/20 border-emerald-500/40' }],
  5: [{ name: 'Zumba Dance', type: 'Zumba', time: '08:00', color: 'bg-purple-500/20 border-purple-500/40' }],
  7: [{ name: 'Evening Strength', type: 'Strength', time: '17:00', color: 'bg-blue-500/20 border-blue-500/40' }],
}

export default function BatchesCalendar() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Classes Calendar</h1><p className="text-xs text-gray-500 mt-0.5">Weekly batch schedule overview.</p></div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs font-medium text-white">June 2026</span>
          <button className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-ydl-dark-border">
          {weekDays.map(d => <div key={d} className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
            const dayEvents = events[day] || []
            return (
              <div key={day} className={`min-h-[80px] p-1.5 border-b border-r border-ydl-dark-border/30 ${day === today ? 'bg-ydl-yellow/5' : ''}`}>
                <span className={`text-[10px] font-medium ${day === today ? 'text-ydl-yellow' : 'text-gray-500'}`}>{day}</span>
                {dayEvents.map((e, ei) => (
                  <div key={ei} className={`mt-1 px-1.5 py-0.5 rounded border ${e.color} text-[8px] leading-tight`}>
                    <p className="font-medium text-white truncate">{e.name}</p>
                    <p className="text-gray-500">{e.time}</p>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
