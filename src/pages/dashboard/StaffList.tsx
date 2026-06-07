import { motion } from 'framer-motion'
import { Search, Edit3, UserCog } from 'lucide-react'

const staff = [
  { name: 'Awash Vikash', role: 'Head Trainer', mobile: '+91 98765 43210', email: 'awash@ydl.com', access: 'Full', status: 'Active' },
  { name: 'Riya Singh', role: 'Senior Trainer', mobile: '+91 87654 32109', email: 'riya@ydl.com', access: 'Full', status: 'Active' },
  { name: 'Abhishek Katiyar', role: 'Trainer', mobile: '+91 76543 21098', email: 'abhishek@ydl.com', access: 'Limited', status: 'Active' },
  { name: 'Shivani Verma', role: 'Yoga Trainer', mobile: '+91 43210 98765', email: 'shivani@ydl.com', access: 'Limited', status: 'Active' },
  { name: 'Rajesh Kumar', role: 'Receptionist', mobile: '+91 99887 76655', email: 'rajesh@ydl.com', access: 'View Only', status: 'Active' },
  { name: 'Sunita Devi', role: 'Cleaner', mobile: '+91 88776 65544', email: 'sunita@ydl.com', access: 'View Only', status: 'Inactive' },
]

export default function StaffList() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Staff List</h1><p className="text-xs text-gray-500 mt-0.5">{staff.length} staff members.</p></div>
      <div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search staff..." /></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Role</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Email</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Access</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {staff.map((s, i) => (
                <motion.tr key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><UserCog className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs font-medium text-white">{s.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.role}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.mobile}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.email}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${s.access === 'Full' ? 'text-emerald-400 bg-emerald-500/10' : s.access === 'Limited' ? 'text-amber-400 bg-amber-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{s.access}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${s.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{s.status}</span></td>
                  <td className="px-4 py-3 text-right"><button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
