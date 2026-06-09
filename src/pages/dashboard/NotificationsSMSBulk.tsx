import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Users, Upload, MessageSquare, DollarSign, AlertTriangle } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import { useToast } from '../../components/ui/Toast'

const audienceOptions = ['All Active Members', 'All Members', 'Custom (Upload CSV)']

export default function NotificationsSMSBulk() {
  const [message, setMessage] = useState('')
  const [audience, setAudience] = useState('All Active Members')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const smsCount = audience === 'All Active Members' ? 156 : audience === 'All Members' ? 248 : 0
  const costPerSms = 0.25
  const estimatedCost = smsCount * costPerSms

  const handleSend = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setConfirmOpen(false)
      toast(`Bulk SMS sent to ${smsCount} recipients`, 'success')
      setMessage('')
    }, 2000)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Bulk SMS</h1>
        <p className="text-xs text-gray-500 mt-0.5">Send SMS to multiple members at once.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Message</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Type your message here..." />
          <div className="flex justify-between">
            <span className="text-[10px] text-gray-600">{message.length} characters</span>
            <span className="text-[10px] text-gray-600">{Math.ceil(message.length / 160)} SMS segment(s)</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5"><Users className="w-3 h-3" /> Audience</label>
          <div className="space-y-2">
            {audienceOptions.map(a => (
              <label key={a} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${audience === a ? 'border-ydl-yellow/40 bg-ydl-yellow/[0.03]' : 'border-ydl-dark-border bg-white/[0.02] hover:bg-white/[0.04]'}`}>
                <input type="radio" name="audience" checked={audience === a} onChange={() => setAudience(a)} className="w-3.5 h-3.5 accent-ydl-yellow" />
                <div>
                  <p className="text-xs font-medium text-white">{a}</p>
                  {a === 'All Active Members' && <p className="text-[10px] text-gray-600">156 active members with valid phone numbers</p>}
                  {a === 'All Members' && <p className="text-[10px] text-gray-600">248 total members including inactive</p>}
                  {a === 'Custom (Upload CSV)' && <p className="text-[10px] text-gray-600">Upload a CSV with phone numbers</p>}
                </div>
              </label>
            ))}
          </div>
        </div>

        {audience === 'Custom (Upload CSV)' && (
          <div className="p-4 rounded-lg border-2 border-dashed border-ydl-dark-border bg-white/[0.01] flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <p className="text-xs text-gray-400">Drop CSV file here or click to browse</p>
            <p className="text-[10px] text-gray-600 mt-1">CSV must have a 'phone' column</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
          <div><p className="text-[10px] text-gray-500">Recipients</p><p className="text-sm font-bold text-white">{smsCount}</p></div>
          <div><p className="text-[10px] text-gray-500">Estimated Cost</p><p className="text-sm font-bold text-ydl-yellow">₹{estimatedCost.toFixed(2)}</p></div>
        </div>

        <div className="pt-4 border-t border-ydl-dark-border">
          <button onClick={() => setConfirmOpen(true)} disabled={!message.trim()} className="flex items-center gap-2 px-6 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">
            <Send className="w-3.5 h-3.5" /> Send SMS
          </button>
        </div>
      </motion.div>

      <Modal open={confirmOpen} onClose={() => { if (!sending) setConfirmOpen(false) }} title="Confirm Bulk SMS" size="sm">
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-400">This will send SMS to {smsCount} recipients</p>
              <p className="text-[10px] text-amber-300/70 mt-1">Estimated cost: ₹{estimatedCost.toFixed(2)} ({smsCount} SMS × ₹{costPerSms})</p>
            </div>
          </div>
          <p className="text-sm font-medium text-white">"{message.slice(0, 60)}{message.length > 60 ? '...' : ''}"</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSend} disabled={sending} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">
            {sending ? 'Sending...' : `Send to ${smsCount} recipients`}
          </button>
          <button onClick={() => setConfirmOpen(false)} disabled={sending} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white disabled:opacity-40">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
