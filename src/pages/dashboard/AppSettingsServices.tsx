import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Dumbbell } from 'lucide-react'

const services = [
  { name: 'Personal Training', duration: '60 min', price: '₹500', category: 'Training', active: true },
  { name: 'Diet Consultation', duration: '45 min', price: '₹800', category: 'Nutrition', active: true },
  { name: 'Body Composition', duration: '30 min', price: '₹300', category: 'Assessment', active: true },
  { name: 'Sauna Access', duration: '30 min', price: '₹200', category: 'Wellness', active: true },
  { name: 'Steam Room', duration: '30 min', price: '₹150', category: 'Wellness', active: false },
]

export default function AppSettingsServices() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Services List</h1><p className="text-xs text-gray-500 mt-0.5">Additional services offered at the gym.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Service</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Duration</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Price</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Category</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {services.map((s, i) => (
                <motion.tr key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Dumbbell className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs font-medium text-white">{s.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.duration}</td>
                  <td className="px-4 py-3 text-xs text-ydl-yellow">{s.price}</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-medium text-gray-300 bg-white/5 px-2 py-0.5 rounded-md">{s.category}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${s.active ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{s.active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1"><button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button><button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
