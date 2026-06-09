import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react'
import { api } from '../../api'

export default function Billing() {
  const [txs, setTxs] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api('/billing'), api('/billing/stats')]).then(([t, s]) => { setTxs(t); setStats(s) }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1C1C1E]">Billing</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <>
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
                { label: 'This Month', value: `₹${(stats.collectedThisMonth || 0).toLocaleString()}`, icon: TrendingUp, color: 'text-apple-blue' },
                { label: 'Pending', value: `₹${(stats.pendingAmount || 0).toLocaleString()}`, icon: AlertTriangle, color: 'text-orange-400' },
                { label: 'Transactions', value: stats.totalTransactions || 0, icon: DollarSign, color: 'text-[#007AFF]' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-apple-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div><p className="text-sm text-apple-gray-400">{s.label}</p><p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p></div>
                    <s.icon className={`w-6 h-6 ${s.color} opacity-60`} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="overflow-x-auto rounded-2xl border border-apple-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr className="text-apple-gray-400 text-left">
                  <th className="p-3 font-medium">Member</th>
                  <th className="p-3 font-medium">Plan</th>
                  <th className="p-3 font-medium">Amount</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-apple-gray-200">
                {txs.map((t, i) => (
                  <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-apple-gray-100 transition-colors">
                    <td className="p-3 text-[#1C1C1E] font-medium">{t.memberName}</td>
                    <td className="p-3 text-apple-gray-400">{t.plan}</td>
                    <td className="p-3 text-apple-gray-400">₹{t.amount?.toLocaleString()}</td>
                    <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.status === 'Paid' ? 'bg-green-500/20 text-green-400' : t.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{t.status}</span></td>
                    <td className="p-3 text-apple-gray-400">{t.date}</td>
                    <td className="p-3 text-apple-gray-400">{t.method || '-'}</td>
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
