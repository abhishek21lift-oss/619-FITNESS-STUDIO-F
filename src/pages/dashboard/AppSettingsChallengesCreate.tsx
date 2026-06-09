import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

const goalTypes = ['Weight', 'Steps', 'Workouts', 'Attendance', 'Endurance']

export default function AppSettingsChallengesCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({
    challengeName: '', description: '', startDate: '', endDate: '',
    goalType: 'Steps', targetValue: '', reward: '', status: 'Active',
  })

  const handleSave = () => {
    if (!form.challengeName) { toast('Please enter a challenge name.', 'error'); return }
    toast('Challenge created successfully!', 'success')
    navigate('/dashboard/app-settings/challenges')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/app-settings/challenges')} className="p-2 rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-apple-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-[#1C1C1E]">Create Challenge</h1><p className="text-xs text-apple-gray-500 mt-0.5">Set up a new fitness challenge.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.challengeName} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-apple-gray-200 bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Challenge Name *</label>
          <input value={form.challengeName} onChange={e => setForm(p => ({ ...p, challengeName: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Summer Shred Challenge" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Describe the challenge rules and goals." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Start Date</label>
            <input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">End Date</label>
            <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Goal Type</label>
            <select value={form.goalType} onChange={e => setForm(p => ({ ...p, goalType: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {goalTypes.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Target Value</label>
            <input value={form.targetValue} onChange={e => setForm(p => ({ ...p, targetValue: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="10,000 steps" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Reward / Prize</label>
            <div className="relative">
              <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input value={form.reward} onChange={e => setForm(p => ({ ...p, reward: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="1 Month Free" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Upcoming</option><option>Ended</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.challengeName} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/app-settings/challenges')} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
