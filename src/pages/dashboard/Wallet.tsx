import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, Download, Eye, Trash2, IndianRupee, XCircle } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import { useToast } from '../../components/ui/Toast'

interface Transaction {
  id: string
  description: string
  amount: number
  type: 'Credit' | 'Debit'
  status: 'Completed' | 'Pending' | 'Failed'
  date: string
  balanceAfter: number
}

const initialTransactions: Transaction[] = [
  { id: 'TXN-001', description: 'Membership - Rahul Sharma', amount: 7999, type: 'Credit', status: 'Completed', date: '07 Jun 2026', balanceAfter: 1294500 },
  { id: 'TXN-002', description: 'PT Session - Priya Singh', amount: 1500, type: 'Credit', status: 'Completed', date: '07 Jun 2026', balanceAfter: 1286500 },
  { id: 'TXN-003', description: 'Electricity Bill Payment', amount: 12000, type: 'Debit', status: 'Completed', date: '06 Jun 2026', balanceAfter: 1285000 },
  { id: 'TXN-004', description: 'Staff Salary - Awash Vikash', amount: 45000, type: 'Debit', status: 'Pending', date: '05 Jun 2026', balanceAfter: 1297000 },
  { id: 'TXN-005', description: 'Supplement Sales', amount: 3200, type: 'Credit', status: 'Completed', date: '05 Jun 2026', balanceAfter: 1342000 },
  { id: 'TXN-006', description: 'Rent Payment', amount: 85000, type: 'Debit', status: 'Completed', date: '04 Jun 2026', balanceAfter: 1338800 },
  { id: 'TXN-007', description: 'Membership - Amit Verma', amount: 4999, type: 'Credit', status: 'Failed', date: '04 Jun 2026', balanceAfter: 1423800 },
]

export default function Wallet() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [tab, setTab] = useState<'All' | 'Credits' | 'Debits'>('All')
  const [addMoneyOpen, setAddMoneyOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState<Transaction | null>(null)
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10
  const { toast } = useToast()

  const filtered = tab === 'All' ? transactions : transactions.filter(t => t.type === (tab === 'Credits' ? 'Credit' : 'Debit'))

  const totalBalance = transactions.reduce((s, t) => {
    return t.status === 'Completed' ? (t.type === 'Credit' ? s + t.amount : s - t.amount) : s
  }, 1500000)

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const thisMonthCredits = transactions.filter(t => t.type === 'Credit' && t.status === 'Completed' && t.date.includes('Jun')).reduce((s, t) => s + t.amount, 0)
  const thisMonthDebits = transactions.filter(t => t.type === 'Debit' && t.status === 'Completed' && t.date.includes('Jun')).reduce((s, t) => s + t.amount, 0)

  const formatAmount = (n: number) => `₹ ${n.toLocaleString('en-IN')}`

  const handleAddMoney = () => {
    const amt = parseInt(amount)
    if (!amt) return
    setTransactions(prev => [{
      id: `TXN-${String(prev.length + 1).padStart(3, '0')}`,
      description: description || 'Manual Deposit',
      amount: amt,
      type: 'Credit',
      status: 'Completed',
      date: 'Just now',
      balanceAfter: 0,
    }, ...prev])
    setAmount('')
    setDescription('')
    setAddMoneyOpen(false)
  }

  const handleWithdraw = () => {
    const amt = parseInt(amount)
    if (!amt) return
    setTransactions(prev => [{
      id: `TXN-${String(prev.length + 1).padStart(3, '0')}`,
      description: description || 'Manual Withdrawal',
      amount: amt,
      type: 'Debit',
      status: 'Completed',
      date: 'Just now',
      balanceAfter: 0,
    }, ...prev])
    setAmount('')
    setDescription('')
    setWithdrawOpen(false)
  }

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Wallet</h1><p className="text-xs text-gray-500 mt-0.5">Financial overview and transactions.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWithdrawOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20"><ArrowDownRight className="w-3.5 h-3.5" /> Withdraw</button>
          <button onClick={() => setAddMoneyOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Money</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Total Balance" value={formatAmount(totalBalance)} icon={WalletIcon} color="from-ydl-yellow/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-ydl-yellow" />
        <StatsCard label="Credits This Month" value={formatAmount(thisMonthCredits)} icon={ArrowUpRight} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Debits This Month" value={formatAmount(thisMonthDebits)} icon={ArrowDownRight} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {(['All', 'Credits', 'Debits'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${tab === t ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>
              {t} ({t === 'All' ? transactions.length : transactions.filter(tx => tx.type === (t === 'Credits' ? 'Credit' : 'Debit')).length})
            </button>
          ))}
        </div>
        <button onClick={() => toast('Exporting statement for the current period... This would generate a CSV/PDF report.', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">
          <Download className="w-3 h-3" /> Export Statement
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Description</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ydl-dark-border/50">
            {paged.map((t, i) => (
              <motion.tr key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs text-gray-400">{t.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.type === 'Credit' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      {tab === 'Credits' || t.type === 'Credit' ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{t.description}</p>
                      <span className={`inline-flex items-center gap-1 text-[8px] font-medium ${t.status === 'Completed' ? 'text-emerald-500' : t.status === 'Pending' ? 'text-amber-500' : 'text-red-500'}`}>
                        {t.status === 'Completed' ? <CheckCircle className="w-2 h-2" /> : t.status === 'Pending' ? <Clock className="w-2 h-2" /> : <XCircle className="w-2 h-2" />}
                        {t.status}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-medium rounded-md ${t.type === 'Credit' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{t.type}</span>
                </td>
                <td className={`px-4 py-3 text-right text-xs font-semibold ${t.type === 'Credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {t.type === 'Credit' ? '+' : '-'}{formatAmount(t.amount)}
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionMenu actions={[
                    { label: 'View Details', icon: Eye, onClick: () => setDetailOpen(t) },
                    { label: 'Delete', icon: Trash2, onClick: () => removeTransaction(t.id), color: 'text-red-400' },
                  ]} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-ydl-dark-border bg-white/[0.02]"><span className="text-[10px] text-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>

      <Modal open={addMoneyOpen} onClose={() => setAddMoneyOpen(false)} title="Add Money" size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Amount (₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Membership payment" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleAddMoney} disabled={!amount || parseInt(amount) <= 0} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">Add ₹{amount || '0'}</button>
          <button onClick={() => setAddMoneyOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} title="Withdraw Money" size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Amount (₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Rent payment" />
          </div>
          <p className="text-[10px] text-gray-600">Available balance: {formatAmount(totalBalance)}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleWithdraw} disabled={!amount || parseInt(amount) <= 0 || parseInt(amount) > totalBalance} className="flex-1 py-2 text-xs font-semibold text-white bg-red-500/80 rounded-lg hover:bg-red-500 disabled:opacity-40">Withdraw ₹{amount || '0'}</button>
          <button onClick={() => setWithdrawOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={!!detailOpen} onClose={() => setDetailOpen(null)} title="Transaction Details" size="sm">
        {detailOpen && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <span className="text-[10px] text-gray-500">Transaction ID</span>
              <span className="text-xs text-white font-medium">{detailOpen.id}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <span className="text-[10px] text-gray-500">Description</span>
              <span className="text-xs text-white">{detailOpen.description}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <span className="text-[10px] text-gray-500">Amount</span>
              <span className={`text-xs font-bold ${detailOpen.type === 'Credit' ? 'text-emerald-400' : 'text-red-400'}`}>{detailOpen.type === 'Credit' ? '+' : '-'}{formatAmount(detailOpen.amount)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <span className="text-[10px] text-gray-500">Type</span>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${detailOpen.type === 'Credit' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{detailOpen.type}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <span className="text-[10px] text-gray-500">Status</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${detailOpen.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10' : detailOpen.status === 'Pending' ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10'}`}>
                {detailOpen.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : detailOpen.status === 'Pending' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {detailOpen.status}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
              <span className="text-[10px] text-gray-500">Date</span>
              <span className="text-xs text-white">{detailOpen.date}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
