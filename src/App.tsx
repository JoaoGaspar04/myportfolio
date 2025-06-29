import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatBot from './components/chatbot/ChatBot';
import CookieBanner from './components/ui/CookieBanner';
import SecurityIndicator from './components/ui/SecurityIndicator';
import PerformanceMonitor from './components/ui/PerformanceMonitor';
import AccessibilityPanel from './components/ui/AccessibilityPanel';
import LanguageSelector from './components/ui/LanguageSelector';
import ResponsiveHelper from './components/ui/ResponsiveHelper';
import NotificationSystem from './components/ui/NotificationSystem';
import AdvancedSearch from './components/ui/AdvancedSearch';
import QuickActions from './components/ui/QuickActions';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Loader from './components/ui/Loader';
import ParticleBackground from './components/animations/ParticleBackground';
import { PerformanceUtils } from './utils/performance';
import { AccessibilityUtils } from './utils/accessibility';
import { SecurityUtils } from './utils/security';
import { useNotifications } from './hooks/useNotifications';
import './styles/App.css';
import './styles/accessibility.css';
import './styles/ErrorBoundary.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high' | 'maximum'>('maximum');
  
  const navigate = useNavigate();
  const { 
    notifications, 
    removeNotification, 
    success, 
    warning, 
    info, 
    security 
  } = useNotifications();

  useEffect(() => {
    // Initialize universal accessibility and security features
    const initializeApp = async () => {
      try {
        // Initialize accessibility features first
        AccessibilityUtils.initialize();

        // Security headers check
        const nonce = SecurityUtils.generateNonce();
        console.log('🔒 Security nonce generated:', nonce);

        // Performance monitoring setup
        if (process.env.NODE_ENV === 'development') {
          setTimeout(() => {
            PerformanceUtils.monitorPerformance();
            PerformanceUtils.analyzeBundleSize();
          }, 3000);
        }

        // Preload critical resources
        await Promise.all([
          PerformanceUtils.preloadResource('/shield.svg', 'image'),
          // Add more critical resources here
        ]);

        // Check for slow connection and adapt
        if (PerformanceUtils.isSlowConnection()) {
          document.body.classList.add('slow-connection');
          console.log('🐌 Slow connection detected, optimizing experience');
          warning(
            'Conexão Lenta Detectada',
            'Otimizando experiência para melhor performance',
            { duration: 5000 }
          );
        }

        // Simulate loading with performance monitoring
        const loadStart = performance.now();
        
        setTimeout(() => {
          const loadEnd = performance.now();
          const loadTime = loadEnd - loadStart;
          
          console.log(`⚡ App loaded in ${Math.round(loadTime)}ms`);
          setLoading(false);
          
          // Show welcome notification
          success(
            'Portfólio Carregado!',
            'Bem-vindo ao meu portfólio de cibersegurança',
            { duration: 4000 }
          );
          
          // Monitor memory usage in development
          if (process.env.NODE_ENV === 'development') {
            PerformanceUtils.monitorPerformance();
          }

          // Announce page load for screen readers
          AccessibilityUtils.announce('Página carregada com sucesso. Use Tab para navegar ou Ctrl+Alt+A para modo de emergência de acessibilidade.');
        }, 2000);

      } catch (error) {
        console.error('❌ App initialization error:', error);
        setLoading(false);
        security(
          'Erro de Inicialização',
          'Erro ao carregar a página. Tente recarregar.',
          { 
            persistent: true,
            action: {
              label: 'Recarregar',
              onClick: () => window.location.reload()
            }
          }
        );
        AccessibilityUtils.announce('Erro ao carregar a página. Tente recarregar.', 'assertive');
      }
    };

    initializeApp();
  }, [success, warning, security]);

  // Performance optimization: debounce chat toggle
  const debouncedToggleChat = PerformanceUtils.debounce(() => {
    setChatOpen(prev => !prev);
  }, 100);

  // Security monitoring
  useEffect(() => {
    const monitorSecurity = () => {
      // Check for suspicious activity
      const suspiciousPatterns = [
        'javascript:',
        '<script',
        'eval(',
        'document.cookie'
      ];

      const checkForSuspiciousActivity = () => {
        const currentUrl = window.location.href;
        const hasSuspicious = suspiciousPatterns.some(pattern => 
          currentUrl.toLowerCase().includes(pattern)
        );

        if (hasSuspicious) {
          console.warn('🚨 Suspicious activity detected in URL');
          security(
            'Atividade Suspeita Detectada',
            'Possível tentativa de ataque bloqueada',
            { persistent: true }
          );
          AccessibilityUtils.announce('Atividade suspeita detectada. Página sendo protegida.', 'assertive');
        }
      };

      checkForSuspiciousActivity();
      
      // Monitor for XSS attempts
      const originalAlert = window.alert;
      window.alert = function(message) {
        console.warn('🚨 Alert intercepted (potential XSS):', message);
        security(
          'Tentativa de Script Malicioso',
          'Script suspeito foi bloqueado automaticamente',
          { persistent: true }
        );
        AccessibilityUtils.announce('Tentativa de script malicioso bloqueada.', 'assertive');
        return originalAlert.call(window, message);
      };
    };

    monitorSecurity();
  }, [security]);

  // Keyboard shortcuts for development and accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global search shortcut
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }

      // Development shortcuts
      if (process.env.NODE_ENV === 'development') {
        if (e.ctrlKey || e.metaKey) {
          switch (e.key) {
            case 'p':
              e.preventDefault();
              setShowPerformanceMonitor(prev => !prev);
              break;
            case 'a':
              e.preventDefault();
              AccessibilityUtils.auditAccessibility();
              break;
            case 's':
              e.preventDefault();
              PerformanceUtils.monitorPerformance();
              break;
          }
        }
      }

      // Universal accessibility shortcuts
      if (e.ctrlKey && e.altKey) {
        switch (e.key) {
          case 'a':
            e.preventDefault();
            AccessibilityUtils.enableEmergencyMode();
            info(
              'Modo de Emergência Ativado',
              'Todas as melhorias de acessibilidade foram aplicadas',
              { duration: 5000 }
            );
            break;
          case 'h':
            e.preventDefault();
            // Toggle high contrast
            document.body.classList.toggle('high-contrast');
            const contrastEnabled = document.body.classList.contains('high-contrast');
            info(
              contrastEnabled ? 'Alto Contraste Ativado' : 'Alto Contraste Desativado',
              'Contraste visual ajustado',
              { duration: 3000 }
            );
            AccessibilityUtils.announce(
              contrastEnabled ? 'Alto contraste ativado' : 'Alto contraste desativado'
            );
            break;
          case 'm':
            e.preventDefault();
            // Toggle reduced motion
            document.body.classList.toggle('reduced-motion');
            const motionReduced = document.body.classList.contains('reduced-motion');
            info(
              motionReduced ? 'Animações Reduzidas' : 'Animações Normais',
              'Preferências de movimento ajustadas',
              { duration: 3000 }
            );
            AccessibilityUtils.announce(
              motionReduced ? 'Animações reduzidas' : 'Animações normais'
            );
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [info]);

  // CSP violation reporting
  useEffect(() => {
    const handleCSPViolation = (e: SecurityPolicyViolationEvent) => {
      console.warn('🚨 CSP Violation:', {
        blockedURI: e.blockedURI,
        violatedDirective: e.violatedDirective,
        originalPolicy: e.originalPolicy
      });
      security(
        'Violação de Segurança Detectada',
        'Tentativa de execução de código não autorizado foi bloqueada',
        { persistent: true }
      );
      AccessibilityUtils.announce('Violação de segurança detectada e bloqueada.', 'assertive');
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);
    return () => document.removeEventListener('securitypolicyviolation', handleCSPViolation);
  }, [security]);

  // Handle modal state for body scroll
  useEffect(() => {
    const handleModalState = () => {
      const modals = document.querySelectorAll('[role="dialog"]:not([aria-hidden="true"])');
      if (modals.length > 0) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    };

    // Monitor for modal changes
    const observer = new MutationObserver(handleModalState);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['aria-hidden', 'role'] 
    });

    return () => observer.disconnect();
  }, []);

  const handleSearchNavigate = (url: string) => {
    navigate(url);
    setSearchOpen(false);
  };

  if (loading) {
    return (
      <ErrorBoundary>
        <Loader />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="app">
          <ParticleBackground />
          
          {/* Skip links for accessibility */}
          <div className="skip-links">
            <a href="#main-content" className="skip-link">Pular para conteúdo principal</a>
            <a href="#navigation" className="skip-link">Pular para navegação</a>
            <a href="#footer" className="skip-link">Pular para rodapé</a>
          </div>

          <Navbar />
          
          {/* Accessibility and utility indicators */}
          <div style={{ 
            position: 'fixed', 
            top: '80px', 
            left: '20px', 
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <SecurityIndicator 
              level={securityLevel} 
              compact={true}
              features={[
                'SSL/TLS 1.3',
                'Rate Limiting',
                'XSS Protection',
                'CSRF Protection',
                'Content Sanitization',
                'Security Monitoring'
              ]}
            />
          </div>

          {/* Language selector in top right */}
          <div style={{ 
            position: 'fixed', 
            top: '80px', 
            right: '20px', 
            zIndex: 1000 
          }}>
            <LanguageSelector />
          </div>

          {/* Performance monitor (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <PerformanceMonitor visible={showPerformanceMonitor} />
          )}

          {/* Responsive helper (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <ResponsiveHelper />
          )}
          
          <main className="main-content" role="main" id="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          {/* ChatBot component with error boundary */}
          <ErrorBoundary fallback={null}>
            <ChatBot isOpen={chatOpen} toggleChat={debouncedToggleChat} />
          </ErrorBoundary>

          {/* Quick Actions */}
          <QuickActions />

          {/* Advanced Search */}
          <AdvancedSearch 
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onNavigate={handleSearchNavigate}
          />

          {/* Accessibility Panel */}
          <AccessibilityPanel />
          
          {/* Notification System */}
          <NotificationSystem 
            notifications={notifications}
            onDismiss={removeNotification}
          />
          
          <CookieBanner />
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;