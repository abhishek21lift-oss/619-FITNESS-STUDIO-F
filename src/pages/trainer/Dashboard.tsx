import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, CalendarCheck, Loader2 } from 'lucide-react'
import { api } from '../../api'

export default function TrainerDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api('/members'), api('/classes')]).then(([m, c]) => {
      setStats({ totalMembers: m.length, activeClasses: c.length, todayClasses: c.filter((cl: any) => cl.days?.includes(new Date().toLocaleString('en-us', { weekday: 'short' }))).length })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1C1C1E]">Trainer Dashboard</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'My Members', value: stats?.totalMembers || 0, icon: Users, color: 'from-blue-500/20 to-blue-600/10 text-[#007AFF] border-[#007AFF]/20' },
            { label: 'Active Classes', value: stats?.activeClasses || 0, icon: CalendarCheck, color: 'from-green-500/20 to-green-600/10 text-green-400 border-green-500/30' },
            { label: "Today's Classes", value: stats?.todayClasses || 0, icon: CalendarCheck, color: 'from-apple-blue/20 to-amber-600/10 text-apple-blue border-ydl-yellow/30' },
          ].map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border ${c.color.split(' ').slice(-1)[0]} bg-gradient-to-br ${c.color.split(' ')[0]} ${c.color.split(' ')[1]} p-5`}>
              <div className="flex items-start justify-between">
                <div><p className="text-sm text-apple-gray-400">{c.label}</p><p className={`text-2xl font-bold mt-1 ${c.color.split(' ')[2]}`}>{c.value}</p></div>
                <c.icon className={`w-8 h-8 ${c.color.split(' ')[2]} opacity-60`} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
