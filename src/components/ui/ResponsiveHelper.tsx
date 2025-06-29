import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor, Tv } from 'lucide-react';

interface ScreenSize {
  width: number;
  height: number;
  type: 'mobile' | 'tablet' | 'desktop' | 'large';
  orientation: 'portrait' | 'landscape';
}

const ResponsiveHelper: React.FC = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    type: 'desktop',
    orientation: 'landscape'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let type: ScreenSize['type'] = 'desktop';
      if (width < 768) type = 'mobile';
      else if (width < 1024) type = 'tablet';
      else if (width >= 1920) type = 'large';

      const orientation: ScreenSize['orientation'] = width > height ? 'landscape' : 'portrait';

      setScreenSize({ width, height, type, orientation });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Show helper only in development or when explicitly enabled
  useEffect(() => {
    const showHelper = process.env.NODE_ENV === 'development' || 
                      localStorage.getItem('show-responsive-helper') === 'true';
    setIsVisible(showHelper);
  }, []);

  const getIcon = () => {
    switch (screenSize.type) {
      case 'mobile': return <Smartphone size={16} />;
      case 'tablet': return <Tablet size={16} />;
      case 'large': return <Tv size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  const getStatusColor = () => {
    switch (screenSize.type) {
      case 'mobile': return '#ff6b35';
      case 'tablet': return '#ffcc00';
      case 'desktop': return '#00cc99';
      case 'large': return '#0099ff';
      default: return '#666';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="responsive-helper"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 16px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000,
        border: `2px solid ${getStatusColor()}`,
        backdropFilter: 'blur(10px)',
        minWidth: '200px'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '8px',
        color: getStatusColor()
      }}>
        {getIcon()}
        <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          {screenSize.type}
        </span>
        <span style={{ opacity: 0.7 }}>
          ({screenSize.orientation})
        </span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
        <div>Width: <strong>{screenSize.width}px</strong></div>
        <div>Height: <strong>{screenSize.height}px</strong></div>
      </div>
      
      <div style={{ 
        marginTop: '8px', 
        padding: '4px 8px', 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '4px',
        fontSize: '10px',
        textAlign: 'center'
      }}>
        Breakpoints: Mobile &lt;768px | Tablet &lt;1024px | Desktop &lt;1920px | Large ≥1920px
      </div>
    </motion.div>
  );
};

export default ResponsiveHelper;