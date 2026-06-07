import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Fingerprint, Edit3, Trash2, WifiOff, RefreshCw } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Device {
  id: number
  name: string
  location: string
  model: string
  status: 'Online' | 'Offline'
  lastSync: string
}

const initialDevices: Device[] = [
  { id: 1, name: 'Main Entrance Scanner', location: 'Main Gate', model: 'BioStar V2', status: 'Online', lastSync: '2 min ago' },
  { id: 2, name: 'Floor 1 Scanner', location: 'First Floor', model: 'BioStar V2', status: 'Online', lastSync: '5 min ago' },
  { id: 3, name: 'PT Area Scanner', location: 'PT Section', model: 'BioLite Pro', status: 'Offline', lastSync: '2 hours ago' },
  { id: 4, name: 'VIP Lounge Scanner', location: 'VIP Area', model: 'BioStar V3', status: 'Online', lastSync: '1 min ago' },
]

export default function SettingsBiometric() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [addOpen, setAddOpen] = useState(false)
  const [syncOpen, setSyncOpen] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [editDevice, setEditDevice] = useState<Device | null>(null)
  const [form, setForm] = useState({ name: '', location: '', model: '' })
  const [todaySyncs, setTodaySyncs] = useState(3)

  const openAdd = () => {
    setEditDevice(null)
    setForm({ name: '', location: '', model: '' })
    setAddOpen(true)
  }

  const openEdit = (d: Device) => {
    setEditDevice(d)
    setForm({ name: d.name, location: d.location, model: d.model })
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

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setSyncOpen(false)
      setTodaySyncs(s => s + 1)
      setDevices(prev => prev.map(d => ({ ...d, lastSync: 'Just now', status: 'Online' as const })))
    }, 3000)
  }

  const testConnection = (id: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'Online', lastSync: 'Just now' } : d))
  }

  const removeDevice = (id: number) => {
    setDevices(prev => prev.filter(d => d.id !== id))
  }

  const connectedCount = devices.filter(d => d.status === 'Online').length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Biometric Manager</h1><p className="text-xs text-gray-500 mt-0.5">Manage fingerprint scanners and devices.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSyncOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><RefreshCw className="w-3.5 h-3.5" /> Sync Now</button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Device</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Connected Devices" value={`${connectedCount} / ${devices.length}`} icon={Fingerprint} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Today's Syncs" value={todaySyncs} icon={RefreshCw} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Offline" value={devices.length - connectedCount} icon={WifiOff} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Device Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Location</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Model</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Last Sync</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ydl-dark-border/50">
            {devices.map((d, i) => (
              <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><Fingerprint className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-xs font-medium text-white">{d.name}</span></div></td>
                <td className="px-4 py-3 text-xs text-gray-400">{d.location}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{d.model}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${
                    d.status === 'Online' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'
                  }`}>
                    {d.status === 'Online' ? <WifiIcon className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{d.lastSync}</td>
                <td className="px-4 py-3 text-right">
                  <ActionMenu actions={[
                    { label: 'Edit', icon: Edit3, onClick: () => openEdit(d) },
                    { label: 'Test Connection', icon: WifiIcon, onClick: () => testConnection(d.id) },
                    { label: 'Delete', icon: Trash2, onClick: () => removeDevice(d.id), color: 'text-red-400' },
                  ]} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={editDevice ? 'Edit Device' : 'Add Device'} size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Device Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Main Entrance Scanner" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Location / IP</label>
            <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Main Gate or 192.168.1.100" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Model</label>
            <select value={form.model} onChange={e => setForm(p => ({ ...p, model: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option>BioStar V2</option>
              <option>BioStar V3</option>
              <option>BioLite Pro</option>
              <option>BioLite Lite</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editDevice ? 'Update' : 'Add'} Device</button>
          <button onClick={() => setAddOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={syncOpen} onClose={() => { if (!syncing) setSyncOpen(false) }} title="Sync Devices" size="sm">
        <div className="flex flex-col items-center py-4">
          {syncing ? (
            <>
              <RefreshCw className="w-12 h-12 text-ydl-yellow animate-spin mb-3" />
              <p className="text-xs text-white font-medium">Syncing all devices...</p>
              <p className="text-[10px] text-gray-500 mt-1">Please wait while we sync with {devices.length} devices.</p>
              <div className="w-full bg-white/[0.03] rounded-lg h-2 mt-4 overflow-hidden">
                <div className="h-full bg-ydl-yellow/40 animate-pulse rounded-lg" style={{ width: '60%' }} />
              </div>
            </>
          ) : (
            <>
              <RefreshCw className="w-12 h-12 text-ydl-yellow mb-3" />
              <p className="text-xs text-white font-medium">Sync {devices.length} Devices</p>
              <p className="text-[10px] text-gray-500 mt-1">This will sync all biometric data from connected devices.</p>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={handleSync} className="px-6 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Start Sync</button>
                <button onClick={() => setSyncOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

function WifiIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" />
    </svg>
  )
}
