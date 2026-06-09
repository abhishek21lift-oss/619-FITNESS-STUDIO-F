import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Users, Dumbbell, Save, ArrowLeft, Calendar } from 'lucide-react'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const trainers = ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']
const categories = ['Weight Training', 'Yoga', 'Pilates', 'Cardio', 'Zumba']

export default function BatchesAdd() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    category: 'Weight Training',
    trainer: 'Awash Vikash',
    startTime: '06:00',
    endTime: '07:00',
    days: [] as string[],
    maxCapacity: '20',
    startDate: '',
    status: 'Active' as 'Active' | 'Inactive',
  })

  const toggleDay = (day: string) => {
    setForm(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }))
  }

  const handleSave = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Batch name is required'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    console.log('Saving batch:', form)
    navigate('/dashboard/batches/list')
  }

  const handleSaveClose = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Batch name is required'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    console.log('Saving and closing:', form)
    navigate('/dashboard/batches/list')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/batches/list')} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] rounded-lg hover:bg-apple-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Add Batch</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Create a new batch/class schedule.</p>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Batch Name <span className="text-red-400">*</span></label>
            <input value={form.name} onChange={e => { setForm(prev => ({ ...prev, name: e.target.value })); if (errors.name) setErrors(prev => { const n = { ...prev }; delete n.name; return n }) }} className={`w-full bg-white/5 border ${errors.name ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="e.g. Morning HIIT" />
            {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Category</label>
            <div className="relative">
              <Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {categories.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Trainer</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={form.trainer} onChange={e => setForm(prev => ({ ...prev, trainer: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {trainers.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Start Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input type="time" value={form.startTime} onChange={e => setForm(prev => ({ ...prev, startTime: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">End Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input type="time" value={form.endTime} onChange={e => setForm(prev => ({ ...prev, endTime: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" />
            </div>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Repeat On</label>
            <div className="flex flex-wrap gap-2">
              {weekdays.map(d => (
                <label key={d} className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-lg cursor-pointer transition-colors ${form.days.includes(d) ? 'text-apple-blue bg-apple-blue/10 border border-ydl-yellow/30' : 'text-apple-gray-400 bg-white/5 border border-apple-gray-200 hover:text-[#1C1C1E] hover:border-gray-600'}`}>
                  <input type="checkbox" checked={form.days.includes(d)} onChange={() => toggleDay(d)} className="w-3 h-3 accent-ydl-yellow" />
                  {d.slice(0, 3)}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Max Capacity</label>
            <input type="number" value={form.maxCapacity} onChange={e => setForm(prev => ({ ...prev, maxCapacity: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="20" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input type="date" value={form.startDate} onChange={e => setForm(prev => ({ ...prev, startDate: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-white/5 border border-apple-gray-200 rounded-lg hover:bg-white/10 transition-colors">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={() => navigate('/dashboard/batches/list')} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E] transition-colors">
            Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
