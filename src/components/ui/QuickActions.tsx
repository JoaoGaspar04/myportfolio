import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Download, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Settings,
  Edit3,
  Code,
  Database,
  Shield,
  Network,
  Smartphone,
  Monitor
} from 'lucide-react';
import ContentManager from '../admin/ContentManager';

const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showContentManager, setShowContentManager] = useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const actions = [
    {
      id: 'content-manager',
      label: 'Gestor de Conteúdo',
      icon: Settings,
      color: '#6366f1',
      action: () => setShowContentManager(true),
      subtitle: 'Atualizar portfólio'
    },
    {
      id: 'download-cv',
      label: 'Download CV',
      icon: Download,
      color: '#00cc99',
      action: () => window.open('https://rxresu.me/joaogaspar04/portfolio-publico', '_blank')
    },
    {
      id: 'email',
      label: 'Email',
      icon: copiedEmail ? Check : Mail,
      color: '#0099ff',
      action: () => copyToClipboard('support@joaocgaspar.pt', 'email'),
      subtitle: copiedEmail ? 'Copiado!' : 'support@joaocgaspar.pt'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: copiedPhone ? Check : Phone,
      color: '#25d366',
      action: () => copyToClipboard('+351 968196979', 'phone'),
      subtitle: copiedPhone ? 'Copiado!' : '+351 968196979'
    },
    {
      id: 'schedule',
      label: 'Agendar',
      icon: Calendar,
      color: '#ff6b35',
      action: () => window.open('mailto:support@joaocgaspar.pt?subject=Agendamento de Consultoria', '_blank')
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: ExternalLink,
      color: '#0077b5',
      action: () => window.open('https://www.linkedin.com/in/jonygaspar04/', '_blank')
    },
    {
      id: 'chat',
      label: 'Chat AI',
      icon: MessageSquare,
      color: '#00ff41',
      action: () => {
        // Trigger chat opening
        const chatButton = document.querySelector('.chatbot-toggle') as HTMLElement;
        chatButton?.click();
      }
    }
  ];

  return (
    <>
      {/* Main Toggle Button */}
      <motion.button
        className="quick-actions-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)'
        }}
        aria-label="Ações rápidas"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Zap size={24} />
        </motion.div>
      </motion.button>

      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 999 }}>
            {actions.map((action, index) => {
              const Icon = action.icon;
              const angle = (index * 45) - 90; // Distribute in arc
              const radius = 100;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: x, 
                    y: y 
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0, 
                    x: 0, 
                    y: 0 
                  }}
                  transition={{ 
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={action.action}
                  style={{
                    position: 'absolute',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: action.color,
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px ${action.color}40`
                  }}
                  title={action.subtitle || action.label}
                  aria-label={action.label}
                >
                  <Icon size={20} />
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
          />
        )}
      </AnimatePresence>

      {/* Content Manager Modal */}
      <ContentManager 
        isOpen={showContentManager}
        onClose={() => setShowContentManager(false)}
      />
    </>
  );
};

export default QuickActions;