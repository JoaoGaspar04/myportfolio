import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

interface SecurityIndicatorProps {
  level: 'low' | 'medium' | 'high' | 'maximum';
  features?: string[];
  compact?: boolean;
}

const SecurityIndicator: React.FC<SecurityIndicatorProps> = ({ 
  level, 
  features = [],
  compact = false 
}) => {
  const securityLevels = {
    low: {
      color: '#ffcc00',
      icon: AlertTriangle,
      label: 'Segurança Básica',
      description: 'Proteção fundamental implementada'
    },
    medium: {
      color: '#0099ff',
      icon: Shield,
      label: 'Segurança Intermediária',
      description: 'Múltiplas camadas de proteção'
    },
    high: {
      color: '#00cc99',
      icon: Lock,
      label: 'Segurança Avançada',
      description: 'Proteção robusta e monitoramento'
    },
    maximum: {
      color: '#00ff41',
      icon: Zap,
      label: 'Segurança Máxima',
      description: 'Proteção de nível militar'
    }
  };

  const config = securityLevels[level];
  const Icon = config.icon;

  const defaultFeatures = {
    low: ['SSL/TLS', 'Validação básica'],
    medium: ['SSL/TLS', 'Rate limiting', 'Sanitização', 'CSRF protection'],
    high: ['SSL/TLS', 'Rate limiting', 'Sanitização', 'CSRF protection', 'XSS protection', 'Monitoramento'],
    maximum: ['SSL/TLS', 'Rate limiting', 'Sanitização', 'CSRF protection', 'XSS protection', 'Monitoramento', 'Criptografia avançada', 'Auditoria completa']
  };

  const displayFeatures = features.length > 0 ? features : defaultFeatures[level];

  if (compact) {
    return (
      <motion.div
        className="security-indicator-compact"
        whileHover={{ scale: 1.05 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          borderRadius: '20px',
          backgroundColor: `${config.color}20`,
          border: `1px solid ${config.color}40`,
          color: config.color,
          fontSize: '12px',
          fontWeight: '600'
        }}
      >
        <Icon size={14} />
        <span>{config.label}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="security-indicator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: `2px solid ${config.color}40`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <motion.div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: `${config.color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: config.color
          }}
          animate={{
            boxShadow: [
              `0 0 0 0 ${config.color}40`,
              `0 0 0 10px ${config.color}00`,
              `0 0 0 0 ${config.color}40`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Icon size={24} />
        </motion.div>
        
        <div>
          <h4 style={{ margin: 0, color: config.color, fontSize: '18px', fontWeight: '600' }}>
            {config.label}
          </h4>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            {config.description}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
        {displayFeatures.map((feature, index) => (
          <motion.div
            key={feature}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)'
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CheckCircle size={14} style={{ color: config.color }} />
            <span>{feature}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: `${config.color}10`,
          borderRadius: '8px',
          border: `1px solid ${config.color}30`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Server size={16} style={{ color: config.color }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>
            Status de Segurança
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: config.color,
              animation: 'pulse 2s infinite'
            }}
          />
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Todos os sistemas operacionais e seguros
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecurityIndicator;