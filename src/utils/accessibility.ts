// Utilitários de acessibilidade universal
export class AccessibilityUtils {
  private static keyboardUserDetected = false;
  private static touchUserDetected = false;

  // Inicialização completa de acessibilidade
  static initialize(): void {
    this.setupKeyboardDetection();
    this.setupTouchDetection();
    this.setupColorBlindnessFilters();
    this.setupSkipLinks();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.loadSavedPreferences();
    this.setupEmergencyAccessibility();
    
    // Auditoria inicial apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => this.auditAccessibility(), 2000);
    }
  }

  // Detecção de usuário de teclado
  private static setupKeyboardDetection(): void {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        this.keyboardUserDetected = true;
        document.body.classList.add('keyboard-user');
        document.removeEventListener('keydown', handleKeyDown);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  }

  // Detecção de usuário touch
  private static setupTouchDetection(): void {
    const handleTouch = () => {
      this.touchUserDetected = true;
      document.body.classList.add('touch-user');
      document.removeEventListener('touchstart', handleTouch);
    };

    document.addEventListener('touchstart', handleTouch);
  }

  // Configurar filtros para daltonismo
  private static setupColorBlindnessFilters(): void {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'color-filters');
    svg.innerHTML = `
      <defs>
        <filter id="protanopia-filter">
          <feColorMatrix type="matrix" values="0.567 0.433 0 0 0
                                               0.558 0.442 0 0 0
                                               0 0.242 0.758 0 0
                                               0 0 0 1 0"/>
        </filter>
        <filter id="deuteranopia-filter">
          <feColorMatrix type="matrix" values="0.625 0.375 0 0 0
                                               0.7 0.3 0 0 0
                                               0 0.3 0.7 0 0
                                               0 0 0 1 0"/>
        </filter>
        <filter id="tritanopia-filter">
          <feColorMatrix type="matrix" values="0.95 0.05 0 0 0
                                               0 0.433 0.567 0 0
                                               0 0.475 0.525 0 0
                                               0 0 0 1 0"/>
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);
  }

  // Configurar skip links
  private static setupSkipLinks(): void {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
      <a href="#navigation" class="skip-link">Pular para navegação</a>
      <a href="#footer" class="skip-link">Pular para rodapé</a>
    `;
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  // Gerenciamento de foco avançado
  private static setupFocusManagement(): void {
    // Trap focus em modais
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
        if (modal) {
          const closeButton = modal.querySelector('[aria-label*="fechar"], [aria-label*="close"]') as HTMLElement;
          closeButton?.click();
        }
      }
    });

    // Melhorar indicadores de foco
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      if (target && this.keyboardUserDetected) {
        target.classList.add('keyboard-focused');
      }
    });

    document.addEventListener('focusout', (e) => {
      const target = e.target as HTMLElement;
      if (target) {
        target.classList.remove('keyboard-focused');
      }
    });
  }

  // Suporte a leitores de tela
  private static setupScreenReaderSupport(): void {
    // Anunciar mudanças de página
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedNode = mutation.addedNodes[0] as HTMLElement;
          if (addedNode.tagName === 'MAIN' || addedNode.querySelector?.('main')) {
            this.announce('Nova página carregada', 'polite');
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Anunciar erros de formulário
    document.addEventListener('invalid', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.validationMessage) {
        this.announce(`Erro no campo ${target.name || target.id}: ${target.validationMessage}`, 'assertive');
      }
    });
  }

  // Carregar preferências salvas
  private static loadSavedPreferences(): void {
    const preferences = localStorage.getItem('accessibility-settings');
    if (preferences) {
      try {
        const settings = JSON.parse(preferences);
        this.applySettings(settings);
      } catch (error) {
        console.warn('Erro ao carregar preferências de acessibilidade:', error);
      }
    }

    // Aplicar preferências do sistema
    this.applySystemPreferences();
  }

  // Aplicar preferências do sistema
  private static applySystemPreferences(): void {
    // Movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }

    // Alto contraste
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }

    // Tema escuro
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
    }

    // Monitorar mudanças
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      document.body.classList.toggle('reduced-motion', e.matches);
    });

    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      document.body.classList.toggle('high-contrast', e.matches);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.matches);
    });
  }

  // Aplicar configurações
  private static applySettings(settings: any): void {
    const body = document.body;
    const root = document.documentElement;

    // Tamanho da fonte
    if (settings.fontSize) {
      root.style.setProperty('--base-font-size', `${settings.fontSize}px`);
    }

    // Contraste
    body.classList.remove('high-contrast', 'higher-contrast');
    if (settings.contrast === 'high') {
      body.classList.add('high-contrast');
    } else if (settings.contrast === 'higher') {
      body.classList.add('higher-contrast');
    }

    // Daltonismo
    body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (settings.colorBlindness && settings.colorBlindness !== 'none') {
      body.classList.add(settings.colorBlindness);
    }

    // Outras configurações
    body.classList.toggle('reduced-motion', settings.reducedMotion);
    body.classList.toggle('simplified-ui', settings.simplifiedUI);
    body.classList.toggle('large-buttons', settings.largeButtons);
    body.classList.toggle('dyslexia-font', settings.dyslexiaFont);
    body.classList.toggle('enhanced-focus', settings.focusIndicator);
  }

  // Acessibilidade de emergência (Ctrl+Alt+A)
  private static setupEmergencyAccessibility(): void {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        e.preventDefault();
        this.enableEmergencyMode();
      }
    });
  }

  // Modo de emergência para máxima acessibilidade
  static enableEmergencyMode(): void {
    const body = document.body;
    
    // Aplicar todas as melhorias de acessibilidade
    body.classList.add(
      'high-contrast',
      'large-buttons',
      'enhanced-focus',
      'simplified-ui',
      'reduced-motion'
    );

    // Aumentar fonte
    document.documentElement.style.setProperty('--base-font-size', '20px');

    // Anunciar ativação
    this.announce('Modo de emergência de acessibilidade ativado. Todas as melhorias foram aplicadas.', 'assertive');

    // Salvar estado
    localStorage.setItem('emergency-accessibility', 'true');
  }

  // Gerenciamento de foco em modais
  static trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details, summary'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const previouslyFocused = document.activeElement as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }

      if (e.key === 'Escape') {
        const closeButton = element.querySelector('[aria-label*="fechar"], [aria-label*="close"]') as HTMLElement;
        closeButton?.click();
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
      previouslyFocused?.focus();
    };
  }

  // Anúncios para leitores de tela
  static announce(
    message: string, 
    priority: 'polite' | 'assertive' = 'polite',
    delay: number = 100
  ): void {
    setTimeout(() => {
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = message;

      document.body.appendChild(announcer);
      
      setTimeout(() => {
        if (document.body.contains(announcer)) {
          document.body.removeChild(announcer);
        }
      }, 1000);
    }, delay);
  }

  // Verificação de contraste
  static checkContrast(foreground: string, background: string): {
    ratio: number;
    level: 'AAA' | 'AA' | 'A' | 'FAIL';
    isAccessible: boolean;
  } {
    const getLuminance = (color: string): number => {
      let rgb: number[];
      
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        rgb = [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16)
        ];
      } else {
        const match = color.match(/\d+/g);
        rgb = match ? match.map(Number) : [0, 0, 0];
      }

      const [r, g, b] = rgb.map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    let level: 'AAA' | 'AA' | 'A' | 'FAIL';
    if (ratio >= 7) level = 'AAA';
    else if (ratio >= 4.5) level = 'AA';
    else if (ratio >= 3) level = 'A';
    else level = 'FAIL';

    return {
      ratio: Math.round(ratio * 100) / 100,
      level,
      isAccessible: ratio >= 4.5
    };
  }

  // Auditoria completa de acessibilidade
  static auditAccessibility(): void {
    console.group('🔍 Auditoria de Acessibilidade Universal');
    
    this.validateHeadingStructure();
    this.validateImageAltText();
    this.validateFormLabels();
    this.validateColorContrast();
    this.validateKeyboardNavigation();
    this.validateScreenReaderSupport();
    this.validateResponsiveDesign();
    
    console.groupEnd();
  }

  // Validação de estrutura de headings
  private static validateHeadingStructure(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const issues: string[] = [];
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        issues.push('Página deve começar com h1');
      }
      
      if (level > previousLevel + 1) {
        issues.push(`Heading h${level} pula níveis (anterior: h${previousLevel})`);
      }
      
      if (!heading.textContent?.trim()) {
        issues.push(`Heading h${level} está vazio`);
      }
      
      previousLevel = level;
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas de estrutura de headings:', issues);
    } else {
      console.log('✅ Estrutura de headings está correta');
    }
  }

  // Validação de alt text
  private static validateImageAltText(): void {
    const images = document.querySelectorAll('img');
    const issues: string[] = [];

    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        issues.push(`Imagem ${index + 1} sem alt text`);
      }
      
      if (img.alt && img.alt.length > 125) {
        issues.push(`Alt text muito longo na imagem ${index + 1} (${img.alt.length} caracteres)`);
      }

      if (img.alt && (img.alt.toLowerCase().includes('image') || img.alt.toLowerCase().includes('picture'))) {
        issues.push(`Alt text redundante na imagem ${index + 1}`);
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas com alt text:', issues);
    } else {
      console.log('✅ Alt text das imagens está correto');
    }
  }

  // Validação de labels
  private static validateFormLabels(): void {
    const inputs = document.querySelectorAll('input, select, textarea');
    const issues: string[] = [];

    inputs.forEach((input, index) => {
      const id = input.id;
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;

      if (!label && !ariaLabel && !ariaLabelledBy) {
        issues.push(`Campo ${index + 1} (${input.tagName.toLowerCase()}) sem label`);
      }

      if (input.hasAttribute('required') && !input.getAttribute('aria-required')) {
        issues.push(`Campo obrigatório ${index + 1} sem aria-required`);
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas com labels de formulário:', issues);
    } else {
      console.log('✅ Labels de formulário estão corretos');
    }
  }

  // Validação de contraste
  private static validateColorContrast(): void {
    const elements = document.querySelectorAll('*');
    const issues: string[] = [];

    elements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const contrast = this.checkContrast(color, backgroundColor);
        if (!contrast.isAccessible) {
          issues.push(`Contraste insuficiente: ${contrast.ratio}:1 (mínimo 4.5:1)`);
        }
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas de contraste:', issues.slice(0, 5)); // Limitar para não poluir
    } else {
      console.log('✅ Contraste de cores está adequado');
    }
  }

  // Validação de navegação por teclado
  private static validateKeyboardNavigation(): void {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const issues: string[] = [];

    focusableElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) > 0) {
        issues.push(`Elemento ${index + 1} usa tabindex positivo (${tabIndex})`);
      }

      if (element.tagName === 'A' && !element.getAttribute('href')) {
        issues.push(`Link ${index + 1} sem href`);
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas de navegação por teclado:', issues);
    } else {
      console.log('✅ Navegação por teclado está correta');
    }
  }

  // Validação de suporte a leitores de tela
  private static validateScreenReaderSupport(): void {
    const issues: string[] = [];

    // Verificar landmarks
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    if (!main) issues.push('Falta elemento <main>');
    if (!nav) issues.push('Falta elemento <nav>');
    if (!footer) issues.push('Falta elemento <footer>');

    // Verificar aria-labels em elementos interativos
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
        issues.push(`Botão ${index + 1} sem texto ou aria-label`);
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas de suporte a leitores de tela:', issues);
    } else {
      console.log('✅ Suporte a leitores de tela está adequado');
    }
  }

  // Validação de design responsivo
  private static validateResponsiveDesign(): void {
    const issues: string[] = [];
    const viewport = document.querySelector('meta[name="viewport"]');

    if (!viewport) {
      issues.push('Falta meta tag viewport');
    }

    // Verificar se há overflow horizontal
    if (document.body.scrollWidth > window.innerWidth) {
      issues.push('Overflow horizontal detectado');
    }

    // Verificar tamanhos mínimos de toque
    const touchTargets = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
    touchTargets.forEach((target, index) => {
      const rect = target.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        issues.push(`Alvo de toque ${index + 1} muito pequeno (${Math.round(rect.width)}x${Math.round(rect.height)}px)`);
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas de design responsivo:', issues);
    } else {
      console.log('✅ Design responsivo está adequado');
    }
  }

  // Verificar se usuário prefere movimento reduzido
  static prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Verificar se usuário prefere alto contraste
  static prefersHighContrast(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  // Verificar se usuário prefere tema escuro
  static prefersDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}