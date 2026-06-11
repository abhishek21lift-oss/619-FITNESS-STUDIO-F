import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, CreditCard, DollarSign, Send, Save } from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import StatsCard from '../../../components/shared/StatsCard'

const providers = ['MSG91', 'Twilio', 'TextLocal']

export default function NotificationsSMS() {
  const [provider, setProvider] = useState('MSG91')
  const [apiKey, setApiKey] = useState('')
  const [senderId, setSenderId] = useState('YDLIFT')
  const [balance, setBalance] = useState(1247)
  const [sentToday, setSentToday] = useState(42)
  const [testOpen, setTestOpen] = useState(false)
  const [testPhone, setTestPhone] = useState('')
  const [testMsg, setTestMsg] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTestSend = () => {
    setSentToday(s => s + 1)
    setBalance(b => b - 1)
    setTestOpen(false)
    setTestPhone('')
    setTestMsg('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">SMS Settings</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">SMS gateway configuration.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="SMS Balance" value={`${balance}`} icon={CreditCard} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
        <StatsCard label="Sent Today" value={sentToday} icon={Send} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Rate/SMS" value="₹0.25" icon={DollarSign} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-2xl">
        {balance < 1500 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <div><p className="text-xs font-semibold text-amber-400">Low Balance: {balance} credits</p><p className="text-[10px] text-amber-300/70">Recharge soon to avoid service disruption.</p></div>
          </div>
        )}

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Provider</label>
            <div className="relative">
              <Settings className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={provider} onChange={e => setProvider(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {providers.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">API Key</label>
            <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="password" className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Enter your API key" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Sender ID</label>
            <input value={senderId} onChange={e => setSenderId(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="6 character Sender ID" maxLength={6} />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
          <button onClick={() => setTestOpen(true)} className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <Send className="w-3.5 h-3.5" /> Test SMS
          </button>
          <button className="px-4 py-2 text-xs font-medium text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500/10 transition-colors">
            <DollarSign className="w-3.5 h-3.5 inline mr-1" />Recharge Credits
          </button>
        </div>
      </motion.div>

      <Modal open={testOpen} onClose={() => setTestOpen(false)} title="Send Test SMS" size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Phone Number</label>
            <input value={testPhone} onChange={e => setTestPhone(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="+91 9876543210" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Message</label>
            <textarea value={testMsg} onChange={e => setTestMsg(e.target.value)} rows={3} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Type test message..." />
            <p className="text-[9px] text-apple-gray-400">{testMsg.length}/160 characters (1 SMS)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleTestSend} disabled={!testPhone || !testMsg} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">Send Test</button>
          <button onClick={() => setTestOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

