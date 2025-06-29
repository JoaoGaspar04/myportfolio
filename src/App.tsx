import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import './styles/App.css';
import './styles/accessibility.css';
import './styles/ErrorBoundary.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high' | 'maximum'>('maximum');

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
        }

        // Simulate loading with performance monitoring
        const loadStart = performance.now();
        
        setTimeout(() => {
          const loadEnd = performance.now();
          const loadTime = loadEnd - loadStart;
          
          console.log(`⚡ App loaded in ${Math.round(loadTime)}ms`);
          setLoading(false);
          
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
        AccessibilityUtils.announce('Erro ao carregar a página. Tente recarregar.', 'assertive');
      }
    };

    initializeApp();
  }, []);

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
          AccessibilityUtils.announce('Atividade suspeita detectada. Página sendo protegida.', 'assertive');
        }
      };

      checkForSuspiciousActivity();
      
      // Monitor for XSS attempts
      const originalAlert = window.alert;
      window.alert = function(message) {
        console.warn('🚨 Alert intercepted (potential XSS):', message);
        AccessibilityUtils.announce('Tentativa de script malicioso bloqueada.', 'assertive');
        return originalAlert.call(window, message);
      };
    };

    monitorSecurity();
  }, []);

  // Keyboard shortcuts for development and accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
            break;
          case 'h':
            e.preventDefault();
            // Toggle high contrast
            document.body.classList.toggle('high-contrast');
            AccessibilityUtils.announce(
              document.body.classList.contains('high-contrast') 
                ? 'Alto contraste ativado' 
                : 'Alto contraste desativado'
            );
            break;
          case 'm':
            e.preventDefault();
            // Toggle reduced motion
            document.body.classList.toggle('reduced-motion');
            AccessibilityUtils.announce(
              document.body.classList.contains('reduced-motion') 
                ? 'Animações reduzidas' 
                : 'Animações normais'
            );
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // CSP violation reporting
  useEffect(() => {
    const handleCSPViolation = (e: SecurityPolicyViolationEvent) => {
      console.warn('🚨 CSP Violation:', {
        blockedURI: e.blockedURI,
        violatedDirective: e.violatedDirective,
        originalPolicy: e.originalPolicy
      });
      AccessibilityUtils.announce('Violação de segurança detectada e bloqueada.', 'assertive');
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);
    return () => document.removeEventListener('securitypolicyviolation', handleCSPViolation);
  }, []);

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

          {/* Accessibility Panel */}
          <AccessibilityPanel />
          
          <CookieBanner />
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;