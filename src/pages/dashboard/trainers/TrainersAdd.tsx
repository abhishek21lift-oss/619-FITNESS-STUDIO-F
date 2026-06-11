import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, Dumbbell, Percent, Save, ArrowLeft,
  Briefcase, Image, ShieldCheck, X
} from 'lucide-react'
import { useToast } from '../../../components/ui/Toast'

const specializations = ['Strength Training', 'Yoga', 'Cardio', 'HIIT', 'Boxing', 'Zumba', 'Pilates', 'CrossFit', 'MMA', 'Functional Training', 'Bodybuilding', 'Rehabilitation']
const trainerTypes = ['Personal Trainer', 'Head Trainer', 'CH', 'Nutrition Coach']
const genders = ['Male', 'Female', 'Other']
const statuses = ['Active', 'Inactive']

export default function TrainersAdd() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', gender: 'Male',
    specialization: specializations[0], trainerType: trainerTypes[0],
    commission: 30, status: 'Active'
  })
  const [photo, setPhoto] = useState<{ preview: string; file: File | null }>({ preview: '', file: null })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const { toast } = useToast()

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    toast('Trainer saved successfully!', 'success')
  }

  const handleSaveClose = () => {
    if (!validate()) return
    toast('Trainer saved successfully!', 'success')
    navigate('/dashboard/trainers/list')
  }

  const set = (key: string, value: any) => setForm({ ...form, [key]: value })

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPhoto({ file, preview: reader.result as string })
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/trainers/list')} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] bg-white/5 border border-apple-gray-200 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#1C1C1E]">Add Trainer</h1>
            <p className="text-xs text-apple-gray-500 mt-0.5">Register a new trainer to the system.</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-3xl">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-xl bg-white/5 border border-apple-gray-200 flex items-center justify-center overflow-hidden">
              {photo.preview ? (
                <img src={photo.preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Image className="w-8 h-8 text-apple-gray-500" />
              )}
            </div>
            <label className="cursor-pointer px-3 py-1.5 text-[10px] font-medium text-apple-blue bg-apple-blue/10 border border-ydl-yellow/20 rounded-lg hover:bg-apple-blue/20 transition-colors">
              Upload Photo
              <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            </label>
            {photo.preview && (
              <button onClick={() => setPhoto({ preview: '', file: null })} className="text-[10px] text-red-400 hover:underline">
                <X className="w-3 h-3 inline mr-0.5" /> Remove
              </button>
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Full Name <span className="text-red-400">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
                <input value={form.name} onChange={e => { set('name', e.target.value); if (errors.name) setErrors(prev => { const n = { ...prev }; delete n.name; return n }) }} className={`w-full bg-white/5 border ${errors.name ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="Trainer full name" />
              </div>
              {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="email@example.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Phone <span className="text-red-400">*</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
                <input value={form.phone} onChange={e => { set('phone', e.target.value); if (errors.phone) setErrors(prev => { const n = { ...prev }; delete n.phone; return n }) }} className={`w-full bg-white/5 border ${errors.phone ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="+91 98765 43210" />
              </div>
              {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Gender</label>
              <div className="flex items-center gap-3 h-[34px]">
                {genders.map(g => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="tgender" checked={form.gender === g} onChange={() => set('gender', g)} className="accent-ydl-yellow" />
                    <span className="text-xs text-apple-gray-600">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Specialization</label>
              <div className="relative">
                <Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
                <select value={form.specialization} onChange={e => set('specialization', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                  {specializations.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Trainer Type</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
                <select value={form.trainerType} onChange={e => set('trainerType', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                  {trainerTypes.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Commission %</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
                <input type="number" min={0} max={100} value={form.commission} onChange={e => set('commission', Math.max(0, Math.min(100, Number(e.target.value))))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" />
              </div>
              <input type="range" min={0} max={100} value={form.commission} onChange={e => set('commission', Number(e.target.value))} className="w-full h-1.5 accent-ydl-yellow mt-1" />
              <span className="text-[10px] text-apple-blue font-medium">{form.commission}%</span>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Status</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
                <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                  {statuses.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={() => navigate('/dashboard/trainers/list')} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

