import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Users, Plus, Download } from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'

interface PayrollEntry {
  staff: string
  basicPay: number
  deductions: number
  bonuses: number
  netPay: number
}

const staffList = ['Amit', 'Neha', 'Ravi', 'Admin', 'Manager']

export default function AccountsPayrollCalculator() {
  const [selectedStaff, setSelectedStaff] = useState(staffList[0])
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
  const [basicPay, setBasicPay] = useState('25000')
  const [deductions, setDeductions] = useState('2000')
  const [bonuses, setBonuses] = useState('0')
  const [savedEntries, setSavedEntries] = useState<PayrollEntry[]>([])

  const basic = Number(basicPay) || 0
  const ded = Number(deductions) || 0
  const bonus = Number(bonuses) || 0
  const netPay = basic + bonus - ded

  const handleSave = () => {
    setSavedEntries(prev => {
      const existing = prev.findIndex(e => e.staff === selectedStaff)
      const entry = { staff: selectedStaff, basicPay: basic, deductions: ded, bonuses: bonus, netPay }
      if (existing >= 0) return prev.map((e, i) => i === existing ? entry : e)
      return [...prev, entry]
    })
  }

  const exportCSV = () => {
    if (!savedEntries.length) return
    const headers = ['Staff', 'Basic Pay', 'Deductions', 'Bonuses', 'Net Pay']
    const rows = savedEntries.map(d => [d.staff, `₹${d.basicPay}`, `₹${d.deductions}`, `₹${d.bonuses}`, `₹${d.netPay}`])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `payroll-${month}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  const totalBasic = savedEntries.reduce((s, e) => s + e.basicPay, 0)
  const totalNet = savedEntries.reduce((s, e) => s + e.netPay, 0)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Payroll Calculator</h1><p className="text-xs text-apple-gray-500 mt-0.5">Staff salary computation.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} disabled={!savedEntries.length} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors disabled:opacity-40">
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Staff Count" value={savedEntries.length || staffList.length} icon={Users} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Total Basic Pay" value={fmt(totalBasic)} icon={DollarSign} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
        <StatsCard label="Total Net Pay" value={fmt(totalNet)} icon={Calculator} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
        <h3 className="text-sm font-semibold text-[#1C1C1E] mb-4">Calculate Pay</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Staff</label>
            <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {staffList.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Month</label>
            <input type="month" value={month} onChange={e => setMonth(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Basic Pay (₹)</label>
            <input type="number" value={basicPay} onChange={e => setBasicPay(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Deductions (₹)</label>
            <input type="number" value={deductions} onChange={e => setDeductions(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Bonuses (₹)</label>
            <input type="number" value={bonuses} onChange={e => setBonuses(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-apple-gray-200">
          <div>
            <span className="text-[11px] text-apple-gray-500">Net Pay: </span>
            <span className="text-lg font-bold text-emerald-400">{fmt(netPay)}</span>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Save Entry
          </button>
        </div>
      </motion.div>

      {savedEntries.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Staff</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Basic Pay</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Deductions</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Bonuses</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Net Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-apple-gray-200/50">
                {savedEntries.map((e, i) => (
                  <motion.tr key={e.staff} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-xs text-[#1C1C1E]">{e.staff}</td>
                    <td className="px-4 py-3 text-xs text-apple-gray-400">{fmt(e.basicPay)}</td>
                    <td className="px-4 py-3 text-xs text-red-400">-{fmt(e.deductions)}</td>
                    <td className="px-4 py-3 text-xs text-emerald-400">+{fmt(e.bonuses)}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-emerald-400">{fmt(e.netPay)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
