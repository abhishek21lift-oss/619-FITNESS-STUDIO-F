import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Search, ShoppingBag, Package, Clock, IndianRupee } from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import ActionMenu from '../../components/shared/ActionMenu'

interface Order {
  id: string
  date: string
  customer: string
  product: string
  qty: number
  total: number
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'
}

const initialOrders: Order[] = [
  { id: 'ORD-001', date: '07 Jun 2026', customer: 'Rahul Sharma', product: 'YDL Premium T-Shirt', qty: 2, total: 1598, status: 'Delivered' },
  { id: 'ORD-002', date: '07 Jun 2026', customer: 'Priya Singh', product: 'Whey Protein 1kg', qty: 1, total: 2499, status: 'Shipped' },
  { id: 'ORD-003', date: '06 Jun 2026', customer: 'Amit Verma', product: 'YDL Gym Bag', qty: 1, total: 1299, status: 'Confirmed' },
  { id: 'ORD-004', date: '06 Jun 2026', customer: 'Neha Gupta', product: 'YDL Shaker Bottle', qty: 3, total: 1047, status: 'Pending' },
  { id: 'ORD-005', date: '05 Jun 2026', customer: 'Sneha Patel', product: 'Resistance Bands', qty: 1, total: 599, status: 'Cancelled' },
  { id: 'ORD-006', date: '04 Jun 2026', customer: 'Vikram Joshi', product: 'YDL Cap', qty: 2, total: 798, status: 'Delivered' },
]

const statusColors: Record<string, string> = {
  Pending: 'text-amber-400 bg-amber-500/10',
  Confirmed: 'text-[#007AFF] bg-blue-500/10',
  Shipped: 'text-purple-400 bg-purple-500/10',
  Delivered: 'text-emerald-400 bg-emerald-500/10',
  Cancelled: 'text-red-400 bg-red-500/10',
}

const statusFilters = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

export default function EcommerceOrders() {
  const [orders] = useState<Order[]>(initialOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || o.status === statusFilter
    const matchDate = (!dateFrom || o.date >= dateFrom) && (!dateTo || o.date <= dateTo)
    return matchSearch && matchStatus && matchDate
  })

  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'Pending').length
  const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0)

  const formatAmount = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-[#1C1C1E]">Orders</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage e-commerce orders and shipments.</p></div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Total Orders" value={totalOrders} icon={Package} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Pending" value={pendingOrders} icon={Clock} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
        <StatsCard label="Total Revenue" value={formatAmount(totalRevenue)} icon={IndianRupee} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none w-full" placeholder="Search orders, customers..." />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-apple-gray-500" />
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          <span className="text-[10px] text-apple-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
        </div>
      </div>

      <div className="flex gap-1.5">
        {statusFilters.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${statusFilter === s ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{s}</button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Order #', accessor: (r: Order) => <span className="text-apple-blue font-mono font-medium">{r.id}</span> },
            { header: 'Date', accessor: (r: Order) => <span>{r.date}</span> },
            { header: 'Customer', accessor: (r: Order) => <span className="text-[#1C1C1E] font-medium">{r.customer}</span> },
            { header: 'Product', accessor: (r: Order) => <span>{r.product}</span> },
            { header: 'Qty', accessor: (r: Order) => <span className="text-center">{r.qty}</span> },
            { header: 'Total', accessor: (r: Order) => <span className="font-medium">₹{r.total.toLocaleString('en-IN')}</span> },
            { header: 'Status', accessor: (r: Order) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${statusColors[r.status]}`}>{r.status}</span>
            )},
            { header: '', accessor: () => (
              <ActionMenu actions={[
                { label: 'View Details', icon: ShoppingBag, onClick: () => {} },
                { label: 'Update Status', onClick: () => {} },
              ]} />
            ), className: 'text-right' },
          ]}
          data={filtered}
          keyExtractor={r => r.id}
        />
      </motion.div>
    </div>
  )
}
