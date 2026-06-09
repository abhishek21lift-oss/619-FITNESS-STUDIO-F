import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dumbbell, LogIn, Loader2, Eye, EyeOff, UserCheck } from 'lucide-react'
import { login, setToken, setUser } from '../api'

export default function TrainerLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setSubmitting(true)
    try {
      const data = await login(email, password)
      setToken(data.token)
      setUser(data.user)
      navigate('/trainer')
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-apple-gradient-blue flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl">
              <span className="text-[#1C1C1E]">Your</span>
              <span className="text-apple-blue"> Digital Lift</span>
            </span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-[#1C1C1E]">Trainer Login</h1>
          <p className="text-sm text-apple-gray-400 mt-1">Access your trainer dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-apple-gray-200 rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {error && (
            <div className="px-4 py-3 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-xl text-sm text-[#FF3B30]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-apple-gray-500 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trainer@gym.com"
              className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-apple-gray-500 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-apple-gray-400 hover:text-[#1C1C1E] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-apple-gradient-blue rounded-xl hover:shadow-apple-lg transition-all disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/fitness-center/login"
              className="inline-flex items-center gap-2 text-sm text-apple-gray-400 hover:text-apple-blue transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              Login as Staff / Admin
            </Link>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
