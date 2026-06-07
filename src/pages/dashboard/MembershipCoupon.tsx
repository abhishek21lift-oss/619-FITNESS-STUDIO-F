import { motion } from 'framer-motion'
import { Tag, Plus, Edit3, Trash2 } from 'lucide-react'

const coupons = [
  { code: 'SUMMER25', discount: '25%', type: 'Percentage', validUntil: '31 Aug 2026', uses: 47, maxUses: 100, active: true },
  { code: 'WELCOME500', discount: '₹500', type: 'Flat', validUntil: '31 Dec 2026', uses: 128, maxUses: 500, active: true },
  { code: 'FREEPTMONTH', discount: '1 Month PT', type: 'Freebie', validUntil: '30 Sep 2026', uses: 12, maxUses: 50, active: true },
  { code: 'FRIEND20', discount: '20%', type: 'Percentage', validUntil: '15 Jul 2026', uses: 34, maxUses: 200, active: false },
]

export default function MembershipCoupon() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Coupon Management</h1><p className="text-xs text-gray-500 mt-0.5">Create and manage promotional coupons.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Coupon</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coupons.map((c, i) => (
          <motion.div key={c.code} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`rounded-xl border ${c.active ? 'border-ydl-dark-border' : 'border-red-500/20'} bg-white/[0.02] p-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-ydl-yellow" /><span className="text-sm font-bold text-white">{c.code}</span></div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${c.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{c.active ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-lg font-bold text-ydl-yellow">{c.discount}</p>
              <p className="text-[10px] text-gray-500">{c.type} · Valid till {c.validUntil}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full bg-ydl-yellow/60" style={{ width: `${(c.uses / c.maxUses) * 100}%` }} /></div>
                <span className="text-[9px] text-gray-500">{c.uses}/{c.maxUses}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-ydl-dark-border">
              <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-[10px] text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors"><Edit3 className="w-3 h-3" /> Edit</button>
              <button className="flex items-center justify-center px-2 py-1 text-[10px] text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-3 h-3" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
