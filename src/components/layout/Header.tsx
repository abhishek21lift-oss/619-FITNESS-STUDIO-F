import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Phone,
  LogIn,
} from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-apple-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="619 FITNESS STUDIO" className="h-9 w-auto" />
            <span className="font-heading font-bold text-lg tracking-tight">
              <span className="text-[#1C1C1E]">619</span>
              <span className="text-apple-blue"> FITNESS STUDIO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path!}
                className="px-4 py-2 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:+918800567469"
              className="flex items-center gap-2 text-sm text-apple-gray-500 hover:text-apple-blue transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 88005 67469</span>
            </a>

            {/* Single Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-apple-gradient-blue rounded-lg hover:shadow-apple-lg transition-all duration-300 hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#1C1C1E] hover:text-apple-blue transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-apple-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path!}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100"
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-apple-gray-200 my-3" />

              <a
                href="tel:+918800567469"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-apple-gray-500 hover:text-apple-blue transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 88005 67469
              </a>

              <div className="pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-apple-gradient-blue rounded-lg hover:shadow-apple-lg transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
