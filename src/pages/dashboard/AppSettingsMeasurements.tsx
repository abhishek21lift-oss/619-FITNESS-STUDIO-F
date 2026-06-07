import { motion } from 'framer-motion'
import { Activity, Plus, Edit3, Trash2 } from 'lucide-react'

const measurements = [
  { name: 'Weight', unit: 'kg', type: 'Numeric', required: true },
  { name: 'Height', unit: 'cm', type: 'Numeric', required: true },
  { name: 'Body Fat %', unit: '%', type: 'Numeric', required: false },
  { name: 'Chest', unit: 'cm', type: 'Numeric', required: false },
  { name: 'Waist', unit: 'cm', type: 'Numeric', required: false },
  { name: 'Hips', unit: 'cm', type: 'Numeric', required: false },
  { name: 'Biceps', unit: 'cm', type: 'Numeric', required: false },
  { name: 'Thighs', unit: 'cm', type: 'Numeric', required: false },
]

export default function AppSettingsMeasurements() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Measurement Settings</h1><p className="text-xs text-gray-500 mt-0.5">Configure client body measurement fields.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Field</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Field</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Unit</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Required</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {measurements.map((m, i) => (
                <motion.tr key={m.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs font-medium text-white">{m.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{m.unit}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{m.type}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${m.required ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{m.required ? 'Required' : 'Optional'}</span></td>
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
