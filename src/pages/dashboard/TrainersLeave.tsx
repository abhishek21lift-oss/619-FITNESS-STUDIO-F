import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, User } from 'lucide-react'

const leaves = [
  { trainer: 'Riya Singh', type: 'Sick Leave', from: '10 Jun 2026', to: '11 Jun 2026', days: 2, reason: 'Not feeling well', status: 'Approved' },
  { trainer: 'Abhishek Katiyar', type: 'Personal Leave', from: '15 Jun 2026', to: '15 Jun 2026', days: 1, reason: 'Family function', status: 'Pending' },
  { trainer: 'Rajat Katiyar', type: 'Annual Leave', from: '20 Jun 2026', to: '24 Jun 2026', days: 5, reason: 'Vacation', status: 'Pending' },
  { trainer: 'Shivani Verma', type: 'Medical Leave', from: '05 Jun 2026', to: '07 Jun 2026', days: 3, reason: 'Doctor appointment', status: 'Approved' },
  { trainer: 'Narayan Chandel', type: 'Personal Leave', from: '01 Jun 2026', to: '01 Jun 2026', days: 1, reason: 'Personal work', status: 'Rejected' },
]

export default function TrainersLeave() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Leave Requests</h1><p className="text-xs text-gray-500 mt-0.5">Manage trainer leave applications.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Total Requests</p>
          <p className="text-xl font-bold text-white mt-1">12</p>
        </div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Approved</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">7</p>
        </div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Pending</p>
          <p className="text-xl font-bold text-amber-400 mt-1">3</p>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Trainer</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">From</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">To</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Days</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Reason</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {leaves.map((l, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs font-medium text-white">{l.trainer}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{l.type}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{l.from}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{l.to}</td>
                  <td className="px-4 py-3 text-xs font-medium text-white">{l.days}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 max-w-[120px] truncate">{l.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      l.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      l.status === 'Pending' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                      {l.status === 'Approved' ? <CheckCircle className="w-3 h-3" /> : l.status === 'Pending' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {l.status === 'Pending' && <div className="flex items-center justify-end gap-1"><button className="px-2 py-1 text-[9px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20">Approve</button><button className="px-2 py-1 text-[9px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20">Reject</button></div>}
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
