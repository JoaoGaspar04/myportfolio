import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
];

const translations = {
  pt: {
    selectLanguage: 'Selecionar Idioma',
    currentLanguage: 'Idioma Atual',
    changeLanguage: 'Alterar Idioma'
  },
  en: {
    selectLanguage: 'Select Language',
    currentLanguage: 'Current Language',
    changeLanguage: 'Change Language'
  },
  es: {
    selectLanguage: 'Seleccionar Idioma',
    currentLanguage: 'Idioma Actual',
    changeLanguage: 'Cambiar Idioma'
  },
  fr: {
    selectLanguage: 'Sélectionner la Langue',
    currentLanguage: 'Langue Actuelle',
    changeLanguage: 'Changer de Langue'
  },
  de: {
    selectLanguage: 'Sprache Auswählen',
    currentLanguage: 'Aktuelle Sprache',
    changeLanguage: 'Sprache Ändern'
  },
  it: {
    selectLanguage: 'Seleziona Lingua',
    currentLanguage: 'Lingua Corrente',
    changeLanguage: 'Cambia Lingua'
  },
  zh: {
    selectLanguage: '选择语言',
    currentLanguage: '当前语言',
    changeLanguage: '更改语言'
  },
  ja: {
    selectLanguage: '言語を選択',
    currentLanguage: '現在の言語',
    changeLanguage: '言語を変更'
  },
  ar: {
    selectLanguage: 'اختر اللغة',
    currentLanguage: 'اللغة الحالية',
    changeLanguage: 'تغيير اللغة'
  },
  hi: {
    selectLanguage: 'भाषा चुनें',
    currentLanguage: 'वर्तमान भाषा',
    changeLanguage: 'भाषा बदलें'
  }
};

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const detectedLang = languages.find(lang => lang.code === browserLang) || languages[0];
    
    // Load saved language or use detected
    const savedLang = localStorage.getItem('selected-language');
    const selectedLang = savedLang 
      ? languages.find(lang => lang.code === savedLang) || detectedLang
      : detectedLang;
    
    setCurrentLanguage(selectedLang);
    applyLanguage(selectedLang);
  }, []);

  const applyLanguage = (language: Language) => {
    // Set HTML lang attribute
    document.documentElement.lang = language.code;
    
    // Set direction for RTL languages
    if (language.code === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }

    // Save to localStorage
    localStorage.setItem('selected-language', language.code);

    // Announce change
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Language changed to ${language.nativeName}`
      );
      utterance.lang = language.code === 'pt' ? 'pt-BR' : 
                      language.code === 'en' ? 'en-US' :
                      language.code === 'es' ? 'es-ES' :
                      language.code === 'fr' ? 'fr-FR' :
                      language.code === 'de' ? 'de-DE' :
                      language.code === 'it' ? 'it-IT' :
                      language.code === 'zh' ? 'zh-CN' :
                      language.code === 'ja' ? 'ja-JP' :
                      language.code === 'ar' ? 'ar-SA' :
                      language.code === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    applyLanguage(language);
    setIsOpen(false);
  };

  const t = translations[currentLanguage.code as keyof typeof translations] || translations.en;

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        className="language-selector"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          color: 'var(--color-text)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
        aria-label={t.selectLanguage}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Languages size={16} />
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown 
          size={14} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999
              }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="language-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '280px',
                maxHeight: '400px',
                overflowY: 'auto',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                backdropFilter: 'blur(10px)'
              }}
              role="listbox"
              aria-label={t.selectLanguage}
            >
              <div style={{ 
                padding: '12px 16px', 
                borderBottom: '1px solid var(--color-border)',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-text)'
              }}>
                {t.selectLanguage}
              </div>

              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  whileHover={{ backgroundColor: 'var(--color-background-secondary)' }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    backgroundColor: currentLanguage.code === language.code 
                      ? 'var(--color-primary)' 
                      : 'transparent',
                    color: currentLanguage.code === language.code 
                      ? 'var(--color-background)' 
                      : 'var(--color-text)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  role="option"
                  aria-selected={currentLanguage.code === language.code}
                >
                  <span style={{ fontSize: '18px' }}>{language.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{language.nativeName}</div>
                    <div style={{ 
                      fontSize: '12px', 
                      opacity: 0.7,
                      color: currentLanguage.code === language.code 
                        ? 'rgba(255, 255, 255, 0.8)' 
                        : 'var(--color-text-secondary)'
                    }}>
                      {language.name}
                    </div>
                  </div>
                  {currentLanguage.code === language.code && (
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: 'currentColor' 
                    }} />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;