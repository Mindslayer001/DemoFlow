'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Code, 
  Play, 
  Download, 
  Copy, 
  Check,
  Terminal,
  FileCode,
  Layers,
  Zap
} from 'lucide-react'

const codeTemplates = [
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentTemplate, setCurrentTemplate] = useState(0)
  const [typedCode, setTypedCode] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const currentCode = codeTemplates[currentTemplate].code

  // Typing animation effect
  useEffect(() => {
    if (!isInView || !isTyping) return

    setTypedCode('')
    let index = 0
    const interval = setInterval(() => {
      if (index < currentCode.length) {
        setTypedCode(prev => prev + currentCode[index])
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [currentCode, isInView, isTyping])

  // Auto-cycle through templates
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setCurrentTemplate(prev => (prev + 1) % codeTemplates.length)
      setIsTyping(true)
    }, 8000)

    // Start typing immediately
    setTimeout(() => setIsTyping(true), 1000)

    return () => clearInterval(interval)
  }, [isInView])

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const startTyping = (index: number) => {
    setCurrentTemplate(index)
    setIsTyping(true)
  }

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950">
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
            <span className="block text-gradient bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              production-ready code
            </span>
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Real-time code generation as you design. See your visual backend transform 
            into clean, maintainable code that follows industry best practices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Visual Builder Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Visual Builder</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live Sync
                </div>
              </div>

              {/* Mini Builder Interface */}
              <div className="relative bg-navy-900/50 rounded-xl p-4 h-64 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }} />

                {/* Animated Nodes */}
                <motion.div
                  animate={{ 
                    scale: currentTemplate === 0 ? 1.1 : 1,
                    opacity: currentTemplate === 0 ? 1 : 0.7
                  }}
                  className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={() => startTyping(0)}
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ 
                    scale: currentTemplate === 1 ? 1.1 : 1,
                    opacity: currentTemplate === 1 ? 1 : 0.7
                  }}
                  className="absolute top-20 right-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={() => startTyping(1)}
                >
                  <Layers className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ 
                    scale: currentTemplate === 2 ? 1.1 : 1,
                    opacity: currentTemplate === 2 ? 1 : 0.7
                  }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={() => startTyping(2)}
                >
                  <Terminal className="w-6 h-6 text-white" />
                </motion.div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.line
                    x1="60" y1="30" x2="200" y2="80"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.line
                    x1="220" y1="100" x2="180" y2="200"
                    stroke="rgba(168, 85, 247, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  />
                </svg>

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
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
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
                    {codeTemplates[currentTemplate].title}.{codeTemplates[currentTemplate].language.toLowerCase()}
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
              <div className="flex items-center justify-between p-3 border-t border-white/10 bg-navy-900/50">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Language: {codeTemplates[currentTemplate].language}</span>
                  <span>Lines: {currentCode.split('\n').length}</span>
                  <span>Characters: {currentCode.length}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Auto-generated</span>
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