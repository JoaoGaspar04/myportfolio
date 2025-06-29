import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Clock, Database, Wifi, AlertCircle } from 'lucide-react';
import { PerformanceUtils } from '../../utils/performance';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  icon: React.ReactNode;
}

const PerformanceMonitor: React.FC<{ visible?: boolean }> = ({ visible = false }) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const updateMetrics = () => {
      const newMetrics: PerformanceMetric[] = [];

      // Memory usage
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
        const usage = (usedMB / limitMB) * 100;

        newMetrics.push({
          name: 'Memory Usage',
          value: usedMB,
          unit: 'MB',
          status: usage > 80 ? 'poor' : usage > 60 ? 'warning' : usage > 40 ? 'good' : 'excellent',
          icon: <Database size={16} />
        });
      }

      // Connection speed
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const speed = connection.downlink || 0;

        newMetrics.push({
          name: 'Connection',
          value: speed,
          unit: 'Mbps',
          status: speed > 10 ? 'excellent' : speed > 5 ? 'good' : speed > 1 ? 'warning' : 'poor',
          icon: <Wifi size={16} />
        });
      }

      // Page load time
      if ('getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = Math.round(navigation.loadEventEnd - navigation.navigationStart);

          newMetrics.push({
            name: 'Load Time',
            value: loadTime,
            unit: 'ms',
            status: loadTime < 1000 ? 'excellent' : loadTime < 2000 ? 'good' : loadTime < 3000 ? 'warning' : 'poor',
            icon: <Clock size={16} />
          });
        }
      }

      // FPS (approximate)
      let fps = 60;
      const startTime = performance.now();
      requestAnimationFrame(() => {
        const endTime = performance.now();
        fps = Math.round(1000 / (endTime - startTime));

        newMetrics.push({
          name: 'FPS',
          value: fps,
          unit: 'fps',
          status: fps > 55 ? 'excellent' : fps > 45 ? 'good' : fps > 30 ? 'warning' : 'poor',
          icon: <Activity size={16} />
        });

        setMetrics([...newMetrics]);
      });
    };

    setIsMonitoring(true);
    updateMetrics();

    const interval = setInterval(updateMetrics, 2000);
    return () => {
      clearInterval(interval);
      setIsMonitoring(false);
    };
  }, [visible]);

  const getStatusColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'excellent': return '#00ff41';
      case 'good': return '#00cc99';
      case 'warning': return '#ffcc00';
      case 'poor': return '#ff3860';
      default: return '#666';
    }
  };

  const getStatusLabel = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bom';
      case 'warning': return 'Atenção';
      case 'poor': return 'Ruim';
      default: return 'Desconhecido';
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="performance-monitor"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '300px',
          backgroundColor: 'var(--color-background-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '16px',
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <motion.div
            animate={{ rotate: isMonitoring ? 360 : 0 }}
            transition={{ duration: 2, repeat: isMonitoring ? Infinity : 0, ease: 'linear' }}
          >
            <Zap size={20} style={{ color: '#00ff41' }} />
          </motion.div>
          <h4 style={{ margin: 0, color: 'var(--color-text)', fontSize: '16px' }}>
            Performance Monitor
          </h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '8px',
                border: `1px solid ${getStatusColor(metric.status)}40`
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ color: getStatusColor(metric.status) }}>
                  {metric.icon}
                </div>
                <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                  {metric.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>
                  {metric.value}{metric.unit}
                </span>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(metric.status)
                  }}
                  title={getStatusLabel(metric.status)}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{
            marginTop: '16px',
            padding: '8px 12px',
            backgroundColor: 'rgba(0, 255, 65, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 255, 65, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AlertCircle size={14} style={{ color: '#00ff41' }} />
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Monitoramento em tempo real ativo
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceMonitor;