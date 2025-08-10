'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Database,
  Server,
  Zap,
  Mail,
  CreditCard,
  Users,
  FileText,
  BotIcon
} from 'lucide-react'

const nodeTypes = [
  {
    id: 'database',
    icon: Database,
    title: 'Database Nodes',
    description: 'Connect instantly to SQL or NoSQL databases with AI-driven queries, schema detection, migrations, and real-time sync.',
    color: 'from-blue-500 to-cyan-500',
    features: ['Visual Query Builder', 'Auto Schema Detection', 'Migration Management', 'Real-time Sync']
  },
  {
    id: 'api',
    icon: Server,
    title: 'API Endpoints',
    description: 'Generate REST & GraphQL APIs from your data models in seconds, complete with docs, validation, and built-in rate limiting.',
    color: 'from-green-500 to-emerald-500',
    features: ['REST & GraphQL', 'Auto Documentation', 'Rate Limiting', 'Validation']
  },
  {
    id: 'ai-agent',
    icon: BotIcon,
    title: 'AI Agent',
    description: 'Deploy intelligent AI agents that automate workflows, answer queries, and integrate seamlessly with your app’s data and APIs.',
    color: 'from-purple-500 to-pink-500',
    features: ['Natural Language Processing', 'Workflow Automation', 'Context Awareness', 'API Integration']
  },  
  {
    id: 'functions',
    icon: Zap,
    title: 'Cloud Functions',
    description: 'Deploy auto-scaling serverless functions with event triggers, scheduling, and error handling for any business logic.',
    color: 'from-yellow-500 to-orange-500',
    features: ['Auto Scaling', 'Event Triggers', 'Scheduled Jobs', 'Error Handling']
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email Service',
    description: 'Send personalized transactional and marketing emails with templates, tracking, analytics, and automated A/B testing.',
    color: 'from-red-500 to-rose-500',
    features: ['Template Engine', 'Delivery Tracking', 'A/B Testing', 'Analytics']
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'Accept secure payments and subscriptions with fraud detection, PCI compliance, and multiple payment providers.',
    color: 'from-indigo-500 to-blue-500',
    features: ['Multi-Provider', 'Subscription Billing', 'Fraud Detection', 'PCI Compliance']
  },
  {
    id: 'users',
    icon: Users,
    title: 'User Management',
    description: 'Manage the full user lifecycle with profiles, preferences, analytics, segmentation, and seamless social logins.',
    color: 'from-teal-500 to-green-500',
    features: ['Profile Management', 'Social Login', 'User Analytics', 'Segmentation']
  },
  {
    id: 'files',
    icon: FileText,
    title: 'File Storage',
    description: 'Upload, store, and deliver files securely with CDN integration, version control, image processing, and access rules.',
    color: 'from-violet-500 to-purple-500',
    features: ['CDN Integration', 'Image Processing', 'Access Control', 'Version Control']
  }
]





export function NodeTypesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-navy-950 to-navy-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 text-sm font-medium mb-6"
          >
            <Server className="w-4 h-4 mr-2" />
            Node Types
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 px-4 sm:px-0">
            Every backend component
            <span className="block text-gradient bg-gradient-to-r from-secondary-400 via-primary-400 to-accent-400 bg-clip-text text-transparent">
              you'll ever need
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
            Pre-built, production-ready nodes that handle everything from databases to payments.
            Just drag, drop, and configure - no coding required.
          </p>
        </motion.div>

        {/* Node Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {nodeTypes.map((node, index) => {
            const Icon = node.icon
            const isFlipped = flippedCard === node.id

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="group relative h-80 cursor-pointer"
                onMouseEnter={() => setFlippedCard(node.id)}
                onMouseLeave={() => setFlippedCard(null)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Icon and Title */}
                    <div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 mb-4 mt-2 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-lg mx-auto`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-3 text-center">
                        {node.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        {node.description}
                      </p>
                    </div>
                    {/* Hover Indicator */}
                    <div className="flex items-center justify-center text-primary-400 text-sm font-medium">
                      <span>Hover to explore</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        →
                      </motion.div>
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${node.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-navy-800/90 to-navy-900/90 backdrop-blur-xl border border-white/20 p-6 flex flex-col"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {/* Code Snippet */}
                    <div className="mb-4 flex-1">
  <h4 className="text-sm font-semibold text-primary-400 mb-2">Code Description</h4>
  <div className="rounded-lg p-1 overflow-hidden">
    <div className="whitespace-pre-wrap">
      {node.description}
    </div>
  </div>
</div>
{/* Features */}
<div>
  <h4 className="text-sm font-semibold text-secondary-400 mb-2">Key Features</h4>
  <ul className="space-y-0.5">
    {node.features.map((feature, idx) => (
      <li key={idx} className="text-sm text-gray-300 flex items-center">
        <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-2" />
        {feature}
      </li>
    ))}
  </ul>
</div>
                  </div>
                </motion.div>

                {/* Floating Indicator */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${node.color} rounded-full`}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">50+</div>
              <div className="text-gray-300">Node Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">1M+</div>
              <div className="text-gray-300">Connections Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime SLA</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}