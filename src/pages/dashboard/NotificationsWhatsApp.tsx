import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, RefreshCw, Settings, Send, QrCode, X, MessageSquare, BarChart3 } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'

const templates = [
  { name: 'Welcome Message', category: 'Utility', status: 'Approved', lastUsed: '07 Jun 2026' },
  { name: 'Payment Confirmation', category: 'Utility', status: 'Approved', lastUsed: '07 Jun 2026' },
  { name: 'Reminder', category: 'Utility', status: 'Approved', lastUsed: '06 Jun 2026' },
  { name: 'Promotional Offer', category: 'Marketing', status: 'Pending', lastUsed: 'Never' },
]

export default function NotificationsWhatsApp() {
  const [connected, setConnected] = useState(true)
  const [qrOpen, setQrOpen] = useState(false)
  const [disconnectOpen, setDisconnectOpen] = useState(false)
  const [testOpen, setTestOpen] = useState(false)
  const [testPhone, setTestPhone] = useState('')
  const [testMsg, setTestMsg] = useState('')
  const [sentCount, setSentCount] = useState(0)

  const handleDisconnect = () => {
    setConnected(false)
    setDisconnectOpen(false)
  }

  const handleReconnect = () => {
    setQrOpen(true)
  }

  const handleSendTest = () => {
    setSentCount(s => s + 1)
    setTestOpen(false)
    setTestPhone('')
    setTestMsg('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">WhatsApp Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">Configure WhatsApp Business API integration.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Sent Today" value={sentCount} icon={Send} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Failed" value="0" icon={X} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Delivery Rate" value="100%" icon={BarChart3} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        {connected ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div><p className="text-xs font-semibold text-emerald-400">WhatsApp Connected</p><p className="text-[10px] text-emerald-300/70">QR code scanned and active.</p></div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
            <X className="w-5 h-5 text-red-400" />
            <div><p className="text-xs font-semibold text-red-400">WhatsApp Disconnected</p><p className="text-[10px] text-red-300/70">Scan QR code to reconnect.</p></div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Phone Number ID</p><p className="text-[10px] text-gray-500 mt-0.5">+91 9876543210</p></div>
            <Settings className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Business Account</p><p className="text-[10px] text-gray-500 mt-0.5">YourDigitalLift</p></div>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Template Messages</p><p className="text-[10px] text-gray-500 mt-0.5">{templates.filter(t => t.status === 'Approved').length} templates approved</p></div>
            <span className="text-[10px] font-medium text-ydl-yellow">Manage</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xs font-semibold text-white mb-2">Templates</h3>
          <div className="space-y-2">
            {templates.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-ydl-dark-border">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-ydl-yellow" />
                  <div>
                    <p className="text-[11px] font-medium text-white">{t.name}</p>
                    <p className="text-[9px] text-gray-600">{t.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${t.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>{t.status}</span>
                  <button onClick={() => { setTestPhone(''); setTestMsg(`Hello! This is a test of the ${t.name} template.`); setTestOpen(true) }} className="text-[9px] text-ydl-yellow hover:underline">Send Test</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          {connected ? (
            <>
              <button onClick={handleReconnect} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><RefreshCw className="w-3.5 h-3.5" /> Re-scan QR</button>
              <button onClick={() => setDisconnectOpen(true)} className="px-4 py-2 text-xs font-medium text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10">Disconnect</button>
            </>
          ) : (
            <button onClick={handleReconnect} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><QrCode className="w-3.5 h-3.5" /> Scan QR Code</button>
          )}
        </div>
      </motion.div>

      <Modal open={qrOpen} onClose={() => setQrOpen(false)} title="Scan QR Code" size="sm">
        <div className="flex flex-col items-center p-4">
          <div className="w-48 h-48 rounded-xl bg-white p-3 flex items-center justify-center mb-3">
            <QrCode className="w-full h-full text-black" />
          </div>
          <p className="text-xs text-gray-400 text-center">Open WhatsApp on your phone and scan this QR code to connect.</p>
          <p className="text-[10px] text-gray-600 mt-2">QR code expires in 5:00 minutes</p>
          <button onClick={() => setQrOpen(false)} className="mt-4 px-6 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">I've Scanned the Code</button>
        </div>
      </Modal>

      <Modal open={disconnectOpen} onClose={() => setDisconnectOpen(false)} title="Disconnect WhatsApp" size="sm">
        <p className="text-xs text-gray-400 mb-4">Are you sure you want to disconnect WhatsApp? All automated messaging will stop until you reconnect.</p>
        <div className="flex items-center gap-2">
          <button onClick={handleDisconnect} className="flex-1 py-2 text-xs font-semibold text-white bg-red-500/80 rounded-lg hover:bg-red-500">Disconnect</button>
          <button onClick={() => setDisconnectOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={testOpen} onClose={() => setTestOpen(false)} title="Send Test Message" size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Phone Number</label>
            <input value={testPhone} onChange={e => setTestPhone(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="+91 9876543210" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Message</label>
            <textarea value={testMsg} onChange={e => setTestMsg(e.target.value)} rows={3} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSendTest} disabled={!testPhone} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">Send Test</button>
          <button onClick={() => setTestOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
