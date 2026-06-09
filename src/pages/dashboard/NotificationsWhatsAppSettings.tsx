import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Key, Globe, MessageSquare, ToggleLeft, Eye, EyeOff } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

export default function NotificationsWhatsAppSettings() {
  const [apiKey, setApiKey] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [autoReply, setAutoReply] = useState('')
  const [sendTemplate, setSendTemplate] = useState('')
  const [status, setStatus] = useState('active')
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setSaved(true)
    toast('WhatsApp settings saved', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">WhatsApp Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">Configure WhatsApp Business API credentials and behavior.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Key className="w-3 h-3" /> API Key</label>
          <div className="relative">
            <input value={apiKey} onChange={e => setApiKey(e.target.value)} type={showKey ? 'text' : 'password'} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 pr-8" placeholder="Enter WhatsApp API key" />
            <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Globe className="w-3 h-3" /> Webhook URL</label>
          <input value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="https://yourdomain.com/webhook/whatsapp" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Auto-reply Message</label>
          <textarea value={autoReply} onChange={e => setAutoReply(e.target.value)} rows={3} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Thank you for reaching out! We'll get back to you shortly." />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Default Send Template</label>
          <input value={sendTemplate} onChange={e => setSendTemplate(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="welcome_template" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><ToggleLeft className="w-3 h-3" /> Status</label>
          <div className="flex items-center gap-3">
            {(['active', 'inactive'] as const).map(s => (
              <label key={s} className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer border transition-colors ${status === s ? 'text-ydl-yellow bg-ydl-yellow/10 border-ydl-yellow/30' : 'text-gray-400 bg-white/5 border-ydl-dark-border hover:text-white'}`}>
                <input type="radio" name="status" checked={status === s} onChange={() => setStatus(s)} className="w-3 h-3 accent-ydl-yellow" />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-ydl-dark-border">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
            <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
          <button className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Reset</button>
        </div>
      </motion.div>
    </div>
  )
}
