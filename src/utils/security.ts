// Utilitários de segurança
export class SecurityUtils {
  // Sanitização de entrada de dados
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove caracteres HTML perigosos
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
      .slice(0, 1000); // Limita tamanho
  }

  // Validação de email mais robusta
  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  // Rate limiting simples
  static rateLimiter = new Map<string, { count: number; lastReset: number }>();

  static checkRateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userLimit = this.rateLimiter.get(identifier);

    if (!userLimit || now - userLimit.lastReset > windowMs) {
      this.rateLimiter.set(identifier, { count: 1, lastReset: now });
      return true;
    }

    if (userLimit.count >= maxRequests) {
      return false;
    }

    userLimit.count++;
    return true;
  }

  // Geração de CSP nonce
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validação de URL
  static isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:', 'mailto:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }

  // Escape HTML
  static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}