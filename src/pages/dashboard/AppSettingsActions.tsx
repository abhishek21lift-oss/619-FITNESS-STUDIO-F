import { motion } from 'framer-motion'
import { Zap, Plus, Edit3, Trash2 } from 'lucide-react'

const actions = [
  { name: 'Send Birthday Wish', type: 'Auto', target: 'Members', schedule: 'Daily at 9 AM', active: true },
  { name: 'Expiry Reminder', type: 'Auto', target: 'Subscribers', schedule: '7 days before expiry', active: true },
  { name: 'Follow-up Reminder', type: 'Auto', target: 'Staff', schedule: 'Daily at 10 AM', active: true },
  { name: 'Renewal Offer', type: 'Manual', target: 'Expired', schedule: 'On demand', active: false },
  { name: 'New Member Welcome', type: 'Auto', target: 'New Members', schedule: 'Immediate', active: true },
]

export default function AppSettingsActions() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Action Items</h1><p className="text-xs text-gray-500 mt-0.5">Automated and manual system actions.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Action</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Target</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Schedule</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Active</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {actions.map((a, i) => (
                <motion.tr key={a.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-xs font-medium text-white">{a.name}</span></div></td>
                  <td className="px-4 py-3"><span className="text-[10px] font-medium text-gray-300 bg-white/5 px-2 py-0.5 rounded-md">{a.type}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.target}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.schedule}</td>
                  <td className="px-4 py-3"><div className={`w-8 h-4 rounded-full relative cursor-pointer ${a.active ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}><div className={`w-3 h-3 rounded-full absolute top-0.5 transition-all ${a.active ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} /></div></td>
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
