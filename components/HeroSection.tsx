'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, Zap } from 'lucide-react'
import { AnimatedBackground } from './AnimatedBackground'
import { FlowDiagram } from './FlowDiagram'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useClientOnly } from '@/hooks/useClientOnly'

const heroWords = ['fast', 'seamless', 'powerful', 'intuitive']

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const isClient = useClientOnly()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* UnicornStudio Background - FULL SCREEN
      <div className="fixed inset-0 w-full h-full z-0">
        <UnicornStudio 
          className="w-full h-full"
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          opacity={0.3}
        />
      </div> */}

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 backdrop-blur-[0.5px] z-[1]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {isClient && (
          <>
            {[...Array(30)].map((_, i) => {
              // Generate random values on client-side only
              const left = Math.random() * 100;
              const top = Math.random() * 100;
              const width = Math.random() * 6 + 2;
              const height = Math.random() * 6 + 2;
              const hue = Math.random() * 60 + 240;
              const lightness = Math.random() * 30 + 60;
              const animDelay = Math.random() * 8;
              const animDuration = 6 + Math.random() * 8;
              const opacity = Math.random() * 0.8 + 0.2;
              
              return (
                <div
                  key={i}
                  className="particle absolute rounded-full animate-pulse"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${width}px`,
                    height: `${height}px`,
                    background: `hsl(${hue}, 80%, ${lightness}%)`,
                    animationDelay: `${animDelay}s`,
                    animationDuration: `${animDuration}s`,
                    filter: 'blur(0.5px)',
                    opacity: opacity,
                    boxSizing: 'border-box'
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Additional Magical Effects */}
      <div className="absolute inset-0 z-[2]">
        {/* Floating orbs - only rendered client-side */}
        {isClient && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(${240 + i * 20}, 80%, 60%) 0%, transparent 70%)`,
                  left: `${10 + (i * 7)}%`,
                  top: `${20 + (i * 5)}%`,
                  filter: 'blur(10px)',
                  width: '16px',
                  height: '16px',
                  boxSizing: 'border-box'
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left px-4 sm:px-0"
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
                className="bg-primary/20 border-primary/30 text-primary text-sm font-medium px-4 py-2 rounded-full backdrop-blur-md shadow-lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Now in Beta - Join the Revolution
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-white drop-shadow-2xl filter brightness-110">Build apps that are</span>
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-2xl filter brightness-125"
                    style={{
                      textShadow: '0 0 30px hsl(var(--primary) / 0.5)'
                    }}
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
              className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-8 max-w-2xl drop-shadow-lg leading-relaxed"
            >
              Revolutionary visual backend builder that transforms your ideas into
              production-ready applications with zero friction. No code, no limits.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto"
            >
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px hsl(var(--primary) / 0.6)",
                        filter: "brightness(1.1)"
                    }}
                    whileTap={{scale: 0.98}}
                >
                    <button
                        className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
                    >
  <span
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"
  ></span>

                        <span
                            className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"
                        ></span>

                        <div
                            className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110"
                        >
                            <span className="select-none">Get Started</span>

                            <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
                            >
                                <path
                                    clip-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </button>
                </motion.div>

                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.15)"
                    }}
                    whileTap={{scale: 0.98}}
                >
                    <Button
                        variant="outline"
                        size="lg"
                        className="group border-white/40 hover:border-primary text-white hover:text-primary font-semibold px-8 py-4 h-auto rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 shadow-lg"
                    >
                  <span className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2"/>
                    Watch Demo
                  </span>
                    </Button>
                </motion.div>
            </motion.div>

              {/* Stats */}
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.8, duration: 0.8}}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-12 text-sm text-white/90"
              >
                  <motion.div
                      className="flex items-center backdrop-blur-md bg-white/10 px-4 py-3 rounded-xl border border-white/20 shadow-lg"
                      whileHover={{scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)"}}
                  >
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg" />
                <span className="font-medium">10k+ developers</span>
              </motion.div>
              <motion.div 
                className="flex items-center backdrop-blur-md bg-white/10 px-4 py-3 rounded-xl border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse shadow-lg" />
                <span className="font-medium">50k+ apps built</span>
              </motion.div>
              <motion.div 
                className="flex items-center backdrop-blur-md bg-white/10 px-4 py-3 rounded-xl border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse shadow-lg" />
                <span className="font-medium">99.9% uptime</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-[3]"
          >
            <motion.div 
              className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/20 shadow-2xl m-4"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <FlowDiagram />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-10"
      >
        <motion.div 
          className="flex flex-col items-center text-white/80"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm mb-2 drop-shadow-lg font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-md bg-white/5 shadow-lg"
          >
            <motion.div 
              className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner accent elements */}
      <div 
        className="absolute top-0 left-0 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full z-[1]"
        style={{
          width: '128px',
          height: '128px',
          boxSizing: 'border-box'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 bg-gradient-to-tl from-secondary/20 to-transparent rounded-tl-full z-[1]"
        style={{
          width: '128px',
          height: '128px',
          boxSizing: 'border-box'
        }}
      />
    </section>
  )
}