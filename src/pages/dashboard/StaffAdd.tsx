import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, Briefcase, Shield, Save, ArrowLeft,
  Lock, MapPin, Eye, EyeOff
} from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

const roleOptions = ['Manager', 'Receptionist', 'Accountant', 'Trainer', 'Admin']
const accessLevels = ['Full', 'Partial', 'Limited']
const branches = ['Lucknow', 'Jaipur', 'Delhi', 'Mumbai', 'Bangalore']

export default function StaffAdd() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', role: roleOptions[0],
    branch: branches[0], password: '', confirmPassword: '',
    accessLevel: accessLevels[0]
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const { toast } = useToast()

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!form.email.includes('@')) errs.email = 'Invalid email address'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Phone must have at least 10 digits'
    if (!form.role.trim()) errs.role = 'Role is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    toast('Staff account created successfully!', 'success')
  }

  const handleSaveClose = () => {
    if (!validate()) return
    toast('Staff account created successfully!', 'success')
    navigate('/dashboard/staff/list')
  }

  const set = (key: string, value: string) => setForm({ ...form, [key]: value })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/staff/list')} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] bg-white/5 border border-apple-gray-200 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#1C1C1E]">Add Staff Account</h1>
            <p className="text-xs text-apple-gray-500 mt-0.5">Create a new staff login account.</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Full Name <span className="text-red-400">*</span></label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input value={form.name} onChange={e => { set('name', e.target.value); if (errors.name) setErrors(prev => { const n = { ...prev }; delete n.name; return n }) }} className={`w-full bg-white/5 border ${errors.name ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="Staff full name" />
            </div>
            {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Email <span className="text-red-400">*</span></label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input type="email" value={form.email} onChange={e => { set('email', e.target.value); if (errors.email) setErrors(prev => { const n = { ...prev }; delete n.email; return n }) }} className={`w-full bg-white/5 border ${errors.email ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="email@example.com" />
            </div>
            {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
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
            <label className="text-[11px] font-medium text-apple-gray-400">Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={form.role} onChange={e => { set('role', e.target.value); if (errors.role) setErrors(prev => { const n = { ...prev }; delete n.role; return n }) }} className={`w-full bg-white/5 border ${errors.role ? 'border-red-400' : 'border-apple-gray-200'} rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none`}>
                {roleOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            {errors.role && <p className="text-[10px] text-red-400 mt-1">{errors.role}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Branch</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={form.branch} onChange={e => set('branch', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {branches.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Access Level</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={form.accessLevel} onChange={e => set('accessLevel', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {accessLevels.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Password <span className="text-red-400">*</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-9 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Min 8 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-apple-gray-500 hover:text-apple-gray-600">
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Confirm Password <span className="text-red-400">*</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Re-enter password" />
            </div>
            {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-[10px] text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={() => navigate('/dashboard/staff/list')} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
