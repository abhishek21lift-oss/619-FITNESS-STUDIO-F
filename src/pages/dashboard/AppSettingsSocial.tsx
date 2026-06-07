import { motion } from 'framer-motion'
import { Globe, MessageSquare, Camera, QrCode, Save, Edit3 } from 'lucide-react'

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com/yourdigitallift', icon: Camera, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { platform: 'Facebook', url: 'https://facebook.com/yourdigitallift', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { platform: 'Website', url: 'https://yourdigitallift.com', icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { platform: 'YouTube', url: 'https://youtube.com/@yourdigitallift', icon: PlayIcon, color: 'text-red-400', bg: 'bg-red-500/10' },
]

function PlayIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg> }

export default function AppSettingsSocial() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Social & QR</h1><p className="text-xs text-gray-500 mt-0.5">Manage social links and QR code.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Social Links</h2>
          <div className="space-y-3">
            {socialLinks.map(s => (
              <div key={s.platform} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-ydl-dark-border">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}><s.icon className={`w-4 h-4 ${s.color}`} /></div>
                  <div><p className="text-xs text-white">{s.platform}</p><p className="text-[9px] text-gray-500">{s.url}</p></div>
                </div>
                <button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Save className="w-3.5 h-3.5 inline mr-1" /> Save Links</button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">QR Code</h2>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="w-40 h-40 rounded-xl bg-white p-3 flex items-center justify-center">
              <QrCode className="w-full h-full text-black" />
            </div>
            <p className="text-[10px] text-gray-500 mt-3">Scan to visit yourdigitallift.com</p>
            <button className="mt-3 px-4 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Download QR</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
