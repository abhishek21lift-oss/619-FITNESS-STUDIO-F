import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle, ArrowRight, Users, CreditCard, QrCode, Dumbbell,
  Briefcase, BarChart3, MessageCircle, Calendar, Smartphone,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const features = [
  { icon: Users, title: 'Member Management', desc: 'Complete member profiles, attendance history, and communication tools in one place.' },
  { icon: CreditCard, title: 'Billing & GST', desc: 'Automated invoicing, GST-compliant billing, and payment tracking with multiple gateways.' },
  { icon: QrCode, title: 'QR Attendance', desc: 'Touchless QR-based check-in system for members and staff with real-time tracking.' },
  { icon: Dumbbell, title: 'PT Management', desc: 'Schedule, track, and bill personal training sessions with trainer commission management.' },
  { icon: Briefcase, title: 'Staff Management', desc: 'Staff scheduling, payroll, role-based access, and performance tracking.' },
  { icon: BarChart3, title: 'Reports & Analytics', desc: 'Real-time dashboards, revenue reports, member insights, and growth metrics.' },
  { icon: MessageCircle, title: 'WhatsApp Automation', desc: 'Automated reminders, promotions, and follow-ups via WhatsApp.' },
  { icon: Calendar, title: 'Class Scheduling', desc: 'Drag-and-drop schedule builder with member booking and waitlist management.' },
  { icon: Smartphone, title: 'Member App', desc: 'White-label mobile app for bookings, payments, progress tracking, and updates.' },
]

export default function GymSoftware() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1C1E] mb-6 leading-tight">
              Gym & Club{' '}
              <span className="text-apple-blue">Management Software</span>
            </h1>
            <p className="text-lg sm:text-xl text-apple-gray-500 max-w-3xl mx-auto mb-8">
              Run your gym or fitness club with India&apos;s most comprehensive management platform.
              Automate operations, engage members, and grow revenue.
            </p>
            <Link
              to="/call-for-demo"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-apple-gradient-blue rounded-xl hover:shadow-apple-lg transition-all hover:scale-105"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 bg-apple-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1C1C1E] mb-4">
              Everything Your Gym Needs
            </h2>
            <p className="text-apple-gray-500 max-w-2xl mx-auto">
              Powerful features designed specifically for gyms and fitness clubs.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 9) * 0.05 }}
                className="bg-white border border-apple-gray-200 rounded-xl p-5 hover:border-apple-gray-300 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-apple-blue/10 flex items-center justify-center mb-3">
                  <feat.icon className="w-5 h-5 text-apple-blue" />
                </div>
                <h3 className="font-heading font-semibold text-[#1C1C1E] text-sm mb-2">{feat.title}</h3>
                <p className="text-xs text-apple-gray-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1C1C1E] mb-4">
              Why Choose 619 for Your Gym?
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Save 20+ hours per week on admin tasks',
              'Increase member retention by up to 40%',
              '100% GST-compliant billing & invoicing',
              'White-label member app with your branding',
              '24/7 customer support from fitness industry experts',
              'Free data migration from any existing platform',
              'Multi-location support for growing chains',
              'Regular updates with new features every month',
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-apple-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm text-apple-gray-500">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-apple-gradient-blue p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Transform Your Gym?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join 3000+ gyms already using 619 to streamline operations and grow.
              </p>
              <Link
                to="/call-for-demo"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-apple-blue rounded-xl hover:bg-apple-blue/90 transition-all hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
