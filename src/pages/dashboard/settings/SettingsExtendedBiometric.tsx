import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Fingerprint, RefreshCw, Wifi, WifiOff, Edit3, Trash2 } from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import ActionMenu from '../../../components/shared/ActionMenu'
import StatsCard from '../../../components/shared/StatsCard'
import { useToast } from '../../../components/ui/Toast'

interface BiometricDevice {
  id: number
  name: string
  location: string
  serial: string
  status: 'Online' | 'Offline'
  lastSync: string
}

const initialDevices: BiometricDevice[] = [
  { id: 1, name: 'Main Entrance Scanner', location: 'Main Gate', serial: 'BIO-2024-001', status: 'Online', lastSync: '2 min ago' },
  { id: 2, name: 'Floor 1 Scanner', location: 'First Floor', serial: 'BIO-2024-002', status: 'Online', lastSync: '5 min ago' },
  { id: 3, name: 'PT Area Scanner', location: 'PT Section', serial: 'BIO-2024-003', status: 'Offline', lastSync: '2 hours ago' },
  { id: 4, name: 'VIP Lounge Scanner', location: 'VIP Area', serial: 'BIO-2024-004', status: 'Online', lastSync: '1 min ago' },
  { id: 5, name: 'Pool Entry Scanner', location: 'Pool Area', serial: 'BIO-2024-005', status: 'Offline', lastSync: '1 day ago' },
]

export default function SettingsExtendedBiometric() {
  const [devices, setDevices] = useState<BiometricDevice[]>(initialDevices)
  const [addOpen, setAddOpen] = useState(false)
  const [editDevice, setEditDevice] = useState<BiometricDevice | null>(null)
  const [form, setForm] = useState({ name: '', location: '', serial: '' })
  const [syncingId, setSyncingId] = useState<number | null>(null)
  const { toast } = useToast()

  const openAdd = () => {
    setEditDevice(null)
    setForm({ name: '', location: '', serial: '' })
    setAddOpen(true)
  }

  const openEdit = (d: BiometricDevice) => {
    setEditDevice(d)
    setForm({ name: d.name, location: d.location, serial: d.serial })
    setAddOpen(true)
  }

  const handleSave = () => {
    if (editDevice) {
      setDevices(prev => prev.map(d => d.id === editDevice.id ? { ...d, ...form } : d))
    } else {
      setDevices(prev => [...prev, { ...form, id: Date.now(), status: 'Offline', lastSync: 'Never' }])
    }
    setAddOpen(false)
  }

  const handleSync = (id: number) => {
    setSyncingId(id)
    setTimeout(() => {
      setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'Online', lastSync: 'Just now' } : d))
      setSyncingId(null)
      toast(`Device synced`, 'success')
    }, 2000)
  }

  const removeDevice = (id: number) => {
    setDevices(prev => prev.filter(d => d.id !== id))
  }

  const connectedCount = devices.filter(d => d.status === 'Online').length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Extended Biometric</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage biometric devices across all locations.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Connected" value={`${connectedCount} / ${devices.length}`} icon={Fingerprint} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Online" value={connectedCount} icon={Wifi} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Offline" value={devices.length - connectedCount} icon={WifiOff} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Device Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Location</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Serial #</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Last Sync</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apple-gray-200/50">
            {devices.map((d, i) => (
              <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><Fingerprint className="w-3.5 h-3.5 text-apple-blue" /><span className="text-xs font-medium text-[#1C1C1E]">{d.name}</span></div></td>
                <td className="px-4 py-3 text-xs text-apple-gray-400">{d.location}</td>
                <td className="px-4 py-3 text-xs text-apple-gray-400 font-mono">{d.serial}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${d.status === 'Online' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                    {d.status === 'Online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-apple-gray-400">{d.lastSync}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => handleSync(d.id)} disabled={syncingId === d.id} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-apple-blue bg-apple-blue/10 border border-ydl-yellow/20 rounded-lg hover:bg-apple-blue/20 disabled:opacity-40">
                      <RefreshCw className={`w-3 h-3 ${syncingId === d.id ? 'animate-spin' : ''}`} /> Sync
                    </button>
                    <ActionMenu actions={[
                      { label: 'Edit', icon: Edit3, onClick: () => openEdit(d) },
                      { label: 'Delete', icon: Trash2, onClick: () => removeDevice(d.id), color: 'text-red-400' },
                    ]} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={editDevice ? 'Edit Device' : 'Add Device'} size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Device Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Main Entrance Scanner" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Location</label>
            <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Main Gate" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Serial #</label>
            <input value={form.serial} onChange={e => setForm(p => ({ ...p, serial: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="BIO-2024-001" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editDevice ? 'Update' : 'Add'} Device</button>
          <button onClick={() => setAddOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

