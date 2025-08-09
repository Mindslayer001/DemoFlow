'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { 
  Home, 
  Layers, 
  Code, 
  Zap, 
  Rocket,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet'

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Layers, label: 'Features', href: '#features' },
  { icon: Code, label: 'Builder', href: '#builder' },
  { icon: Zap, label: 'Code Gen', href: '#codegen' },
  { icon: Rocket, label: 'Get Started', href: '#cta' },
]

// Logo Component
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative">
      <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
    </div>
    <span className="font-bold text-lg text-white">DemoFlow</span>
  </div>
)

export function FloatingNav() {
  const { scrollY, scrollDirection } = useScrollAnimation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isInHero, setIsInHero] = useState(true)

  // Check if we're in the hero section for width adjustment
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        setIsInHero(rect.bottom > 100) // If hero section is still visible
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4">
        <motion.nav
          initial={{ y: -100, opacity: 1 }}
          animate={{ 
            y: 0,
            opacity: 1,
            width: isInHero ? '80%' : '50%',
            maxWidth: isInHero ? '1152px' : '896px' // 6xl = 1152px, 4xl = 896px
          }}
          transition={{ 
            y: { duration: 1, ease: "easeInOut" },
            opacity: { duration: 1, ease: "easeInOut" },
            width: { duration: 0.4, ease: "easeInOut" },
            maxWidth: { duration: 0.4, ease: "easeInOut" }
          }}
          className="hidden md:block"
        >
          <div className="bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => scrollToSection('#home')}
              >
                <Logo className="hidden sm:flex" />
                {/* Mobile logo - just icon */}
                <div className="sm:hidden w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </motion.div>

              {/* Navigation Items */}
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.replace('#', '')
                  
                  return (
                    <motion.div
                      key={item.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => scrollToSection(item.href)}
                        className={`relative flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                          isActive 
                            ? 'text-white bg-primary-500/20 border border-primary-500/30 hover:bg-primary-500/30' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden lg:inline">{item.label}</span>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: scrollDirection === 'down' && scrollY > 200 ? -100 : 0, 
          opacity: scrollDirection === 'down' && scrollY > 200 ? 0 : 1 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40 md:hidden"
      >
        <div className="bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              <Logo />
            </motion.div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="w-10 h-10 text-white hover:bg-white/10"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="bg-navy-900/95 backdrop-blur-xl border-white/10 text-white w-[280px] sm:w-[320px]"
              >
                <div className="flex flex-col space-y-1 mt-8">
                  {/* Logo in mobile menu */}
                  <div className="mb-6 pb-4 border-b border-white/10">
                    <Logo />
                  </div>
                  
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.href.replace('#', '')
                    
                    return (
                      <SheetClose key={item.href} asChild>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          onClick={() => scrollToSection(item.href)}
                          className={`w-full justify-start gap-3 text-base font-medium py-3 h-auto transition-colors duration-300 ${
                            isActive 
                              ? 'text-white bg-primary-500/20 border border-primary-500/30 hover:bg-primary-500/30' 
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </Button>
                      </SheetClose>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  )
}