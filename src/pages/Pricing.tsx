import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronDown } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const plans = [
  {
    name: 'Starter',
    price: '₹699',
    period: '/month',
    description: 'Perfect for independent gyms and studios getting started.',
    popular: false,
    features: [
      'Up to 200 members',
      'Member management',
      'QR attendance',
      'Basic billing & GST invoices',
      'WhatsApp notifications',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '₹1,499',
    period: '/month',
    description: 'Best for growing fitness businesses with advanced needs.',
    popular: true,
    features: [
      'Unlimited members',
      'Everything in Starter',
      'PT & staff management',
      'Class scheduling & booking',
      'Member app (white-label)',
      'Reports & analytics',
      'Lead management',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large chains and multi-location fitness brands.',
    popular: false,
    features: [
      'Everything in Professional',
      'Multi-location support',
      'Custom integrations',
      'Dedicated account manager',
      'API access',
      'Custom branding',
      '24/7 phone support',
      'On-site training',
    ],
  },
]

const compareFeatures = [
  { name: 'Member Management', starter: true, pro: true, enterprise: true },
  { name: 'QR Attendance', starter: true, pro: true, enterprise: true },
  { name: 'Basic Billing & GST', starter: true, pro: true, enterprise: true },
  { name: 'WhatsApp Notifications', starter: true, pro: true, enterprise: true },
  { name: 'PT & Staff Management', starter: false, pro: true, enterprise: true },
  { name: 'Class Scheduling & Booking', starter: false, pro: true, enterprise: true },
  { name: 'White-Label Member App', starter: false, pro: true, enterprise: true },
  { name: 'Reports & Analytics', starter: false, pro: true, enterprise: true },
  { name: 'Lead Management', starter: false, pro: true, enterprise: true },
  { name: 'Multi-Location Support', starter: false, pro: false, enterprise: true },
  { name: 'Custom Integrations', starter: false, pro: false, enterprise: true },
  { name: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
  { name: 'API Access', starter: false, pro: false, enterprise: true },
  { name: '24/7 Phone Support', starter: false, pro: false, enterprise: true },
]

const faqs = [
  {
    q: 'Can I start with a free trial?',
    a: 'Yes, we offer a 14-day free trial with full access to all features on the Professional plan. No credit card required.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'No hidden fees. The price you see is the price you pay. Setup, migration, and basic training are included free.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and bank transfers. Enterprise plans can be invoiced.',
  },
  {
    q: 'Do you offer discounts for annual plans?',
    a: 'Yes, annual plans come with a 15% discount compared to monthly billing.',
  },
]

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="py-16 sm:py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.div {...fadeInUp}>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-ydl-muted-light max-w-2xl mx-auto">
            Choose the plan that fits your fitness business. No hidden fees, no surprises.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative bg-ydl-card-gradient border rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-ydl-yellow shadow-ydl-gold'
                  : 'border-ydl-dark-border hover:border-ydl-dark-border-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-ydl-yellow text-black text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-ydl-muted mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="font-heading text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-ydl-muted text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-ydl-muted-light">
                    <CheckCircle className="w-4 h-4 text-ydl-yellow flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                to="/call-for-demo"
                className={`block w-full text-center px-6 py-3 text-sm font-bold rounded-xl transition-all ${
                  plan.popular
                    ? 'bg-ydl-gradient text-black hover:shadow-ydl-gold-lg'
                    : 'bg-white/5 text-white border border-ydl-dark-border hover:bg-white/10'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl font-bold text-white text-center mb-8"
          {...fadeInUp}
        >
          Feature Comparison
        </motion.h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ydl-dark-border">
                <th className="text-left py-3 pr-4 font-semibold text-white">Feature</th>
                <th className="text-center py-3 px-4 font-semibold text-ydl-muted">Starter</th>
                <th className="text-center py-3 px-4 font-semibold text-ydl-yellow">Professional</th>
                <th className="text-center py-3 px-4 font-semibold text-ydl-muted">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {compareFeatures.map((feat) => (
                <tr key={feat.name} className="border-b border-ydl-dark-border/50">
                  <td className="py-3 pr-4 text-ydl-muted-light">{feat.name}</td>
                  <td className="text-center py-3 px-4">
                    {feat.starter ? (
                      <CheckCircle className="w-4 h-4 text-ydl-yellow mx-auto" />
                    ) : (
                      <span className="text-ydl-muted">—</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {feat.pro ? (
                      <CheckCircle className="w-4 h-4 text-ydl-yellow mx-auto" />
                    ) : (
                      <span className="text-ydl-muted">—</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {feat.enterprise ? (
                      <CheckCircle className="w-4 h-4 text-ydl-yellow mx-auto" />
                    ) : (
                      <span className="text-ydl-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl font-bold text-white text-center mb-8"
          {...fadeInUp}
        >
          Pricing FAQs
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-ydl-card-gradient border border-ydl-dark-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-ydl-yellow flex-shrink-0 transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-ydl-muted leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
