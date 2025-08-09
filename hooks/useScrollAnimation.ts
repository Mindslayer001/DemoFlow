import { useEffect, useState } from 'react'

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollY = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollY(currentScrollY)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', updateScrollY, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollY)
  }, [])

  return { scrollY, scrollDirection }
}

export function useParallax(speed: number = 0.5) {
  const { scrollY } = useScrollAnimation()
  return scrollY * speed
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / scrollHeight) * 100
      setProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}