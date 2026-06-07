import { motion } from 'framer-motion'
import { Package, Plus, Edit3, Trash2, Star } from 'lucide-react'

const items = [
  { name: 'YDL Premium T-Shirt', price: '₹799', category: 'Apparel', stock: 45, sales: 128, rating: 4.5, active: true },
  { name: 'YDL Gym Bag', price: '₹1,299', category: 'Accessories', stock: 22, sales: 67, rating: 4.2, active: true },
  { name: 'YDL Shaker Bottle', price: '₹349', category: 'Accessories', stock: 78, sales: 201, rating: 4.7, active: true },
  { name: 'YDL Resistance Bands', price: '₹599', category: 'Equipment', stock: 34, sales: 89, rating: 4.3, active: true },
  { name: 'YDL Wrist Wraps', price: '₹449', category: 'Equipment', stock: 56, sales: 45, rating: 4.0, active: false },
]

export default function Ecommerce() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">E-commerce</h1><p className="text-xs text-gray-500 mt-0.5">Manage gym merchandise and products.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Product</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div key={item.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-ydl-yellow/10 to-amber-600/5 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-600" />
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-white">{item.name}</h3>
                  <span className="text-[9px] text-gray-500">{item.category}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${item.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{item.active ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-ydl-yellow">{item.price}</span>
                <div className="flex items-center gap-1"><Star className="w-3 h-3 text-ydl-yellow" /><span className="text-[10px] text-gray-400">{item.rating}</span></div>
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[9px] text-gray-500">
                <span>Stock: <span className="text-gray-300">{item.stock}</span></span>
                <span>Sales: <span className="text-gray-300">{item.sales}</span></span>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-ydl-dark-border">
                <button className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><Edit3 className="w-3 h-3" /> Edit</button>
                <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
