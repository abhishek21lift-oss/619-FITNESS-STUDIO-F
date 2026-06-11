import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import { useToast } from '../../../components/ui/Toast'

export default function MembershipCreateCoupon() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({
    code: '', discountType: 'Percentage', discountValue: '', maxUses: '100', expiryDate: '', status: 'Active' as 'Active' | 'Inactive'
  })

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSave = () => {
    if (!form.code || !form.discountValue || !form.expiryDate) return
    toast('Coupon created successfully!', 'success')
  }

  const handleSaveClose = () => {
    if (!form.code || !form.discountValue || !form.expiryDate) return
    toast('Coupon created successfully!', 'success')
    navigate('/dashboard/memberships/coupon')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/memberships/coupon')} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] bg-white/5 border border-apple-gray-200 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Create Coupon</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Add a new promotional coupon.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Coupon Code</label>
            <input value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. SUMMER25" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Discount Type</label>
            <select value={form.discountType} onChange={e => set('discountType', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option value="Percentage">Percentage (%)</option>
              <option value="Flat">Flat (₹)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Discount Value</label>
            <input value={form.discountValue} onChange={e => set('discountValue', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder={form.discountType === 'Percentage' ? 'e.g. 25' : 'e.g. 500'} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Max Uses</label>
            <input type="number" value={form.maxUses} onChange={e => set('maxUses', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="100" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Expiry Date</label>
            <input type="date" value={form.expiryDate} onChange={e => set('expiryDate', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={() => navigate('/dashboard/memberships/coupon')} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

