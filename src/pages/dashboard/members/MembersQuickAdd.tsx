import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Phone, Users, Save, Zap } from 'lucide-react'
import { useToast } from '../../../components/ui/Toast'

const genderOptions = ['Male', 'Female', 'Other']

export default function MembersQuickAdd() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [gender, setGender] = useState('Male')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const handleSave = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!mobile.trim()) errs.mobile = 'Mobile is required'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    toast('Member added successfully!', 'success')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-apple-blue/20 border border-ydl-yellow/30 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-apple-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Quick Add Member</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Fast registration with minimal fields.</p>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-lg">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input value={name} onChange={e => { setName(e.target.value); if (errors.name) setErrors(prev => { const n = { ...prev }; delete n.name; return n }) }} className={`w-full bg-white/5 border ${errors.name ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="Full name" />
            </div>
            {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Mobile</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input value={mobile} onChange={e => { setMobile(e.target.value); if (errors.mobile) setErrors(prev => { const n = { ...prev }; delete n.mobile; return n }) }} className={`w-full bg-white/5 border ${errors.mobile ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="+91 98765 43210" />
            </div>
            {errors.mobile && <p className="text-[10px] text-red-400 mt-1">{errors.mobile}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Gender</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {genderOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Quick Save
          </button>
          <button onClick={() => navigate('/dashboard/members/database')} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E] transition-colors">Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}

