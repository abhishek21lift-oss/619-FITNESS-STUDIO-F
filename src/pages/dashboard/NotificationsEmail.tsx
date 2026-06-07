import { motion } from 'framer-motion'
import { Mail, CheckCircle, Globe, Shield } from 'lucide-react'

export default function NotificationsEmail() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Email Settings</h1><p className="text-xs text-gray-500 mt-0.5">SMTP and email delivery configuration.</p></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div><p className="text-xs font-semibold text-emerald-400">SMTP Connected</p><p className="text-[10px] text-emerald-300/70">All systems operational.</p></div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">SMTP Host</p><p className="text-[10px] text-gray-500 mt-0.5">smtp.sendgrid.net</p></div>
            <Globe className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">From Address</p><p className="text-[10px] text-gray-500 mt-0.5">noreply@yourdigitallift.com</p></div>
            <Mail className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Security</p><p className="text-[10px] text-gray-500 mt-0.5">TLS 1.2</p></div>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Daily Limit</p><p className="text-[10px] text-gray-500 mt-0.5">500 emails/day</p></div>
            <span className="text-[10px] text-gray-400">342 used today</span>
          </div>
        </div>
        <button className="mt-4 w-full py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Test Email</button>
      </motion.div>
    </div>
  )
}
