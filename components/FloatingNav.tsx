'use client'

import {motion} from 'framer-motion'
import { useEffect, useRef, useCallback, memo, useMemo, useReducer} from 'react'
import {useScrollAnimation} from '@/hooks/useScrollAnimation'
import {Home, Layers, Zap, Rocket, Menu} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Sheet, SheetContent, SheetTrigger, SheetClose} from '@/components/ui/sheet'

// Throttle utility
const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean
    return function (this: any, ...args: any[]) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// State reducer for related state management
interface NavState {
    activeSection: string
    isInHero: boolean
    isMobileMenuOpen: boolean
}

type NavAction =
    | { type: 'SET_ACTIVE_SECTION'; payload: string }
    | { type: 'SET_IS_IN_HERO'; payload: boolean }
    | { type: 'SET_MOBILE_MENU'; payload: boolean }

const navReducer = (state: NavState, action: NavAction): NavState => {
    switch (action.type) {
        case 'SET_ACTIVE_SECTION':
            return state.activeSection !== action.payload
                ? {...state, activeSection: action.payload}
                : state
        case 'SET_IS_IN_HERO':
            return state.isInHero !== action.payload
                ? {...state, isInHero: action.payload}
                : state
        case 'SET_MOBILE_MENU':
            return {...state, isMobileMenuOpen: action.payload}
        default:
            return state
    }
}

const navItems = [
    {icon: Home, label: 'Home', href: '#home'},
    {icon: Layers, label: 'Features', href: '#features'},
    {icon: Zap, label: 'Code Gen', href: '#codegen'},
    {icon: Rocket, label: 'Get Started', href: '#cta'},
]

const Logo = memo(({className = "", onClick}: { className?: string; onClick?: () => void }) => (
    <div className={`flex items-center gap-2 ${className}`} onClick={onClick}>
        <div
            className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white"/>
        </div>
        <span className="font-bold text-lg text-white">DemoFlow</span>
    </div>
))

// Memoized nav button to prevent unnecessary re-renders
const NavButton = memo(({
                            icon: Icon,
                            label,
                            isActive,
                            onClick,
                            showLabel = true
                        }: {
    icon: any
    label: string
    href: string
    isActive: boolean
    onClick: () => void
    showLabel?: boolean
}) => (
    <Button
        variant={isActive ? "secondary" : "ghost"}
        size="sm"
        onClick={onClick}
        className={`flex items-center gap-2 ${
            isActive
                ? 'text-white bg-primary-500/20 border border-primary-500/30 hover:bg-primary-500/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
    >
        <Icon className="w-4 h-4"/>
        {showLabel && <span className="hidden lg:inline">{label}</span>}
    </Button>
))

// Memoized mobile nav button
const MobileNavButton = memo(({
                                  icon: Icon,
                                  label,
                                  isActive,
                                  onClick
                              }: {
    icon: any
    label: string
    href: string
    isActive: boolean
    onClick: () => void
}) => (
    <SheetClose asChild>
        <Button
            variant={isActive ? "secondary" : "ghost"}
            onClick={onClick}
            className={`w-full justify-start gap-3 ${
                isActive
                    ? 'text-white bg-primary-500/20 border border-primary-500/30 hover:bg-primary-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
        >
            <Icon className="w-5 h-5"/>
            {label}
        </Button>
    </SheetClose>
))

export function FloatingNav() {
    const {scrollY, scrollDirection} = useScrollAnimation()

    // Use reducer for related state
    const [navState, dispatch] = useReducer(navReducer, {
        activeSection: 'home',
        isInHero: true,
        isMobileMenuOpen: false
    })

    // Refs that persist across renders
    const sectionElementsRef = useRef<Map<string, HTMLElement>>(new Map())
    const observerRef = useRef<IntersectionObserver | null>(null)
    const heroThresholdRef = useRef<number>(0)
    const isScrollHandlerActiveRef = useRef<boolean>(true)

    // Memoize section IDs to prevent recreation
    const sectionIds = useMemo(() =>
            navItems.map(item => item.href.replace('#', '')),
        []
    )

    // Optimized scroll to section with smooth scrolling
    const scrollToSection = useCallback((href: string) => {
        const id = href.replace('#', '')
        const element = sectionElementsRef.current.get(id)

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }

        dispatch({type: 'SET_MOBILE_MENU', payload: false})
    }, [])

    // Throttled scroll handler for hero detection
    const throttledScrollHandler = useMemo(
        () => throttle(() => {
            if (!isScrollHandlerActiveRef.current) return

            const isInHero = window.scrollY < heroThresholdRef.current
            dispatch({type: 'SET_IS_IN_HERO', payload: isInHero})
        }, 16), // 60fps
        []
    )

    // Initialize section elements and hero threshold
    useEffect(() => {
        // Cache section elements
        const elements = new Map<string, HTMLElement>()
        sectionIds.forEach(id => {
            const element = document.getElementById(id)
            if (element) {
                elements.set(id, element)
            }
        })
        sectionElementsRef.current = elements

        // Calculate and cache hero threshold
        heroThresholdRef.current = window.innerHeight * 0.8

        // Handle window resize for hero threshold
        const handleResize = throttle(() => {
            heroThresholdRef.current = window.innerHeight * 0.8
        }, 100)

        window.addEventListener('resize', handleResize, {passive: true})

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [sectionIds])

    // Optimized intersection observer for section detection
    useEffect(() => {
        const elements = Array.from(sectionElementsRef.current.values())

        if (elements.length === 0) return

        // Create single observer instance
        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Find the most visible section
                let mostVisible = {element: null as HTMLElement | null, ratio: 0}

                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > mostVisible.ratio) {
                        mostVisible = {
                            element: entry.target as HTMLElement,
                            ratio: entry.intersectionRatio
                        }
                    }
                })

                if (mostVisible.element) {
                    dispatch({
                        type: 'SET_ACTIVE_SECTION',
                        payload: mostVisible.element.id
                    })
                }
            },
            {
                rootMargin: '-100px 0px -70% 0px',
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
            }
        )

        // Observe all section elements
        elements.forEach(element => {
            observerRef.current?.observe(element)
        })

        return () => {
            observerRef.current?.disconnect()
            observerRef.current = null
        }
    }, [sectionIds])

    // Scroll event handler for hero detection
    useEffect(() => {
        window.addEventListener('scroll', throttledScrollHandler, {passive: true})

        // Initial hero state check
        throttledScrollHandler()

        return () => {
            isScrollHandlerActiveRef.current = false
            window.removeEventListener('scroll', throttledScrollHandler)
        }
    }, [throttledScrollHandler])

    // Optimized animation variants
    const desktopNavVariants = useMemo(() => ({
        initial: {y: -20, opacity: 0},
        animate: {
            y: 0,
            opacity: 1,
            scale: navState.isInHero ? 1 : 0.85, // Use scale instead of width
            transition: {duration: 0.4, ease: 'easeOut'}
        }
    }), [navState.isInHero])

    const mobileNavVariants = useMemo(() => ({
        initial: {y: -20, opacity: 0},
        animate: {
            y: scrollDirection === 'down' && scrollY > 200 ? -100 : 0,
            opacity: scrollDirection === 'down' && scrollY > 200 ? 0 : 1,
            transition: {duration: 0.3, ease: 'easeOut'}
        }
    }), [scrollDirection, scrollY])

    return (
        <>
            {/* Desktop Nav */}
            <div className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4">
                <motion.nav
                    variants={desktopNavVariants}
                    initial="initial"
                    animate="animate"
                    className="hidden md:block"
                    style={{
                        minHeight: '56px',
                        width: navState.isInHero ? '90%' : '50%',
                        maxWidth: navState.isInHero ? '1152px' : '640px',
                        transformOrigin: 'center center'
                    }}
                >
                    <div
                        className="bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between will-change-transform">
                        <Logo
                            className="hidden sm:flex cursor-pointer"
                            onClick={() => scrollToSection('#home')}
                        />

                        <div className="flex items-center gap-1">
                            {navItems.map(({icon, label, href}) => (
                                <NavButton
                                    key={href}
                                    icon={icon}
                                    label={label}
                                    href={href}
                                    isActive={navState.activeSection === href.replace('#', '')}
                                    onClick={() => scrollToSection(href)}
                                />
                            ))}
                        </div>
                    </div>
                </motion.nav>
            </div>

            {/* Mobile Nav */}
            <motion.nav
                variants={mobileNavVariants}
                initial="initial"
                animate="animate"
                className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:max-w-lg z-[999] md:hidden will-change-transform"
            >
                <div className="bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex justify-between items-center">
                    {/* Logo on left */}
                    <Logo onClick={() => scrollToSection('#home')} />

                    {/* Hamburger Menu */}
                    <Sheet
                        open={navState.isMobileMenuOpen}
                        onOpenChange={(open) => dispatch({ type: 'SET_MOBILE_MENU', payload: open })}
                    >
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 text-white bg-primary-500/20 hover:bg-primary-500/40 rounded-lg"
                            >
                                <Menu className="w-6 h-6" strokeWidth={2.5} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="bg-navy-900/95 backdrop-blur-xl border-white/10 text-white w-[280px] sm:w-[320px]"
                        >
                            <div className="mt-8 space-y-1">
                                <div className="mb-6 pb-4 border-b border-white/10">
                                    <Logo />
                                </div>
                                {navItems.map(({ icon, label, href }) => (
                                    <MobileNavButton
                                        key={href}
                                        icon={icon}
                                        label={label}
                                        href={href}
                                        isActive={navState.activeSection === href.replace('#', '')}
                                        onClick={() => scrollToSection(href)}
                                    />
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.nav>

        </>
    )
}