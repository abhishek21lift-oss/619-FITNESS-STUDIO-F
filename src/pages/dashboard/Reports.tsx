import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { api } from '../../api'

export default function Reports() {
  const [revenue, setRevenue] = useState<any>(null)
  const [membership, setMembership] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api('/reports/revenue'), api('/reports/membership')])
      .then(([r, m]) => { setRevenue(r); setMembership(m) }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1C1C1E]">Reports</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {revenue && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-apple-gray-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">Revenue</h2>
              <p className="text-3xl font-bold text-apple-blue mb-4">₹{(revenue.total || 0).toLocaleString()}</p>
              <div className="space-y-2">
                {(revenue.monthly || []).slice(-6).map((m: any) => (
                  <div key={m.month} className="flex items-center justify-between text-sm">
                    <span className="text-apple-gray-400">{m.month}</span>
                    <div className="flex-1 mx-3 h-2 bg-ydl-dark-border rounded-full overflow-hidden">
                      <div className="h-full bg-ydl-yellow rounded-full" style={{ width: `${Math.min(100, (m.amount / (revenue.total || 1)) * 100)}%` }} />
                    </div>
                    <span className="text-[#1C1C1E] font-medium">₹{m.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {membership && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-apple-gray-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">Membership Growth</h2>
              <div className="space-y-2">
                {(membership.growth || []).slice(-6).map((g: any) => (
                  <div key={g.month} className="flex items-center justify-between text-sm">
                    <span className="text-apple-gray-400">{g.month}</span>
                    <div className="flex-1 mx-3 h-2 bg-ydl-dark-border rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (g.count / 15) * 100)}%` }} />
                    </div>
                    <span className="text-[#1C1C1E] font-medium">{g.count}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-[#1C1C1E] font-bold mt-6 mb-3">By Plan</h3>
              <div className="space-y-2">
                {(membership.byPlan || []).map((p: any) => (
                  <div key={p.plan} className="flex items-center justify-between text-sm">
                    <span className="text-apple-gray-400">{p.plan}</span>
                    <span className="text-[#1C1C1E] font-medium">{p.count} members</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
