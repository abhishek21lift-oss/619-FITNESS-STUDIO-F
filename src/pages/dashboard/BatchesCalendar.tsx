import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Modal from '../../components/shared/Modal'

interface ClassEvent {
  name: string
  type: string
  time: string
  trainer: string
  color: string
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const allEvents: Record<string, ClassEvent[]> = {
  '2026-06-02': [{ name: 'Morning HIIT', type: 'Cardio', time: '06:00', trainer: 'Riya Singh', color: 'bg-apple-blue/20 border-ydl-yellow/40' }],
  '2026-06-04': [{ name: 'Yoga Flow', type: 'Yoga', time: '07:30', trainer: 'Shivani Verma', color: 'bg-emerald-500/20 border-emerald-500/40' }],
  '2026-06-05': [{ name: 'Zumba Dance', type: 'Zumba', time: '08:00', trainer: 'Awash Vikash', color: 'bg-purple-500/20 border-purple-500/40' }],
  '2026-06-07': [{ name: 'Evening Strength', type: 'Weight Training', time: '17:00', trainer: 'Abhishek Katiyar', color: 'bg-blue-500/20 border-blue-500/40' }],
  '2026-06-09': [{ name: 'Pilates Core', type: 'Pilates', time: '09:30', trainer: 'Shivani Verma', color: 'bg-pink-500/20 border-pink-500/40' }],
  '2026-06-10': [{ name: 'Morning HIIT', type: 'Cardio', time: '06:00', trainer: 'Riya Singh', color: 'bg-apple-blue/20 border-ydl-yellow/40' }],
  '2026-06-11': [{ name: 'Power Lifting', type: 'Weight Training', time: '16:00', trainer: 'Abhishek Katiyar', color: 'bg-orange-500/20 border-orange-500/40' }],
  '2026-06-12': [{ name: 'Yoga Flow', type: 'Yoga', time: '07:30', trainer: 'Shivani Verma', color: 'bg-emerald-500/20 border-emerald-500/40' }],
}

export default function BatchesCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<{ date: string; events: ClassEvent[] } | null>(null)
  const [addModal, setAddModal] = useState(false)
  const [addForm, setAddForm] = useState({ name: '', type: 'Cardio', time: '06:00', trainer: 'Riya Singh' })

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(prev => prev - 1) }
    else setCurrentMonth(prev => prev - 1)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(prev => prev + 1) }
    else setCurrentMonth(prev => prev + 1)
  }

  const goToday = () => {
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
  }

  const openDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const events = allEvents[dateStr] || []
    setSelectedDay({ date: `${day} ${monthNames[currentMonth]} ${currentYear}`, events })
  }

  const handleAddClass = () => {
    if (!addForm.name) return
    const day = selectedDay ? parseInt(selectedDay.date.split(' ')[0]) : today.getDate()
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    allEvents[dateStr] = [...(allEvents[dateStr] || []), { ...addForm, color: 'bg-blue-500/20 border-blue-500/40' }]
    if (selectedDay) {
      setSelectedDay(prev => prev ? { ...prev, events: [...prev.events, { ...addForm, color: 'bg-blue-500/20 border-blue-500/40' }] } : null)
    }
    setAddModal(false)
    setAddForm({ name: '', type: 'Cardio', time: '06:00', trainer: 'Riya Singh' })
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Classes Calendar</h1><p className="text-xs text-apple-gray-500 mt-0.5">Monthly batch schedule overview.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={goToday} className="px-3 py-1 text-[10px] font-medium text-apple-blue bg-apple-blue/10 border border-ydl-yellow/20 rounded-lg hover:bg-apple-blue/20 transition-colors">Today</button>
          <button onClick={prevMonth} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] rounded-lg hover:bg-apple-gray-100"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs font-medium text-[#1C1C1E] min-w-[140px] text-center">{monthNames[currentMonth]} {currentYear}</span>
          <button onClick={nextMonth} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] rounded-lg hover:bg-apple-gray-100"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-apple-gray-200">
          {weekDays.map(d => <div key={d} className="px-3 py-2 text-[10px] font-semibold text-apple-gray-500 uppercase text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="min-h-[90px] p-1.5 border-b border-r border-apple-gray-200/30 bg-white/[0.01]" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const dayEvents = allEvents[dateStr] || []
            return (
              <div
                key={day}
                onClick={() => openDay(day)}
                className={`min-h-[90px] p-1.5 border-b border-r border-apple-gray-200/30 cursor-pointer transition-colors hover:bg-white/[0.03] ${isToday(day) ? 'bg-ydl-yellow/5' : ''}`}
              >
                <span className={`text-[10px] font-medium ${isToday(day) ? 'text-apple-blue' : 'text-apple-gray-500'}`}>{day}</span>
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 3).map((e, ei) => (
                    <div key={ei} className={`px-1.5 py-0.5 rounded border ${e.color} text-[8px] leading-tight`}>
                      <p className="font-medium text-[#1C1C1E] truncate">{e.name}</p>
                      <p className="text-apple-gray-500">{e.time}</p>
                    </div>
                  ))}
                  {dayEvents.length > 3 && <p className="text-[8px] text-apple-gray-500 pl-1">+{dayEvents.length - 3} more</p>}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <Modal open={!!selectedDay} onClose={() => setSelectedDay(null)} title={selectedDay?.date || ''} size="md">
        <div className="space-y-3">
          {selectedDay?.events.length === 0 && <p className="text-xs text-apple-gray-500 text-center py-3">No classes scheduled for this day.</p>}
          {selectedDay?.events.map((e, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${e.color}`}>
              <div>
                <p className="text-xs font-medium text-[#1C1C1E]">{e.name}</p>
                <p className="text-[10px] text-apple-gray-400">{e.type} · {e.trainer}</p>
              </div>
              <span className="text-[10px] font-medium text-apple-blue">{e.time}</span>
            </div>
          ))}
          <button onClick={() => setAddModal(true)} className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity mt-2">
            <Plus className="w-3.5 h-3.5" /> Add Class
          </button>
        </div>
      </Modal>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add Class" size="sm">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Class Name</label>
            <input value={addForm.name} onChange={e => setAddForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Morning HIIT" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Type</label>
              <select value={addForm.type} onChange={e => setAddForm(prev => ({ ...prev, type: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Cardio</option><option>HIIT</option><option>Yoga</option><option>Zumba</option><option>Strength</option><option>Pilates</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Time</label>
              <input type="time" value={addForm.time} onChange={e => setAddForm(prev => ({ ...prev, time: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Trainer</label>
            <select value={addForm.trainer} onChange={e => setAddForm(prev => ({ ...prev, trainer: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option>Awash Vikash</option><option>Riya Singh</option><option>Abhishek Katiyar</option><option>Rajat Katiyar</option><option>Narayan Chandel</option><option>Shivani Verma</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleAddClass} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">Add Class</button>
            <button onClick={() => setAddModal(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
