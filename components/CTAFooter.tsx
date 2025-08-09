'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  ArrowRight, 
  Rocket, 
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react'
import { Button } from './ui/button'

export function CTAFooter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Main CTA Section */}
      <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
          
          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)',
                'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
                'linear-gradient(225deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)',
                'linear-gradient(315deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)',
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Floating Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4],
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Main CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 text-primary-400 text-sm font-medium mb-8"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Ready to Transform Your Development?
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Start building the
              <span className="block text-gradient bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                future today
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of developers who are already building faster, 
              smarter applications with DemoFlow's revolutionary visual backend builder.
            </p>

            {/* Email Signup Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-navy-800/50 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitted}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl font-semibold text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <span className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Thank you!
                  </span>
                ) : (
                  <span className="flex items-center">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                )}
              </motion.button>
            </motion.form>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400 mb-12"
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary-400" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-secondary-400" />
                Setup in under 5 minutes
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-accent-400" />
                Enterprise-grade security
              </div>
            </motion.div>

            {/* Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-gray-600 hover:border-primary-500 rounded-xl font-medium text-white hover:text-primary-400 transition-colors duration-300"
              >
                Watch 3-min Demo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-gray-600 hover:border-secondary-500 rounded-xl font-medium text-white hover:text-secondary-400 transition-colors duration-300"
              >
                Schedule a Call
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="border-t border-white/10 bg-navy-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">DemoFlow</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Building the future of application development with visual backend tools.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: '#' },
                    { icon: Twitter, href: '#' },
                    { icon: Linkedin, href: '#' },
                    { icon: Mail, href: '#' }
                  ].map(({ icon: Icon, href }, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="w-10 h-10 bg-gray-800 hover:bg-primary-500 border-gray-700 hover:border-primary-500 transition-colors duration-300"
                      >
                        <a href={href}>
                          <Icon className="w-5 h-5 text-gray-300 hover:text-white" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Product Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  {['Features', 'Pricing', 'Documentation', 'API Reference', 'Integrations'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-primary-400 text-sm transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Company Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  {['About Us', 'Careers', 'Blog', 'Press', 'Partners'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-secondary-400 text-sm transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Support Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  {['Help Center', 'Contact Us', 'Status Page', 'Community', 'Security'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-accent-400 text-sm transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-between items-center pt-8 mt-8 border-t border-white/10"
          >
            <p className="text-gray-400 text-sm">
              © 2024 DemoFlow. All rights reserved.
            </p>
            
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}