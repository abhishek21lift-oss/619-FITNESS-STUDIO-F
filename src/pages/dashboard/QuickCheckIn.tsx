import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, QrCode, ClipboardCheck, Clock } from 'lucide-react'
import { api } from '../../api'

export default function QuickCheckIn() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [recent, setRecent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/checkin/recent').then(setRecent).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const checkIn = async () => {
    if (!code.trim()) return
    setMessage(null)
    try {
      const result = await api('/checkin/verify', { method: 'POST', body: JSON.stringify({ code: code.trim(), method: 'manual' }) })
      setMessage({ type: 'success', text: `${result.memberName} checked in successfully!` })
      setCode('')
      api('/checkin/recent').then(setRecent).catch(() => {})
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Check-in failed' })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1C1C1E]">Quick Check-In</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-apple-gray-200 bg-white p-6 max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-green-500/20 text-green-400">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-[#1C1C1E] font-semibold">Enter Member Code</h2>
            <p className="text-xs text-apple-gray-400">Scan QR code or type member code</p>
          </div>
        </div>

        {message && (
          <div className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
            'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex gap-3">
          <input value={code} onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkIn()}
            placeholder="Enter member code..."
            className="flex-1 bg-[#1A1A1A] text-[#1C1C1E] border border-apple-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500/50 uppercase" />
          <button onClick={checkIn}
            className="px-6 py-3 rounded-xl bg-green-600 text-[#1C1C1E] font-medium text-sm hover:bg-green-700 transition-all flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4" /> Check In
          </button>
        </div>
      </motion.div>

      <div>
        <h2 className="text-lg font-semibold text-[#1C1C1E] mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-apple-gray-400" /> Recent Check-Ins
        </h2>
        {loading ? (
          <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-apple-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr className="text-apple-gray-400 text-left">
                  <th className="p-3 font-medium">Member</th>
                  <th className="p-3 font-medium">Code</th>
                  <th className="p-3 font-medium">Time</th>
                  <th className="p-3 font-medium">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-apple-gray-200">
                {recent.map((r, i) => (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-apple-gray-100 transition-colors">
                    <td className="p-3 text-[#1C1C1E] font-medium">{r.memberName}</td>
                    <td className="p-3 text-apple-gray-400">{r.memberCode}</td>
                    <td className="p-3 text-apple-gray-400">{new Date(r.checkIn).toLocaleString()}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-[#007AFF]">{r.method}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
