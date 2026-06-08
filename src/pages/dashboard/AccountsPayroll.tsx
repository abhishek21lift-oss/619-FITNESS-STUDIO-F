import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, CheckCircle, XCircle, Plus, Search, Download, Edit3, FileText, Users, Clock } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import { useToast } from '../../components/ui/Toast'

interface PayrollEntry {
  id: number
  name: string
  role: string
  salary: number
  allowances: number
  deductions: number
  netPay: number
  dueDate: string
  status: 'Paid' | 'Pending'
  account: string
}

const initialStaff: PayrollEntry[] = [
  { id: 1, name: 'Awash Vikash', role: 'Head Trainer', salary: 45000, allowances: 5000, deductions: 3000, netPay: 47000, dueDate: '01 Jul 2026', status: 'Pending', account: 'HDFC Bank ****4521' },
  { id: 2, name: 'Riya Singh', role: 'Senior Trainer', salary: 38000, allowances: 4000, deductions: 2000, netPay: 40000, dueDate: '01 Jul 2026', status: 'Pending', account: 'ICICI ****7890' },
  { id: 3, name: 'Abhishek Katiyar', role: 'Trainer', salary: 28000, allowances: 3000, deductions: 1500, netPay: 29500, dueDate: '01 Jul 2026', status: 'Paid', account: 'SBI ****3456' },
  { id: 4, name: 'Rajat Katiyar', role: 'Trainer', salary: 25000, allowances: 2000, deductions: 1000, netPay: 26000, dueDate: '01 Jul 2026', status: 'Pending', account: 'PNB ****1234' },
  { id: 5, name: 'Narayan Chandel', role: 'Junior Trainer', salary: 22000, allowances: 2000, deductions: 1000, netPay: 23000, dueDate: '01 Jul 2026', status: 'Paid', account: 'AXIS ****6789' },
  { id: 6, name: 'Shivani Verma', role: 'Yoga Trainer', salary: 32000, allowances: 3000, deductions: 1500, netPay: 33500, dueDate: '01 Jul 2026', status: 'Pending', account: 'HDFC ****9012' },
]

const staffRoles = ['All Roles', 'Head Trainer', 'Senior Trainer', 'Trainer', 'Junior Trainer', 'Yoga Trainer']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function AccountsPayroll() {
  const [staff, setStaff] = useState<PayrollEntry[]>(initialStaff)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [search, setSearch] = useState('')
  const [generateModal, setGenerateModal] = useState(false)
  const [paySlipModal, setPaySlipModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<PayrollEntry | null>(null)
  const { toast } = useToast()

  const filtered = staff.filter(s => {
    if (roleFilter !== 'All Roles' && s.role !== roleFilter) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPayroll = staff.reduce((sum, s) => sum + s.netPay, 0)
  const pendingCount = staff.filter(s => s.status === 'Pending').length

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  const handleMarkPaid = (id: number) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: 'Paid' as const } : s))
  }

  const handleMarkAllPaid = () => {
    setStaff(prev => prev.map(s => ({ ...s, status: 'Paid' as const })))
  }

  const handleDelete = (id: number) => {
    setStaff(prev => prev.filter(s => s.id !== id))
  }

  const openPaySlip = (s: PayrollEntry) => {
    setSelectedStaff(s)
    setPaySlipModal(true)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Payroll Management</h1><p className="text-xs text-gray-500 mt-0.5">Staff salary and payment tracking.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={handleMarkAllPaid} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
            <CheckCircle className="w-3 h-3" /> Mark All Paid
          </button>
          <button onClick={() => setGenerateModal(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Generate Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Payroll" value={fmt(totalPayroll)} icon={DollarSign} color="from-ydl-yellow/20 to-amber-600/5" border="border-ydl-yellow/30" text="text-ydl-yellow" />
        <StatsCard label="Staff Count" value={staff.length} icon={Users} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Pending Payments" value={pendingCount} icon={Clock} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search staff..." />
        </div>
        <div className="flex items-center gap-2">
          <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
            {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
            {[2025, 2026, 2027].map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {staffRoles.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Staff Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Salary</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Allowances</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Deductions</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Net Pay</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{s.name}<br /><span className="text-[9px] text-gray-600">{s.account}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.role}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{fmt(s.salary)}</td>
                  <td className="px-4 py-3 text-xs text-emerald-400">+{fmt(s.allowances)}</td>
                  <td className="px-4 py-3 text-xs text-red-400">-{fmt(s.deductions)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-ydl-yellow">{fmt(s.netPay)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${s.status === 'Paid' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                      {s.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label="Actions"
                      actions={[
                        { label: 'View Pay Slip', onClick: () => openPaySlip(s), icon: FileText },
                        { label: s.status === 'Paid' ? 'Mark as Pending' : 'Mark Paid', onClick: () => handleMarkPaid(s.id), icon: s.status === 'Paid' ? XCircle : CheckCircle },
                        { label: 'Edit', onClick: () => toast(`Edit payroll for ${s.name} (${s.role}) — Net Pay: ${fmt(s.netPay)}`, 'info'), icon: Edit3 },
                        { label: 'Delete', onClick: () => handleDelete(s.id), color: 'text-red-400' },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={generateModal} onClose={() => setGenerateModal(false)} title="Generate Payroll" size="sm">
        <div className="space-y-4">
          <p className="text-xs text-gray-400">Generate payroll for <span className="text-white font-medium">{months[selectedMonth]} {selectedYear}</span></p>
          <div className="rounded-lg border border-ydl-dark-border bg-white/[0.02] p-3 space-y-2">
            <div className="flex justify-between text-xs"><span className="text-gray-400">Total Staff</span><span className="text-white">{staff.length}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400">Pending Payments</span><span className="text-amber-400">{pendingCount}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400">Total Amount</span><span className="text-ydl-yellow font-semibold">{fmt(totalPayroll)}</span></div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={() => { setGenerateModal(false); toast(`Payroll generated for ${months[selectedMonth]} ${selectedYear}`, 'success') }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Confirm Generate</button>
            <button onClick={() => setGenerateModal(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={paySlipModal} onClose={() => setPaySlipModal(false)} title="Pay Slip" size="md">
        {selectedStaff && (
          <div className="space-y-4">
            <div className="text-center border-b border-ydl-dark-border pb-3">
              <h3 className="text-sm font-bold text-white">YOUR DIGITAL LIFT</h3>
              <p className="text-[10px] text-gray-500">Pay Slip · {months[selectedMonth]} {selectedYear}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-[10px] text-gray-500">Employee</p><p className="text-xs text-white font-medium">{selectedStaff.name}</p></div>
              <div><p className="text-[10px] text-gray-500">Role</p><p className="text-xs text-white font-medium">{selectedStaff.role}</p></div>
              <div><p className="text-[10px] text-gray-500">Account</p><p className="text-xs text-white font-medium">{selectedStaff.account}</p></div>
              <div><p className="text-[10px] text-gray-500">Status</p><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${selectedStaff.status === 'Paid' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>{selectedStaff.status}</span></div>
            </div>
            <div className="rounded-lg border border-ydl-dark-border divide-y divide-ydl-dark-border/50">
              <div className="flex justify-between px-3 py-2 text-xs"><span className="text-gray-400">Basic Salary</span><span className="text-white">{fmt(selectedStaff.salary)}</span></div>
              <div className="flex justify-between px-3 py-2 text-xs"><span className="text-gray-400">Allowances</span><span className="text-emerald-400">+{fmt(selectedStaff.allowances)}</span></div>
              <div className="flex justify-between px-3 py-2 text-xs"><span className="text-gray-400">Deductions</span><span className="text-red-400">-{fmt(selectedStaff.deductions)}</span></div>
              <div className="flex justify-between px-3 py-2 text-xs font-semibold bg-white/[0.02]"><span className="text-gray-300">Net Pay</span><span className="text-ydl-yellow">{fmt(selectedStaff.netPay)}</span></div>
            </div>
            <div className="flex justify-center pt-2">
              <button onClick={() => toast('Downloading pay slip PDF...', 'info')} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
