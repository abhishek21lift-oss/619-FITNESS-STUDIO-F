import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Send, Key, Globe, Hash, ToggleLeft } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

export default function NotificationsSMSSettings() {
  const [senderId, setSenderId] = useState('YDLIFT')
  const [dltNumber, setDltNumber] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [apiUrl, setApiUrl] = useState('')
  const [status, setStatus] = useState('active')
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setSaved(true)
    toast('SMS settings saved', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTest = () => {
    toast('Test SMS sent to registered number', 'success')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">SMS Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">SMS gateway and DLT configuration.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Hash className="w-3 h-3" /> Sender ID</label>
          <input value={senderId} onChange={e => setSenderId(e.target.value)} maxLength={6} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 uppercase" placeholder="6 char Sender ID" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Hash className="w-3 h-3" /> DLT Number</label>
          <input value={dltNumber} onChange={e => setDltNumber(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="DLT principal entity number" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Key className="w-3 h-3" /> API Key</label>
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="password" className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Enter SMS API key" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Globe className="w-3 h-3" /> API URL</label>
          <input value={apiUrl} onChange={e => setApiUrl(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="https://api.smsgateway.com/send" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><ToggleLeft className="w-3 h-3" /> Status</label>
          <div className="flex items-center gap-3">
            {(['active', 'inactive'] as const).map(s => (
              <label key={s} className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer border transition-colors ${status === s ? 'text-ydl-yellow bg-ydl-yellow/10 border-ydl-yellow/30' : 'text-gray-400 bg-white/5 border-ydl-dark-border hover:text-white'}`}>
                <input type="radio" name="smsStatus" checked={status === s} onChange={() => setStatus(s)} className="w-3 h-3 accent-ydl-yellow" />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-ydl-dark-border">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
            <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
          <button onClick={handleTest} className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">
            <Send className="w-3.5 h-3.5" /> Test SMS
          </button>
        </div>
      </motion.div>
    </div>
  )
}
