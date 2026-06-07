import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, Calendar, Briefcase, Save,
  ChevronDown, ChevronUp, ArrowLeft, MapPin, FileText, CreditCard
} from 'lucide-react'

const genderOptions = ['Male', 'Female', 'Other']
const clientReps = ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']

export default function MembersAdd() {
  const [showOptional, setShowOptional] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', mobile: '', altMobile: '',
    gender: 'Male', dob: '', clientRep: clientReps[0], remarks: '',
    address1: '', address2: '', company: '', gst: '', aadhaar: '', pan: '', guardian: ''
  })

  const set = (key: string, value: string) => setForm({ ...form, [key]: value })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1.5 text-gray-500 hover:text-white bg-white/5 border border-ydl-dark-border rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Add Member</h1>
            <p className="text-xs text-gray-500 mt-0.5">Register a new client.</p>
          </div>
        </div>
        <button onClick={() => setShowOptional(!showOptional)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
          {showOptional ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} {showOptional ? 'Hide' : 'Show'} Optional Fields
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">First Name <span className="text-red-400">*</span></label>
            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.firstName} onChange={e => set('firstName', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="First name" /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Last Name</label>
            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.lastName} onChange={e => set('lastName', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Last name" /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Email</label>
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.email} onChange={e => set('email', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="email@example.com" /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Mobile <span className="text-red-400">*</span></label>
            <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.mobile} onChange={e => set('mobile', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="+91 98765 43210" /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Alt Mobile</label>
            <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.altMobile} onChange={e => set('altMobile', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="+91" /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Gender</label>
            <div className="flex items-center gap-3 h-[34px]">
              {genderOptions.map(g => (
                <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="mgender" checked={form.gender === g} onChange={() => set('gender', g)} className="accent-ydl-yellow" />
                  <span className="text-xs text-gray-300">{g}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Date of Birth</label>
            <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Client Rep</label>
            <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><select value={form.clientRep} onChange={e => set('clientRep', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">{clientReps.map(o => <option key={o}>{o}</option>)}</select></div>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Remarks</label>
            <textarea value={form.remarks} onChange={e => set('remarks', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors min-h-[50px] resize-none" placeholder="Any additional remarks..." />
          </div>
        </div>

        {showOptional && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-ydl-dark-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><label className="text-[11px] font-medium text-gray-400">Guardian Contact</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.guardian} onChange={e => set('guardian', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Guardian mobile" /></div></div>
              <div className="space-y-1.5"><label className="text-[11px] font-medium text-gray-400">Company Name</label><div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.company} onChange={e => set('company', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Company" /></div></div>
              <div className="space-y-1.5"><label className="text-[11px] font-medium text-gray-400">Address</label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.address1} onChange={e => set('address1', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Address line 1" /></div></div>
              <div className="space-y-1.5"><label className="text-[11px] font-medium text-gray-400">City / State</label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.address2} onChange={e => set('address2', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="City, State" /></div></div>
              <div className="space-y-1.5"><label className="text-[11px] font-medium text-gray-400">GST</label><div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.gst} onChange={e => set('gst', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="GST number" /></div></div>
              <div className="space-y-1.5"><label className="text-[11px] font-medium text-gray-400">Aadhaar</label><div className="relative"><CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.aadhaar} onChange={e => set('aadhaar', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="XXXX XXXX XXXX" /></div></div>
              <div className="space-y-1.5"><label className="text-[11px] font-medium text-gray-400">PAN</label><div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={form.pan} onChange={e => set('pan', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="PAN" /></div></div>
            </div>
          </motion.div>
        )}

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
