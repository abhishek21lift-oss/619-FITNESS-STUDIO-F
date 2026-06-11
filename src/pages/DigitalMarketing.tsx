import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle, ArrowRight, Globe, TrendingUp, Zap,
  Camera, BarChart3, Users,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const services = [
  {
    icon: Globe,
    title: 'Meta Ads (Facebook & Instagram)',
    items: ['Targeted ad campaigns for gym memberships', 'Retargeting audiences for higher conversions', 'Professional ad creative design', 'A/B testing & budget optimization', 'Monthly performance reports & insights'],
  },
  {
    icon: TrendingUp,
    title: 'Google Ads & SEO',
    items: ['Search & display network campaigns', 'Local gym SEO & Google My Business', 'Keyword research & competitive analysis', 'Landing page optimization', 'Conversion tracking & analytics'],
  },
  {
    icon: Zap,
    title: 'Content Creation',
    items: ['Professional gym photography & videography', 'Client testimonial videos', 'Social media content calendar', 'Blog & article writing for SEO', 'Brand identity & design assets'],
  },
  {
    icon: Camera,
    title: 'Social Media Management',
    items: ['Instagram & Facebook page management', 'Daily posts & story creation', 'Community engagement & responses', 'Influencer collaborations', 'Performance analytics & reporting'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    items: ['Custom dashboard with KPIs', 'ROI tracking per campaign', 'Member acquisition cost analysis', 'Demographic insights', 'Monthly strategy reviews'],
  },
  {
    icon: Users,
    title: 'Lead Generation',
    items: ['Multi-channel lead capture funnels', 'Automated lead nurturing workflows', 'CRM integration with 619', 'Qualified lead handover', 'Conversion rate optimization'],
  },
]

export default function DigitalMarketing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1C1E] mb-6 leading-tight">
              Digital Marketing{' '}
              <span className="text-apple-blue">for Gyms & Clubs</span>
            </h1>
            <p className="text-lg sm:text-xl text-apple-gray-500 max-w-3xl mx-auto mb-8">
              Data-driven marketing strategies designed specifically for fitness businesses. Attract
              more members, retain them longer, and grow your revenue.
            </p>
            <Link
              to="/call-for-demo"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-apple-gradient-blue rounded-xl hover:shadow-apple-lg transition-all hover:scale-105"
            >
              Get a Marketing Audit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-apple-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1C1C1E] mb-4">
              Our Marketing Services
            </h2>
            <p className="text-apple-gray-500 max-w-2xl mx-auto">
              End-to-end digital marketing solutions tailored for fitness businesses.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-apple-gray-200 rounded-2xl p-6 hover:border-apple-gray-300 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-apple-blue/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-apple-blue" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#1C1C1E] mb-3">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-apple-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-apple-blue flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1C1C1E] mb-4">
              Why 619 Marketing?
            </h2>
            <p className="text-apple-gray-500 max-w-2xl mx-auto">
              We understand the fitness industry because we&apos;re part of it.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Fitness-First Approach', desc: 'Every campaign is built on fitness industry insights and member behavior data.' },
              { title: 'Integrated with 619', desc: 'Seamless integration with your 619 dashboard for lead tracking and ROI measurement.' },
              { title: 'Proven Results', desc: 'Average 3x ROAS for our clients with measurable member acquisition and retention.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-apple-gray-200 rounded-xl p-6 text-center hover:border-apple-gray-300 transition-all"
              >
                <h3 className="font-heading font-bold text-[#1C1C1E] text-base mb-2">{item.title}</h3>
                <p className="text-sm text-apple-gray-400">{item.desc}</p>
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
                Ready to Grow Your Gym?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Get a free marketing audit and see how we can help you attract more members.
              </p>
              <Link
                to="/call-for-demo"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-apple-blue rounded-xl hover:bg-apple-blue/90 transition-all hover:scale-105"
              >
                Get Your Free Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
