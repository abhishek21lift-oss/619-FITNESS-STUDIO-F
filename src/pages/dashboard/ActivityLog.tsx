import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Activity, LogIn } from 'lucide-react'
import { api } from '../../api'

export default function ActivityLog() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/checkin/recent').then(setLogs).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1C1C1E] flex items-center gap-3">
        <Activity className="w-6 h-6 text-[#007AFF]" /> Activity Log
      </h1>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-apple-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="text-apple-gray-400 text-left">
                <th className="p-3 font-medium">Member</th>
                <th className="p-3 font-medium">Code</th>
                <th className="p-3 font-medium">Action</th>
                <th className="p-3 font-medium">Time</th>
                <th className="p-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {logs.map((log, i) => (
                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-apple-gray-100 transition-colors">
                  <td className="p-3 text-[#1C1C1E] font-medium">{log.memberName}</td>
                  <td className="p-3 text-apple-gray-400">{log.memberCode}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1.5 text-green-400">
                      <LogIn className="w-3.5 h-3.5" /> Checked In
                    </span>
                  </td>
                  <td className="p-3 text-apple-gray-400">{new Date(log.checkIn).toLocaleString()}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-[#007AFF]">{log.method}</span>
                  </td>
                </motion.tr>
              ))}
              {logs.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center text-apple-gray-400">No activity recorded yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
