import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useClientOnly } from '@/hooks/useClientOnly';
import {
  Database,
  Search,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Code,
  Upload,
  Download,
  Zap,
  LucideIcon
} from 'lucide-react';

// Type definitions

interface Position {
  x: number;
  y: number;
}

interface NodeConfig {
  text?: string;
  model?: string;
  table?: string;
  filter?: string;
  limit?: number;
  fields?: Array<{ name: string; type: string }>;
}

interface Node {
  id: string;
  type: keyof typeof nodeTypes;
  position: Position;
  config: NodeConfig;
}

interface Connection {
  from: string;
  to: string;
  color: string;
}

interface NodeComponentProps {
  node: Node;
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
  onUpdateConfig: (nodeId: string, config: NodeConfig) => void;
  onUpdatePosition: (nodeId: string, position: Position) => void;
}

interface ConnectionLineProps {
  connection: Connection;
  fromNode: Node | undefined;
  toNode: Node | undefined;
  isAnimated: boolean;
}

// Node types based on the HTML flow diagram
const nodeTypes = {
  frontend: { icon: Code, color: 'from-blue-600 to-blue-800', label: 'Frontend' },
  embedding: { icon: Zap, color: 'from-slate-700 to-slate-900', label: 'Embedding' },
  insert: { icon: Plus, color: 'from-emerald-600 to-emerald-800', label: 'Insert' },
  vectorSearch: { icon: Search, color: 'from-purple-600 to-purple-800', label: 'Vector Search' },
  fetchResults: { icon: Download, color: 'from-purple-900 to-purple-950', label: 'Fetch Results' },
  database: { icon: Database, color: 'from-purple-700 to-purple-900', label: 'Database' },
  returnToFrontend: { icon: Upload, color: 'from-blue-600 to-blue-800', label: 'Return' }
} as const;

// Initial nodes configuration matching the HTML structure
const initialNodes: Node[] = [
  { id: 'frontend', type: 'frontend', position: { x: 0.5, y: 2.5 }, config: {} },
  { id: 'embedding-insert', type: 'embedding', position: { x: 2, y: 1.25 }, config: { text: 'spicy pasta', model: 'text-embedding-ada-002' } },
  { id: 'embedding-search', type: 'embedding', position: { x: 2, y: 3.75 }, config: { text: 'spicy pasta', model: 'text-embedding-ada-002' } },
  { id: 'fetchFoodEntries', type: 'insert', position: { x: 3.5, y: 0.625 }, config: { table: 'foods' } },
  { id: 'insertFood', type: 'insert', position: { x: 3.5, y: 1.875 }, config: { fields: [{ name: 'description', type: 'string' }, { name: 'cuisine', type: 'string' }] } },
  { id: 'vectorSearch', type: 'vectorSearch', position: { x: 3.5, y: 3.75 }, config: { table: 'foods', filter: 'cuisine', limit: 10 } },
  { id: 'fetchResults', type: 'fetchResults', position: { x: 5, y: 3.75 }, config: { table: 'foods' } },
  { id: 'database', type: 'database', position: { x: 5, y: 1.875 }, config: { table: 'foods' } },
  { id: 'returnToFrontend1', type: 'returnToFrontend', position: { x: 6.5, y: 0.625 }, config: {} },
  { id: 'returnToFrontend2', type: 'returnToFrontend', position: { x: 6.5, y: 3.75 }, config: {} }
];

// Initial connections matching the HTML flow
const initialConnections: Connection[] = [
  { from: 'frontend', to: 'embedding-insert', color: '#38bdf8' },
  { from: 'frontend', to: 'fetchFoodEntries', color: '#3b82f6' },
  { from: 'frontend', to: 'embedding-search', color: '#f59e0b' },
  { from: 'embedding-insert', to: 'insertFood', color: '#10b981' },
  { from: 'insertFood', to: 'database', color: '#6366f1' },
  { from: 'fetchFoodEntries', to: 'returnToFrontend1', color: '#4ade80' },
  { from: 'embedding-search', to: 'vectorSearch', color: '#ec4899' },
  { from: 'vectorSearch', to: 'fetchResults', color: '#fbbf24' },
  { from: 'fetchResults', to: 'returnToFrontend2', color: '#3b82f6' }
];

const NodeComponent: React.FC<NodeComponentProps> = ({ node, isSelected, onSelect, onUpdateConfig, onUpdatePosition }) => {
  const nodeType = nodeTypes[node.type];
  const Icon = nodeType?.icon || Settings;
  const [showConfig, setShowConfig] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isClient = useClientOnly();
  
  // Check if we're on a mobile device
  useEffect(() => {
    if (!isClient) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  const handleConfigChange = (key: keyof NodeConfig, value: string | number | Array<{ name: string; type: string }>) => {
    onUpdateConfig(node.id, { ...node.config, [key]: value });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.detail === 2) return; // Ignore double-click for dragging
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    onSelect(node.id);
    
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [node.id, onSelect]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const canvas = document.querySelector('.canvas-container');
    if (!canvas) return;
    
    const canvasRect = canvas.getBoundingClientRect();
    const scaleFactor = isMobile ? 80 : 100;
    const heightFactor = isMobile ? 60 : 80;
    
    const newX = (e.clientX - canvasRect.left - dragOffset.x) / scaleFactor;
    const newY = (e.clientY - canvasRect.top - dragOffset.y) / heightFactor;
    
    onUpdatePosition(node.id, {
      x: Math.max(0, Math.min(newX, (canvasRect.width - (isMobile ? 60 : 80)) / scaleFactor)),
      y: Math.max(0, Math.min(newY, (canvasRect.height - (isMobile ? 60 : 80)) / heightFactor))
    });
  }, [isDragging, dragOffset, node.id, onUpdatePosition, isMobile]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
        ref={nodeRef}
        className="absolute z-10 select-none"
        style={{ 
          left: node.position.x * (isMobile ? 80 : 100), 
          top: node.position.y * (isMobile ? 60 : 80),
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: isMobile ? 'scale(0.85)' : 'none',
          transformOrigin: 'center center'
        }}>
      <div
        className={`relative group transition-all duration-200 ${
          isSelected ? 'scale-110' : 'hover:scale-105'
        } ${isDragging ? 'z-50' : ''}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => setShowConfig(!showConfig)}
      >
        {/* Node container */}
        <div className={`
          w-20 h-20 rounded-xl bg-gradient-to-br ${nodeType?.color || 'from-gray-600 to-gray-800'}
          flex items-center justify-center shadow-lg border-2 transition-all duration-200
          ${isSelected ? 'border-white shadow-xl' : 'border-white/20 shadow-md'}
        `}>
          <Icon className="w-8 h-8 text-white" />
          
          {/* Status indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          
          {/* Connection points */}
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-400 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Node label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white text-center whitespace-nowrap">
          {nodeType?.label || 'Unknown'}
        </div>
      </div>
      
      {/* Configuration panel */}
      {showConfig && (
        <div className="absolute top-24 left-0 bg-slate-800 border border-slate-600 rounded-lg p-4 w-64 shadow-xl z-20">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <Icon className="w-4 h-4 mr-2" />
            {nodeType?.label || 'Node'} Config
          </h4>
          
          {/* Dynamic configuration based on node type */}
          {node.type === 'embedding' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Text</label>
                <input
                  type="text"
                  value={node.config.text || ''}
                  onChange={(e) => handleConfigChange('text', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-700 text-white text-xs rounded border border-slate-600 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">Model</label>
                <select
                  value={node.config.model || 'text-embedding-ada-002'}
                  onChange={(e) => handleConfigChange('model', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-700 text-white text-xs rounded border border-slate-600"
                >
                  <option>text-embedding-ada-002</option>
                  <option>text-embedding-3-small</option>
                  <option>text-embedding-3-large</option>
                  <option>text-embedding-babbage-001</option>
                </select>
              </div>
            </div>
          )}
          
          {node.type === 'vectorSearch' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Table</label>
                <select
                  value={node.config.table || 'foods'}
                  onChange={(e) => handleConfigChange('table', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-700 text-white text-xs rounded border border-slate-600"
                >
                  <option>foods</option>
                  <option>movies</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">Filter</label>
                <input
                  type="text"
                  value={node.config.filter || ''}
                  onChange={(e) => handleConfigChange('filter', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-700 text-white text-xs rounded border border-slate-600"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">Limit</label>
                <input
                  type="number"
                  value={node.config.limit || 10}
                  onChange={(e) => handleConfigChange('limit', parseInt(e.target.value) || 10)}
                  className="w-full px-2 py-1 bg-slate-700 text-white text-xs rounded border border-slate-600"
                />
              </div>
            </div>
          )}
          
          {(node.type === 'insert' || node.type === 'fetchResults' || node.type === 'database') && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Table</label>
                <select
                  value={node.config.table || 'foods'}
                  onChange={(e) => handleConfigChange('table', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-700 text-white text-xs rounded border border-slate-600"
                >
                  <option>foods</option>
                  <option>movies</option>
                  <option>recipes</option>
                  <option>ingredients</option>
                </select>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowConfig(false)}
            className="mt-3 text-xs text-blue-400 hover:text-blue-300"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const ConnectionLine: React.FC<ConnectionLineProps> = ({ connection, fromNode, toNode, isAnimated }) => {
  if (!fromNode || !toNode) return null;

  const startX = (fromNode.position.x * 100) + 80; // Node width offset
  const startY = (fromNode.position.y * 80) + 40; // Node height offset
  const endX = (toNode.position.x * 100);
  const endY = (toNode.position.y * 80) + 40;

  // Create curved path
  const midX = (startX + endX) / 2;
  const controlX = midX;
  const controlY = Math.min(startY, endY) - 30;
  const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

  return (
    <g>
      {/* Connection line */}
      <path
        d={path}
        stroke={connection.color}
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        className={isAnimated ? 'animate-pulse' : ''}
        style={{
          filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))',
          animation: isAnimated ? 'dash 2s linear infinite' : 'none'
        }}
      />
      
      {/* Arrow head */}
      <polygon
        points={`${endX-8},${endY-4} ${endX},${endY} ${endX-8},${endY+4}`}
        fill={connection.color}
      />
      
      {/* Animated data particle */}
      {isAnimated && (
        <circle
          r="3"
          fill="rgba(59, 130, 246, 0.8)"
          className="animate-bounce"
          style={{
            offsetPath: `path("${path}")`,
            offsetDistance: '50%',
            animation: 'moveAlongPath 2s ease-in-out infinite'
          }}
        />
      )}
    </g>
  );
};

export function VisualBuilderPreview() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isGridVisible, setIsGridVisible] = useState(true);

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleNodeConfigUpdate = (nodeId: string, newConfig: NodeConfig) => {
    setNodes(nodes.map(node =>
      node.id === nodeId ? { ...node, config: newConfig } : node
    ));
  };

  const handleNodePositionUpdate = (nodeId: string, newPosition: Position) => {
    setNodes(nodes.map(node =>
      node.id === nodeId ? { ...node, position: newPosition } : node
    ));
  };

  const resetBuilder = () => {
    setNodes(initialNodes);
    setConnections(initialConnections);
    setSelectedNode(null);
  };

  const selectedNodeData = nodes.find(n => n.id === selectedNode);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">VB</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Visual Backend Builder</h1>
              <p className="text-sm text-gray-400">Drag, drop, connect - no coding required</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isPlaying
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={resetBuilder}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => setIsGridVisible(!isGridVisible)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"
            >
              <Settings className="w-4 h-4" />
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="canvas-container relative bg-gradient-to-br from-slate-900 to-slate-800 h-screen overflow-hidden">
        {/* Grid Background */}
        {isGridVisible && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />
        )}

        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <style>
              {`
                @keyframes dash {
                  to {
                    stroke-dashoffset: -20;
                  }
                }
              `}
            </style>
          </defs>
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);
            return (
              <ConnectionLine
                key={`${connection.from}-${connection.to}`}
                connection={connection}
                fromNode={fromNode}
                toNode={toNode}
                isAnimated={isPlaying}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <NodeComponent
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            onSelect={handleNodeSelect}
            onUpdateConfig={handleNodeConfigUpdate}
            onUpdatePosition={handleNodePositionUpdate}
          />
        ))}

        {/* Selected Node Info Panel */}
        {selectedNodeData && (
          <div className="absolute top-6 right-6 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-xl p-4 w-64 z-20">
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${nodeTypes[selectedNodeData.type]?.color || 'from-gray-600 to-gray-800'} flex items-center justify-center mr-3`}>
                {React.createElement(nodeTypes[selectedNodeData.type]?.icon || Settings, { className: "w-4 h-4 text-white" })}
              </div>
              <div>
                <h4 className="text-white font-semibold">{nodeTypes[selectedNodeData.type]?.label || 'Node'}</h4>
                <p className="text-xs text-gray-400">{selectedNodeData.type} node</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 ml-1">Active</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-400">Connections:</span>
                <span className="text-white ml-1">
                  {connections.filter(c => c.from === selectedNodeData.id || c.to === selectedNodeData.id).length}
                </span>
              </div>
              <div className="text-xs">
                <span className="text-gray-400">Load:</span>
                <span className="text-blue-400 ml-1">23%</span>
              </div>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="absolute bottom-6 left-6 flex items-center space-x-4 bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Live Preview</span>
          </div>
          <div className="w-px h-4 bg-gray-600" />
          <span className="text-sm text-gray-400">{nodes.length} nodes</span>
          <span className="text-sm text-gray-400">{connections.length} connections</span>
        </div>
      </div>
    </div>
  );
}