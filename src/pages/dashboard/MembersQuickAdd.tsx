import { motion } from 'framer-motion'
import { User, Phone, Users, Save, Zap } from 'lucide-react'

const genderOptions = ['Male', 'Female', 'Other']

export default function MembersQuickAdd() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-ydl-yellow/20 border border-ydl-yellow/30 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-ydl-yellow" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Quick Add Member</h1>
          <p className="text-xs text-gray-500 mt-0.5">Fast registration with minimal fields.</p>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-lg">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Full name" />
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
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Quick Save
          </button>
          <button className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}
