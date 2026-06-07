import { motion } from 'framer-motion'
import { Plus, Fingerprint, Edit3, Trash2 } from 'lucide-react'

const devices = [
  { name: 'Main Entrance Scanner', type: 'Fingerprint', serial: 'BIO-001-A', status: 'Online', lastSync: '2 min ago' },
  { name: 'Floor 1 Scanner', type: 'Fingerprint', serial: 'BIO-001-B', status: 'Online', lastSync: '5 min ago' },
  { name: 'PT Area Scanner', type: 'Fingerprint', serial: 'BIO-001-C', status: 'Offline', lastSync: '2 hours ago' },
]

export default function SettingsBiometric() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Biometric Manager</h1><p className="text-xs text-gray-500 mt-0.5">Manage fingerprint scanners and devices.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Device</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {devices.map((d, i) => (
          <motion.div key={d.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center"><Fingerprint className="w-5 h-5 text-ydl-yellow" /></div>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${d.status === 'Online' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{d.status}</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{d.name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-gray-500">Type: <span className="text-gray-300">{d.type}</span></p>
              <p className="text-[10px] text-gray-500">Serial: <span className="text-gray-300">{d.serial}</span></p>
              <p className="text-[10px] text-gray-500">Last Sync: <span className="text-gray-300">{d.lastSync}</span></p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-ydl-dark-border">
              <button className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><Edit3 className="w-3 h-3" /> Edit</button>
              <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
