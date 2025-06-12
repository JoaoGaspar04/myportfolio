import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X, Check } from 'lucide-react';
import '../../styles/CookieBanner.css';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const bannerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { 
      y: 100, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const settingsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="cookie-banner"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="cookie-content">
              <div className="cookie-icon">
                <Cookie size={24} />
              </div>
              <div className="cookie-text">
                <h3>We use cookies</h3>
                <p>
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="cookie-actions">
                <button 
                  className="btn-cookie secondary"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings size={16} />
                  Customize
                </button>
                <button 
                  className="btn-cookie secondary"
                  onClick={handleRejectAll}
                >
                  Reject All
                </button>
                <button 
                  className="btn-cookie primary"
                  onClick={handleAcceptAll}
                >
                  <Check size={16} />
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              className="cookie-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              className="cookie-settings"
              variants={settingsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="settings-header">
                <h3>Cookie Preferences</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowSettings(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="settings-content">
                <p className="settings-description">
                  Choose which cookies you want to accept. You can change these settings at any time.
                </p>

                <div className="cookie-category">
                  <div className="category-header">
                    <div className="category-info">
                      <h4>Essential Cookies</h4>
                      <p>Required for basic website functionality</p>
                    </div>
                    <div className="toggle-switch disabled">
                      <input 
                        type="checkbox" 
                        checked={preferences.essential}
                        disabled
                        readOnly
                      />
                      <span className="slider"></span>
                    </div>
                  </div>
                </div>

                <div className="cookie-category">
                  <div className="category-header">
                    <div className="category-info">
                      <h4>Analytics Cookies</h4>
                      <p>Help us understand how visitors interact with our website</p>
                    </div>
                    <div className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                      />
                      <span className="slider"></span>
                    </div>
                  </div>
                </div>

                <div className="cookie-category">
                  <div className="category-header">
                    <div className="category-info">
                      <h4>Marketing Cookies</h4>
                      <p>Used to track visitors and display relevant ads</p>
                    </div>
                    <div className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                      />
                      <span className="slider"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  className="btn-cookie secondary"
                  onClick={handleRejectAll}
                >
                  Reject All
                </button>
                <button 
                  className="btn-cookie primary"
                  onClick={handleAcceptSelected}
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieBanner;