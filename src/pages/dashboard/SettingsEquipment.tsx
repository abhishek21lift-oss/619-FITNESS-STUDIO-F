import { motion } from 'framer-motion'
import { Dumbbell, Plus, Edit3, Trash2, AlertTriangle } from 'lucide-react'

const equipment = [
  { name: 'Treadmill', brand: 'Life Fitness', count: 8, condition: 'Good', lastService: '15 May 2026' },
  { name: 'Squat Rack', brand: 'Rogue', count: 4, condition: 'Excellent', lastService: '01 Jun 2026' },
  { name: 'Dumbbell Set', brand: 'Rubber Hex', count: 6, condition: 'Good', lastService: '20 Apr 2026' },
  { name: 'Bench Press', brand: 'Hammer Strength', count: 5, condition: 'Needs Repair', lastService: '10 Mar 2026' },
  { name: 'Cable Crossover', brand: 'Precor', count: 2, condition: 'Good', lastService: '25 May 2026' },
  { name: 'Exercise Bike', brand: 'Schwinn', count: 6, condition: 'Excellent', lastService: '05 Jun 2026' },
]

export default function SettingsEquipment() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Equipment</h1><p className="text-xs text-gray-500 mt-0.5">Track gym equipment inventory.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Equipment</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Brand</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Count</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Condition</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Last Service</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {equipment.map((e, i) => (
                <motion.tr key={e.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Dumbbell className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs font-medium text-white">{e.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.brand}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.count}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${e.condition === 'Excellent' ? 'text-emerald-400 bg-emerald-500/10' : e.condition === 'Good' ? 'text-blue-400 bg-blue-500/10' : 'text-red-400 bg-red-500/10'}`}>{e.condition === 'Needs Repair' && <AlertTriangle className="w-3 h-3" />}{e.condition}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.lastService}</td>
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
