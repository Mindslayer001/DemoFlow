'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  MousePointer, 
  Layers, 
  Code, 
  Rocket, 
  ArrowRight, 
  Zap,
  Database,
  Globe
} from 'lucide-react'

const steps = [
  {
    icon: MousePointer,
    title: 'Drag & Drop',
    description: 'Visual interface design',
    color: 'from-blue-400 to-blue-600',
    delay: 0
  },
  {
    icon: Database,
    title: 'Connect Data',
    description: 'Link your databases',
    color: 'from-purple-400 to-purple-600',
    delay: 0.2
  },
  {
    icon: Zap,
    title: 'Add Logic',
    description: 'Business rules & flows',
    color: 'from-green-400 to-green-600',
    delay: 0.4
  },
  {
    icon: Globe,
    title: 'Deploy',
    description: 'Go live instantly',
    color: 'from-orange-400 to-orange-600',
    delay: 0.6
  }
]

export function FlowDiagram() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Main Flow Container */}
      <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.8)" />
            </linearGradient>
          </defs>
          
          {/* Animated connecting lines */}
          {steps.slice(0, -1).map((_, index) => (
            <motion.line
              key={index}
              x1={`${25 + index * 25}%`}
              y1="50%"
              x2={`${25 + (index + 1) * 25}%`}
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 1, 
                delay: steps[index].delay + 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>

        {/* Steps */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: step.delay,
                  ease: "easeOut"
                }}
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
                className="relative group cursor-pointer"
              >
                {/* Step Container */}
                <div className="relative">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Expansion */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ 
                      opacity: hoveredStep === index ? 1 : 0,
                      scale: hoveredStep === index ? 1 : 0.8,
                      y: hoveredStep === index ? 0 : 10
                    }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-navy-800 px-3 py-2 rounded-lg text-xs text-white border border-gray-600 whitespace-nowrap"
                  >
                    Step {index + 1}: {step.title}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-navy-800 border-l border-t border-gray-600 rotate-45" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 relative">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-green-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-60"
        />
      </div>

      {/* Floating Code Snippets */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute -right-8 top-8 bg-navy-800/90 backdrop-blur-sm border border-gray-600 rounded-lg p-3 text-xs font-mono text-green-400"
      >
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          <span className="text-gray-400">Live Preview</span>
        </div>
        <div className="text-green-400">
          {'{ status: "building" }'}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute -left-8 bottom-8 bg-navy-800/90 backdrop-blur-sm border border-gray-600 rounded-lg p-3 text-xs font-mono text-blue-400"
      >
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
          <span className="text-gray-400">Auto-deploy</span>
        </div>
        <div className="text-blue-400">
          {'npm run deploy ✓'}
        </div>
      </motion.div>
    </div>
  )
}