import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { api } from '../../api'

export default function Attendance() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/attendance').then(setRecords).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1C1C1E]">Attendance</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-apple-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="text-apple-gray-400 text-left">
                <th className="p-3 font-medium">Member</th>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Check In</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {records.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-apple-gray-100 transition-colors">
                  <td className="p-3 text-[#1C1C1E] font-medium">{r.memberName}</td>
                  <td className="p-3 text-apple-gray-400">{r.date}</td>
                  <td className="p-3 text-apple-gray-400">{r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : '-'}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'Present' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{r.status}</span></td>
                </motion.tr>
              ))}
              {records.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-apple-gray-400">No attendance records</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
