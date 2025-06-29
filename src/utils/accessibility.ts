// Utilitários de acessibilidade avançados
export class AccessibilityUtils {
  // Gerenciamento de foco avançado
  static trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details, summary'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

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

      // Escape key para fechar modais
      if (e.key === 'Escape') {
        const closeButton = element.querySelector('[aria-label*="fechar"], [aria-label*="close"]') as HTMLElement;
        closeButton?.click();
      }
    };

    // Salvar foco anterior
    const previouslyFocused = document.activeElement as HTMLElement;

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
      // Restaurar foco anterior
      previouslyFocused?.focus();
    };
  }

  // Anúncios para screen readers melhorados
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
      
      // Remover após um tempo para não poluir o DOM
      setTimeout(() => {
        if (document.body.contains(announcer)) {
          document.body.removeChild(announcer);
        }
      }, 1000);
    }, delay);
  }

  // Verificação de preferências de movimento
  static prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Verificação de preferência de contraste
  static prefersHighContrast(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  // Verificação de tema preferido
  static prefersDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Verificação de contraste de cores
  static checkContrast(foreground: string, background: string): {
    ratio: number;
    level: 'AAA' | 'AA' | 'A' | 'FAIL';
    isAccessible: boolean;
  } {
    const getLuminance = (color: string): number => {
      // Converter hex para RGB se necessário
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

  // Navegação por teclado melhorada
  static enhanceKeyboardNavigation(container: HTMLElement): () => void {
    const handleKeyDown = (e: KeyboardEvent) => {
      const focusableElements = container.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
      ) as NodeListOf<HTMLElement>;

      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % focusableElements.length;
          focusableElements[nextIndex]?.focus();
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
          focusableElements[prevIndex]?.focus();
          break;

        case 'Home':
          e.preventDefault();
          focusableElements[0]?.focus();
          break;

        case 'End':
          e.preventDefault();
          focusableElements[focusableElements.length - 1]?.focus();
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }

  // Geração automática de IDs únicos para acessibilidade
  static generateUniqueId(prefix: string = 'a11y'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Verificação de estrutura de headings
  static validateHeadingStructure(): void {
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
      
      previousLevel = level;
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas de estrutura de headings:', issues);
    } else {
      console.log('✅ Estrutura de headings está correta');
    }
  }

  // Verificação de alt text em imagens
  static validateImageAltText(): void {
    const images = document.querySelectorAll('img');
    const issues: string[] = [];

    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        issues.push(`Imagem ${index + 1} sem alt text`);
      }
      
      if (img.alt && img.alt.length > 125) {
        issues.push(`Alt text muito longo na imagem ${index + 1} (${img.alt.length} caracteres)`);
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas com alt text:', issues);
    } else {
      console.log('✅ Alt text das imagens está correto');
    }
  }

  // Verificação de labels em formulários
  static validateFormLabels(): void {
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
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas com labels de formulário:', issues);
    } else {
      console.log('✅ Labels de formulário estão corretos');
    }
  }

  // Auditoria completa de acessibilidade
  static auditAccessibility(): void {
    console.group('🔍 Auditoria de Acessibilidade');
    this.validateHeadingStructure();
    this.validateImageAltText();
    this.validateFormLabels();
    console.groupEnd();
  }

  // Skip links para navegação rápida
  static createSkipLinks(): void {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
      <a href="#navigation" class="skip-link">Pular para navegação</a>
      <a href="#footer" class="skip-link">Pular para rodapé</a>
    `;

    // Adicionar estilos para skip links
    const style = document.createElement('style');
    style.textContent = `
      .skip-links {
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 10000;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        z-index: 10001;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;

    document.head.appendChild(style);
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  // Modo de alto contraste
  static toggleHighContrast(): void {
    const body = document.body;
    const isHighContrast = body.classList.contains('high-contrast');

    if (isHighContrast) {
      body.classList.remove('high-contrast');
      localStorage.setItem('high-contrast', 'false');
    } else {
      body.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
    }

    this.announce(
      isHighContrast ? 'Modo de alto contraste desativado' : 'Modo de alto contraste ativado'
    );
  }

  // Inicialização de recursos de acessibilidade
  static initialize(): void {
    // Aplicar preferências salvas
    const highContrast = localStorage.getItem('high-contrast') === 'true';
    if (highContrast) {
      document.body.classList.add('high-contrast');
    }

    // Criar skip links
    this.createSkipLinks();

    // Adicionar estilos de alto contraste
    const style = document.createElement('style');
    style.textContent = `
      .high-contrast {
        filter: contrast(150%) brightness(120%);
      }
      
      .high-contrast * {
        border-color: #000 !important;
        outline: 2px solid #000 !important;
      }
      
      .high-contrast a {
        text-decoration: underline !important;
        font-weight: bold !important;
      }
    `;
    document.head.appendChild(style);

    // Auditoria inicial (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => this.auditAccessibility(), 2000);
    }
  }
}