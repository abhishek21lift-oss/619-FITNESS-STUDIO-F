import { motion } from 'framer-motion'
import { DollarSign, CheckCircle, XCircle } from 'lucide-react'

const staffPayroll = [
  { name: 'Awash Vikash', role: 'Head Trainer', salary: '₹45,000', due: '01 Jul 2026', status: 'Pending', account: 'HDFC Bank ****4521' },
  { name: 'Riya Singh', role: 'Senior Trainer', salary: '₹38,000', due: '01 Jul 2026', status: 'Pending', account: 'ICICI ****7890' },
  { name: 'Abhishek Katiyar', role: 'Trainer', salary: '₹28,000', due: '01 Jul 2026', status: 'Paid', account: 'SBI ****3456' },
  { name: 'Rajat Katiyar', role: 'Trainer', salary: '₹25,000', due: '01 Jul 2026', status: 'Pending', account: 'PNB ****1234' },
  { name: 'Narayan Chandel', role: 'Junior Trainer', salary: '₹22,000', due: '01 Jul 2026', status: 'Paid', account: 'AXIS ****6789' },
  { name: 'Shivani Verma', role: 'Yoga Trainer', salary: '₹32,000', due: '01 Jul 2026', status: 'Pending', account: 'HDFC ****9012' },
]

export default function AccountsPayroll() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Payroll Management</h1><p className="text-xs text-gray-500 mt-0.5">Staff salary and payment tracking.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20"><DollarSign className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-[10px] font-semibold text-ydl-yellow">Total: ₹1,90,000</span></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Role</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Salary</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Due Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Account</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {staffPayroll.map((s, i) => (
                <motion.tr key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{s.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.role}</td>
                  <td className="px-4 py-3 text-xs font-medium text-ydl-yellow">{s.salary}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.due}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.account}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${s.status === 'Paid' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'}`}>{s.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}{s.status}</span></td>
                  <td className="px-4 py-3 text-right"><button className="text-[10px] font-medium text-ydl-yellow hover:underline">Process</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
