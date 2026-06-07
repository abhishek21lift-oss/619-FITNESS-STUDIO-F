import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  CheckCircle,
  Play,
  Star,
  ArrowRight,
  MessageCircle,
  Users,
  CreditCard,
  QrCode,
  Dumbbell,
  Briefcase,
  BarChart3,
  Smartphone,
  Calendar,
  Target,
  ClipboardList,
  CreditCard as PaymentIcon,
  TrendingUp,
  Zap,
  Globe,
  Camera,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}



const clients = [
  { name: 'Anytime Fitness', country: 'India' },
  { name: 'Cult.fit', country: 'India' },
  { name: `Gold's Gym`, country: 'India' },
  { name: 'Fitness First', country: 'UAE' },
  { name: 'Warehouse Gym', country: 'India' },
  { name: 'Muscle Garage', country: 'India' },
  { name: 'Fitworks', country: 'India' },
  { name: 'Iron House', country: 'India' },
  { name: 'Bodyline', country: 'India' },
  { name: 'Proactive Fitness', country: 'India' },
]

const features = [
  { icon: MessageCircle, title: 'WhatsApp Automation', description: 'Automate reminders, promotions, and follow-ups via WhatsApp.' },
  { icon: Users, title: 'Member Management', description: 'Comprehensive member profiles, attendance history, and communication.' },
  { icon: CreditCard, title: 'Billing & GST', description: 'Automated invoicing, GST compliance, and payment tracking.' },
  { icon: QrCode, title: 'QR Attendance', description: 'Touchless QR-based check-in for members and staff.' },
  { icon: Dumbbell, title: 'PT Management', description: 'Schedule, track, and bill personal training sessions.' },
  { icon: Briefcase, title: 'Staff Management', description: 'Staff scheduling, payroll, roles, and performance tracking.' },
  { icon: BarChart3, title: 'Reports & Analytics', description: 'Real-time dashboards, revenue reports, and member insights.' },
  { icon: Smartphone, title: 'Member App', description: 'White-label member app for bookings, payments, and updates.' },
  { icon: Calendar, title: 'Class Scheduling', description: 'Drag-and-drop schedule builder with member booking.' },
  { icon: Target, title: 'Lead Management', description: 'Capture, nurture, and convert leads with automated workflows.' },
  { icon: ClipboardList, title: 'Diet & Workout Plans', description: 'Create and assign custom diet and workout plans.' },
  { icon: PaymentIcon, title: 'Payment Integration', description: 'Seamless integration with Razorpay, Stripe, and more.' },
]

const growthCards = [
  {
    icon: Globe,
    title: 'Meta Ads',
    items: ['Targeted Facebook & Instagram campaigns', 'Retargeting audiences', 'Ad creative design', 'A/B testing & optimization', 'Monthly performance reports'],
  },
  {
    icon: TrendingUp,
    title: 'Google Ads',
    items: ['Search & display network campaigns', 'Local gym SEO optimization', 'Google My Business management', 'Keyword strategy & bidding', 'Conversion tracking'],
  },
  {
    icon: Zap,
    title: 'Content Creation',
    items: ['Professional gym photography', 'Video testimonials & tours', 'Social media content calendar', 'Blog & article writing', 'Brand identity development'],
  },
]

const productTabs = [
  { id: 'gym', label: 'Gym Management' },
  { id: 'member', label: 'Member App' },
  { id: 'coaching', label: 'Coaching App' },
  { id: 'booking', label: 'Class Booking' },
  { id: 'pilates', label: 'Pilates Software' },
  { id: 'bmi', label: 'BMI Machine' },
  { id: 'brand', label: 'Brand Collaboration' },
  { id: 'website', label: 'Gym Website' },
]

const productContent: Record<string, { heading: string; description: string; checks: string[] }> = {
  gym: {
    heading: 'All-in-One Gym Management Software',
    description: 'From member onboarding to billing and attendance, manage every aspect of your gym with one powerful platform.',
    checks: ['Member registration & profile management', 'Automated billing & GST invoices', 'QR & biometric attendance', 'PT & staff scheduling', 'Real-time reports & analytics'],
  },
  member: {
    heading: 'White-Label Member App',
    description: 'Give your members a branded mobile experience to book classes, track progress, and stay connected.',
    checks: ['Custom branding with your logo', 'Class booking & waitlist', 'Workout & diet plan access', 'Push notifications & announcements', 'Payment & membership cards'],
  },
  coaching: {
    heading: 'Personal Training & Coaching App',
    description: 'Empower your trainers with digital tools to manage clients, track progress, and grow revenue.',
    checks: ['Client progress tracking', 'Workout & meal plan creation', 'In-app communication', 'Session scheduling & billing', 'Performance analytics'],
  },
  booking: {
    heading: 'Smart Class Booking System',
    description: 'Let members book classes effortlessly while you manage capacity and schedules in real time.',
    checks: ['Real-time availability & booking', 'Waitlist management', 'Recurring class scheduling', 'Automated reminders', 'Capacity & resource management'],
  },
  pilates: {
    heading: 'Specialized Pilates Studio Software',
    description: 'Built specifically for Pilates studios — manage reformers, sessions, memberships, and instructors.',
    checks: ['Reformer & equipment scheduling', 'Session pack management', 'Instructor commission tracking', 'Member progress notes', 'GST-compliant billing'],
  },
  bmi: {
    heading: 'BMI Machine Integration',
    description: 'Connect BMI machines for automated health assessments that sync directly to member profiles.',
    checks: ['Auto sync with major BMI machines', 'Health report generation', 'Trend tracking over time', 'Member app integration', 'Printable health summaries'],
  },
  brand: {
    heading: 'Brand Collaboration Platform',
    description: 'Connect fitness brands with gyms for sponsorships, product placements, and partnerships.',
    checks: ['Brand discovery & matchmaking', 'Campaign management', 'Performance analytics', 'Payment & invoice automation', 'Review & rating system'],
  },
  website: {
    heading: 'Custom Gym Website Builder',
    description: 'Get a stunning, high-converting website for your gym with built-in booking and SEO.',
    checks: ['Mobile-responsive design', 'Class schedule integration', 'Online booking & payments', 'Trainer profiles', 'SEO optimization'],
  },
}

const testimonials = [
  {
    name: 'Rajesh Kumar',
    gym: 'Iron House Gym, Delhi',
    quote: 'Your Digital Lift transformed our operations. Billing is now fully automated and our member retention has increased by 40%.',
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    gym: 'Fitworks Studio, Mumbai',
    quote: 'The member app is a game-changer. Our clients love the ease of booking classes and tracking their workouts.',
    stars: 5,
  },
  {
    name: 'Ahmed Khan',
    gym: 'Proactive Fitness, Dubai',
    quote: 'We tried 5 different software before YDL. Nothing comes close to the features and support they provide.',
    stars: 5,
  },
  {
    name: 'Sneha Patel',
    gym: 'Bodyline Fitness, Ahmedabad',
    quote: 'The WhatsApp automation alone saves us 20+ hours a week. Absolutely essential for any modern gym.',
    stars: 5,
  },
]

const faqs = [
  {
    q: 'What is Your Digital Lift?',
    a: 'Your Digital Lift is a comprehensive gym and studio management software that automates billing, attendance, member management, scheduling, and marketing for fitness businesses.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required.',
  },
  {
    q: 'Can I migrate my existing data?',
    a: 'Absolutely. Our team assists with seamless data migration from any existing software or spreadsheets at no extra cost.',
  },
  {
    q: 'Does it work for both gyms and studios?',
    a: 'Yes, YDL is designed for independent gyms, fitness studios, boutique studios, and multi-location chains.',
  },
  {
    q: 'Is GST billing supported?',
    a: 'Yes, our billing system is fully GST-compliant with automatic tax calculations, e-invoice generation, and GST return reports.',
  },
  {
    q: 'Do you offer training and support?',
    a: 'We provide free onboarding, training sessions, and 24/7 customer support via chat, email, and phone.',
  },
  {
    q: 'Can I use my own branding?',
    a: 'Yes, the member app, website, and all communications can be fully white-labeled with your gym\'s branding.',
  },
  {
    q: 'What payment gateways do you support?',
    a: 'We integrate with Razorpay, Stripe, PayU, and other major payment gateways for seamless online collections.',
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('gym')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-ydl-glow pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ydl-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ydl-yellow/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ydl-yellow/10 border border-ydl-dark-border text-ydl-yellow text-xs font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Trusted by 3000+ Gyms Worldwide
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
              No. 1 Fitness Management
              <br />
              <span className="text-ydl-yellow">Software for Gyms & Coaches</span>
            </h1>
            <p className="text-lg sm:text-xl text-ydl-muted-light max-w-2xl mx-auto mb-8 leading-relaxed">
              Automate billing, attendance, member management, and marketing — all in one
              platform. Built for gyms, studios, and fitness coaches.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/call-for-demo"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black bg-ydl-gradient rounded-xl hover:shadow-ydl-gold-lg transition-all duration-300 hover:scale-105"
              >
                Book Your Demo Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-ydl-dark-border rounded-xl hover:bg-white/5 transition-all"
              >
                <Play className="w-5 h-5" />
                Watch Demo Video
              </a>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-ydl-yellow/5 blur-[60px] rounded-3xl" />
              <div className="relative bg-ydl-surface border border-ydl-dark-border rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-ydl-surface-light border-b border-ydl-dark-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-ydl-muted">Your Digital Lift Dashboard</span>
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
                    {['Total Members', 'Active Today', 'Revenue'].map((label) => (
                      <div key={label} className="bg-white/5 rounded-lg p-3 sm:p-4 border border-ydl-dark-border">
                        <div className="text-[10px] sm:text-xs text-ydl-muted mb-1">{label}</div>
                        <div className="h-5 sm:h-6 w-16 sm:w-20 rounded bg-ydl-yellow/20 animate-pulse" />
                      </div>
                    ))}
                  </div>
                  <div className="h-32 sm:h-40 lg:h-48 bg-white/5 rounded-lg border border-ydl-dark-border flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-ydl-yellow/30" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TRUSTED BY ============ */}
      <section className="py-12 sm:py-16 border-y border-ydl-dark-border bg-ydl-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p className="text-center text-sm font-medium text-ydl-muted mb-8 uppercase tracking-wider" {...fadeInUp}>
            Trusted by 3000+ Gyms &amp; 1000+ Fitness Coaches
          </motion.p>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 sm:gap-16 animate-ticker" style={{ width: 'max-content' }}>
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-ydl-dark-border"
                >
                  <div className="w-8 h-8 rounded-full bg-ydl-yellow/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-ydl-yellow" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white whitespace-nowrap">{client.name}</div>
                    <div className="text-[10px] text-ydl-muted">{client.country}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BUILT FOR ============ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for Every Fitness Business
            </h2>
            <p className="text-ydl-muted-light max-w-2xl mx-auto">
              Whether you run a single studio or a chain of gyms, YDL scales with your needs.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Independent Gyms',
                desc: 'All-in-one management for stand-alone gyms — billing, attendance, member engagement, and growth.',
                image: '🏋️',
              },
              {
                title: 'Fitness Studios',
                desc: 'Built for yoga, pilates, CrossFit, and boutique studios with class scheduling and pack management.',
                image: '🧘',
              },
              {
                title: 'Growing Gym Chains',
                desc: 'Multi-location support, centralized reporting, and brand consistency across all your branches.',
                image: '🏢',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-ydl-card-gradient border border-ydl-dark-border rounded-2xl p-6 sm:p-8 hover:border-ydl-dark-border-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{card.image}</div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-ydl-muted leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES GRID ============ */}
      <section id="features" className="py-16 sm:py-20 bg-ydl-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Run Your Gym
            </h2>
            <p className="text-ydl-muted-light max-w-2xl mx-auto">
              12 powerful features designed to automate operations and grow your fitness business.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 12) * 0.05 }}
                className="group bg-ydl-card-gradient border border-ydl-dark-border rounded-xl p-5 hover:border-ydl-dark-border-hover hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-ydl-yellow/10 flex items-center justify-center mb-3 group-hover:bg-ydl-yellow/20 transition-colors">
                  <feat.icon className="w-5 h-5 text-ydl-yellow" />
                </div>
                <h3 className="font-heading font-semibold text-white text-sm mb-2">{feat.title}</h3>
                <p className="text-xs text-ydl-muted leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GROWTH MARKETING ============ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Growth Marketing for Gyms
            </h2>
            <p className="text-ydl-muted-light max-w-2xl mx-auto">
              Drive more members with data-driven marketing strategies tailored for fitness businesses.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {growthCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-ydl-card-gradient border border-ydl-dark-border rounded-2xl p-6 sm:p-8 hover:border-ydl-dark-border-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-ydl-yellow/10 flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-ydl-yellow" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-4">{card.title}</h3>
                <ul className="space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ydl-muted">
                      <CheckCircle className="w-4 h-4 text-ydl-yellow flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT DETAILS TABS ============ */}
      <section className="py-16 sm:py-20 bg-ydl-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore Our Products
            </h2>
            <p className="text-ydl-muted-light max-w-2xl mx-auto">
              Powerful tools for every aspect of your fitness business.
            </p>
          </motion.div>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-ydl-yellow text-black'
                    : 'bg-white/5 text-ydl-muted-light border border-ydl-dark-border hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-ydl-card-gradient border border-ydl-dark-border rounded-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 sm:p-8 lg:p-10">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                  {productContent[activeTab].heading}
                </h3>
                <p className="text-ydl-muted-light mb-6 leading-relaxed">
                  {productContent[activeTab].description}
                </p>
                <ul className="space-y-3 mb-8">
                  {productContent[activeTab].checks.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ydl-muted">
                      <CheckCircle className="w-5 h-5 text-ydl-yellow flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/call-for-demo"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-black bg-ydl-gradient rounded-lg hover:shadow-ydl-gold-lg transition-all"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative min-h-[250px] bg-ydl-surface-light flex items-center justify-center border-t md:border-t-0 md:border-l border-ydl-dark-border">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-ydl-yellow/10 flex items-center justify-center mb-3">
                    <Camera className="w-10 h-10 text-ydl-yellow/40" />
                  </div>
                  <p className="text-sm text-ydl-muted">Product Screenshot</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-ydl-muted-light max-w-2xl mx-auto">
              Hear from gym owners and fitness professionals who trust YDL.
            </p>
          </motion.div>

          {/* Video Testimonials */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[1, 2, 3].map((v) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: v * 0.1 }}
                className="relative aspect-video bg-ydl-surface rounded-xl border border-ydl-dark-border overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-ydl-yellow/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-black ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-xs font-medium text-white">Video Testimonial {v}</p>
                    <p className="text-[10px] text-ydl-muted">Gym Owner</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Text Testimonials */}
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-ydl-card-gradient border border-ydl-dark-border rounded-xl p-6 hover:border-ydl-dark-border-hover transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-ydl-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-ydl-yellow text-lg">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-ydl-muted">{t.gym}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: t.stars }).map((_, si) => (
                        <Star key={si} className="w-3.5 h-3.5 fill-ydl-yellow text-ydl-yellow" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ydl-muted-light italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-ydl-gradient p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4">
                Automate Your Fitness Business
              </h2>
              <p className="text-lg sm:text-xl text-black/80 mb-8 max-w-2xl mx-auto">
                Increase Retention &amp; Grow Revenue with India&apos;s #1 Gym Management Software
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/call-for-demo"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-ydl-yellow bg-black rounded-xl hover:bg-black/90 transition-all hover:scale-105"
                >
                  Book Your Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black border-2 border-black/30 rounded-xl hover:bg-black/10 transition-all"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 sm:py-20 bg-ydl-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-ydl-muted-light">
              Everything you need to know about Your Digital Lift.
            </p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-ydl-card-gradient border border-ydl-dark-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-ydl-yellow flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-ydl-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
