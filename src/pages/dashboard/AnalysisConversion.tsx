import { motion } from 'framer-motion'
import { Target, TrendingUp, TrendingDown, UserCheck } from 'lucide-react'

const stats = [
  { label: 'Conversion Rate', value: '32.5%', change: '+4.2%', up: true, icon: Target },
  { label: 'Enquiries Converted', value: '412', change: '+8.7%', up: true, icon: UserCheck },
  { label: 'Enquiries Lost', value: '198', change: '-3.1%', up: true, icon: XIcon },
  { label: 'Avg. Conversion Time', value: '6.2 days', change: '-1.3 days', up: true, icon: ClockIcon },
]

const sources = [
  { name: 'Walk-in', enquiries: 420, converted: 189, rate: '45%' },
  { name: 'Instagram', enquiries: 312, converted: 98, rate: '31%' },
  { name: 'Facebook', enquiries: 198, converted: 52, rate: '26%' },
  { name: 'Google', enquiries: 167, converted: 61, rate: '37%' },
  { name: 'Friend Referral', enquiries: 145, converted: 78, rate: '54%' },
  { name: 'Phone Call', enquiries: 98, converted: 28, rate: '29%' },
]

function XIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }
function ClockIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }

export default function AnalysisConversion() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Conversion Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track enquiry-to-member conversion.</p>
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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Conversion by Source</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border"><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Source</th><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Enquiries</th><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Converted</th><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Rate</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {sources.map(s => (
                <tr key={s.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-2.5 text-xs text-gray-300">{s.name}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-400">{s.enquiries}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-400">{s.converted}</td>
                  <td className="px-3 py-2.5"><span className="text-[10px] font-medium text-ydl-yellow">{s.rate}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
