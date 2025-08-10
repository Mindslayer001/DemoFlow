'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useClientOnly } from '@/hooks/useClientOnly'

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const isClient = useClientOnly()

  useEffect(() => {
    if (!isClient) return
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isClient])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950"
        style={{ boxSizing: 'border-box' }}
      />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2"
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box'
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, hsl(var(--brand-blue) / 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, hsl(var(--brand-purple) / 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, hsl(var(--brand-green) / 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, hsl(var(--brand-blue) / 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Interactive Gradient that follows mouse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--brand-blue) / 0.1) 0%, transparent 50%)`,
          boxSizing: 'border-box'
        }}
      />

      {/* Floating Light Flares */}
      <motion.div
        className="absolute top-1/4 left-1/4 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-purple) / 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          width: '240px',
          height: '240px',
          boxSizing: 'border-box'
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.8, 0.4],
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-green) / 0.4) 0%, transparent 70%)',
          filter: 'blur(50px)',
          width: '200px',
          height: '200px',
          boxSizing: 'border-box'
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.2, 0.5],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-blue) / 0.3) 0%, transparent 70%)',
          filter: 'blur(30px)',
          width: '160px',
          height: '160px',
          boxSizing: 'border-box'
        }}
      />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          boxSizing: 'border-box'
        }}
      />

      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ boxSizing: 'border-box' }}
        animate={{
          background: [
            'linear-gradient(45deg, hsl(var(--brand-blue) / 0.1) 0%, hsl(var(--brand-purple) / 0.1) 50%, hsl(var(--brand-green) / 0.1) 100%)',
            'linear-gradient(135deg, hsl(var(--brand-purple) / 0.1) 0%, hsl(var(--brand-green) / 0.1) 50%, hsl(var(--brand-blue) / 0.1) 100%)',
            'linear-gradient(225deg, hsl(var(--brand-green) / 0.1) 0%, hsl(var(--brand-blue) / 0.1) 50%, hsl(var(--brand-purple) / 0.1) 100%)',
            'linear-gradient(315deg, hsl(var(--brand-blue) / 0.1) 0%, hsl(var(--brand-purple) / 0.1) 50%, hsl(var(--brand-green) / 0.1) 100%)',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          boxSizing: 'border-box'
        }}
      />
    </div>
  )
}