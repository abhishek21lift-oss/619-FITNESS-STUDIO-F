import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Plus } from 'lucide-react'
import { api } from '../../api'

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/staff').then(setStaff).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Staff</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-apple-gradient-blue rounded-xl hover:shadow-apple-md-lg transition-all">
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-apple-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="text-apple-gray-400 text-left">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">Salary</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {staff.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-apple-gray-100 transition-colors">
                  <td className="p-3 text-[#1C1C1E] font-medium">{s.name}</td>
                  <td className="p-3 text-apple-gray-400">{s.role}</td>
                  <td className="p-3 text-apple-gray-400">{s.email}</td>
                  <td className="p-3 text-apple-gray-400">{s.phone}</td>
                  <td className="p-3 text-apple-gray-400">₹{(s.salary || 0).toLocaleString()}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{s.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
