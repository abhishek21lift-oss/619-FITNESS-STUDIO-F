import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Users, Briefcase, Save } from 'lucide-react'

const genderOptions = ['Male', 'Female', 'Other']
const clientRepOptions = ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']

export default function MembersAdd() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Add Member</h1>
        <p className="text-xs text-gray-500 mt-0.5">Register a new client with full details.</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Full name" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="email@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Mobile</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Gender</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {genderOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input type="date" className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Client Rep</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {clientRepOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save Member
          </button>
          <button className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">Save & Add Another</button>
          <button className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}
