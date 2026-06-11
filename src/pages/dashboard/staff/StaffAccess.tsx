import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Check, X, User, Shield } from 'lucide-react'
import Modal from '../../../components/shared/Modal'

const staffList = ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma', 'Rajesh Kumar', 'Sunita Devi']

const sections = ['Dashboard', 'Enquiry', 'Members', 'Analysis', 'Memberships', 'Batches', 'Accounts', 'Notifications', 'Trainers', 'Staff', 'Settings']

const perms = ['View', 'Create', 'Edit', 'Delete']

const roleTemplates: Record<string, Record<string, boolean[]>> = {
  Admin: Object.fromEntries(sections.map(s => [s, [true, true, true, true]])),
  Manager: Object.fromEntries(sections.map(s => [s, s === 'Settings' || s === 'Staff' ? [false, false, false, false] : [true, true, true, false]])),
  Staff: Object.fromEntries(sections.map(s => [s, s === 'Dashboard' || s === 'Enquiry' ? [true, false, false, false] : [false, false, false, false]])),
}

const initialPermissions: Record<string, boolean[]> = Object.fromEntries(
  sections.map(s => [s, [true, true, true, false]])
)

export default function StaffAccess() {
  const [selectedStaff, setSelectedStaff] = useState(staffList[0])
  const [permissions, setPermissions] = useState<Record<string, boolean[]>>(initialPermissions)
  const [showConfirm, setShowConfirm] = useState(false)

  const toggle = (section: string, idx: number) => {
    setPermissions(prev => ({
      ...prev,
      [section]: prev[section].map((v, i) => i === idx ? !v : v)
    }))
  }

  const applyTemplate = (role: string) => {
    const tmpl = roleTemplates[role]
    if (tmpl) setPermissions({ ...tmpl })
  }

  const savePermissions = () => {
    setShowConfirm(true)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Access Control</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Manage individual staff permissions.</p>
        </div>
        <button onClick={savePermissions} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
          <Save className="w-3 h-3" /> Save Permissions
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="space-y-3">
          <div className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4">
            <h3 className="text-[10px] font-semibold text-apple-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-3 h-3" /> Staff Selector
            </h3>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {staffList.map(name => (
                <button
                  key={name}
                  onClick={() => setSelectedStaff(name)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${selectedStaff === name ? 'bg-apple-blue/10 text-apple-blue border border-ydl-yellow/20' : 'text-apple-gray-400 hover:bg-apple-gray-100 hover:text-[#1C1C1E]'}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4">
            <h3 className="text-[10px] font-semibold text-apple-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="w-3 h-3" /> Role Templates
            </h3>
            <div className="space-y-1.5">
              {Object.keys(roleTemplates).map(role => (
                <button
                  key={role}
                  onClick={() => applyTemplate(role)}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:bg-white/10 hover:text-[#1C1C1E] transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
            <div className="p-3 border-b border-apple-gray-200 bg-white/[0.03]">
              <h3 className="text-xs font-semibold text-[#1C1C1E]">
                Permissions for <span className="text-apple-blue">{selectedStaff}</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase w-40">Module</th>
                    {perms.map(p => (
                      <th key={p} className="text-center px-2 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-apple-gray-200/50">
                  {sections.map((section, i) => (
                    <motion.tr key={section} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-xs font-medium text-[#1C1C1E]">{section}</td>
                      {perms.map((_, idx) => {
                        const checked = permissions[section]?.[idx] || false
                        return (
                          <td key={idx} className="px-2 py-3 text-center">
                            <button
                              onClick={() => toggle(section, idx)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                checked
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-white/5 text-apple-gray-400 border border-apple-gray-200 hover:text-apple-gray-400'
                              }`}
                            >
                              {checked ? <Check className="w-3.5 h-3.5" /> : <X className="w-3 h-3" />}
                            </button>
                          </td>
                        )
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Permissions Saved" size="sm">
        <p className="text-xs text-apple-gray-400">Permissions for <span className="text-apple-blue font-medium">{selectedStaff}</span> have been updated successfully.</p>
        <button onClick={() => setShowConfirm(false)} className="mt-4 px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">OK</button>
      </Modal>
    </div>
  )
}

