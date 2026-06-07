import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, UserMinus, AlertTriangle } from 'lucide-react'
import { api } from '../../api'

export default function Expiry() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/members').then(all => {
      const now = new Date()
      const expiring = all.filter((m: any) => {
        if (!m.endDate) return false
        const end = new Date(m.endDate)
        const diffDays = Math.ceil((end.getTime() - now.getTime()) / 86400000)
        return diffDays <= 30 && diffDays >= -7
      })
      setMembers(expiring.sort((a: any, b: any) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const getDaysLeft = (endDate: string) => {
    const diff = Math.ceil((new Date(endDate).getTime() - Date.now()) / 86400000)
    return diff
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <UserMinus className="w-6 h-6 text-orange-400" /> Membership Expiry
      </h1>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Expired (7d)', value: members.filter(m => getDaysLeft(m.endDate) < 0).length, color: 'text-red-400' },
              { label: 'Expiring Today', value: members.filter(m => getDaysLeft(m.endDate) === 0).length, color: 'text-orange-400' },
              { label: 'Expiring Soon (30d)', value: members.filter(m => getDaysLeft(m.endDate) > 0).length, color: 'text-yellow-400' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-ydl-muted">{s.label}</p><p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p></div>
                  <AlertTriangle className={`w-6 h-6 ${s.color} opacity-60`} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-ydl-dark-border">
            <table className="w-full text-sm">
              <thead className="bg-ydl-card-gradient">
                <tr className="text-ydl-muted text-left">
                  <th className="p-3 font-medium">Member</th>
                  <th className="p-3 font-medium">Plan</th>
                  <th className="p-3 font-medium">End Date</th>
                  <th className="p-3 font-medium">Days Left</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ydl-dark-border">
                {members.map((m, i) => {
                  const days = getDaysLeft(m.endDate)
                  return (
                    <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-white font-medium">{m.name}</td>
                      <td className="p-3 text-ydl-muted">{m.plan}</td>
                      <td className="p-3 text-ydl-muted">{m.endDate}</td>
                      <td className="p-3">
                        <span className={`font-semibold ${
                          days < 0 ? 'text-red-400' : days <= 7 ? 'text-orange-400' : 'text-yellow-400'
                        }`}>{days < 0 ? `${Math.abs(days)}d overdue` : `${days}d`}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          days < 0 ? 'bg-red-500/20 text-red-400' :
                          days <= 7 ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>{days < 0 ? 'Expired' : days === 0 ? 'Today' : 'Active'}</span>
                      </td>
                    </motion.tr>
                  )
                })}
                {members.length === 0 && (
                  <tr><td colSpan={5} className="p-6 text-center text-ydl-muted">No members expiring within 30 days</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
