import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', gym: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#1C1C1E] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-apple-gray-500 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out and our team will get back to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div className="bg-white border border-apple-gray-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-apple-blue/20 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-apple-blue" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#1C1C1E] mb-2">Thank You!</h3>
                <p className="text-apple-gray-500">
                  Your message has been received. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-apple-gray-200 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-500 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-500 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-500 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-500 mb-1.5">
                      Gym / Studio Name
                    </label>
                    <input
                      type="text"
                      name="gym"
                      value={form.gym}
                      onChange={handleChange}
                      placeholder="Your Gym Name"
                      className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray-500 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-apple-gradient-blue rounded-xl hover:shadow-apple-lg transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white border border-apple-gray-200 rounded-2xl p-6 sm:p-8">
              <h3 className="font-heading text-lg font-bold text-[#1C1C1E] mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-apple-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1E]">Phone</p>
                    <a href="tel:+918800567469" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">
                      +91 88005 67469
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-apple-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1E]">Email</p>
                    <a href="mailto:contact@yourdigitallift.com" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">
                      contact@yourdigitallift.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-apple-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1E]">India Office</p>
                    <p className="text-sm text-apple-gray-400">
                      Sector 62, Noida, Uttar Pradesh 201309
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-apple-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1E]">UAE Office</p>
                    <p className="text-sm text-apple-gray-400">
                      Dubai Silicon Oasis, Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white border border-apple-gray-200 rounded-2xl overflow-hidden h-48 sm:h-56">
              <div className="w-full h-full bg-apple-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-apple-blue/40 mx-auto mb-2" />
                  <p className="text-sm text-apple-gray-400">Map Integration</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
