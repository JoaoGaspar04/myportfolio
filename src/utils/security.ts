// Utilitários de segurança avançados
export class SecurityUtils {
  // Sanitização de entrada de dados mais robusta
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/[<>]/g, '') // Remove caracteres HTML perigosos
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/data:/gi, '') // Remove data: URLs
      .replace(/vbscript:/gi, '') // Remove vbscript: URLs
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/[\x00-\x1F\x7F]/g, '') // Remove caracteres de controle
      .replace(/\s+/g, ' ') // Normaliza espaços
      .trim()
      .slice(0, 1000); // Limita tamanho
  }

  // Validação de email mais robusta com verificação de domínio
  static validateEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Verificações básicas
    if (!emailRegex.test(email) || email.length > 254 || email.length < 5) {
      return false;
    }

    // Verificar domínios suspeitos
    const suspiciousDomains = ['tempmail', '10minutemail', 'guerrillamail', 'mailinator'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    return !suspiciousDomains.some(suspicious => domain?.includes(suspicious));
  }

  // Rate limiting avançado com diferentes níveis
  private static rateLimiter = new Map<string, { count: number; lastReset: number; blocked: boolean }>();

  static checkRateLimit(
    identifier: string, 
    maxRequests: number = 5, 
    windowMs: number = 60000,
    blockDuration: number = 300000 // 5 minutos de bloqueio
  ): boolean {
    const now = Date.now();
    const userLimit = this.rateLimiter.get(identifier);

    // Se está bloqueado, verificar se o tempo de bloqueio passou
    if (userLimit?.blocked && now - userLimit.lastReset < blockDuration) {
      return false;
    }

    // Reset se a janela de tempo passou ou se saiu do bloqueio
    if (!userLimit || now - userLimit.lastReset > windowMs) {
      this.rateLimiter.set(identifier, { count: 1, lastReset: now, blocked: false });
      return true;
    }

    // Se excedeu o limite, bloquear
    if (userLimit.count >= maxRequests) {
      userLimit.blocked = true;
      userLimit.lastReset = now;
      return false;
    }

    userLimit.count++;
    return true;
  }

  // Geração de CSP nonce mais seguro
  static generateNonce(): string {
    const array = new Uint8Array(32); // Aumentado para 32 bytes
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validação de URL mais rigorosa
  static isValidUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    try {
      const urlObj = new URL(url);
      
      // Apenas protocolos seguros
      if (!['http:', 'https:', 'mailto:'].includes(urlObj.protocol)) {
        return false;
      }

      // Verificar domínios maliciosos conhecidos
      const maliciousDomains = ['bit.ly', 'tinyurl.com', 'goo.gl'];
      const hostname = urlObj.hostname.toLowerCase();
      
      if (maliciousDomains.some(domain => hostname.includes(domain))) {
        return false;
      }

      // Verificar IPs privados para evitar SSRF
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (ipRegex.test(hostname)) {
        const parts = hostname.split('.').map(Number);
        // Verificar ranges privados: 10.x.x.x, 172.16-31.x.x, 192.168.x.x, 127.x.x.x
        if (
          parts[0] === 10 ||
          parts[0] === 127 ||
          (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
          (parts[0] === 192 && parts[1] === 168)
        ) {
          return false;
        }
      }

      return true;
    } catch {
      return false;
    }
  }

  // Escape HTML mais robusto
  static escapeHtml(text: string): string {
    if (!text || typeof text !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Validação de telefone internacional
  static validatePhone(phone: string): boolean {
    if (!phone || typeof phone !== 'string') return false;
    
    // Remove espaços e caracteres especiais
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Verifica formato internacional básico
    const phoneRegex = /^[\+]?[1-9]\d{1,14}$/;
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 7 && cleanPhone.length <= 15;
  }

  // Detecção de conteúdo malicioso
  static detectMaliciousContent(content: string): boolean {
    if (!content || typeof content !== 'string') return false;
    
    const maliciousPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /data:text\/html/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi,
      /<link[^>]*>/gi,
      /<meta[^>]*>/gi
    ];

    return maliciousPatterns.some(pattern => pattern.test(content));
  }

  // Hash seguro para senhas (se necessário no futuro)
  static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Verificação de força de senha
  static checkPasswordStrength(password: string): {
    score: number;
    feedback: string[];
    isStrong: boolean;
  } {
    if (!password) return { score: 0, feedback: ['Senha é obrigatória'], isStrong: false };

    let score = 0;
    const feedback: string[] = [];

    // Comprimento
    if (password.length >= 8) score += 1;
    else feedback.push('Mínimo 8 caracteres');

    if (password.length >= 12) score += 1;

    // Complexidade
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Adicione letras minúsculas');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Adicione letras maiúsculas');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Adicione números');

    if (/[^a-zA-Z\d]/.test(password)) score += 1;
    else feedback.push('Adicione símbolos especiais');

    // Padrões comuns
    const commonPatterns = ['123456', 'password', 'qwerty', 'abc123'];
    if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
      score -= 2;
      feedback.push('Evite padrões comuns');
    }

    return {
      score: Math.max(0, score),
      feedback,
      isStrong: score >= 5 && feedback.length === 0
    };
  }

  // Limpeza de dados para logs (remove informações sensíveis)
  static sanitizeForLogging(data: any): any {
    if (typeof data !== 'object' || data === null) return data;

    const sensitiveFields = ['password', 'token', 'key', 'secret', 'auth', 'credential'];
    const sanitized = { ...data };

    Object.keys(sanitized).forEach(key => {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitizeForLogging(sanitized[key]);
      }
    });

    return sanitized;
  }
}