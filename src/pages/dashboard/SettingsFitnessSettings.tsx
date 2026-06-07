import { motion } from 'framer-motion'
import { Clock, Users, DollarSign, ToggleLeft, Save } from 'lucide-react'

export default function SettingsFitnessSettings() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Fitness Settings</h1><p className="text-xs text-gray-500 mt-0.5">Global settings for your fitness center.</p></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <div><p className="text-xs text-white">Operating Hours</p><p className="text-[10px] text-gray-500">05:00 - 22:00</p></div>
            </div>
            <button className="text-[10px] font-medium text-ydl-yellow hover:underline">Edit</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-gray-500" />
              <div><p className="text-xs text-white">Max Capacity</p><p className="text-[10px] text-gray-500">80 members at a time</p></div>
            </div>
            <button className="text-[10px] font-medium text-ydl-yellow hover:underline">Edit</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div className="flex items-center gap-3">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <div><p className="text-xs text-white">GST Rate</p><p className="text-[10px] text-gray-500">18%</p></div>
            </div>
            <button className="text-[10px] font-medium text-ydl-yellow hover:underline">Edit</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
            <div className="flex items-center gap-3">
              <ToggleLeft className="w-4 h-4 text-gray-500" />
              <div><p className="text-xs text-white">Enable Online Booking</p></div>
            </div>
            <div className="w-10 h-5 rounded-full bg-ydl-yellow/30 relative cursor-pointer"><div className="w-4 h-4 rounded-full bg-ydl-yellow absolute right-0.5 top-0.5" /></div>
          </div>
        </div>
        <button className="mt-6 w-full py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Save className="w-3.5 h-3.5 inline mr-1" /> Save Settings</button>
      </motion.div>
    </div>
  )
}
