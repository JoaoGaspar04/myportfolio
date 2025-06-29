import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatBot from './components/chatbot/ChatBot';
import CookieBanner from './components/ui/CookieBanner';
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
import './styles/App.css';
import './styles/ErrorBoundary.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Simulating loading time with performance monitoring
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Monitor memory usage in development
      if (process.env.NODE_ENV === 'development') {
        PerformanceUtils.monitorMemory();
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Performance optimization: debounce chat toggle
  const debouncedToggleChat = PerformanceUtils.debounce(() => {
    setChatOpen(prev => !prev);
  }, 100);

  // Security headers (would be better implemented on server)
  useEffect(() => {
    // Add security meta tags if not present
    const addMetaTag = (name: string, content: string) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    addMetaTag('referrer', 'strict-origin-when-cross-origin');
    addMetaTag('robots', 'index, follow');
    
    // Add CSP meta tag (basic implementation)
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const csp = document.createElement('meta');
      csp.httpEquiv = 'Content-Security-Policy';
      csp.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.emailjs.com;";
      document.head.appendChild(csp);
    }
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
          
          <main className="main-content" role="main">
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