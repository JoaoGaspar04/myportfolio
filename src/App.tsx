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
import './styles/ErrorBoundary.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high' | 'maximum'>('maximum');

  useEffect(() => {
    // Initialize security and accessibility features
    const initializeApp = async () => {
      try {
        // Initialize accessibility features
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
        }, 2000);

      } catch (error) {
        console.error('❌ App initialization error:', error);
        setLoading(false);
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
        const hassuspicious = suspiciousPatterns.some(pattern => 
          currentUrl.toLowerCase().includes(pattern)
        );

        if (hassuspicious) {
          console.warn('🚨 Suspicious activity detected in URL');
          // In production, you might want to redirect or block
        }
      };

      checkForSuspiciousActivity();
      
      // Monitor for XSS attempts
      const originalAlert = window.alert;
      window.alert = function(message) {
        console.warn('🚨 Alert intercepted (potential XSS):', message);
        return originalAlert.call(window, message);
      };
    };

    monitorSecurity();
  }, []);

  // Keyboard shortcuts for development
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only in development
      if (process.env.NODE_ENV !== 'development') return;

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
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);
    return () => document.removeEventListener('securitypolicyviolation', handleCSPViolation);
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
          <Navbar />
          
          {/* Security indicator */}
          <div style={{ position: 'fixed', top: '80px', left: '20px', zIndex: 1000 }}>
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

          {/* Performance monitor (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <PerformanceMonitor visible={showPerformanceMonitor} />
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
          
          <CookieBanner />
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;