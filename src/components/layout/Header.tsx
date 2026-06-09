import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Dumbbell,
  Smartphone,
  Users,
  Globe,
  LogIn,
  UserCheck,
  GraduationCap,
} from 'lucide-react'

const products = [
  { name: 'Gym & Club Software', path: '/gym-and-club-software', icon: Dumbbell },
  { name: 'Pilates Studio Software', path: '/pilates-studio', icon: Smartphone },
  { name: 'Studio Software', path: '/studio', icon: Users },
  { name: 'Digital Marketing', path: '/digital-marketing-for-gyms-and-fitness-clubs', icon: Globe },
]

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Products',
    path: '#',
    dropdown: products,
  },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blogs' },
  { name: 'Contact Us', path: '/contact-us' },
]

const loginItems = [
  { name: 'Staff / Admin', path: '/fitness-center/login', icon: UserCheck },
  { name: 'Trainer', path: '/trainer-dashboard/login', icon: GraduationCap },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-apple-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-apple-gradient-blue flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              <span className="text-[#1C1C1E]">Your</span>
              <span className="text-apple-blue"> Digital Lift</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100">
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        productsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white border border-apple-gray-200 rounded-xl shadow-apple-lg overflow-hidden"
                      >
                        <div className="p-2">
                          {products.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-apple-gray-100 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-apple-blue/10 flex items-center justify-center group-hover:bg-apple-blue/20 transition-colors">
                                <item.icon className="w-4 h-4 text-apple-blue" />
                              </div>
                              <span className="text-sm font-medium text-apple-gray-500 group-hover:text-[#1C1C1E] transition-colors">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path!}
                  className="px-4 py-2 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100"
                >
                  {link.name}
                </Link>
              )
            )}
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

            {/* Login Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLoginOpen(true)}
              onMouseLeave={() => setLoginOpen(false)}
            >
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100 border border-apple-gray-200">
                <LogIn className="w-4 h-4" />
                Login
              </button>
              <AnimatePresence>
                {loginOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-52 bg-white border border-apple-gray-200 rounded-xl shadow-apple-lg overflow-hidden"
                  >
                    <div className="p-2">
                      {loginItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-apple-gray-100 transition-colors group"
                        >
                          <item.icon className="w-4 h-4 text-apple-blue" />
                          <span className="text-sm font-medium text-apple-gray-500 group-hover:text-[#1C1C1E] transition-colors">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book A Demo CTA */}
            <Link
              to="/call-for-demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-apple-gradient-blue rounded-lg hover:shadow-apple-lg transition-all duration-300 hover:scale-105"
            >
              Book A Demo
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
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.name}>
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          productsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1 overflow-hidden"
                        >
                          {products.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 text-sm text-apple-gray-400 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100"
                            >
                              <item.icon className="w-4 h-4 text-apple-blue" />
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path!}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100"
                  >
                    {link.name}
                  </Link>
                )
              )}

              <hr className="border-apple-gray-200 my-3" />

              <a
                href="tel:+918800567469"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-apple-gray-500 hover:text-apple-blue transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 88005 67469
              </a>

              <div className="pt-2 space-y-1">
                <p className="px-3 text-xs font-medium text-apple-gray-400 uppercase tracking-wider">Login</p>
                {loginItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-apple-gray-500 hover:text-[#1C1C1E] transition-colors rounded-lg hover:bg-apple-gray-100"
                  >
                    <item.icon className="w-4 h-4 text-apple-blue" />
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/call-for-demo"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-apple-gradient-blue rounded-lg hover:shadow-apple-lg transition-all"
                >
                  Book A Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
