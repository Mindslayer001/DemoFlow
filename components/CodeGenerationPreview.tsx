'use client'

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    Code,
    Download,
    Copy,
    Check,
    Terminal,
    FileCode,
    Layers,
    Zap
} from 'lucide-react'

// Types
type NodeId = 'node1' | 'node2' | 'node3'

interface NodePosition {
    x: number
    y: number
}

interface NodePositions {
    node1: NodePosition
    node2: NodePosition
    node3: NodePosition
}

interface CodeTemplate {
    language: 'TypeScript' | 'SQL' | 'Docker'
    title: string
    code: string
}

const codeTemplates: CodeTemplate[] = [
    {
        language: 'TypeScript',
        title: 'API Endpoint',
        code: `// Auto-generated API endpoint
import { Request, Response } from 'express'
import { User } from '../models/User'
import { authenticate } from '../middleware/auth'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
    
    res.status(200).json({
      success: true,
      data: users,
      total: users.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    })
  }
}`
    },
    {
        language: 'SQL',
        title: 'Database Schema',
        code: `-- Auto-generated database schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);`
    },
    {
        language: 'Docker',
        title: 'Deployment Config',
        code: `# Auto-generated Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: demoflow
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASSWORD}`
    }
]

export function CodeGenerationPreview() {
    const ref = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const [currentTemplate, setCurrentTemplate] = useState<number>(0)
    const [typedCode, setTypedCode] = useState<string>('')
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [copiedCode, setCopiedCode] = useState<string | null>(null)
    // Responsive node positions based on screen size
    const [nodePositions, setNodePositions] = useState<NodePositions>({
        node1: { x: 108, y: 48 },
        node2: { x: 354, y: 48 },
        node3: { x: 226, y: 188 }
    })
    
    // Adjust node positions for mobile screens
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768
            const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
            
            if (isMobile) {
                setNodePositions({
                    node1: { x: 50, y: 48 },
                    node2: { x: 200, y: 48 },
                    node3: { x: 125, y: 188 }
                })
            } else if (isTablet) {
                setNodePositions({
                    node1: { x: 80, y: 48 },
                    node2: { x: 280, y: 48 },
                    node3: { x: 180, y: 188 }
                })
            } else {
                setNodePositions({
                    node1: { x: 108, y: 48 },
                    node2: { x: 354, y: 48 },
                    node3: { x: 226, y: 188 }
                })
            }
        }
        
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Memoized current code to prevent unnecessary re-renders
    const currentCode = useMemo(() => codeTemplates[currentTemplate].code, [currentTemplate])

    // Memoized node configurations
    const nodeConfigs = useMemo(() => [
        {
            id: 'node1' as NodeId,
            icon: Code,
            gradient: 'from-blue-500 to-cyan-500',
            label: 'API Endpoint',
            templateIndex: 0,
            glowColor: 'rgba(59, 130, 246, 0.5)'
        },
        {
            id: 'node2' as NodeId,
            icon: Layers,
            gradient: 'from-purple-500 to-pink-500',
            label: 'Database Schema',
            templateIndex: 1,
            glowColor: 'rgba(168, 85, 247, 0.5)'
        },
        {
            id: 'node3' as NodeId,
            icon: Terminal,
            gradient: 'from-green-500 to-emerald-500',
            label: 'Deployment Config',
            templateIndex: 2,
            glowColor: 'rgba(34, 197, 94, 0.5)'
        }
    ], [])

    // Optimized typing animation with RAF for better performance
    useEffect(() => {
        if (!isInView || !isTyping) return

        setTypedCode('')
        let index = 0
        let rafId: number

        const typeNextChar = () => {
            if (index < currentCode.length) {
                setTypedCode(prev => prev + currentCode[index])
                index++
                rafId = requestAnimationFrame(typeNextChar)
            } else {
                setIsTyping(false)
            }
        }

        // Start typing after a small delay
        const timeoutId = setTimeout(() => {
            rafId = requestAnimationFrame(typeNextChar)
        }, 50)

        return () => {
            clearTimeout(timeoutId)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [currentCode, isInView, isTyping])

    // Optimized auto-cycle with proper cleanup
    useEffect(() => {
        if (!isInView) return

        // Start typing immediately for first load
        const initialTimeout = setTimeout(() => setIsTyping(true), 1000)

        // Set up cycling interval
        const interval = setInterval(() => {
            setCurrentTemplate(prev => (prev + 1) % codeTemplates.length)
            setIsTyping(true)
        }, 8000)

        return () => {
            clearTimeout(initialTimeout)
            clearInterval(interval)
        }
    }, [isInView])

    // Memoized copy handler
    const handleCopy = useCallback(async (code: string) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopiedCode(code)
            setTimeout(() => setCopiedCode(null), 2000)
        } catch (error) {
            console.error('Failed to copy code:', error)
        }
    }, [])

    // Optimized template switching
    const startTyping = useCallback((index: number) => {
        if (index !== currentTemplate) {
            setCurrentTemplate(index)
            setIsTyping(true)
        }
    }, [currentTemplate])

    // Simplified drag handlers using framer-motion's built-in drag
    useCallback(() => {
// Remove setIsDragging since it's not being used
return
    }, []);

    useCallback(() => {
return
    }, []);

    // Memoized connection lines to prevent recalculation on every render
    const connectionLines = useMemo(() => [
        {
            x1: nodePositions.node1.x + 24,
            y1: nodePositions.node1.y + 24,
            x2: nodePositions.node2.x + 24,
            y2: nodePositions.node2.y + 24,
            stroke: "rgba(59, 130, 246, 0.6)",
            delay: 0
        },
        {
            x1: nodePositions.node2.x + 24,
            y1: nodePositions.node2.y + 24,
            x2: nodePositions.node3.x + 24,
            y2: nodePositions.node3.y + 24,
            stroke: "rgba(168, 85, 247, 0.6)",
            delay: 0.7
        },
        {
            x1: nodePositions.node3.x + 24,
            y1: nodePositions.node3.y + 24,
            x2: nodePositions.node1.x + 24,
            y2: nodePositions.node1.y + 24,
            stroke: "rgba(34, 197, 94, 0.6)",
            delay: 1.4
        }
    ], [nodePositions])

    // Memoized file extension logic
    const fileExtension = useMemo(() => {
        const lang = codeTemplates[currentTemplate].language
        return lang === 'TypeScript' ? 'ts' : lang === 'SQL' ? 'sql' : 'dockerfile'
    }, [currentTemplate])

    // Memoized code stats
    const codeStats = useMemo(() => ({
        lines: currentCode.split('\n').length,
        characters: currentCode.length
    }), [currentCode])

    return (
        <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
                        className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6"
                    >
                        <Code className="w-4 h-4 mr-2" />
                        Code Generation
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Watch your ideas become
                        <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              production-ready code
            </span>
                    </h2>

                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Real-time code generation as you design. See your visual backend transform
                        into clean, maintainable code that follows industry best practices.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                    {/* Visual Builder Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">Visual Builder</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        Live Sync
                                    </div>
                                </div>
                            </div>

                            {/* Mini Builder Interface */}
                            <div
                                ref={containerRef}
                                className="relative bg-slate-900/50 rounded-xl p-4 h-64 overflow-hidden select-none"
                            >
                                <div className="absolute inset-0 opacity-10" style={{
                                    backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                                    backgroundSize: '20px 20px',
                                }} />

                                {/* Optimized Connection Lines */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    {connectionLines.map((line, index) => (
                                        <motion.line
                                            key={index}
                                            x1={line.x1}
                                            y1={line.y1}
                                            x2={line.x2}
                                            y2={line.y2}
                                            stroke={line.stroke}
                                            strokeWidth="3"
                                            strokeDasharray="8,4"
                                            animate={{ strokeDashoffset: [0, -24] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: line.delay }}
                                        />
                                    ))}

                                    {/* Connection dots */}
                                    {nodeConfigs.map((config, index) => {
                                        const position = nodePositions[config.id]
                                        return (
                                            <motion.circle
                                                key={config.id}
                                                cx={position.x + 24}
                                                cy={position.y + 24}
                                                r="4"
                                                fill={config.glowColor}
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.7 }}
                                            />
                                        )
                                    })}
                                </svg>

                                {/* Static Interactive Nodes */}
                                {nodeConfigs.map((config) => {
                                    const IconComponent = config.icon
                                    const position = nodePositions[config.id]
                                    const isActive = currentTemplate === config.templateIndex

                                    return (
                                        <motion.div
                                            key={config.id}
                                            style={{
                                                position: "absolute",
                                                top: position.y,
                                                left: position.x,
                                            }}
                                            className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                                                isActive ? 'ring-2 ring-white/30 shadow-lg' : 'hover:scale-105'
                                            }`}
                                            onClick={() => startTyping(config.templateIndex)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            animate={isActive ? {
                                                boxShadow: [
                                                    `0 0 0 0 ${config.glowColor}`,
                                                    `0 0 0 10px ${config.glowColor.replace('0.5', '0.1')}`,
                                                    `0 0 0 0 ${config.glowColor}`
                                                ]
                                            } : {}}
                                            transition={{
                                                boxShadow: { duration: 1.5, repeat: Infinity },
                                                scale: { duration: 0.2 }
                                            }}
                                        >
                                            <IconComponent className="w-6 h-6 text-white" />

                                            {/* Tooltip on hover */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                                whileHover={{ opacity: 1, scale: 1, y: 0 }}
                                                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-white/20 pointer-events-none"
                                            >
                                                {config.label}
                                            </motion.div>
                                        </motion.div>
                                    )
                                })}

                                {/* Floating Code Indicator */}
                                <motion.div
                                    animate={{
                                        y: [0, -5, 0],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute top-2 right-2 text-xs text-green-400 font-mono"
                                >
                                    {'</>'}
                                </motion.div>
                            </div>

                            {/* Template Selector */}
                            <div className="flex gap-2 mt-4">
                                {codeTemplates.map((template, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => startTyping(index)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                            currentTemplate === index
                                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                                        }`}
                                    >
                                        {template.title}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Code Output Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                            {/* Code Editor Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    </div>
                                    <span className="text-gray-300 text-sm font-medium">
                    {codeTemplates[currentTemplate].title.toLowerCase().replace(/\s+/g, '_')}.{fileExtension}
                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCopy(currentCode)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        {copiedCode === currentCode ? (
                                            <Check className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-gray-400" />
                                        )}
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Download className="w-4 h-4 text-gray-400" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Code Content */}
                            <div className="p-4 h-80 overflow-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-gray-300">
                    {isTyping ? typedCode : currentCode}
                      {isTyping && (
                          <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="text-green-400"
                          >
                              |
                          </motion.span>
                      )}
                  </code>
                </pre>
                            </div>

                            {/* Status Bar */}
                            <div className="flex items-center justify-between p-3 border-t border-white/10 bg-slate-900/50">
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span>Language: {codeTemplates[currentTemplate].language}</span>
                                    <span>Lines: {codeStats.lines}</span>
                                    <span>Characters: {codeStats.characters}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-xs text-green-400">
                    {isTyping ? 'Generating...' : 'Auto-generated'}
                  </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                >
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">Real-time Generation</h4>
                        <p className="text-gray-300 text-sm">Code updates instantly as you modify your visual design</p>
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <FileCode className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">Clean Code</h4>
                        <p className="text-gray-300 text-sm">Well-structured, documented code following best practices</p>
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Download className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">Export Ready</h4>
                        <p className="text-gray-300 text-sm">Download complete projects with deployment configurations</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}