import { motion } from 'framer-motion'
import { Calendar, User } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const posts = [
  {
    title: 'How to Increase Gym Membership Retention in 2025',
    excerpt: 'Discover proven strategies to keep your gym members engaged and reduce churn rates with automated communication and personalized experiences.',
    date: 'Mar 15, 2025',
    readTime: '5 min read',
    author: '619 Team',
    category: 'Retention',
  },
  {
    title: 'The Ultimate Guide to Gym Management Software',
    excerpt: 'Everything you need to know about choosing the right gym management software for your fitness business.',
    date: 'Feb 28, 2025',
    readTime: '8 min read',
    author: '619 Team',
    category: 'Guides',
  },
  {
    title: 'Why Your Gym Needs WhatsApp Automation',
    excerpt: 'Learn how WhatsApp automation can save you 20+ hours per week while improving member communication and engagement.',
    date: 'Feb 10, 2025',
    readTime: '4 min read',
    author: '619 Team',
    category: 'Automation',
  },
  {
    title: 'GST Compliance for Gyms: A Complete Guide',
    excerpt: 'Navigate GST compliance for your fitness business with ease. Learn about billing, returns, and tax saving strategies.',
    date: 'Jan 25, 2025',
    readTime: '6 min read',
    author: '619 Team',
    category: 'Compliance',
  },
  {
    title: 'Top 10 Features Every Gym Software Should Have',
    excerpt: 'Not all gym software is created equal. Here are the top 10 features you must look for before making a decision.',
    date: 'Jan 12, 2025',
    readTime: '7 min read',
    author: '619 Team',
    category: 'Guides',
  },
  {
    title: 'How Digital Marketing Can Grow Your Gym Membership',
    excerpt: 'Leverage Meta Ads, Google Ads, and content marketing to attract new members and build your gym brand online.',
    date: 'Dec 20, 2024',
    readTime: '5 min read',
    author: '619 Team',
    category: 'Marketing',
  },
  {
    title: 'Member App vs Web Portal: Which is Better for Gyms?',
    excerpt: 'Compare the benefits of a dedicated member app versus a web portal for your gym management ecosystem.',
    date: 'Dec 5, 2024',
    readTime: '4 min read',
    author: '619 Team',
    category: 'Technology',
  },
  {
    title: 'Scaling Your Gym: From Single Studio to Multi-Location',
    excerpt: 'A step-by-step guide to expanding your fitness business across multiple locations with the right software infrastructure.',
    date: 'Nov 18, 2024',
    readTime: '6 min read',
    author: '619 Team',
    category: 'Growth',
  },
  {
    title: 'The Future of Fitness Technology: Trends to Watch',
    excerpt: 'From AI-powered workouts to biometric integration, explore the technology trends shaping the fitness industry.',
    date: 'Nov 2, 2024',
    readTime: '5 min read',
    author: '619 Team',
    category: 'Trends',
  },
]

export default function Blog() {
  return (
    <div className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#1C1C1E] mb-4">
            619 Blog
          </h1>
          <p className="text-lg text-apple-gray-500 max-w-2xl mx-auto">
            Insights, guides, and tips to help you run and grow your fitness business.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 9) * 0.05 }}
              className="group bg-white border border-apple-gray-200 rounded-2xl overflow-hidden hover:border-apple-gray-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-44 bg-apple-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-10 h-10 text-apple-blue/30 mx-auto" />
                  <p className="text-xs text-apple-gray-400 mt-2">Featured Image</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-apple-blue/10 text-apple-blue text-[10px] font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-apple-gray-400">{post.readTime}</span>
                </div>
                <h2 className="font-heading font-bold text-[#1C1C1E] text-base mb-2 group-hover:text-apple-blue transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-apple-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-apple-gray-400">
                    <User className="w-3 h-3" />
                    {post.author}
                    <span className="mx-1">·</span>
                    {post.date}
                  </div>
                  <span className="text-apple-blue text-xs font-medium group-hover:underline underline-offset-2">
                    Read More
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white border border-apple-gray-200 rounded-2xl p-8 sm:p-12 text-center"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C1C1E] mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-apple-gray-500 mb-6 max-w-lg mx-auto">
            Get the latest fitness industry insights and 619 updates delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl text-[#1C1C1E] text-sm placeholder:text-apple-gray-400 focus:outline-none focus:border-apple-blue transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-apple-gradient-blue rounded-xl hover:shadow-apple-lg transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
