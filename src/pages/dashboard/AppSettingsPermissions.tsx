import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'

interface Permission {
  key: string
  name: string
  desc: string
  enabled: boolean
}

const initialPermissions: Permission[] = [
  { key: 'member_app', name: 'Member App Access', desc: 'Allow members to log in to the mobile app', enabled: true },
  { key: 'trainer_app', name: 'Trainer App Access', desc: 'Allow trainers to access their dashboard', enabled: true },
  { key: 'online_payment', name: 'Online Payment', desc: 'Accept payments through the app', enabled: true },
  { key: 'whatsapp', name: 'WhatsApp Notifications', desc: 'Send notifications via WhatsApp', enabled: true },
  { key: 'sms', name: 'SMS Notifications', desc: 'Send SMS alerts and reminders', enabled: false },
  { key: 'email', name: 'Email Notifications', desc: 'Send email communications', enabled: true },
  { key: 'qr_attendance', name: 'QR Attendance', desc: 'Allow QR code based check-in', enabled: true },
  { key: 'biometric', name: 'Biometric', desc: 'Enable fingerprint scanner integration', enabled: false },
  { key: 'class_booking', name: 'Class Booking', desc: 'Allow members to book classes online', enabled: true },
  { key: 'enquiry_form', name: 'Enquiry Form', desc: 'Show enquiry form on website', enabled: true },
  { key: 'referral', name: 'Referral System', desc: 'Enable referral bonus program', enabled: false },
  { key: 'diet_plans', name: 'Diet Plans', desc: 'Provide diet plan access in the app', enabled: true },
  { key: 'workout_plans', name: 'Workout Plans', desc: 'Provide workout plan access in the app', enabled: true },
  { key: 'community', name: 'Community Feed', desc: 'Enable community posts and interactions', enabled: false },
  { key: 'challenges', name: 'Challenges', desc: 'Enable fitness challenges', enabled: true },
  { key: 'wallet', name: 'Wallet System', desc: 'Enable digital wallet and transactions', enabled: false },
  { key: 'ecommerce', name: 'E-commerce', desc: 'Enable merchandise store', enabled: false },
  { key: 'auto_renewal', name: 'Auto Renewal', desc: 'Auto-renew subscriptions on expiry', enabled: true },
  { key: 'late_fee', name: 'Late Fee Auto Calculation', desc: 'Auto-calculate late fees on renewals', enabled: true },
  { key: 'member_self_checkin', name: 'Member Self Check-in', desc: 'Allow members to check in via app', enabled: true },
]

export default function AppSettingsPermissions() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)
  const [saved, setSaved] = useState(false)

  const toggle = (key: string) => {
    setPermissions(prev => prev.map(p => p.key === key ? { ...p, enabled: !p.enabled } : p))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Permissions</h1><p className="text-xs text-gray-500 mt-0.5">On/Off toggles for app features.</p></div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="space-y-2">
          {permissions.map((p) => (
            <div key={p.key} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-white">{p.name}</p>
                </div>
                <p className="text-[9px] text-gray-500 mt-0.5">{p.desc}</p>
              </div>
              <div onClick={() => toggle(p.key)} className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${p.enabled ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${p.enabled ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
            <Save className="w-3.5 h-3.5 inline mr-1" /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button onClick={() => setPermissions(prev => prev.map(p => ({ ...p, enabled: true }))) } className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Enable All</button>
          <button onClick={() => setPermissions(prev => prev.map(p => ({ ...p, enabled: false }))) } className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Disable All</button>
        </div>
      </motion.div>
    </div>
  )
}
