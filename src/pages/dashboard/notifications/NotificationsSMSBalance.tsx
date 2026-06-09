import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, CreditCard, Calendar, Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import { useToast } from '../../components/ui/Toast'

interface Recharge {
  id: number
  date: string
  amount: number
  paymentMethod: string
  transactionId: string
  status: 'Success' | 'Pending' | 'Failed'
}

const initialRecharges: Recharge[] = [
  { id: 1, date: '05 Jun 2026', amount: 500, paymentMethod: 'UPI', transactionId: 'TXN123456', status: 'Success' },
  { id: 2, date: '28 May 2026', amount: 1000, paymentMethod: 'Card', transactionId: 'TXN789012', status: 'Success' },
  { id: 3, date: '15 May 2026', amount: 250, paymentMethod: 'UPI', transactionId: 'TXN345678', status: 'Pending' },
  { id: 4, date: '01 May 2026', amount: 2000, paymentMethod: 'Bank Transfer', transactionId: 'TXN901234', status: 'Success' },
]

const paymentMethods = ['UPI', 'Card', 'Bank Transfer', 'Cheque']

export default function NotificationsSMSBalance() {
  const [balance] = useState(1247)
  const [totalRecharged] = useState(6250)
  const [totalUsed] = useState(5003)
  const [expiryDate] = useState('31 Dec 2026')
  const [recharges] = useState<Recharge[]>(initialRecharges)
  const [rechargeOpen, setRechargeOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const { toast } = useToast()

  const handleRecharge = () => {
    if (!amount || Number(amount) <= 0) return
    toast(`Recharge of ₹${amount} initiated via ${paymentMethod}`, 'success')
    setRechargeOpen(false)
    setAmount('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">SMS Balance</h1><p className="text-xs text-apple-gray-500 mt-0.5">SMS credits and recharge history.</p></div>
        <button onClick={() => setRechargeOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Recharge
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatsCard label="Current Balance" value={balance} icon={Wallet} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Total Recharged" value={`₹${totalRecharged}`} icon={ArrowUpRight} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Total Used" value={totalUsed} icon={ArrowDownRight} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Expiry Date" value={expiryDate} icon={Calendar} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
      </div>

      {balance < 1500 && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 max-w-2xl">
          <CreditCard className="w-5 h-5 text-amber-400" />
          <div><p className="text-xs font-semibold text-amber-400">Low Balance: {balance} credits</p><p className="text-[10px] text-amber-300/70">Recharge soon to avoid service disruption.</p></div>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="px-4 py-3 border-b border-apple-gray-200"><h3 className="text-xs font-semibold text-[#1C1C1E]">Recharge History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Payment Method</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Transaction ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {recharges.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{r.date}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#1C1C1E]">₹{r.amount}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{r.paymentMethod}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400 font-mono">{r.transactionId}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${r.status === 'Success' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : r.status === 'Pending' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                      {r.status === 'Success' ? <ArrowUpRight className="w-3 h-3" /> : r.status === 'Pending' ? <ClockIcon className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {r.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={rechargeOpen} onClose={() => setRechargeOpen(false)} title="Recharge Credits" size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Amount (₹)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Enter amount..." />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Payment Method</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {paymentMethods.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleRecharge} disabled={!amount || Number(amount) <= 0} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">Proceed to Pay ₹{amount || '0'}</button>
          <button onClick={() => setRechargeOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

function ClockIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
