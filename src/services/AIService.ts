// Serviço de IA Avançada para Cibersegurança
export class AIService {
  private knowledgeBase: Map<string, any>;
  private conversationMemory: Map<string, any>;
  private securityPatterns: RegExp[];

  constructor() {
    this.knowledgeBase = new Map();
    this.conversationMemory = new Map();
    this.securityPatterns = [
      /malware|vírus|trojan|ransomware/gi,
      /phishing|spam|scam/gi,
      /firewall|ips|ids|waf/gi,
      /vulnerabilidade|exploit|cve/gi,
      /ddos|dos|ataque/gi,
      /criptografia|ssl|tls|https/gi,
      /backup|recovery|disaster/gi,
      /compliance|gdpr|iso|nist/gi,
      /penetration|pentest|ethical.hacking/gi,
      /incident|response|forensics/gi
    ];
    
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase(): void {
    // Base de conhecimento especializada em cibersegurança
    this.knowledgeBase.set('security-fundamentals', {
      topics: [
        'Princípios da Segurança da Informação (CIA Triad)',
        'Gestão de Riscos e Vulnerabilidades',
        'Controles de Segurança e Frameworks',
        'Políticas e Procedimentos de Segurança'
      ],
      responses: {
        'cia': 'A Tríade CIA (Confidencialidade, Integridade, Disponibilidade) é fundamental na cibersegurança. Confidencialidade protege informações contra acesso não autorizado, Integridade garante que dados não sejam alterados indevidamente, e Disponibilidade assegura que sistemas estejam acessíveis quando necessário.',
        'risk-management': 'Gestão de riscos envolve identificar, avaliar e mitigar ameaças. Processo: 1) Identificação de ativos, 2) Análise de vulnerabilidades, 3) Avaliação de ameaças, 4) Cálculo de riscos, 5) Implementação de controles, 6) Monitoramento contínuo.'
      }
    });

    this.knowledgeBase.set('threat-analysis', {
      categories: ['malware', 'social-engineering', 'network-attacks', 'insider-threats'],
      responses: {
        'malware': 'Malware inclui vírus, trojans, ransomware, spyware. Proteção: antivírus atualizado, firewalls, educação de usuários, backups regulares, princípio do menor privilégio.',
        'phishing': 'Phishing usa engenharia social para roubar credenciais. Sinais: URLs suspeitas, urgência artificial, erros ortográficos, solicitações de informações sensíveis. Prevenção: verificação de remetentes, autenticação multifator.',
        'ddos': 'Ataques DDoS sobrecarregam sistemas. Mitigação: CDN, rate limiting, análise de tráfego, planos de resposta a incidentes, serviços de proteção DDoS.'
      }
    });

    this.knowledgeBase.set('network-security', {
      technologies: ['firewalls', 'ids-ips', 'vpn', 'network-segmentation'],
      responses: {
        'firewall': 'Firewalls filtram tráfego baseado em regras. Tipos: packet filtering, stateful, application layer, next-generation. Configuração: deny-by-default, logging, regras específicas, atualizações regulares.',
        'vpn': 'VPNs criam túneis seguros sobre redes públicas. Protocolos: IPSec, OpenVPN, WireGuard. Implementação: autenticação forte, criptografia AES-256, kill switches, logs de auditoria.',
        'network-segmentation': 'Segmentação divide redes em zonas de segurança. Benefícios: contenção de ameaças, controle de acesso granular, monitoramento melhorado, compliance.'
      }
    });

    this.knowledgeBase.set('incident-response', {
      phases: ['preparation', 'identification', 'containment', 'eradication', 'recovery', 'lessons-learned'],
      responses: {
        'incident-plan': 'Plano de resposta a incidentes deve incluir: 1) Equipe de resposta definida, 2) Procedimentos de comunicação, 3) Ferramentas e recursos, 4) Critérios de escalação, 5) Documentação e relatórios.',
        'forensics': 'Análise forense digital preserva evidências. Processo: 1) Preservação da cena, 2) Aquisição de dados, 3) Análise de evidências, 4) Documentação, 5) Apresentação de resultados.'
      }
    });

    this.knowledgeBase.set('compliance', {
      frameworks: ['gdpr', 'iso27001', 'nist', 'pci-dss'],
      responses: {
        'gdpr': 'GDPR protege dados pessoais na UE. Princípios: consentimento, minimização de dados, direito ao esquecimento, notificação de violações em 72h, DPO obrigatório para algumas organizações.',
        'iso27001': 'ISO 27001 é padrão internacional para SGSI. Controles: gestão de ativos, controle de acesso, criptografia, segurança física, gestão de incidentes, continuidade de negócios.',
        'nist': 'NIST Framework tem 5 funções: Identificar, Proteger, Detectar, Responder, Recuperar. Implementação flexível baseada em riscos e maturidade organizacional.'
      }
    });
  }

  async analyzeSecurityQuery(query: string, context: string[]): Promise<{
    category: string;
    confidence: number;
    threatLevel: 'low' | 'medium' | 'high' | 'critical';
    keywords: string[];
    intent: string;
  }> {
    const normalizedQuery = query.toLowerCase();
    let category = 'general';
    let confidence = 50;
    let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    const keywords: string[] = [];
    let intent = 'information';

    // Análise de padrões de segurança
    for (const pattern of this.securityPatterns) {
      const matches = normalizedQuery.match(pattern);
      if (matches) {
        keywords.push(...matches);
        confidence += 15;
      }
    }

    // Categorização baseada em palavras-chave
    if (normalizedQuery.includes('malware') || normalizedQuery.includes('vírus') || normalizedQuery.includes('ransomware')) {
      category = 'threat-analysis';
      threatLevel = 'high';
      confidence += 20;
    } else if (normalizedQuery.includes('firewall') || normalizedQuery.includes('rede') || normalizedQuery.includes('vpn')) {
      category = 'network-security';
      confidence += 15;
    } else if (normalizedQuery.includes('incidente') || normalizedQuery.includes('resposta') || normalizedQuery.includes('forense')) {
      category = 'incident-response';
      threatLevel = 'medium';
      confidence += 18;
    } else if (normalizedQuery.includes('gdpr') || normalizedQuery.includes('compliance') || normalizedQuery.includes('iso')) {
      category = 'compliance';
      confidence += 12;
    } else if (normalizedQuery.includes('como') || normalizedQuery.includes('implementar') || normalizedQuery.includes('configurar')) {
      intent = 'implementation';
      confidence += 10;
    } else if (normalizedQuery.includes('problema') || normalizedQuery.includes('erro') || normalizedQuery.includes('ajuda')) {
      intent = 'troubleshooting';
      threatLevel = 'medium';
      confidence += 15;
    }

    // Análise de contexto da conversa
    if (context.length > 0) {
      const contextString = context.join(' ').toLowerCase();
      if (contextString.includes('urgente') || contextString.includes('crítico')) {
        threatLevel = 'critical';
        confidence += 10;
      }
    }

    // Detecção de urgência
    if (normalizedQuery.includes('urgente') || normalizedQuery.includes('crítico') || normalizedQuery.includes('emergência')) {
      threatLevel = 'critical';
      intent = 'emergency';
      confidence += 25;
    }

    return {
      category,
      confidence: Math.min(confidence, 100),
      threatLevel,
      keywords: [...new Set(keywords)], // Remove duplicatas
      intent
    };
  }

  async generateResponse(query: string, options: {
    mode: 'basic' | 'advanced' | 'expert';
    context: string[];
    userProfile?: any;
    analysis?: any;
  }): Promise<{
    text: string;
    confidence: number;
    category: string;
    suggestions: string[];
  }> {
    const { mode, context, analysis } = options;
    const normalizedQuery = query.toLowerCase();

    // Buscar resposta na base de conhecimento
    let bestMatch = this.findBestMatch(normalizedQuery, analysis?.category);
    
    if (!bestMatch) {
      bestMatch = this.generateContextualResponse(normalizedQuery, context, analysis);
    }

    // Ajustar resposta baseada no modo
    let response = this.adjustResponseForMode(bestMatch.text, mode, analysis);
    
    // Adicionar informações contextuais
    if (analysis?.threatLevel === 'critical') {
      response = `🚨 **ALERTA CRÍTICO** 🚨\n\n${response}\n\n⚠️ **Recomendo ação imediata!** Entre em contato via WhatsApp: +351 968196979 para suporte urgente.`;
    } else if (analysis?.threatLevel === 'high') {
      response = `⚠️ **ALTA PRIORIDADE**\n\n${response}\n\n📞 Para implementação rápida, contacte: support@joaocgaspar.pt`;
    }

    // Gerar sugestões relacionadas
    const suggestions = this.generateSuggestions(analysis?.category, analysis?.intent);

    return {
      text: response,
      confidence: bestMatch.confidence,
      category: analysis?.category || 'general',
      suggestions
    };
  }

  private findBestMatch(query: string, category?: string): { text: string; confidence: number } | null {
    if (!category) return null;

    const categoryData = this.knowledgeBase.get(category);
    if (!categoryData?.responses) return null;

    // Buscar correspondência exata primeiro
    for (const [key, response] of Object.entries(categoryData.responses)) {
      if (query.includes(key)) {
        return { text: response as string, confidence: 90 };
      }
    }

    // Buscar correspondência parcial
    const queryWords = query.split(' ');
    for (const [key, response] of Object.entries(categoryData.responses)) {
      const keyWords = key.split('-');
      const matchCount = keyWords.filter(word => 
        queryWords.some(qWord => qWord.includes(word) || word.includes(qWord))
      ).length;
      
      if (matchCount > 0) {
        const confidence = (matchCount / keyWords.length) * 80;
        return { text: response as string, confidence };
      }
    }

    return null;
  }

  private generateContextualResponse(query: string, context: string[], analysis?: any): { text: string; confidence: number } {
    // Respostas contextuais baseadas em IA
    const responses = {
      security: [
        "Com base na minha análise, esta é uma questão importante de cibersegurança. Vou fornecer uma resposta detalhada baseada nas melhores práticas da indústria.",
        "Excelente pergunta sobre segurança! Como especialista em cibersegurança, posso ajudar você a implementar as melhores soluções.",
        "Esta questão requer uma abordagem estratégica de segurança. Vou explicar as opções disponíveis e recomendar a melhor solução."
      ],
      technical: [
        "Vou analisar os aspectos técnicos da sua pergunta e fornecer uma solução prática e implementável.",
        "Com base na minha experiência técnica, posso sugerir várias abordagens para resolver este desafio.",
        "Esta é uma questão técnica interessante. Vou explicar as opções disponíveis e suas implicações."
      ],
      general: [
        "Obrigado pela sua pergunta! Vou usar minha expertise em cibersegurança para fornecer a melhor resposta possível.",
        "Interessante questão! Deixe-me analisar isso do ponto de vista da segurança e fornecer insights valiosos.",
        "Vou abordar sua pergunta com foco em segurança e melhores práticas da indústria."
      ]
    };

    const categoryResponses = responses[analysis?.category as keyof typeof responses] || responses.general;
    const baseResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    // Adicionar contexto específico baseado na análise
    let contextualInfo = "";
    
    if (analysis?.keywords?.length > 0) {
      contextualInfo += `\n\n🔍 **Detectei interesse em**: ${analysis.keywords.join(', ')}`;
    }

    if (analysis?.intent === 'implementation') {
      contextualInfo += "\n\n💡 **Foco em implementação**: Vou fornecer passos práticos e acionáveis.";
    } else if (analysis?.intent === 'troubleshooting') {
      contextualInfo += "\n\n🔧 **Modo diagnóstico**: Vou ajudar a identificar e resolver o problema.";
    }

    // Adicionar recomendações baseadas no contexto da conversa
    if (context.length > 2) {
      contextualInfo += "\n\n📚 **Baseado na nossa conversa**, vou personalizar a resposta para suas necessidades específicas.";
    }

    return {
      text: baseResponse + contextualInfo + "\n\n" + this.generateDetailedResponse(query, analysis),
      confidence: 75
    };
  }

  private generateDetailedResponse(query: string, analysis?: any): string {
    // Gerar resposta detalhada baseada na análise
    const responses = {
      'network-security': `
🛡️ **Segurança de Rede - Análise Especializada**

Para sua questão sobre segurança de rede, recomendo uma abordagem em camadas:

**1. Perímetro de Rede:**
- Firewall de nova geração (NGFW) com inspeção profunda de pacotes
- Sistema de detecção/prevenção de intrusão (IDS/IPS)
- Gateway de email seguro

**2. Segmentação:**
- VLANs para separar tráfego crítico
- Micro-segmentação para ambientes críticos
- Zero Trust Network Access (ZTNA)

**3. Monitoramento:**
- SIEM para correlação de eventos
- Análise de comportamento de rede
- Threat hunting proativo

💼 **Implementação prática**: Posso ajudar a desenhar uma arquitetura específica para seu ambiente.`,

      'threat-analysis': `
🎯 **Análise de Ameaças - Avaliação Especializada**

Baseado na sua pergunta, aqui está uma análise abrangente:

**Ameaças Identificadas:**
- Vetores de ataque mais prováveis
- Vulnerabilidades potenciais
- Impacto nos negócios

**Estratégia de Mitigação:**
1. **Prevenção**: Controles proativos
2. **Detecção**: Monitoramento contínuo  
3. **Resposta**: Planos de contingência
4. **Recuperação**: Business continuity

**Indicadores de Compromisso (IoCs):**
- Padrões de tráfego anômalos
- Tentativas de acesso suspeitas
- Alterações não autorizadas

🔍 **Próximos passos**: Posso realizar uma avaliação de risco personalizada.`,

      'incident-response': `
🚨 **Resposta a Incidentes - Protocolo Especializado**

Para situações de incidente, sigo o framework NIST:

**Fase 1 - Preparação:**
- Equipe de resposta treinada
- Ferramentas e procedimentos definidos
- Comunicação estabelecida

**Fase 2 - Detecção e Análise:**
- Identificação do incidente
- Classificação de severidade
- Preservação de evidências

**Fase 3 - Contenção, Erradicação e Recuperação:**
- Isolamento da ameaça
- Remoção completa
- Restauração segura

**Fase 4 - Atividades Pós-Incidente:**
- Lições aprendidas
- Melhoria de processos
- Relatório executivo

⚡ **Suporte 24/7**: Para emergências, contacte imediatamente: +351 968196979`,

      'compliance': `
📋 **Compliance e Governança - Consultoria Especializada**

Para questões de conformidade, abordo os principais frameworks:

**GDPR (Regulamento Geral de Proteção de Dados):**
- Mapeamento de dados pessoais
- Implementação de controles
- Procedimentos de notificação
- Treinamento de equipes

**ISO 27001 (Gestão de Segurança da Informação):**
- Análise de riscos
- Implementação de controles
- Auditoria interna
- Certificação

**NIST Cybersecurity Framework:**
- Identificar ativos críticos
- Proteger infraestrutura
- Detectar ameaças
- Responder a incidentes
- Recuperar operações

📊 **Avaliação de maturidade**: Posso realizar um assessment completo da sua organização.`
    };

    return responses[analysis?.category as keyof typeof responses] || `
🤖 **Análise Personalizada com IA**

Analisei sua pergunta e identifiquei os seguintes pontos-chave:

**Contexto identificado**: ${analysis?.category || 'Consulta geral de cibersegurança'}
**Nível de prioridade**: ${analysis?.threatLevel || 'Padrão'}
**Tipo de resposta**: ${analysis?.intent || 'Informativa'}

**Recomendações específicas:**
1. Avaliação inicial da situação atual
2. Implementação de controles apropriados
3. Monitoramento e melhoria contínua

**Próximos passos sugeridos:**
- Análise detalhada do ambiente
- Desenvolvimento de estratégia personalizada
- Implementação faseada das soluções

💡 **Dica profissional**: Cada ambiente é único. Posso fornecer uma consultoria personalizada para suas necessidades específicas.

📞 **Consultoria especializada**: support@joaocgaspar.pt | WhatsApp: +351 968196979
`;
  }

  private adjustResponseForMode(response: string, mode: 'basic' | 'advanced' | 'expert', analysis?: any): string {
    switch (mode) {
      case 'basic':
        return this.simplifyResponse(response);
      case 'expert':
        return this.enhanceResponse(response, analysis);
      default:
        return response;
    }
  }

  private simplifyResponse(response: string): string {
    // Simplificar resposta para modo básico
    const simplified = response
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
      .replace(/🔍|🛡️|🎯|🚨|📋|🤖|💡|📞|⚡|💼|🔧|📚|📊/g, '') // Remove emojis complexos
      .split('\n')
      .filter(line => !line.includes('**') && line.trim().length > 0)
      .slice(0, 5) // Limitar a 5 linhas
      .join('\n');

    return `💡 **Resposta Simplificada:**\n\n${simplified}\n\n❓ **Precisa de mais detalhes?** Mude para modo "Avançado" ou "Especialista".`;
  }

  private enhanceResponse(response: string, analysis?: any): string {
    // Melhorar resposta para modo especialista
    let enhanced = response;

    enhanced += `\n\n🎓 **Análise Técnica Avançada:**`;
    
    if (analysis?.category === 'network-security') {
      enhanced += `
- **Protocolos recomendados**: TLS 1.3, IPSec, WireGuard
- **Algoritmos de criptografia**: AES-256-GCM, ChaCha20-Poly1305
- **Certificações relevantes**: CISSP, CCSP, CISSP-ISSEP
- **Ferramentas especializadas**: Wireshark, Nmap, Metasploit, Burp Suite`;
    }

    enhanced += `\n\n📈 **Métricas de Sucesso:**
- Redução de incidentes de segurança
- Tempo de detecção de ameaças
- Conformidade com frameworks
- ROI em investimentos de segurança

🔬 **Metodologia aplicada**: Baseada em NIST, ISO 27001 e melhores práticas da indústria.

📚 **Recursos adicionais**: Posso fornecer documentação técnica detalhada e templates de implementação.`;

    return enhanced;
  }

  private generateSuggestions(category?: string, intent?: string): string[] {
    const suggestions: Record<string, string[]> = {
      'network-security': [
        "Como configurar um firewall pfSense?",
        "Melhores práticas para VPN corporativa",
        "Implementar segmentação de rede",
        "Monitoramento de tráfego de rede"
      ],
      'threat-analysis': [
        "Como detectar malware avançado?",
        "Análise de indicadores de compromisso",
        "Threat hunting proativo",
        "Resposta a ataques de ransomware"
      ],
      'incident-response': [
        "Criar plano de resposta a incidentes",
        "Análise forense digital",
        "Comunicação durante crises",
        "Recuperação pós-incidente"
      ],
      'compliance': [
        "Implementar GDPR na empresa",
        "Auditoria ISO 27001",
        "Framework NIST Cybersecurity",
        "Políticas de segurança"
      ]
    };

    const intentSuggestions: Record<string, string[]> = {
      'implementation': [
        "Passos para implementação",
        "Cronograma de projeto",
        "Recursos necessários",
        "Treinamento da equipe"
      ],
      'troubleshooting': [
        "Diagnóstico de problemas",
        "Soluções rápidas",
        "Prevenção de recorrência",
        "Monitoramento contínuo"
      ],
      'emergency': [
        "Suporte urgente 24/7",
        "Contenção imediata",
        "Análise de impacto",
        "Plano de recuperação"
      ]
    };

    let result: string[] = [];

    if (category && suggestions[category]) {
      result = [...suggestions[category]];
    }

    if (intent && intentSuggestions[intent]) {
      result = [...result, ...intentSuggestions[intent]];
    }

    if (result.length === 0) {
      result = [
        "Avaliação de segurança completa",
        "Consultoria personalizada",
        "Treinamento em cibersegurança",
        "Suporte técnico especializado"
      ];
    }

    return result.slice(0, 4); // Limitar a 4 sugestões
  }

  getFallbackResponse(query: string, context: string[]): {
    text: string;
    confidence: number;
    category: string;
    suggestions: string[];
  } {
    // Sistema de fallback quando a IA principal falha
    const fallbackResponses = [
      "🤖 Analisei sua pergunta e, embora seja uma questão interessante, preciso de mais contexto para fornecer a melhor resposta. Pode reformular ou ser mais específico?",
      "💡 Sua pergunta toca em aspectos importantes de cibersegurança. Para dar uma resposta mais precisa, gostaria de entender melhor seu cenário específico.",
      "🔍 Identifiquei que sua pergunta está relacionada à segurança, mas preciso de mais detalhes para fornecer uma solução personalizada. Pode compartilhar mais informações?",
      "🛡️ Como especialista em cibersegurança, vejo que sua pergunta é relevante. Para oferecer a melhor orientação, seria útil conhecer mais sobre seu ambiente ou situação específica."
    ];

    const response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return {
      text: response + "\n\n📞 **Alternativa**: Para discussão detalhada, entre em contato via WhatsApp: +351 968196979 ou email: support@joaocgaspar.pt",
      confidence: 60,
      category: 'general',
      suggestions: [
        "Reformular a pergunta",
        "Fornecer mais contexto",
        "Contato direto para consultoria",
        "Agendar chamada técnica"
      ]
    };
  }
}