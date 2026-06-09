import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function BatchesAddProgram() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: '', description: '', duration: '', startDate: '', endDate: '', status: 'Active' as 'Active' | 'Inactive', days: [] as string[]
  })

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const toggleDay = (day: string) => {
    setForm(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }))
  }

  const handleSave = () => {
    if (!form.name) return
    toast('Program added successfully!', 'success')
  }

  const handleSaveClose = () => {
    if (!form.name) return
    toast('Program added successfully!', 'success')
    navigate('/dashboard/batches/program')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/batches/program')} className="p-1.5 text-gray-500 hover:text-white bg-white/5 border border-ydl-dark-border rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Add Program</h1>
          <p className="text-xs text-gray-500 mt-0.5">Create a new batch program.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Program Name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Strength Training" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Duration</label>
            <input value={form.duration} onChange={e => set('duration', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. 12 Weeks" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Start Date</label>
            <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">End Date</label>
            <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[50px] resize-none" placeholder="Program description..." />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Days of Week</label>
            <div className="flex flex-wrap gap-2">
              {dayOptions.map(d => (
                <label key={d} className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg cursor-pointer transition-colors ${form.days.includes(d) ? 'bg-ydl-yellow/20 text-ydl-yellow border border-ydl-yellow/30' : 'bg-white/5 text-gray-400 border border-ydl-dark-border hover:text-white'}`}>
                  <input type="checkbox" checked={form.days.includes(d)} onChange={() => toggleDay(d)} className="hidden" />
                  {d.slice(0, 3)}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={() => navigate('/dashboard/batches/program')} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
