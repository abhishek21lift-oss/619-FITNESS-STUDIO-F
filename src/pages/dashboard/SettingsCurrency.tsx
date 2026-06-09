import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, DollarSign, AlignLeft, ToggleLeft } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

const currencyCodes = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'AUD', 'CAD', 'SGD']

export default function SettingsCurrency() {
  const [symbol, setSymbol] = useState('₹')
  const [code, setCode] = useState('INR')
  const [position, setPosition] = useState<'Before' | 'After'>('Before')
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setSaved(true)
    toast('Currency settings saved', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Currency Settings</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Configure currency symbol, code, and display format.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-lg space-y-4">
        <div className="p-4 rounded-lg bg-white/[0.03] border border-apple-gray-200 text-center mb-2">
          <p className="text-3xl font-bold text-apple-blue">
            {position === 'Before' ? `${symbol}1,234.56` : `1,234.56${symbol}`}
          </p>
          <p className="text-[10px] text-apple-gray-500 mt-1">Preview</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Currency Symbol</label>
          <input value={symbol} onChange={e => setSymbol(e.target.value)} maxLength={3} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="₹" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><AlignLeft className="w-3 h-3" /> Currency Code</label>
          <select value={code} onChange={e => setCode(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
            {currencyCodes.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><ToggleLeft className="w-3 h-3" /> Position</label>
          <div className="flex items-center gap-3">
            {(['Before', 'After'] as const).map(p => (
              <label key={p} className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg cursor-pointer border transition-colors ${position === p ? 'text-apple-blue bg-apple-blue/10 border-ydl-yellow/30' : 'text-apple-gray-400 bg-white/5 border-apple-gray-200 hover:text-[#1C1C1E]'}`}>
                <input type="radio" name="currencyPosition" checked={position === p} onChange={() => setPosition(p)} className="w-3 h-3 accent-ydl-yellow" />
                {p} ({p === 'Before' ? `${symbol}100` : `100${symbol}`})
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
            <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
