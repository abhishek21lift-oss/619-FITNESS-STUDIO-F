import { useState } from 'react'
import { motion } from 'framer-motion'
import { QrCode, Save, ExternalLink, RefreshCw } from 'lucide-react'

interface SocialPlatform {
  id: string
  name: string
  icon: any
  color: string
  bg: string
  url: string
  enabled: boolean
}

const initialPlatforms: SocialPlatform[] = [
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon, color: 'text-blue-500', bg: 'bg-blue-500/10', url: 'https://facebook.com/yourdigitallift', enabled: true },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: 'text-pink-400', bg: 'bg-pink-500/10', url: 'https://instagram.com/yourdigitallift', enabled: true },
  { id: 'youtube', name: 'YouTube', icon: YoutubeIcon, color: 'text-red-500', bg: 'bg-red-500/10', url: 'https://youtube.com/@yourdigitallift', enabled: true },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedinIcon, color: 'text-[#007AFF]', bg: 'bg-blue-500/10', url: 'https://linkedin.com/company/yourdigitallift', enabled: false },
  { id: 'twitter', name: 'Twitter', icon: TwitterIcon, color: 'text-sky-400', bg: 'bg-sky-500/10', url: 'https://twitter.com/yourdigitallift', enabled: false },
  { id: 'whatsapp', name: 'WhatsApp', icon: WhatsAppIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/10', url: 'https://wa.me/919876543210', enabled: true },
]

export default function AppSettingsSocial() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(initialPlatforms)
  const [qrLink, setQrLink] = useState('https://yourdigitallift.com')
  const [saved, setSaved] = useState(false)

  const updateUrl = (id: string, url: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, url } : p))
  }

  const toggleEnabled = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const testLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-[#1C1C1E]">Social & QR</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage social links and QR code.</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Social Links</h2>
          <div className="space-y-3">
            {platforms.map(p => (
              <div key={p.id} className="p-3 rounded-lg bg-white/[0.03] border border-apple-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${p.bg} flex items-center justify-center`}><p.icon className={`w-3.5 h-3.5 ${p.color}`} /></div>
                    <span className="text-xs text-[#1C1C1E]">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => testLink(p.url)} className="p-1 text-apple-gray-500 hover:text-apple-blue" title="Test link"><ExternalLink className="w-3 h-3" /></button>
                    <div onClick={() => toggleEnabled(p.id)} className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${p.enabled ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                      <div className={`w-3 h-3 rounded-full absolute top-0.5 transition-all ${p.enabled ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
                    </div>
                  </div>
                </div>
                <input value={p.url} onChange={e => updateUrl(p.id, e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-2.5 py-1.5 text-[10px] text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="https://..." />
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="mt-4 w-full py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Save className="w-3.5 h-3.5 inline mr-1" /> {saved ? 'Saved!' : 'Save Links'}</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">QR Code</h2>
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 rounded-xl bg-white p-3 flex items-center justify-center mb-3">
              <QrCode className="w-full h-full text-black" />
            </div>
            <div className="w-full space-y-2 mb-4">
              <label className="text-[10px] font-medium text-apple-gray-400">QR Code Link</label>
              <input value={qrLink} onChange={e => setQrLink(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <p className="text-[10px] text-apple-gray-500 text-center">Scan to visit your page</p>
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => testLink(qrLink)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><QrCode className="w-3.5 h-3.5" /> Download QR</button>
              <button onClick={() => setQrLink('https://yourdigitallift.com')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]"><RefreshCw className="w-3.5 h-3.5" /> Regenerate</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function FacebookIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  )
}

function InstagramIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
  )
}

function YoutubeIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  )
}

function LinkedinIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  )
}

function TwitterIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  )
}

function WhatsAppIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  )
}
