'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollAnimation'
import { Progress } from '@/components/ui/progress'

export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <Progress 
        value={progress} 
        className="h-1 rounded-none bg-transparent"
      />
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-80" 
           style={{ 
             width: `${progress}%`,
             transition: 'width 0.1s ease-out'
           }} 
      />
    </motion.div>
  )
}