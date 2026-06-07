import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Store, Package, Plus, Edit3, Trash2 } from 'lucide-react'
import { api } from '../../api'

export default function StoreItems() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')

  const load = () => api('/store').then(setItems).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const resetForm = () => { setName(''); setDescription(''); setPrice(''); setQuantity(''); setCategory(''); setEditing(null) }

  const openEdit = (item: any) => {
    setName(item.name); setDescription(item.description); setPrice(String(item.price))
    setQuantity(String(item.quantity)); setCategory(item.category); setEditing(item); setShowForm(true)
  }

  const save = async () => {
    if (!name) return
    const body = { name, description, price: parseFloat(price) || 0, quantity: parseInt(quantity) || 0, category }
    if (editing) {
      await api(`/store/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) })
    } else {
      await api('/store', { method: 'POST', body: JSON.stringify(body) })
    }
    resetForm(); setShowForm(false); load()
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await api(`/store/${id}`, { method: 'DELETE' })
    load()
  }

  const totalValue = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Store Items</h1>
        <button onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF34]/10 text-[#D4AF34] border border-[#D4AF34]/20 hover:bg-[#D4AF34]/20 transition-all text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Item Name *"
              className="w-full bg-[#1A1A1A] text-white border border-ydl-dark-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4AF34]/50" />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category"
              className="w-full bg-[#1A1A1A] text-white border border-ydl-dark-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4AF34]/50" />
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number"
              className="w-full bg-[#1A1A1A] text-white border border-ydl-dark-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4AF34]/50" />
            <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity" type="number"
              className="w-full bg-[#1A1A1A] text-white border border-ydl-dark-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4AF34]/50" />
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"
            className="w-full bg-[#1A1A1A] text-white border border-ydl-dark-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4AF34]/50" />
          <div className="flex gap-3">
            <button onClick={save}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF34] text-black font-medium text-sm hover:bg-[#D4AF34]/90 transition-all">
              {editing ? 'Update' : 'Add'} Item
            </button>
            <button onClick={() => { setShowForm(false); resetForm() }}
              className="px-5 py-2.5 rounded-xl border border-ydl-dark-border text-ydl-muted text-sm hover:text-white transition-all">Cancel</button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Items', value: items.length, icon: Package, color: 'text-blue-400' },
              { label: 'Inventory Value', value: `₹${totalValue.toLocaleString()}`, icon: Store, color: 'text-green-400' },
              { label: 'Categories', value: new Set(items.map(i => i.category).filter(Boolean)).size, icon: Store, color: 'text-purple-400' },
              { label: 'Low Stock', value: items.filter(i => i.quantity > 0 && i.quantity <= 5).length, icon: Package, color: 'text-orange-400' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-ydl-muted">{s.label}</p><p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p></div>
                  <s.icon className={`w-6 h-6 ${s.color} opacity-60`} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-ydl-dark-border">
            <table className="w-full text-sm">
              <thead className="bg-ydl-card-gradient">
                <tr className="text-ydl-muted text-left">
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium">Qty</th>
                  <th className="p-3 font-medium">Value</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ydl-dark-border">
                {items.map((item, i) => (
                  <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 text-white font-medium">{item.name}</td>
                    <td className="p-3 text-ydl-muted">{item.category || '-'}</td>
                    <td className="p-3 text-ydl-muted">₹{item.price.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`${item.quantity <= 5 ? 'text-orange-400' : 'text-ydl-muted'}`}>{item.quantity}</span>
                    </td>
                    <td className="p-3 text-ydl-muted">₹{(item.price * item.quantity).toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(item)} className="p-1.5 text-ydl-muted hover:text-[#D4AF34] rounded-lg hover:bg-[#D4AF34]/10"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteItem(item.id)} className="p-1.5 text-ydl-muted hover:text-red-400 rounded-lg hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
