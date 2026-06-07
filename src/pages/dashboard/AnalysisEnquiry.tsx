import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, PhoneCall, MessageSquare, Users } from 'lucide-react'

const stats = [
  { label: 'Total Enquiries', value: '1,376', change: '+6.8%', up: true, icon: PhoneCall },
  { label: 'Open', value: '388', change: '+2.1%', up: false, icon: MessageSquare },
  { label: 'Converted', value: '412', change: '+8.5%', up: true, icon: Users },
  { label: 'Lost', value: '198', change: '-4.3%', up: true, icon: XIcon },
]

const sourceData = [
  { label: 'Walk-in', pct: 30, color: 'bg-ydl-yellow' },
  { label: 'Instagram', pct: 23, color: 'bg-pink-500' },
  { label: 'Facebook', pct: 15, color: 'bg-blue-500' },
  { label: 'Google', pct: 12, color: 'bg-emerald-500' },
  { label: 'Friend Referral', pct: 11, color: 'bg-purple-500' },
  { label: 'Other', pct: 9, color: 'bg-gray-500' },
]

function XIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }

export default function AnalysisEnquiry() {
  const totalPct = sourceData.reduce((a, s) => a + s.pct, 0)
  let cumulative = 0
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Enquiry Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Enquiry funnel and source breakdown.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p><p className="text-lg font-bold text-white mt-1">{s.value}</p></div>
              <s.icon className="w-5 h-5 text-gray-500" />
            </div>
            <div className={`flex items-center gap-1 mt-2 ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-[10px] font-medium">{s.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Source Distribution (Pie)</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
              {sourceData.map(s => {
                const start = cumulative
                cumulative += s.pct
                return (
                  <div key={s.label} className="absolute inset-0" style={{ clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI * 2 * (start + s.pct) / totalPct - Math.PI / 2)}% ${50 + 50 * Math.sin(Math.PI * 2 * (start + s.pct) / totalPct - Math.PI / 2)}%, 50% 0%)`, background: s.color.includes('ydl') ? '#D4AF34' : undefined }} />
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sourceData.map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                <span className="text-[10px] text-gray-400">{s.label} ({s.pct}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Source Breakdown</h2>
          <div className="space-y-3">
            {sourceData.map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300">{s.label}</span>
                  <span className="text-[10px] text-gray-500">{s.pct}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} opacity-60`} style={{ width: `${s.pct * 3.33}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
