import { motion } from 'framer-motion'
import { CheckCircle, Settings, CreditCard, DollarSign } from 'lucide-react'

export default function NotificationsSMS() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">SMS Settings</h1><p className="text-xs text-gray-500 mt-0.5">SMS gateway configuration.</p></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
          <CreditCard className="w-5 h-5 text-amber-400" />
          <div><p className="text-xs font-semibold text-amber-400">SMS Credits: 1,247</p><p className="text-[10px] text-amber-300/70">Low balance — recharge soon.</p></div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Gateway Provider</p><p className="text-[10px] text-gray-500 mt-0.5">MSG91</p></div>
            <Settings className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Sender ID</p><p className="text-[10px] text-gray-500 mt-0.5">YDLIFT</p></div>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div><p className="text-xs text-white">Rate per SMS</p><p className="text-[10px] text-gray-500 mt-0.5">₹0.25</p></div>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <button className="mt-4 w-full py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Recharge Credits</button>
      </motion.div>
    </div>
  )
}
