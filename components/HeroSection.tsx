'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronRight, Play, Zap, Code, Layers } from 'lucide-react'
import { AnimatedBackground } from './AnimatedBackground'
import { FlowDiagram } from './FlowDiagram'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const heroWords = ['fast', 'seamless', 'powerful', 'intuitive']

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '168, 85, 247'}, 0.6)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <Badge 
                variant="outline" 
                className="bg-primary-500/10 border-primary-500/20 text-primary-400 text-sm font-medium px-4 py-2 rounded-full"
              >
                <Zap className="w-4 h-4 mr-2" />
                Now in Beta - Join the Revolution
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-white">Build apps that are</span>
              <br />
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-gradient bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent"
                  >
                    {heroWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl"
            >
              Revolutionary visual backend builder that transforms your ideas into 
              production-ready applications with zero friction. No code, no limits.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="group relative bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-400 hover:to-secondary-400 text-white font-semibold px-8 py-4 h-auto rounded-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Building Free
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-gray-600 hover:border-primary-500 text-white hover:text-primary-400 font-semibold px-8 py-4 h-auto rounded-xl bg-transparent"
                >
                  <span className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-sm text-gray-400"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                10k+ developers
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
                50k+ apps built
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
                99.9% uptime
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <FlowDiagram />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-primary-400 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}