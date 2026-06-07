import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Shield, Save, Send } from 'lucide-react'
import Modal from '../../components/shared/Modal'

export default function NotificationsEmail() {
  const [host, setHost] = useState('smtp.sendgrid.net')
  const [port, setPort] = useState('587')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fromEmail, setFromEmail] = useState('noreply@yourdigitallift.com')
  const [fromName, setFromName] = useState('Your Digital Lift')
  const [subject, setSubject] = useState('Welcome to Your Digital Lift!')
  const [body, setBody] = useState('')
  const [testOpen, setTestOpen] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [connected] = useState(true)
  const [saved, setSaved] = useState(false)
  const [templateMode, setTemplateMode] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTestSend = () => {
    setTestOpen(false)
    setTestEmail('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Email Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">SMTP and email delivery configuration.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        {connected ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div><p className="text-xs font-semibold text-emerald-400">SMTP Connected</p><p className="text-[10px] text-emerald-300/70">All systems operational.</p></div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <div><p className="text-xs font-semibold text-red-400">Connection Failed</p><p className="text-[10px] text-red-300/70">Check your SMTP settings.</p></div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setTemplateMode(false)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${!templateMode ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500'}`}>SMTP Settings</button>
          <button onClick={() => setTemplateMode(true)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${templateMode ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500'}`}>Template Editor</button>
        </div>

        {!templateMode ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-gray-400">SMTP Host</label>
                <input value={host} onChange={e => setHost(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-gray-400">Port</label>
                <input value={port} onChange={e => setPort(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-gray-400">Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-gray-400">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-gray-400">From Email</label>
                <input value={fromEmail} onChange={e => setFromEmail(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-gray-400">From Name</label>
                <input value={fromName} onChange={e => setFromName(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-gray-400">Email Subject</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-gray-400">Email Body (HTML)</label>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={8} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none font-mono" placeholder="<html><body>Your email content here...</body></html>" />
            </div>
            <div className="rounded-lg bg-white/[0.02] border border-ydl-dark-border p-3">
              <p className="text-[9px] font-medium text-gray-500 mb-1">Available Variables</p>
              <div className="flex flex-wrap gap-1">
                {['{{name}}', '{{email}}', '{{phone}}', '{{membership}}', '{{expiry}}'].map(v => (
                  <span key={v} className="text-[9px] text-ydl-yellow bg-ydl-yellow/10 px-1.5 py-0.5 rounded">{v}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
            <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
          <button onClick={() => setTestOpen(true)} className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">
            <Send className="w-3.5 h-3.5" /> Test Email
          </button>
        </div>
      </motion.div>

      <Modal open={testOpen} onClose={() => setTestOpen(false)} title="Send Test Email" size="sm">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Recipient Email</label>
          <input value={testEmail} onChange={e => setTestEmail(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="admin@example.com" />
        </div>
        <p className="text-[10px] text-gray-600 mt-2">A test email will be sent from {fromEmail} using the current SMTP configuration.</p>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleTestSend} disabled={!testEmail} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">Send Test</button>
          <button onClick={() => setTestOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
