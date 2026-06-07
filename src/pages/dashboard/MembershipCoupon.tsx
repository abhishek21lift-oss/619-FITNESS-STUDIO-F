import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tag, Plus, Copy, Check } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Coupon {
  id: number
  code: string
  discount: string
  discountType: string
  validUntil: string
  uses: number
  maxUses: number
  active: boolean
}

const initialCoupons: Coupon[] = [
  { id: 1, code: 'SUMMER25', discount: '25', discountType: 'Percentage', validUntil: '31 Aug 2026', uses: 47, maxUses: 100, active: true },
  { id: 2, code: 'WELCOME500', discount: '500', discountType: 'Flat', validUntil: '31 Dec 2026', uses: 128, maxUses: 500, active: true },
  { id: 3, code: 'FREEPTMONTH', discount: '1 Month PT', discountType: 'Freebie', validUntil: '30 Sep 2026', uses: 12, maxUses: 50, active: true },
  { id: 4, code: 'FRIEND20', discount: '20', discountType: 'Percentage', validUntil: '15 Jul 2026', uses: 34, maxUses: 200, active: false },
  { id: 5, code: 'NEWYEAR2026', discount: '30', discountType: 'Percentage', validUntil: '31 Jan 2027', uses: 89, maxUses: 300, active: true },
]

export default function MembershipCoupon() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [modalOpen, setModalOpen] = useState(false)
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null)
  const [copiedCode, setCopiedCode] = useState('')
  const [form, setForm] = useState({ code: '', discount: '', discountType: 'Percentage', maxUses: '100', validUntil: '', active: true })

  const openAdd = () => {
    setEditCoupon(null)
    setForm({ code: '', discount: '', discountType: 'Percentage', maxUses: '100', validUntil: '', active: true })
    setModalOpen(true)
  }

  const openEdit = (c: Coupon) => {
    setEditCoupon(c)
    setForm({ code: c.code, discount: c.discount, discountType: c.discountType, maxUses: String(c.maxUses), validUntil: c.validUntil, active: c.active })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.code || !form.discount || !form.validUntil) return
    if (editCoupon) {
      setCoupons(prev => prev.map(c => c.id === editCoupon.id ? { ...c, code: form.code, discount: form.discount, discountType: form.discountType, maxUses: Number(form.maxUses), validUntil: form.validUntil, active: form.active } : c))
    } else {
      const newId = Math.max(...coupons.map(c => c.id)) + 1
      setCoupons(prev => [...prev, { id: newId, code: form.code, discount: form.discount, discountType: form.discountType, maxUses: Number(form.maxUses), validUntil: form.validUntil, uses: 0, active: form.active }])
    }
    setModalOpen(false)
  }

  const handleDeactivate = (id: number) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c))
  }

  const handleDelete = (id: number) => {
    setCoupons(prev => prev.filter(c => c.id !== id))
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const totalCoupons = coupons.length
  const activeCoupons = coupons.filter(c => c.active).length
  const redeemedCoupons = coupons.reduce((sum, c) => sum + c.uses, 0)

  const displayDiscount = (c: Coupon) => {
    if (c.discountType === 'Percentage') return `${c.discount}%`
    if (c.discountType === 'Flat') return `₹${c.discount}`
    return c.discount
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Coupon Management</h1><p className="text-xs text-gray-500 mt-0.5">Create and manage promotional coupons.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Coupon</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Coupons" value={totalCoupons} icon={Tag} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Active" value={activeCoupons} icon={Check} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Redeemed Total" value={redeemedCoupons} icon={Copy} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {coupons.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`rounded-xl border ${c.active ? 'border-ydl-dark-border' : 'border-red-500/20'} bg-white/[0.02] p-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-ydl-yellow" />
                <span className="text-sm font-bold text-white font-mono">{c.code}</span>
              </div>
              <button onClick={() => handleCopy(c.code)} className="p-1 text-gray-500 hover:text-ydl-yellow transition-colors" title="Copy code">
                {copiedCode === c.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-lg font-bold text-ydl-yellow">{displayDiscount(c)}</p>
              <p className="text-[10px] text-gray-500">{c.discountType} · Valid till {c.validUntil}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-ydl-yellow/60" style={{ width: `${Math.min((c.uses / c.maxUses) * 100, 100)}%` }} />
                </div>
                <span className="text-[9px] text-gray-500">{c.uses}/{c.maxUses}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-ydl-dark-border">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${c.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{c.active ? 'Active' : 'Inactive'}</span>
              <ActionMenu
                label="Manage"
                actions={[
                  { label: 'Edit', onClick: () => openEdit(c) },
                  { label: c.active ? 'Deactivate' : 'Activate', onClick: () => handleDeactivate(c.id) },
                  { label: 'Delete', onClick: () => handleDelete(c.id), color: 'text-red-400' },
                ]}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editCoupon ? 'Edit Coupon' : 'Add Coupon'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Coupon Code</label>
              <input value={form.code} onChange={e => setForm(prev => ({ ...prev, code: e.target.value.toUpperCase() }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. SUMMER25" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Discount Type</label>
              <select value={form.discountType} onChange={e => setForm(prev => ({ ...prev, discountType: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option value="Percentage">Percentage (%)</option>
                <option value="Flat">Flat (₹)</option>
                <option value="Freebie">Freebie</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Discount Value</label>
              <input value={form.discount} onChange={e => setForm(prev => ({ ...prev, discount: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder={form.discountType === 'Percentage' ? 'e.g. 25' : 'e.g. 500'} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Max Uses</label>
              <input type="number" value={form.maxUses} onChange={e => setForm(prev => ({ ...prev, maxUses: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="100" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Valid Until</label>
              <input type="date" value={form.validUntil} onChange={e => setForm(prev => ({ ...prev, validUntil: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Status</label>
              <label className="flex items-center gap-2 h-7 text-xs text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))} className="w-3.5 h-3.5 accent-ydl-yellow" />
                Active
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">{editCoupon ? 'Update Coupon' : 'Create Coupon'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
