import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Package, Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

const categoryOptions = ['Supplements', 'Apparel', 'Accessories', 'Equipment']

export default function EcommerceStoreCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ storeName: '', description: '', price: '', category: 'Supplements', stock: 0, status: 'Active' })
  const [image, setImage] = useState<File | null>(null)

  const handleSave = () => {
    if (!form.storeName) { toast('Please enter a store name.', 'error'); return }
    toast('Store item created successfully!', 'success')
    navigate('/dashboard/ecommerce')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/ecommerce')} className="p-2 rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-white">Create Store Item</h1><p className="text-xs text-gray-500 mt-0.5">Add a new product to the e-commerce store.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.storeName} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-ydl-dark-border bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Store Name *</label>
          <input value={form.storeName} onChange={e => setForm(p => ({ ...p, storeName: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="YDL Premium T-Shirt" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Product description." />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Image</label>
          <label className="border-2 border-dashed border-ydl-dark-border rounded-lg p-6 text-center hover:border-ydl-yellow/30 transition-colors cursor-pointer block">
            <Image className="w-8 h-8 text-gray-600 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500">{image ? image.name : 'Click to upload image'}</p>
            <p className="text-[8px] text-gray-600 mt-0.5">Recommended: 800x800px</p>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="hidden" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Price</label>
            <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="₹799" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Category</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              {categoryOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Stock Quantity</label>
            <input type="number" min={0} value={form.stock} onChange={e => setForm(p => ({ ...p, stock: parseInt(e.target.value) || 0 }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.storeName} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/ecommerce')} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
