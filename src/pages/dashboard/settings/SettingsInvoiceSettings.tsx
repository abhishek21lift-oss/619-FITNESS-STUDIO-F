import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload, FileText, Hash, MapPin } from 'lucide-react'
import { useToast } from '../../../components/ui/Toast'

export default function SettingsInvoiceSettings() {
  const [prefix, setPrefix] = useState('INV')
  const [gstin, setGstin] = useState('')
  const [state, setState] = useState('')
  const [terms, setTerms] = useState('Payment due within 15 days.')
  const [footer, setFooter] = useState('Thank you for choosing YourDigitalLift!')
  const [logoName, setLogoName] = useState('')
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()

  const handleLogoUpload = () => {
    setLogoName('logo-uploaded.png')
    toast('Logo uploaded', 'success')
  }

  const handleSave = () => {
    setSaved(true)
    toast('Invoice settings saved', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Invoice Settings</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Configure invoice numbering, GST, and branding.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-2xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><Hash className="w-3 h-3" /> Invoice Prefix</label>
          <input value={prefix} onChange={e => setPrefix(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 uppercase" placeholder="INV" />
          <p className="text-[9px] text-apple-gray-400">Preview: {prefix}-2026-0001</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><FileText className="w-3 h-3" /> GSTIN</label>
          <input value={gstin} onChange={e => setGstin(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 uppercase" placeholder="22AAAAA0000A1Z5" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><MapPin className="w-3 h-3" /> State</label>
          <select value={state} onChange={e => setState(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
            <option value="">Select state...</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Delhi">Delhi</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><FileText className="w-3 h-3" /> Terms & Conditions</label>
          <textarea value={terms} onChange={e => setTerms(e.target.value)} rows={3} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><FileText className="w-3 h-3" /> Footer Message</label>
          <textarea value={footer} onChange={e => setFooter(e.target.value)} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><Upload className="w-3 h-3" /> Logo</label>
          <div className="p-4 rounded-lg border-2 border-dashed border-apple-gray-200 bg-white/[0.01] flex flex-col items-center cursor-pointer" onClick={handleLogoUpload}>
            <Upload className="w-6 h-6 text-apple-gray-500 mb-1" />
            <p className="text-xs text-apple-gray-400">{logoName || 'Click to upload logo'}</p>
            <p className="text-[10px] text-apple-gray-400 mt-0.5">PNG, JPG up to 2MB</p>
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

