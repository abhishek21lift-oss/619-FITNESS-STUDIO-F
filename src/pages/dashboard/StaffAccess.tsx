import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const permissions = [
  { module: 'Dashboard', admin: true, manager: true, trainer: true, reception: true },
  { module: 'Enquiry', admin: true, manager: true, trainer: true, reception: true },
  { module: 'Members', admin: true, manager: true, trainer: true, reception: false },
  { module: 'Analysis', admin: true, manager: true, trainer: false, reception: false },
  { module: 'Memberships', admin: true, manager: true, trainer: false, reception: false },
  { module: 'Batches', admin: true, manager: true, trainer: true, reception: false },
  { module: 'Accounts', admin: true, manager: true, trainer: false, reception: false },
  { module: 'Trainers', admin: true, manager: true, trainer: false, reception: false },
  { module: 'Settings', admin: true, manager: false, trainer: false, reception: false },
  { module: 'Staff', admin: true, manager: false, trainer: false, reception: false },
]

const roles = [
  { key: 'admin', label: 'Admin', color: 'text-red-400' },
  { key: 'manager', label: 'Manager', color: 'text-ydl-yellow' },
  { key: 'trainer', label: 'Trainer', color: 'text-blue-400' },
  { key: 'reception', label: 'Reception', color: 'text-emerald-400' },
]

export default function StaffAccess() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Access Control</h1><p className="text-xs text-gray-500 mt-0.5">Manage role-based permissions.</p></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Module</th>
              {roles.map(r => <th key={r.key} className={`text-center px-4 py-3 text-[10px] font-semibold uppercase ${r.color}`}>{r.label}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {permissions.map((p, i) => (
                <motion.tr key={p.module} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{p.module}</td>
                  <td className="px-4 py-3 text-center">{p.admin ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-red-400 inline" />}</td>
                  <td className="px-4 py-3 text-center">{p.manager ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-red-400 inline" />}</td>
                  <td className="px-4 py-3 text-center">{p.trainer ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-red-400 inline" />}</td>
                  <td className="px-4 py-3 text-center">{p.reception ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-red-400 inline" />}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
