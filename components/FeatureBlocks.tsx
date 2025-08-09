'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Zap, 
  Shield, 
  Layers, 
  Code, 
  Database, 
  Globe,
  Smartphone,
  BarChart3,
  Lock,
  Rocket,
  Palette,
  GitBranch
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Build and deploy applications in minutes, not months. Our optimized engine generates production-ready code instantly.',
    color: 'from-yellow-400 to-orange-500',
    direction: 'left'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption, role-based access control, and compliance certifications.',
    color: 'from-green-400 to-emerald-500',
    direction: 'right'
  },
  {
    icon: Layers,
    title: 'Visual Architecture',
    description: 'Design complex backend systems with drag-and-drop simplicity. See your entire application structure at a glance.',
    color: 'from-blue-400 to-cyan-500',
    direction: 'left'
  },
  {
    icon: Code,
    title: 'Clean Code Generation',
    description: 'Generate maintainable, well-documented code that follows industry best practices and coding standards.',
    color: 'from-purple-400 to-pink-500',
    direction: 'right'
  },
  {
    icon: Database,
    title: 'Multi-Database Support',
    description: 'Connect to any database - PostgreSQL, MongoDB, MySQL, Redis, and more. Switch between them seamlessly.',
    color: 'from-indigo-400 to-blue-500',
    direction: 'left'
  },
  {
    icon: Globe,
    title: 'Global Deployment',
    description: 'Deploy to AWS, Google Cloud, Azure, or any cloud provider with one click. Auto-scaling included.',
    color: 'from-teal-400 to-green-500',
    direction: 'right'
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Automatically generate responsive APIs and mobile SDKs. Your backend works everywhere.',
    color: 'from-rose-400 to-red-500',
    direction: 'left'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Built-in monitoring, logging, and analytics. Track performance and user behavior out of the box.',
    color: 'from-amber-400 to-yellow-500',
    direction: 'right'
  },
  {
    icon: Lock,
    title: 'Advanced Auth',
    description: 'Complete authentication system with OAuth, JWT, 2FA, and custom user management flows.',
    color: 'from-violet-400 to-purple-500',
    direction: 'left'
  },
  {
    icon: Rocket,
    title: 'Auto Scaling',
    description: 'Your applications automatically scale based on demand. Handle millions of users without breaking a sweat.',
    color: 'from-orange-400 to-red-500',
    direction: 'right'
  },
  {
    icon: Palette,
    title: 'Custom Themes',
    description: 'Brand your applications with custom themes, colors, and styling. Make it uniquely yours.',
    color: 'from-pink-400 to-rose-500',
    direction: 'left'
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Built-in version control with branching, merging, and rollback capabilities. Never lose your work.',
    color: 'from-cyan-400 to-blue-500',
    direction: 'right'
  }
]

export function FeatureBlocks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <Badge 
              variant="outline" 
              className="bg-primary-500/10 border-primary-500/20 text-primary-400 text-sm font-medium px-4 py-2 rounded-full"
            >
              <Layers className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything you need to build
            <span className="block text-gradient bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              world-class applications
            </span>
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From concept to production, DemoFlow provides all the tools and features you need 
            to create scalable, secure, and performant applications.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  x: feature.direction === 'left' ? -50 : 50,
                  y: 30
                }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                {/* Feature Card */}
                <Card className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`relative w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                      
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                    </motion.div>

                    <CardTitle className="text-xl text-white group-hover:text-primary-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Bottom Border Glow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                </Card>

                {/* Floating Particles */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="absolute -top-2 -right-2 w-3 h-3 bg-primary-400 rounded-full opacity-30"
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-400 hover:to-secondary-400 text-white font-semibold px-8 py-4 h-auto rounded-xl"
            >
              Explore All Features
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}