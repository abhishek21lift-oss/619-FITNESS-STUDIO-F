import { motion } from 'framer-motion'
import { Save } from 'lucide-react'

const permissions = [
  { name: 'Online Booking', enabled: true, desc: 'Allow members to book classes online' },
  { name: 'Auto Renewal', enabled: true, desc: 'Auto-renew subscriptions on expiry' },
  { name: 'WhatsApp Notifications', enabled: true, desc: 'Send notifications via WhatsApp' },
  { name: 'SMS Notifications', enabled: false, desc: 'Send SMS alerts and reminders' },
  { name: 'Email Notifications', enabled: true, desc: 'Send email communications' },
  { name: 'Member Self Check-in', enabled: true, desc: 'Allow members to check in via app' },
  { name: 'Referral Rewards', enabled: false, desc: 'Enable referral bonus system' },
  { name: 'Late Fee Auto Calculation', enabled: true, desc: 'Auto-calculate late fees on renewals' },
]

export default function AppSettingsPermissions() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Permissions</h1><p className="text-xs text-gray-500 mt-0.5">On/Off toggles for app features.</p></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="space-y-2">
          {permissions.map((p) => (
            <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <div><p className="text-xs text-white">{p.name}</p><p className="text-[9px] text-gray-500 mt-0.5">{p.desc}</p></div>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${p.enabled ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${p.enabled ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Save className="w-3.5 h-3.5 inline mr-1" /> Save Changes</button>
      </motion.div>
    </div>
  )
}
