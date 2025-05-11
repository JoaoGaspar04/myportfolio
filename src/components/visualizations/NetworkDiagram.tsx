import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/NetworkDiagram.css';

interface Node {
  id: string;
  x: number;
  y: number;
  type: 'server' | 'router' | 'endpoint' | 'firewall';
  label: string;
}

interface Connection {
  source: string;
  target: string;
  status: 'active' | 'warning' | 'down';
  bandwidth?: string;
}

interface NetworkDiagramProps {
  width?: number;
  height?: number;
  interactive?: boolean;
}

const NetworkDiagram: React.FC<NetworkDiagramProps> = ({ 
  width = 600, 
  height = 400, 
  interactive = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Sample network structure data
  const nodes: Node[] = [
    { id: 'server1', x: width * 0.5, y: height * 0.2, type: 'server', label: 'Main Server' },
    { id: 'firewall', x: width * 0.5, y: height * 0.4, type: 'firewall', label: 'Firewall' },
    { id: 'router1', x: width * 0.3, y: height * 0.6, type: 'router', label: 'Router 1' },
    { id: 'router2', x: width * 0.7, y: height * 0.6, type: 'router', label: 'Router 2' },
    { id: 'endpoint1', x: width * 0.2, y: height * 0.8, type: 'endpoint', label: 'Endpoint 1' },
    { id: 'endpoint2', x: width * 0.4, y: height * 0.8, type: 'endpoint', label: 'Endpoint 2' },
    { id: 'endpoint3', x: width * 0.6, y: height * 0.8, type: 'endpoint', label: 'Endpoint 3' },
    { id: 'endpoint4', x: width * 0.8, y: height * 0.8, type: 'endpoint', label: 'Endpoint 4' },
  ];

  const connections: Connection[] = [
    { source: 'server1', target: 'firewall', status: 'active', bandwidth: '1Gbps' },
    { source: 'firewall', target: 'router1', status: 'active', bandwidth: '500Mbps' },
    { source: 'firewall', target: 'router2', status: 'active', bandwidth: '500Mbps' },
    { source: 'router1', target: 'endpoint1', status: 'active', bandwidth: '100Mbps' },
    { source: 'router1', target: 'endpoint2', status: 'warning', bandwidth: '50Mbps' },
    { source: 'router2', target: 'endpoint3', status: 'down', bandwidth: '0Mbps' },
    { source: 'router2', target: 'endpoint4', status: 'active', bandwidth: '100Mbps' },
  ];

  // Draw the network diagram
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections first (so they appear behind nodes)
    connections.forEach(connection => {
      const source = nodes.find(node => node.id === connection.source);
      const target = nodes.find(node => node.id === connection.target);
      
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        
        // Set line style based on connection status
        if (connection.status === 'active') {
          ctx.strokeStyle = '#00ff41'; // Green
          ctx.setLineDash([]);
        } else if (connection.status === 'warning') {
          ctx.strokeStyle = '#ffcc00'; // Yellow
          ctx.setLineDash([5, 3]);
        } else {
          ctx.strokeStyle = '#ff3860'; // Red
          ctx.setLineDash([2, 2]);
        }
        
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw packet animation
        if (connection.status === 'active') {
          // Calculated once when the component mounts
          const packetPosition = Math.random();
          
          // Packet position
          const packetX = source.x + (target.x - source.x) * packetPosition;
          const packetY = source.y + (target.y - source.y) * packetPosition;
          
          // Draw packet
          ctx.beginPath();
          ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
        
        // Draw bandwidth label if provided
        if (connection.bandwidth) {
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2;
          
          ctx.font = '10px monospace';
          ctx.fillStyle = '#a0a0a0';
          ctx.textAlign = 'center';
          ctx.fillText(connection.bandwidth, midX, midY - 5);
        }
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      
      // Different shapes for different node types
      if (node.type === 'server') {
        // Server (rectangle)
        ctx.rect(node.x - 15, node.y - 15, 30, 30);
      } else if (node.type === 'router') {
        // Router (diamond)
        ctx.moveTo(node.x, node.y - 15);
        ctx.lineTo(node.x + 15, node.y);
        ctx.lineTo(node.x, node.y + 15);
        ctx.lineTo(node.x - 15, node.y);
        ctx.closePath();
      } else if (node.type === 'firewall') {
        // Firewall (hexagon)
        const radius = 15;
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = node.x + radius * Math.cos(angle);
          const y = node.y + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
      } else {
        // Endpoint (circle)
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
      }
      
      // Fill based on node type
      if (node.type === 'server') {
        ctx.fillStyle = '#3366ff';
      } else if (node.type === 'router') {
        ctx.fillStyle = '#00cc99';
      } else if (node.type === 'firewall') {
        ctx.fillStyle = '#ff3860';
      } else {
        ctx.fillStyle = '#8866ff';
      }
      
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw labels
      ctx.font = '12px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 30);
    });
    
    // Interactive hover effects if enabled
    if (interactive && canvas) {
      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Check if mouse is over any node
        let hoveredNode = null;
        for (const node of nodes) {
          const distance = Math.sqrt(
            Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)
          );
          
          if (distance < 15) {
            hoveredNode = node;
            break;
          }
        }
        
        // Update cursor style
        canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
        
        // You could redraw with highlighted state or show additional info
        if (hoveredNode) {
          // Could show tooltip or highlight connections
        }
      };
      
      canvas.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [width, height, interactive]);
  
  return (
    <motion.div 
      className="network-diagram-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={canvasRef} className="network-diagram"></canvas>
    </motion.div>
  );
};

export default NetworkDiagram;