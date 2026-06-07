import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react'
import { api } from '../../api'

export default function Overview() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/reports/overview').then(setStats).catch(() => setStats(null)).finally(() => setLoading(false))
  }, [])

  const cards = stats ? [
    { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    { label: 'Active Members', value: stats.activeMembers, icon: TrendingUp, color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30', text: 'text-green-400' },
    { label: 'Revenue This Month', value: `₹${(stats.revenueThisMonth || 0).toLocaleString()}`, icon: DollarSign, color: 'from-ydl-yellow/20 to-amber-600/10', border: 'border-ydl-yellow/30', text: 'text-ydl-yellow' },
    { label: 'Pending Dues', value: `₹${(stats.pendingDues || 0).toLocaleString()}`, icon: AlertTriangle, color: 'from-red-500/20 to-red-600/10', border: 'border-red-500/30', text: 'text-red-400' },
  ] : []

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-5`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-ydl-muted">{card.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${card.text}`}>{card.value}</p>
                </div>
                <card.icon className={`w-8 h-8 ${card.text} opacity-60`} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
