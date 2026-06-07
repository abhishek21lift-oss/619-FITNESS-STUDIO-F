import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Edit3, Trash2, AlertTriangle, ShoppingBag, Tag } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Product {
  id: number
  name: string
  category: string
  price: string
  stock: number
  description: string
  status: 'Active' | 'Inactive'
}

const categories = ['All', 'Supplements', 'Apparel', 'Accessories', 'Equipment']

const initialProducts: Product[] = [
  { id: 1, name: 'YDL Premium T-Shirt', price: '₹799', category: 'Apparel', stock: 45, description: 'Premium cotton gym t-shirt with YDL logo.', status: 'Active' },
  { id: 2, name: 'YDL Gym Bag', price: '₹1,299', category: 'Accessories', stock: 22, description: 'Spacious gym bag with multiple compartments.', status: 'Active' },
  { id: 3, name: 'YDL Shaker Bottle', price: '₹349', category: 'Accessories', stock: 78, description: 'BPA-free protein shaker bottle 600ml.', status: 'Active' },
  { id: 4, name: 'YDL Resistance Bands', price: '₹599', category: 'Equipment', stock: 5, description: 'Set of 5 resistance bands with different tensions.', status: 'Active' },
  { id: 5, name: 'YDL Wrist Wraps', price: '₹449', category: 'Equipment', stock: 56, description: 'Premium wrist wraps for heavy lifting.', status: 'Inactive' },
  { id: 6, name: 'Whey Protein 1kg', price: '₹2,499', category: 'Supplements', stock: 3, description: 'Premium whey protein isolate - chocolate flavor.', status: 'Active' },
  { id: 7, name: 'YDL Cap', price: '₹399', category: 'Apparel', stock: 34, description: 'Adjustable gym cap with embroidered logo.', status: 'Active' },
  { id: 8, name: 'YDL Water Bottle', price: '₹299', category: 'Accessories', stock: 12, description: 'Stainless steel insulated water bottle 1L.', status: 'Active' },
]

export default function Ecommerce() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [category, setCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({ name: '', category: 'Supplements', price: '', stock: 0, description: '', status: 'Active' as Product['status'] })

  const filtered = category === 'All' ? products : products.filter(p => p.category === category)

  const lowStockItems = products.filter(p => p.stock <= 10 && p.status === 'Active').length

  const openAdd = () => {
    setEditProduct(null)
    setForm({ name: '', category: 'Supplements', price: '', stock: 0, description: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, description: p.description, status: p.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...form } : p))
    } else {
      setProducts(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const toggleStatus = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p))
  }

  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const updateStock = (id: number) => {
    const p = products.find(p => p.id === id)
    if (p) {
      setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, description: p.description, status: p.status })
      setEditProduct(p)
      setModalOpen(true)
    }
  }

  const uniqueCategories = [...new Set(products.map(p => p.category))]

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">E-commerce</h1><p className="text-xs text-gray-500 mt-0.5">Manage gym merchandise and products.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Product</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Total Products" value={products.length} icon={Package} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Categories" value={uniqueCategories.length} icon={Tag} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
        <StatsCard label="Low Stock Items" value={lowStockItems} icon={AlertTriangle} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
      </div>

      <div className="flex gap-1.5">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${category === c ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-ydl-yellow/10 to-amber-600/5 flex items-center justify-center relative">
              <Package className="w-12 h-12 text-gray-600" />
              {p.stock <= 10 && p.status === 'Active' && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[8px] font-bold text-white bg-red-500/80 rounded-md flex items-center gap-0.5">
                  <AlertTriangle className="w-2.5 h-2.5" /> Low Stock
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-white truncate">{p.name}</h3>
                  <span className="text-[9px] text-gray-500">{p.category}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${p.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{p.status}</span>
              </div>
              <p className="text-[9px] text-gray-500 mt-1 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-ydl-yellow">{p.price}</span>
                <span className={`text-[9px] font-medium ${p.stock <= 10 ? 'text-red-400' : 'text-gray-400'}`}>Stock: {p.stock}</span>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-ydl-dark-border">
                <ActionMenu actions={[
                  { label: 'Edit', icon: Edit3, onClick: () => openEdit(p) },
                  { label: 'Update Stock', icon: ShoppingBag, onClick: () => updateStock(p.id) },
                  { label: p.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => toggleStatus(p.id), color: p.status === 'Active' ? 'text-red-400' : 'text-emerald-400' },
                  { label: 'Delete', icon: Trash2, onClick: () => removeProduct(p.id), color: 'text-red-400' },
                ]} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editProduct ? 'Edit Product' : 'Add Product'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Product Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="YDL Premium T-Shirt" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Supplements</option><option>Apparel</option><option>Accessories</option><option>Equipment</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Product['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Price</label>
              <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="₹799" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Stock Count</label>
              <input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: parseInt(e.target.value) || 0 }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
          <div className="border-2 border-dashed border-ydl-dark-border rounded-lg p-4 text-center hover:border-ydl-yellow/30 transition-colors cursor-pointer">
            <Package className="w-6 h-6 text-gray-600 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500">Product image (optional)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editProduct ? 'Update' : 'Add'} Product</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
