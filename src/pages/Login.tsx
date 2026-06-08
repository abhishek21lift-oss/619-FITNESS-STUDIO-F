import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!mobile.trim() || !password.trim()) {
      setError('Please enter mobile number and password.')
      return
    }
    setLoading(true)
    const ok = await login(mobile.trim(), password)
    setLoading(false)
    if (ok) navigate('/dashboard', { replace: true })
    else setError('Invalid credentials. Please try again.')
  }

  return (
    <div className="min-h-screen bg-[#0B1326] text-[#DAE2FD] flex flex-col md:flex-row font-body-md">
      {/* Left Hero */}
      <section className="relative w-full md:w-3/5 min-h-[40vh] md:min-h-screen overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1326]/90 via-[#0B1326]/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end p-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Powering the World's <span className="text-[#FACC15]">Elite Gyms & Studios</span>.
            </h2>
            <p className="text-base text-[#AEB9D0] max-w-sm">
              3000+ gyms, fitness studios and pilates studios across the globe are using our software.
            </p>
          </div>
        </div>
        <div className="absolute top-10 left-10 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#FACC15] flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-bold text-white">YDL</span>
          </div>
        </div>
      </section>

      {/* Right Login Form */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <div className="md:hidden mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#FACC15] flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold text-white">YDL</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[400px]">
          <header className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h2>
            <p className="text-sm text-[#AEB9D0]">Enter your credentials to login</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#AEB9D0] uppercase tracking-wider ml-1">Mobile Number or Email</label>
              <input
                type="text"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder="e.g. 919651924262"
                className="w-full bg-[#131B2E] border border-[#4D4632]/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#AEB9D0]/40 focus:outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-[#AEB9D0] uppercase tracking-wider ml-1">Password</label>
                <button type="button" className="text-xs text-[#FACC15] hover:underline">Lost your password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#131B2E] border border-[#4D4632]/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#AEB9D0]/40 focus:outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AEB9D0]/60 hover:text-[#AEB9D0]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FACC15] text-[#3C2F00] py-2.5 rounded-lg text-base font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          <footer className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">&copy; 2026 YOUR DIGITAL LIFT PRIVATE LIMITED.</p>
            <div className="mt-2 flex justify-center gap-4 text-[10px] text-gray-600">
              <a href="https://yourdigitallift.com/privacy-policy/" className="hover:text-[#FACC15] transition-colors">Privacy Policy</a>
              <a href="https://yourdigitallift.com/privacy-policy/" className="hover:text-[#FACC15] transition-colors">Terms of Service</a>
            </div>
          </footer>
        </motion.div>
      </section>
    </div>
  )
}
