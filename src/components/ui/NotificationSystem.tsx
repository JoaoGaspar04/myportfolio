import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X, Shield, Zap } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'security';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ 
  notifications, 
  onDismiss 
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'security': return <Shield size={20} />;
      default: return <Info size={20} />;
    }
  };

  const getColors = (type: Notification['type']) => {
    switch (type) {
      case 'success': return { bg: '#00cc99', border: '#00ff41' };
      case 'warning': return { bg: '#ffcc00', border: '#ff9900' };
      case 'security': return { bg: '#ff3860', border: '#ff1744' };
      default: return { bg: '#0099ff', border: '#00ccff' };
    }
  };

  useEffect(() => {
    notifications.forEach(notification => {
      if (!notification.persistent && notification.duration !== 0) {
        const timer = setTimeout(() => {
          onDismiss(notification.id);
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onDismiss]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px'
      }}
    >
      <AnimatePresence>
        {notifications.map((notification) => {
          const colors = getColors(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                backgroundColor: 'var(--color-background)',
                border: `2px solid ${colors.border}`,
                borderRadius: '12px',
                padding: '16px',
                boxShadow: `0 8px 32px ${colors.bg}40`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: colors.bg, flexShrink: 0, marginTop: '2px' }}>
                  {getIcon(notification.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: 'var(--color-text)'
                  }}>
                    {notification.title}
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '13px', 
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.4'
                  }}>
                    {notification.message}
                  </p>
                  
                  {notification.action && (
                    <button
                      onClick={notification.action.onClick}
                      style={{
                        marginTop: '8px',
                        padding: '6px 12px',
                        backgroundColor: colors.bg,
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => onDismiss(notification.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    flexShrink: 0
                  }}
                  aria-label="Fechar notificação"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;