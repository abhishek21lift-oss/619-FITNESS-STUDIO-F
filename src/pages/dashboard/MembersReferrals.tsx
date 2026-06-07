import { motion } from 'framer-motion'
import { Gift, Award } from 'lucide-react'

const referrals = [
  { client: 'Rahul Sharma', mobile: '+91 98765 43210', referred: 'Amit Verma', date: '05 Jun 2026', reward: '1 Month Free', status: 'Claimed' },
  { client: 'Priya Singh', mobile: '+91 87654 32109', referred: 'Sneha Patel', date: '03 Jun 2026', reward: '₹500 Off', status: 'Pending' },
  { client: 'Neha Gupta', mobile: '+91 43210 98765', referred: 'Arun Kumar', date: '01 Jun 2026', reward: '1 Month Free', status: 'Claimed' },
  { client: 'Vikram Yadav', mobile: '+91 54321 09876', referred: 'Pooja Jain', date: '28 May 2026', reward: 'PT Session', status: 'Pending' },
]

export default function MembersReferrals() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Client Referrals</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track who referred whom and their rewards.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20">
          <Award className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-[10px] font-semibold text-ydl-yellow">24 Total Referrals</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Client</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Referred</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Reward</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {referrals.map((r, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{r.client}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{r.mobile}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{r.referred}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{r.date}</td>
                  <td className="px-4 py-3"><span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 border border-ydl-yellow/20 rounded-md"><Gift className="w-3 h-3" />{r.reward}</span></td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      r.status === 'Claimed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    }`}>{r.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
