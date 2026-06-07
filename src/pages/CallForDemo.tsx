import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, Send, Loader2, CheckCircle } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function CallForDemo() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gym: '',
    location: '',
    date: '',
    time: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-16 sm:py-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-ydl-yellow/20 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-ydl-yellow" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Demo Request Received!
          </h1>
          <p className="text-ydl-muted-light text-lg mb-2">
            Thank you, {form.name}!
          </p>
          <p className="text-ydl-muted">
            Our team will contact you at <strong className="text-white">{form.phone}</strong> or{' '}
            <strong className="text-white">{form.email}</strong> within 24 hours to schedule your
            personalized demo.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-10" {...fadeInUp}>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Book a Free Demo
          </h1>
          <p className="text-lg text-ydl-muted-light max-w-xl mx-auto">
            See how Your Digital Lift can transform your fitness business. Fill in the details and
            we&apos;ll show you around.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-ydl-card-gradient border border-ydl-dark-border rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                  Gym / Studio Name *
                </label>
                <input
                  type="text"
                  name="gym"
                  required
                  value={form.gym}
                  onChange={handleChange}
                  placeholder="Your Gym Name"
                  className="w-full px-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                Location (City)
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Mumbai, Delhi, Dubai"
                className="w-full px-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow transition-colors"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                  Preferred Date *
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ydl-muted pointer-events-none" />
                  <input
                    type="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-ydl-yellow transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                  Preferred Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ydl-muted pointer-events-none" />
                  <input
                    type="time"
                    name="time"
                    required
                    value={form.time}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-ydl-yellow transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ydl-muted-light mb-1.5">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Any specific features you'd like to see?"
                className="w-full px-4 py-3 bg-black border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-black bg-ydl-gradient rounded-xl hover:shadow-ydl-gold-lg transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Book My Demo
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
