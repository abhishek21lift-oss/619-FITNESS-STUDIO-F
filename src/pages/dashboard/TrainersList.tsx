import { motion } from 'framer-motion'
import { Dumbbell, Phone, Mail, Edit3, Star } from 'lucide-react'

const trainers = [
  { name: '619 Fitness Studio', subtitle: 'AWASH VIKASH', role: 'Head Trainer', specialty: 'Overall Fitness', mobile: '+91 98765 43210', email: 'awash@ydl.com', rating: 4.9, clients: 187, revenue: '₹4,82,000', color: 'from-ydl-yellow/20 to-amber-600/5' },
  { name: 'Riya Singh', role: 'Senior Trainer', specialty: 'HIIT & Cardio', mobile: '+91 87654 32109', email: 'riya@ydl.com', rating: 4.8, clients: 156, revenue: '₹3,96,000', color: 'from-pink-500/20 to-pink-600/5' },
  { name: 'Abhishek Katiyar', role: 'Trainer', specialty: 'Strength Training', mobile: '+91 76543 21098', email: 'abhishek@ydl.com', rating: 4.6, clients: 134, revenue: '₹2,54,000', color: 'from-blue-500/20 to-blue-600/5' },
  { name: 'Rajat Katiyar', role: 'Trainer', specialty: 'CrossFit', mobile: '+91 65432 10987', email: 'rajat@ydl.com', rating: 4.5, clients: 112, revenue: '₹2,10,000', color: 'from-emerald-500/20 to-emerald-600/5' },
  { name: 'Narayan Chandel', role: 'Junior Trainer', specialty: 'Boxing & MMA', mobile: '+91 54321 09876', email: 'narayan@ydl.com', rating: 4.3, clients: 89, revenue: '₹1,56,000', color: 'from-red-500/20 to-red-600/5' },
  { name: 'Shivani Verma', role: 'Yoga Trainer', specialty: 'Yoga & Pilates', mobile: '+91 43210 98765', email: 'shivani@ydl.com', rating: 4.7, clients: 143, revenue: '₹3,12,000', color: 'from-purple-500/20 to-purple-600/5' },
]

export default function TrainersList() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">My Trainers</h1><p className="text-xs text-gray-500 mt-0.5">{trainers.length} trainers registered.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainers.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`rounded-xl border border-ydl-dark-border bg-gradient-to-br ${t.color} p-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-ydl-yellow" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{t.name}</h3>
                  {t.subtitle && <p className="text-[10px] text-ydl-yellow font-medium">{t.subtitle}</p>}
                  <p className="text-[10px] text-gray-500">{t.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-ydl-yellow" />
                <span className="text-xs font-bold text-ydl-yellow">{t.rating}</span>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-black/20">
              <div className="grid grid-cols-2 gap-2">
                <div><p className="text-[9px] text-gray-500">Specialty</p><p className="text-[10px] font-medium text-white">{t.specialty}</p></div>
                <div><p className="text-[9px] text-gray-500">Clients</p><p className="text-[10px] font-medium text-white">{t.clients}</p></div>
                <div><p className="text-[9px] text-gray-500">Mobile</p><p className="text-[10px] font-medium text-white">{t.mobile}</p></div>
                <div><p className="text-[9px] text-gray-500">Revenue</p><p className="text-[10px] font-medium text-ydl-yellow">{t.revenue}</p></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors"><Phone className="w-3 h-3" /> Call</button>
              <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors"><Mail className="w-3 h-3" /> Email</button>
              <button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
