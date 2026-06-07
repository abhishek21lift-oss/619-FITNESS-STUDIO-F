import { motion } from 'framer-motion'
import { Briefcase, MapPin, Phone, Users, Edit3, Plus } from 'lucide-react'

const centers = [
  { name: '619 FITNESS STUDIO (Kalyanpur)', address: 'S-21, Kalyanpur, Lucknow', mobile: '+91 98765 43210', members: 491, status: 'Active' },
  { name: '619 FITNESS STUDIO (Gomti Nagar)', address: 'B-12, Gomti Nagar, Lucknow', mobile: '+91 87654 32109', members: 312, status: 'Active' },
  { name: '619 FITNESS STUDIO (Indira Nagar)', address: 'C-45, Indira Nagar, Lucknow', mobile: '+91 76543 21098', members: 188, status: 'Active' },
]

export default function SettingsFitnessCenters() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">My Fitness Centers</h1><p className="text-xs text-gray-500 mt-0.5">Manage your gym branches.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Center</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {centers.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center"><Briefcase className="w-5 h-5 text-ydl-yellow" /></div>
              <button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{c.name}</h3>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] text-gray-400"><MapPin className="w-3 h-3 text-gray-500" />{c.address}</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400"><Phone className="w-3 h-3 text-gray-500" />{c.mobile}</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400"><Users className="w-3 h-3 text-gray-500" />{c.members} members</div>
            </div>
            <div className="mt-3 pt-3 border-t border-ydl-dark-border">
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">{c.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
