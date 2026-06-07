import { motion } from 'framer-motion'
import { Plus, Image } from 'lucide-react'

const transformations = [
  { client: 'Rahul Sharma', trainer: 'Riya Singh', start: 'Jan 2026', current: 'Jun 2026', weightLoss: '12 kg', status: 'Active', progress: 75 },
  { client: 'Priya Singh', trainer: 'Shivani Verma', start: 'Mar 2026', current: 'Jun 2026', weightLoss: '8 kg', status: 'Active', progress: 60 },
  { client: 'Amit Verma', trainer: 'Abhishek Katiyar', start: 'Feb 2026', current: 'May 2026', weightLoss: '15 kg', status: 'Completed', progress: 100 },
  { client: 'Sneha Patel', trainer: 'Awash Vikash', start: 'Apr 2026', current: 'Jun 2026', weightLoss: '5 kg', status: 'Active', progress: 40 },
]

export default function TrainersTransformations() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Transformations</h1><p className="text-xs text-gray-500 mt-0.5">Client before/after tracking.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Transformation</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {transformations.map((t, i) => (
          <motion.div key={t.client} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ydl-yellow/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center">
                <Image className="w-5 h-5 text-ydl-yellow" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">{t.client}</h3>
                <p className="text-[10px] text-gray-500">Trainer: {t.trainer}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between"><span className="text-gray-500">Started</span><span className="text-gray-300">{t.start}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Current</span><span className="text-gray-300">{t.current}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Weight Loss</span><span className="font-bold text-emerald-400">{t.weightLoss}</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-ydl-dark-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] text-gray-500">Progress</span>
                <span className="text-[9px] font-medium text-ydl-yellow">{t.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-ydl-yellow/60 to-ydl-yellow/40" style={{ width: `${t.progress}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
