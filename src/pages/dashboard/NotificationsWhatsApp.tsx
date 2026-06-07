import { motion } from 'framer-motion'
import { CheckCircle, RefreshCw, Settings } from 'lucide-react'

export default function NotificationsWhatsApp() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">WhatsApp Settings</h1><p className="text-xs text-gray-500 mt-0.5">Configure WhatsApp Business API integration.</p></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div><p className="text-xs font-semibold text-emerald-400">WhatsApp Connected</p><p className="text-[10px] text-emerald-300/70">QR code scanned and active.</p></div>
        </div>
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
            <div><p className="text-xs text-white">Template Messages</p><p className="text-[10px] text-gray-500 mt-0.5">3 templates approved</p></div>
            <span className="text-[10px] font-medium text-ydl-yellow">Manage</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><RefreshCw className="w-3.5 h-3.5" /> Re-scan QR</button>
          <button className="px-4 py-2 text-xs font-medium text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10">Disconnect</button>
        </div>
      </motion.div>
    </div>
  )
}
