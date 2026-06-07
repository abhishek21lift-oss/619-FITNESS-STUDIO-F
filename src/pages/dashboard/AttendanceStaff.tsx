import { motion } from 'framer-motion'
import { Users, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'

const attendance = [
  { name: 'Awash Vikash', date: '07 Jun 2026', checkIn: '05:45 AM', checkOut: '10:00 AM', status: 'Present' },
  { name: 'Riya Singh', date: '07 Jun 2026', checkIn: '06:00 AM', checkOut: '10:30 AM', status: 'Present' },
  { name: 'Abhishek Katiyar', date: '07 Jun 2026', checkIn: '06:15 AM', checkOut: '-', status: 'Late' },
  { name: 'Rajat Katiyar', date: '07 Jun 2026', checkIn: '-', checkOut: '-', status: 'Absent' },
  { name: 'Shivani Verma', date: '07 Jun 2026', checkIn: '06:30 AM', checkOut: '09:00 AM', status: 'Present' },
  { name: 'Narayan Chandel', date: '07 Jun 2026', checkIn: '05:50 AM', checkOut: '09:30 AM', status: 'Present' },
]

export default function AttendanceStaff() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Staff Attendance</h1><p className="text-xs text-gray-500 mt-0.5">Track staff and trainer check-ins.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] text-gray-500">Total</p><p className="text-lg font-bold text-white mt-1">6</p></div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center"><p className="text-[10px] text-emerald-400">Present</p><p className="text-lg font-bold text-emerald-400 mt-1">4</p></div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center"><p className="text-[10px] text-amber-400">Late</p><p className="text-lg font-bold text-amber-400 mt-1">1</p></div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center"><p className="text-[10px] text-red-400">Absent</p><p className="text-lg font-bold text-red-400 mt-1">1</p></div>
      </div>
      <div className="flex items-center gap-3"><div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" className="bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white [color-scheme:dark]" /></div></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Check In</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Check Out</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {attendance.map((a, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs font-medium text-white">{a.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.date}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{a.checkIn}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.checkOut}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      a.status === 'Present' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      a.status === 'Late' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                      {a.status === 'Present' ? <CheckCircle className="w-3 h-3" /> : a.status === 'Late' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {a.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
