import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-apple-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <img src="/logo.png" alt="619 FITNESS STUDIO" className="h-9 w-auto" />
              <span className="font-heading font-bold text-lg">
                <span className="text-[#1C1C1E]">619</span>
                <span className="text-apple-blue"> FITNESS STUDIO</span>
              </span>
            </Link>
            <p className="text-sm text-apple-gray-400 leading-relaxed max-w-sm mb-6">
              Premium fitness management software for modern gyms and studios.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-apple-gray-100 hover:bg-apple-gray-200 border border-apple-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-[#1C1C1E]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-apple-gray-400 leading-tight">Download on</div>
                  <div className="text-xs font-semibold text-[#1C1C1E] leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-apple-gray-100 hover:bg-apple-gray-200 border border-apple-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-[#1C1C1E]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-apple-gray-400 leading-tight">Get it on</div>
                  <div className="text-xs font-semibold text-[#1C1C1E] leading-tight">Google Play</div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-apple-gray-100 hover:bg-apple-blue/20 border border-apple-gray-200 flex items-center justify-center text-apple-gray-400 hover:text-apple-blue transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-apple-gray-100 hover:bg-apple-blue/20 border border-apple-gray-200 flex items-center justify-center text-apple-gray-400 hover:text-apple-blue transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-apple-gray-100 hover:bg-apple-blue/20 border border-apple-gray-200 flex items-center justify-center text-apple-gray-400 hover:text-apple-blue transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-apple-gray-100 hover:bg-apple-blue/20 border border-apple-gray-200 flex items-center justify-center text-apple-gray-400 hover:text-apple-blue transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-[#1C1C1E] text-sm mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">Home</Link></li>
              <li><Link to="/login" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-[#1C1C1E] text-sm mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+918800567469"
                  className="flex items-center gap-2 text-sm text-apple-gray-400 hover:text-apple-blue transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  +91 88005 67469
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@619fitnessstudio.com"
                  className="flex items-center gap-2 text-sm text-apple-gray-400 hover:text-apple-blue transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  contact@619fitnessstudio.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-apple-gray-400">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>
                    Sector 62, Noida,
                    <br />
                    Uttar Pradesh, India
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-apple-gray-400">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>
                    Dubai Silicon Oasis,
                    <br />
                    Dubai, UAE
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-apple-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-apple-gray-400">
            &copy; {new Date().getFullYear()} 619 FITNESS STUDIO. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-xs text-apple-gray-400 hover:text-apple-blue transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-xs text-apple-gray-400 hover:text-apple-blue transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
