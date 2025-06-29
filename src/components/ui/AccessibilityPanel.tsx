import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  Type, 
  Volume2, 
  VolumeX, 
  Palette, 
  MousePointer, 
  Keyboard,
  Languages,
  Zap,
  Sun,
  Moon,
  Minus,
  Plus,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';
import { AccessibilityUtils } from '../../utils/accessibility';

interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'higher';
  colorBlindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicator: boolean;
  language: 'pt' | 'en' | 'es' | 'fr';
  voiceSpeed: number;
  autoRead: boolean;
  simplifiedUI: boolean;
  largeButtons: boolean;
  dyslexiaFont: boolean;
}

const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    contrast: 'normal',
    colorBlindness: 'none',
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicator: true,
    language: 'pt',
    voiceSpeed: 1,
    autoRead: false,
    simplifiedUI: false,
    largeButtons: false,
    dyslexiaFont: false
  });

  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    const body = document.body;

    // Font size
    root.style.setProperty('--base-font-size', `${newSettings.fontSize}px`);
    
    // Contrast
    body.classList.remove('high-contrast', 'higher-contrast');
    if (newSettings.contrast === 'high') {
      body.classList.add('high-contrast');
    } else if (newSettings.contrast === 'higher') {
      body.classList.add('higher-contrast');
    }

    // Color blindness filters
    body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (newSettings.colorBlindness !== 'none') {
      body.classList.add(newSettings.colorBlindness);
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }

    // Simplified UI
    if (newSettings.simplifiedUI) {
      body.classList.add('simplified-ui');
    } else {
      body.classList.remove('simplified-ui');
    }

    // Large buttons
    if (newSettings.largeButtons) {
      body.classList.add('large-buttons');
    } else {
      body.classList.remove('large-buttons');
    }

    // Dyslexia font
    if (newSettings.dyslexiaFont) {
      body.classList.add('dyslexia-font');
    } else {
      body.classList.remove('dyslexia-font');
    }

    // Focus indicator
    if (newSettings.focusIndicator) {
      body.classList.add('enhanced-focus');
    } else {
      body.classList.remove('enhanced-focus');
    }

    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);

    // Announce change
    AccessibilityUtils.announce(`${key} alterado para ${value}`);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 16,
      contrast: 'normal',
      colorBlindness: 'none',
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicator: true,
      language: 'pt',
      voiceSpeed: 1,
      autoRead: false,
      simplifiedUI: false,
      largeButtons: false,
      dyslexiaFont: false
    };
    
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    AccessibilityUtils.announce('Configurações de acessibilidade restauradas');
  };

  const readCurrentPage = () => {
    if (!speechSynthesis) return;

    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const content = document.querySelector('main')?.textContent || '';
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = settings.voiceSpeed;
    utterance.lang = settings.language === 'pt' ? 'pt-BR' : 'en-US';
    
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  return (
    <>
      {/* Floating accessibility button */}
      <motion.button
        className="accessibility-toggle"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)'
        }}
        aria-label="Abrir painel de acessibilidade"
      >
        <Settings size={24} />
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="accessibility-overlay"
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
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9998
              }}
            />
            
            <motion.div
              className="accessibility-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '400px',
                height: '100vh',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                zIndex: 9999,
                overflowY: 'auto',
                boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Header */}
              <div style={{ 
                padding: '20px', 
                borderBottom: '1px solid var(--color-border)',
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--color-background)',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ margin: 0, fontSize: '20px', color: 'var(--color-text)' }}>
                    Acessibilidade
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '4px'
                    }}
                    aria-label="Fechar painel"
                  >
                    ✕
                  </button>
                </div>
                <p style={{ 
                  margin: '8px 0 0', 
                  fontSize: '14px', 
                  color: 'var(--color-text-secondary)' 
                }}>
                  Personalize sua experiência de navegação
                </p>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                
                {/* Quick Actions */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--color-text)' }}>
                    Ações Rápidas
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={readCurrentPage}
                      style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        backgroundColor: isReading ? '#0066cc' : 'var(--color-card-bg)',
                        color: isReading ? 'white' : 'var(--color-text)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px'
                      }}
                    >
                      {isReading ? <Pause size={16} /> : <Play size={16} />}
                      {isReading ? 'Pausar' : 'Ler Página'}
                    </button>
                    
                    <button
                      onClick={resetSettings}
                      style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px'
                      }}
                    >
                      <RotateCcw size={16} />
                      Restaurar
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    marginBottom: '12px',
                    color: 'var(--color-text)',
                    fontWeight: '600'
                  }}>
                    <Type size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Tamanho da Fonte: {settings.fontSize}px
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => updateSetting('fontSize', Math.max(12, settings.fontSize - 2))}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      aria-label="Diminuir fonte"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <input
                      type="range"
                      min="12"
                      max="24"
                      step="2"
                      value={settings.fontSize}
                      onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                      style={{ flex: 1 }}
                      aria-label="Tamanho da fonte"
                    />
                    
                    <button
                      onClick={() => updateSetting('fontSize', Math.min(24, settings.fontSize + 2))}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      aria-label="Aumentar fonte"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Contrast */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    marginBottom: '12px',
                    color: 'var(--color-text)',
                    fontWeight: '600'
                  }}>
                    <Palette size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Contraste
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { value: 'normal', label: 'Normal' },
                      { value: 'high', label: 'Alto' },
                      { value: 'higher', label: 'Muito Alto' }
                    ].map((option) => (
                      <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="contrast"
                          value={option.value}
                          checked={settings.contrast === option.value}
                          onChange={(e) => updateSetting('contrast', e.target.value as any)}
                        />
                        <span style={{ color: 'var(--color-text)' }}>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Blindness */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    marginBottom: '12px',
                    color: 'var(--color-text)',
                    fontWeight: '600'
                  }}>
                    <Eye size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Daltonismo
                  </label>
                  <select
                    value={settings.colorBlindness}
                    onChange={(e) => updateSetting('colorBlindness', e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-text)',
                      fontSize: '14px'
                    }}
                  >
                    <option value="none">Nenhum</option>
                    <option value="protanopia">Protanopia (vermelho-verde)</option>
                    <option value="deuteranopia">Deuteranopia (verde-vermelho)</option>
                    <option value="tritanopia">Tritanopia (azul-amarelo)</option>
                  </select>
                </div>

                {/* Language */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    marginBottom: '12px',
                    color: 'var(--color-text)',
                    fontWeight: '600'
                  }}>
                    <Languages size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Idioma
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => updateSetting('language', lang.code as any)}
                        style={{
                          padding: '12px',
                          border: `2px solid ${settings.language === lang.code ? '#0066cc' : 'var(--color-border)'}`,
                          borderRadius: '8px',
                          backgroundColor: settings.language === lang.code ? 'rgba(0, 102, 204, 0.1)' : 'var(--color-card-bg)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px'
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voice Speed */}
                {speechSynthesis && (
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '16px', 
                      marginBottom: '12px',
                      color: 'var(--color-text)',
                      fontWeight: '600'
                    }}>
                      <Volume2 size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Velocidade da Voz: {settings.voiceSpeed}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={settings.voiceSpeed}
                      onChange={(e) => updateSetting('voiceSpeed', parseFloat(e.target.value))}
                      style={{ width: '100%' }}
                      aria-label="Velocidade da voz"
                    />
                  </div>
                )}

                {/* Toggle Options */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--color-text)' }}>
                    Opções de Interface
                  </h3>
                  
                  {[
                    { key: 'reducedMotion', label: 'Reduzir Animações', icon: Zap },
                    { key: 'simplifiedUI', label: 'Interface Simplificada', icon: Eye },
                    { key: 'largeButtons', label: 'Botões Grandes', icon: MousePointer },
                    { key: 'dyslexiaFont', label: 'Fonte para Dislexia', icon: Type },
                    { key: 'focusIndicator', label: 'Indicador de Foco', icon: Keyboard }
                  ].map(({ key, label, icon: Icon }) => (
                    <label 
                      key={key}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        padding: '12px',
                        marginBottom: '8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-card-bg)',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                      <span style={{ flex: 1, color: 'var(--color-text)' }}>{label}</span>
                      <input
                        type="checkbox"
                        checked={settings[key as keyof AccessibilitySettings] as boolean}
                        onChange={(e) => updateSetting(key as any, e.target.checked)}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </label>
                  ))}
                </div>

                {/* Help Text */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'rgba(0, 102, 204, 0.1)',
                  border: '1px solid rgba(0, 102, 204, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)'
                }}>
                  <strong style={{ color: 'var(--color-text)' }}>Dica:</strong> Use Tab para navegar, 
                  Enter para ativar botões, e Esc para fechar modais. 
                  Todas as configurações são salvas automaticamente.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel;