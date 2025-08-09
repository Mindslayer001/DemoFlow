'use client'

import { motion, useInView, useDragControls } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Database, 
  Server, 
  Shield, 
  Zap,
  Users,
  Mail,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

interface Node {
  id: string
  type: string
  title: string
  icon: any
  position: { x: number; y: number }
  color: string
  connections: string[]
}

const initialNodes: Node[] = [
  {
    id: 'auth',
    type: 'auth',
    title: 'Auth',
    icon: Shield,
    position: { x: 50, y: 100 },
    color: 'from-purple-500 to-pink-500',
    connections: ['api', 'users']
  },
  {
    id: 'api',
    type: 'api',
    title: 'API Gateway',
    icon: Server,
    position: { x: 250, y: 50 },
    color: 'from-green-500 to-emerald-500',
    connections: ['database', 'functions']
  },
  {
    id: 'database',
    type: 'database',
    title: 'Database',
    icon: Database,
    position: { x: 450, y: 100 },
    color: 'from-blue-500 to-cyan-500',
    connections: []
  },
  {
    id: 'users',
    type: 'users',
    title: 'Users',
    icon: Users,
    position: { x: 150, y: 200 },
    color: 'from-teal-500 to-green-500',
    connections: ['database']
  },
  {
    id: 'functions',
    type: 'functions',
    title: 'Functions',
    icon: Zap,
    position: { x: 350, y: 200 },
    color: 'from-yellow-500 to-orange-500',
    connections: ['email', 'database']
  },
  {
    id: 'email',
    type: 'email',
    title: 'Email',
    icon: Mail,
    position: { x: 500, y: 250 },
    color: 'from-red-500 to-rose-500',
    connections: []
  }
]

export function VisualBuilderPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [nodes, setNodes] = useState(initialNodes)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // Animate data flow
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      // This creates the visual effect of data flowing through connections
      setNodes(prevNodes => [...prevNodes])
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const resetNodes = () => {
    setNodes(initialNodes)
    setSelectedNode(null)
    setHoveredNode(null)
  }

  const getConnectionPath = (from: Node, to: Node) => {
    const startX = from.position.x + 40
    const startY = from.position.y + 40
    const endX = to.position.x + 40
    const endY = to.position.y + 40
    
    const midX = (startX + endX) / 2
    const controlOffset = 50
    
    return `M ${startX} ${startY} Q ${midX} ${startY - controlOffset} ${endX} ${endY}`
  }

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6"
          >
            <Play className="w-4 h-4 mr-2" />
            Visual Builder
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Design your backend
            <span className="block text-gradient bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent">
              visually and intuitively
            </span>
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Connect nodes, define relationships, and watch your backend architecture come to life. 
            Real-time visualization with live data flow animation.
          </p>
        </motion.div>

        {/* Builder Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          {/* Control Panel */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 bg-navy-800/50 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isPlaying 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetNodes}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors hover:bg-blue-500/30"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Preview
              </div>
            </div>
          </div>

          {/* Builder Canvas */}
          <div className="relative bg-gradient-to-br from-navy-900/50 to-navy-800/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <div className="relative w-full h-96 md:h-[500px]">
              {/* Grid Background */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* SVG for Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                    <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0.8)" />
                  </linearGradient>
                  
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Connection Lines */}
                {nodes.map(node => 
                  node.connections.map(connectionId => {
                    const targetNode = nodes.find(n => n.id === connectionId)
                    if (!targetNode) return null

                    const isActive = hoveredNode === node.id || hoveredNode === connectionId || selectedNode === node.id || selectedNode === connectionId

                    return (
                      <g key={`${node.id}-${connectionId}`}>
                        <motion.path
                          d={getConnectionPath(node, targetNode)}
                          stroke="url(#connectionGradient)"
                          strokeWidth={isActive ? "3" : "2"}
                          fill="none"
                          strokeDasharray="5,5"
                          filter={isActive ? "url(#glow)" : undefined}
                          animate={isPlaying ? {
                            strokeDashoffset: [0, -20],
                            opacity: [0.6, 1, 0.6]
                          } : {}}
                          transition={{
                            strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />
                        
                        {/* Data Flow Particles */}
                        {isPlaying && (
                          <motion.circle
                            r="3"
                            fill="rgba(59, 130, 246, 0.8)"
                            animate={{
                              offsetDistance: ["0%", "100%"]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: Math.random() * 2
                            }}
                            style={{
                              offsetPath: `path("${getConnectionPath(node, targetNode)}")`,
                              offsetRotate: "auto"
                            }}
                          />
                        )}
                      </g>
                    )
                  })
                )}
              </svg>

              {/* Nodes */}
              {nodes.map((node, index) => {
                const Icon = node.icon
                const isHovered = hoveredNode === node.id
                const isSelected = selectedNode === node.id

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      scale: isHovered || isSelected ? 1.1 : 1,
                      x: node.position.x,
                      y: node.position.y
                    } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      scale: { duration: 0.2 }
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute cursor-pointer z-10"
                    style={{ 
                      left: 0, 
                      top: 0,
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    {/* Node Container */}
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-lg border-2 ${
                      isSelected ? 'border-white' : 'border-white/20'
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                      
                      {/* Pulse Effect */}
                      {(isHovered || isSelected) && (
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${node.color}`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Connection Points */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                    </div>

                    {/* Node Label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white text-center whitespace-nowrap">
                      {node.title}
                    </div>

                    {/* Hover Info */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-navy-800 px-3 py-2 rounded-lg text-xs text-white border border-gray-600 whitespace-nowrap z-20"
                      >
                        {node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-800" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}

              {/* Selected Node Info Panel */}
              {selectedNode && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-4 right-4 bg-navy-800/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 w-64 z-20"
                >
                  {(() => {
                    const node = nodes.find(n => n.id === selectedNode)
                    if (!node) return null
                    const Icon = node.icon

                    return (
                      <>
                        <div className="flex items-center mb-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center mr-3`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{node.title}</h4>
                            <p className="text-xs text-gray-400">{node.type} node</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-xs">
                            <span className="text-gray-400">Connections:</span>
                            <span className="text-white ml-1">{node.connections.length}</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-green-400 ml-1">Active</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gray-400">Load:</span>
                            <span className="text-blue-400 ml-1">23%</span>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              )}
            </div>
          </div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Drag & Drop</h4>
              <p className="text-gray-300 text-sm">Intuitive visual interface for building complex architectures</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Real-time Preview</h4>
              <p className="text-gray-300 text-sm">See your changes instantly with live data flow visualization</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Auto Configuration</h4>
              <p className="text-gray-300 text-sm">Smart defaults and automatic optimization for best performance</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}