import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Save } from 'lucide-react'
import { api } from '../../api'

export default function Settings() {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { api('/settings').then(setSettings).catch(() => {}).finally(() => setLoading(false)) }, [])

  const handleSave = async () => {
    setSaving(true)
    try { await api('/settings', { method: 'PUT', body: JSON.stringify(settings) }); setSaved(true); setTimeout(() => setSaved(false), 2000) } catch {}
    setSaving(false)
  }

  if (loading) return <div className="p-6 flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <div className="space-y-4">
        {[
          { label: 'Gym Name', key: 'gymName' },
          { label: 'Address', key: 'address' },
          { label: 'Phone', key: 'phone' },
          { label: 'Email', key: 'email' },
          { label: 'Currency', key: 'currency' },
          { label: 'Timezone', key: 'timezone' },
        ].map(f => (
          <motion.div key={f.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
            <label className="text-sm text-ydl-muted">{f.label}</label>
            <input type="text" value={settings[f.key] || ''} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })}
              className="w-full px-4 py-2.5 bg-ydl-card-gradient border border-ydl-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-ydl-yellow" />
          </motion.div>
        ))}
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-black bg-ydl-gradient rounded-xl hover:shadow-ydl-gold-lg transition-all disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
