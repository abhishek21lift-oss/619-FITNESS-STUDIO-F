import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, PhoneCall, CheckCircle, Clock, UserPlus } from 'lucide-react'
import { api } from '../../api'

export default function FollowUps() {
  const [followups, setFollowups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/followups').then(setFollowups).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await api(`/followups/${id}`, { method: 'PUT', body: JSON.stringify({ status }) })
    setFollowups(prev => prev.map(f => f.id === id ? { ...f, status } : f))
  }

  const statusCount = (s: string) => followups.filter(f => f.status === s).length

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Follow Ups</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Follow Ups', value: followups.length, icon: PhoneCall, color: 'text-blue-400' },
              { label: 'Pending', value: statusCount('pending'), icon: Clock, color: 'text-yellow-400' },
              { label: 'Completed', value: statusCount('completed'), icon: CheckCircle, color: 'text-green-400' },
              { label: 'New Leads', value: statusCount('new'), icon: UserPlus, color: 'text-purple-400' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-ydl-muted">{s.label}</p><p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p></div>
                  <s.icon className={`w-6 h-6 ${s.color} opacity-60`} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-ydl-dark-border">
            <table className="w-full text-sm">
              <thead className="bg-ydl-card-gradient">
                <tr className="text-ydl-muted text-left">
                  <th className="p-3 font-medium">Lead / Member</th>
                  <th className="p-3 font-medium">Phone</th>
                  <th className="p-3 font-medium">Notes</th>
                  <th className="p-3 font-medium">Follow-Up Date</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ydl-dark-border">
                {followups.map((f, i) => (
                  <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 text-white font-medium">{f.leadName}</td>
                    <td className="p-3 text-ydl-muted">{f.leadPhone}</td>
                    <td className="p-3 text-ydl-muted max-w-32 truncate">{f.notes}</td>
                    <td className="p-3 text-ydl-muted">{f.followUpDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        f.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        f.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>{f.status}</span>
                    </td>
                    <td className="p-3">
                      <select value={f.status} onChange={e => updateStatus(f.id, e.target.value)}
                        className="bg-[#1A1A1A] text-xs text-ydl-muted border border-ydl-dark-border rounded-lg px-2 py-1">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
