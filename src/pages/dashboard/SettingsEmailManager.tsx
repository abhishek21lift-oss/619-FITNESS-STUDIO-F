import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Send, Server, Key, Globe, Mail, User, Eye, EyeOff } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

export default function SettingsEmailManager() {
  const [host, setHost] = useState('')
  const [port, setPort] = useState('587')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [fromName, setFromName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setSaved(true)
    toast('Email settings saved', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTest = () => {
    toast('Test email sent to your registered email', 'success')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Email Manager</h1>
        <p className="text-xs text-gray-500 mt-0.5">Configure SMTP server for outgoing emails.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Server className="w-3 h-3" /> SMTP Host</label>
            <input value={host} onChange={e => setHost(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="smtp.gmail.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Globe className="w-3 h-3" /> Port</label>
            <input value={port} onChange={e => setPort(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="587" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><User className="w-3 h-3" /> Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="admin@yourdomain.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Key className="w-3 h-3" /> Password</label>
            <div className="relative">
              <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 pr-8" placeholder="SMTP password" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Mail className="w-3 h-3" /> From Email</label>
            <input value={fromEmail} onChange={e => setFromEmail(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="noreply@yourdomain.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><User className="w-3 h-3" /> From Name</label>
            <input value={fromName} onChange={e => setFromName(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="YourDigitalLift" />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-ydl-dark-border">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
            <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
          <button onClick={handleTest} className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">
            <Send className="w-3.5 h-3.5" /> Test Email
          </button>
        </div>
      </motion.div>
    </div>
  )
}
