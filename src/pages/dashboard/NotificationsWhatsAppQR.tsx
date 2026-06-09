import { useState } from 'react'
import { motion } from 'framer-motion'
import { QrCode, RefreshCw, Smartphone, CheckCircle } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

export default function NotificationsWhatsAppQR() {
  const [connected, setConnected] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      toast('QR code refreshed', 'success')
    }, 2000)
  }

  const handleDeviceLinked = () => {
    setConnected(true)
    toast('Device linked successfully', 'success')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">WhatsApp QR</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Scan to link your WhatsApp device.</p>
      </div>

      <div className={`flex items-center gap-3 p-3 rounded-lg border max-w-2xl ${connected ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
        {connected ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Smartphone className="w-5 h-5 text-amber-400" />}
        <div>
          <p className={`text-xs font-semibold ${connected ? 'text-emerald-400' : 'text-amber-400'}`}>{connected ? 'Device Connected' : 'Waiting for scan'}</p>
          <p className="text-[10px] text-apple-gray-500">{connected ? 'WhatsApp is active and linked.' : 'Scan the QR code below with your phone.'}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-8 max-w-md flex flex-col items-center">
        <div className="w-56 h-56 rounded-xl bg-white p-4 flex items-center justify-center mb-4 shadow-lg">
          <QrCode className="w-full h-full text-black" />
        </div>
        <h3 className="text-sm font-semibold text-[#1C1C1E] mb-1">Scan to Connect WhatsApp</h3>
        <ol className="text-[11px] text-apple-gray-500 space-y-1.5 list-decimal list-inside mb-4">
          <li>Open WhatsApp on your phone</li>
          <li>Tap Menu or Settings and select Linked Devices</li>
          <li>Tap Link a Device</li>
          <li>Scan the QR code shown above</li>
        </ol>
        <p className="text-[10px] text-apple-gray-400 mb-5">QR code expires in 5:00 minutes</p>
        {!connected && (
          <button onClick={handleDeviceLinked} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 mb-3">
            <Smartphone className="w-3.5 h-3.5" /> I've Scanned the Code
          </button>
        )}
        <button onClick={handleRefresh} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] disabled:opacity-40">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> {refreshing ? 'Refreshing...' : 'Refresh QR Code'}
        </button>
      </motion.div>
    </div>
  )
}
