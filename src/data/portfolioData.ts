// 🎯 SISTEMA DE GESTÃO DE CONTEÚDO CENTRALIZADO
// =====================================================
// INSTRUÇÕES PARA ATUALIZAÇÃO:
// 1. Edite este arquivo para atualizar TODO o portfólio
// 2. Todas as mudanças são aplicadas automaticamente
// 3. Mantenha a estrutura dos objetos
// 4. Use as interfaces TypeScript como guia
// =====================================================

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedin: string;
  github: string;
  instagram: string;
  website: string;
  resumeUrl: string;
  profileImage?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'security' | 'network' | 'iot' | 'development' | 'infrastructure' | 'support';
  icon: string; // FontAwesome icon name
  description?: string;
  yearsExperience?: number;
  certifications?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'security' | 'network' | 'iot' | 'web' | 'infrastructure' | 'support';
  technologies: string[];
  features: string[];
  challenges: string[];
  results: string[];
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  duration: string;
  teamSize: string;
  role: string;
  year: number;
  featured: boolean;
  clientType?: 'personal' | 'freelance' | 'company' | 'academic';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'freelance' | 'internship' | 'volunteer';
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  verificationUrl?: string;
  category: 'security' | 'network' | 'iot' | 'development' | 'management';
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  status: 'active' | 'expired' | 'in-progress';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    type: 'fixed' | 'hourly' | 'project' | 'consultation';
    value?: string;
    currency: 'EUR' | 'USD';
  };
  duration: string;
  category: 'security' | 'network' | 'iot' | 'support' | 'consulting';
  popular: boolean;
}

// =====================================================
// 📝 INFORMAÇÕES PESSOAIS
// =====================================================
export const personalInfo: PersonalInfo = {
  name: "João Gaspar",
  title: "Especialista em Cibersegurança & Técnico de Informática",
  subtitle: "Network Security | IoT Protection | IT Support | Infraestrutura",
  email: "support@joaocgaspar.pt",
  phone: "+351 968 196 979",
  whatsapp: "+351968196979",
  location: "Castelo Branco, Portugal",
  linkedin: "https://www.linkedin.com/in/jonygaspar04/",
  github: "https://github.com/JoaoGaspar04",
  instagram: "https://www.instagram.com/o.gaspar_04/",
  website: "https://joaocgaspar.pt",
  resumeUrl: "https://rxresu.me/joaogaspar04/portfolio-publico"
};

// =====================================================
// 🛠️ HABILIDADES TÉCNICAS
// =====================================================
export const skills: Skill[] = [
  // CIBERSEGURANÇA
  {
    name: "Network Security",
    level: 85,
    category: "security",
    icon: "faShieldAlt",
    description: "Implementação de firewalls, IDS/IPS, VPNs e monitoramento de rede",
    yearsExperience: 3,
    certifications: ["C-Academy Advanced Cybersecurity", "Cybersecure Citizen"]
  },
  {
    name: "Incident Response",
    level: 75,
    category: "security",
    icon: "faExclamationTriangle",
    description: "Resposta a incidentes, análise forense e recuperação de sistemas",
    yearsExperience: 2
  },
  {
    name: "Vulnerability Assessment",
    level: 80,
    category: "security",
    icon: "faBug",
    description: "Análise de vulnerabilidades, pentesting e hardening de sistemas",
    yearsExperience: 2
  },
  {
    name: "GDPR Compliance",
    level: 70,
    category: "security",
    icon: "faGavel",
    description: "Implementação de conformidade GDPR e políticas de privacidade",
    yearsExperience: 1
  },

  // REDES
  {
    name: "Network Administration",
    level: 90,
    category: "network",
    icon: "faNetworkWired",
    description: "Configuração e gestão de redes empresariais, switches e routers",
    yearsExperience: 4
  },
  {
    name: "Firewall Configuration",
    level: 85,
    category: "network",
    icon: "faFire",
    description: "pfSense, FortiGate, SonicWall e outras soluções de firewall",
    yearsExperience: 3
  },
  {
    name: "VPN Implementation",
    level: 80,
    category: "network",
    icon: "faKey",
    description: "OpenVPN, IPSec, WireGuard para acesso remoto seguro",
    yearsExperience: 3
  },
  {
    name: "Network Monitoring",
    level: 75,
    category: "network",
    icon: "faChartLine",
    description: "Wireshark, Nagios, PRTG para monitoramento de performance",
    yearsExperience: 2
  },

  // IOT
  {
    name: "IoT Security",
    level: 80,
    category: "iot",
    icon: "faWifi",
    description: "Segurança de dispositivos IoT, protocolos e redes mesh",
    yearsExperience: 2
  },
  {
    name: "Arduino Development",
    level: 75,
    category: "iot",
    icon: "faMicrochip",
    description: "Desenvolvimento de soluções IoT com Arduino e ESP32",
    yearsExperience: 3
  },
  {
    name: "Smart Home Systems",
    level: 70,
    category: "iot",
    icon: "faHome",
    description: "Automação residencial e sistemas de controle inteligente",
    yearsExperience: 2
  },

  // DESENVOLVIMENTO
  {
    name: "Python Programming",
    level: 85,
    category: "development",
    icon: "faPython",
    description: "Scripts de automação, análise de dados e desenvolvimento web",
    yearsExperience: 4
  },
  {
    name: "Web Development",
    level: 80,
    category: "development",
    icon: "faCode",
    description: "HTML5, CSS3, JavaScript, PHP, React para aplicações web",
    yearsExperience: 3
  },
  {
    name: "Database Management",
    level: 75,
    category: "development",
    icon: "faDatabase",
    description: "MySQL, PostgreSQL, SQLite para gestão de dados",
    yearsExperience: 3
  },

  // INFRAESTRUTURA
  {
    name: "Server Administration",
    level: 85,
    category: "infrastructure",
    icon: "faServer",
    description: "Linux, Windows Server, virtualização e gestão de serviços",
    yearsExperience: 4
  },
  {
    name: "Virtualization",
    level: 90,
    category: "infrastructure",
    icon: "faCloud",
    description: "Proxmox, VMware, Docker para ambientes virtualizados",
    yearsExperience: 3
  },
  {
    name: "Backup & Recovery",
    level: 80,
    category: "infrastructure",
    icon: "faHdd",
    description: "Estratégias de backup, disaster recovery e continuidade",
    yearsExperience: 3
  },

  // SUPORTE TÉCNICO
  {
    name: "Technical Support",
    level: 95,
    category: "support",
    icon: "faTools",
    description: "Suporte técnico especializado, diagnóstico e resolução",
    yearsExperience: 5
  },
  {
    name: "Hardware Maintenance",
    level: 90,
    category: "support",
    icon: "faCog",
    description: "Manutenção preventiva e corretiva de equipamentos",
    yearsExperience: 4
  },
  {
    name: "System Troubleshooting",
    level: 85,
    category: "support",
    icon: "faWrench",
    description: "Diagnóstico avançado e resolução de problemas complexos",
    yearsExperience: 4
  }
];

// =====================================================
// 🚀 PROJETOS
// =====================================================
export const projects: Project[] = [
  {
    id: "smart-home-security",
    title: "Sistema de Segurança IoT Residencial",
    description: "Solução completa de segurança residencial com dispositivos IoT integrados",
    longDescription: "Desenvolvimento de um sistema abrangente de segurança residencial utilizando dispositivos IoT, incluindo câmeras IP, sensores de movimento, controle de acesso e monitoramento remoto via aplicação móvel.",
    category: "iot",
    technologies: ["Arduino", "ESP32", "Python", "MQTT", "Node-RED", "InfluxDB", "Grafana"],
    features: [
      "Monitoramento 24/7 com câmeras IP",
      "Sensores de movimento e abertura",
      "Controle de acesso por RFID/NFC",
      "Alertas em tempo real via SMS/Email",
      "Dashboard web para monitoramento",
      "Aplicação móvel para controle remoto",
      "Integração com assistentes virtuais",
      "Backup automático de gravações"
    ],
    challenges: [
      "Integração de múltiplos protocolos IoT",
      "Garantir segurança end-to-end",
      "Otimizar consumo energético",
      "Criar interface intuitiva para usuários"
    ],
    results: [
      "Redução de 90% em falsos alarmes",
      "Tempo de resposta < 5 segundos",
      "Autonomia de 6 meses em sensores",
      "Interface aprovada por 95% dos usuários"
    ],
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg"
    ],
    status: "completed",
    duration: "4 meses",
    teamSize: "2 desenvolvedores",
    role: "Lead IoT Developer",
    year: 2024,
    featured: true,
    clientType: "academic"
  },
  {
    id: "enterprise-network-security",
    title: "Infraestrutura de Rede Empresarial Segura",
    description: "Implementação completa de segurança de rede para empresa de médio porte",
    longDescription: "Projeto de redesign completo da infraestrutura de rede de uma empresa com 200+ funcionários, implementando segurança multicamada, segmentação de rede e monitoramento avançado.",
    category: "network",
    technologies: ["pfSense", "Cisco", "VLAN", "OpenVPN", "Splunk", "Nessus", "Wireshark"],
    features: [
      "Firewall de nova geração (NGFW)",
      "Segmentação de rede por departamentos",
      "VPN site-to-site e remote access",
      "Sistema de detecção de intrusão (IDS)",
      "Monitoramento de tráfego em tempo real",
      "Políticas de acesso granulares",
      "Backup automático de configurações",
      "Dashboard executivo de segurança"
    ],
    challenges: [
      "Migração sem interrupção de serviços",
      "Integração com sistemas legados",
      "Treinamento de equipe interna",
      "Conformidade com regulamentações"
    ],
    results: [
      "Redução de 85% em incidentes de segurança",
      "Melhoria de 40% na performance da rede",
      "Conformidade 100% com ISO 27001",
      "ROI positivo em 8 meses"
    ],
    images: [
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg"
    ],
    status: "completed",
    duration: "6 meses",
    teamSize: "3 especialistas",
    role: "Network Security Lead",
    year: 2024,
    featured: true,
    clientType: "company"
  },
  {
    id: "proxmox-virtualization",
    title: "Ambiente de Virtualização Proxmox",
    description: "Implementação de cluster Proxmox para consolidação de servidores",
    longDescription: "Projeto de virtualização completa utilizando Proxmox VE para consolidar múltiplos servidores físicos em ambiente virtualizado de alta disponibilidade.",
    category: "infrastructure",
    technologies: ["Proxmox VE", "KVM", "LXC", "ZFS", "Ceph", "DRBD", "Corosync"],
    features: [
      "Cluster de alta disponibilidade",
      "Storage distribuído com Ceph",
      "Backup automático incremental",
      "Migração live de VMs",
      "Monitoramento centralizado",
      "Templates personalizados",
      "API REST para automação",
      "Interface web responsiva"
    ],
    challenges: [
      "Configurar storage distribuído",
      "Garantir alta disponibilidade",
      "Otimizar performance das VMs",
      "Implementar disaster recovery"
    ],
    results: [
      "Redução de 60% nos custos de hardware",
      "Uptime de 99.9%",
      "Tempo de deploy de VMs < 5 minutos",
      "Economia de 70% em energia"
    ],
    images: [
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg"
    ],
    status: "completed",
    duration: "3 meses",
    teamSize: "1 administrador",
    role: "Systems Administrator",
    year: 2023,
    featured: false,
    clientType: "freelance"
  },
  {
    id: "incident-response-platform",
    title: "Plataforma de Resposta a Incidentes",
    description: "Sistema automatizado para gestão e resposta a incidentes de segurança",
    longDescription: "Desenvolvimento de plataforma web para automatizar o processo de resposta a incidentes de cibersegurança, incluindo detecção, classificação, escalação e documentação.",
    category: "security",
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "ELK Stack"],
    features: [
      "Detecção automática de incidentes",
      "Classificação por severidade",
      "Workflow de escalação automática",
      "Integração com SIEM",
      "Relatórios executivos",
      "Timeline de eventos",
      "Comunicação automatizada",
      "Base de conhecimento integrada"
    ],
    challenges: [
      "Integrar múltiplas fontes de dados",
      "Criar algoritmos de classificação",
      "Garantir disponibilidade 24/7",
      "Interface intuitiva para analistas"
    ],
    results: [
      "Redução de 70% no tempo de resposta",
      "Melhoria de 50% na documentação",
      "Aumento de 80% na eficiência da equipe",
      "Conformidade total com frameworks"
    ],
    images: [
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg"
    ],
    status: "in-progress",
    duration: "8 meses",
    teamSize: "4 desenvolvedores",
    role: "Security Architect",
    year: 2024,
    featured: true,
    clientType: "company"
  },
  {
    id: "iot-monitoring-dashboard",
    title: "Dashboard de Monitoramento IoT",
    description: "Sistema de monitoramento centralizado para dispositivos IoT industriais",
    longDescription: "Plataforma web para monitoramento em tempo real de sensores IoT industriais, com alertas automáticos, análise de tendências e relatórios de performance.",
    category: "iot",
    technologies: ["Node.js", "InfluxDB", "Grafana", "MQTT", "Docker", "Kubernetes"],
    features: [
      "Monitoramento em tempo real",
      "Dashboards personalizáveis",
      "Alertas configuráveis",
      "Análise de tendências",
      "Relatórios automáticos",
      "API RESTful",
      "Escalabilidade horizontal",
      "Backup automático de dados"
    ],
    challenges: [
      "Processar milhares de sensores",
      "Garantir baixa latência",
      "Criar visualizações intuitivas",
      "Implementar alertas inteligentes"
    ],
    results: [
      "Monitoramento de 500+ sensores",
      "Latência média < 100ms",
      "Redução de 60% em downtime",
      "ROI de 300% no primeiro ano"
    ],
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
    ],
    status: "completed",
    duration: "5 meses",
    teamSize: "3 desenvolvedores",
    role: "IoT Solutions Architect",
    year: 2023,
    featured: false,
    clientType: "company"
  }
];

// =====================================================
// 💼 EXPERIÊNCIA PROFISSIONAL
// =====================================================
export const experiences: Experience[] = [
  {
    id: "freelance-cybersecurity",
    title: "Consultor de Cibersegurança",
    company: "Freelance",
    location: "Castelo Branco, Portugal",
    startDate: "2024-01",
    endDate: "",
    current: true,
    description: "Consultoria especializada em cibersegurança para PMEs, implementação de soluções de segurança e resposta a incidentes.",
    responsibilities: [
      "Avaliação de riscos de cibersegurança",
      "Implementação de políticas de segurança",
      "Configuração de firewalls e sistemas de monitoramento",
      "Treinamento de equipes em boas práticas",
      "Resposta a incidentes de segurança",
      "Auditoria de conformidade GDPR"
    ],
    achievements: [
      "Implementação de segurança em 15+ empresas",
      "Redução média de 80% em incidentes de segurança",
      "100% de conformidade GDPR nos clientes",
      "Certificação em frameworks internacionais"
    ],
    technologies: ["pfSense", "Splunk", "Nessus", "Wireshark", "Python", "Linux"],
    type: "freelance"
  },
  {
    id: "it-support-specialist",
    title: "Especialista em Suporte Técnico",
    company: "Várias Empresas",
    location: "Castelo Branco, Portugal",
    startDate: "2022-03",
    endDate: "2023-12",
    current: false,
    description: "Suporte técnico especializado, manutenção de infraestrutura e implementação de soluções tecnológicas.",
    responsibilities: [
      "Suporte técnico de nível 2 e 3",
      "Manutenção preventiva e corretiva",
      "Configuração de redes e servidores",
      "Gestão de Active Directory",
      "Implementação de soluções de backup",
      "Documentação técnica e procedimentos"
    ],
    achievements: [
      "Resolução de 95% dos tickets em SLA",
      "Implementação de sistema de backup que reduziu perdas em 100%",
      "Criação de documentação técnica completa",
      "Treinamento de 20+ usuários finais"
    ],
    technologies: ["Windows Server", "Active Directory", "VMware", "Office 365", "PowerShell"],
    type: "full-time"
  },
  {
    id: "network-administrator",
    title: "Administrador de Redes",
    company: "Projetos Diversos",
    location: "Castelo Branco, Portugal",
    startDate: "2021-06",
    endDate: "2022-02",
    current: false,
    description: "Gestão e manutenção de infraestruturas de rede, implementação de soluções de conectividade e segurança.",
    responsibilities: [
      "Configuração de switches e routers",
      "Implementação de VLANs e VPNs",
      "Monitoramento de performance de rede",
      "Resolução de problemas de conectividade",
      "Documentação de topologia de rede",
      "Implementação de políticas de QoS"
    ],
    achievements: [
      "Melhoria de 40% na performance da rede",
      "Implementação de segmentação de rede",
      "Redução de 60% em problemas de conectividade",
      "Criação de documentação técnica detalhada"
    ],
    technologies: ["Cisco", "pfSense", "VLAN", "OpenVPN", "SNMP", "Nagios"],
    type: "part-time"
  }
];

// =====================================================
// 🏆 CERTIFICAÇÕES
// =====================================================
export const certifications: Certification[] = [
  {
    name: "C-Academy – Advanced Cybersecurity Training",
    issuer: "C-Academy",
    year: "2024",
    category: "security",
    level: "advanced",
    status: "active"
  },
  {
    name: "Cybersecure Citizen",
    issuer: "CNCS",
    year: "2024",
    category: "security",
    level: "intermediate",
    status: "active"
  },
  {
    name: "GDPR for Citizens Attentive",
    issuer: "CNCS",
    year: "2024",
    category: "security",
    level: "intermediate",
    status: "active"
  },
  {
    name: "Initial Capacity Building of Incident Response Teams",
    issuer: "CNCS",
    year: "2024",
    category: "security",
    level: "advanced",
    status: "active"
  },
  {
    name: "Fundamentals of Ethical Hacking",
    issuer: "Cybrary",
    year: "2022",
    category: "security",
    level: "intermediate",
    status: "active"
  },
  {
    name: "Python Programming",
    issuer: "Codecademy",
    year: "2024",
    category: "development",
    level: "advanced",
    status: "active"
  },
  {
    name: "Business English",
    issuer: "Cambridge",
    year: "2024",
    category: "management",
    level: "intermediate",
    status: "active"
  }
];

// =====================================================
// 💰 SERVIÇOS OFERECIDOS
// =====================================================
export const services: Service[] = [
  {
    id: "security-audit",
    name: "Auditoria de Segurança Completa",
    description: "Avaliação abrangente da postura de segurança da sua organização",
    features: [
      "Análise de vulnerabilidades",
      "Teste de penetração",
      "Avaliação de políticas",
      "Relatório executivo",
      "Plano de remediação",
      "Apresentação para gestão"
    ],
    pricing: {
      type: "project",
      value: "1.500 - 5.000",
      currency: "EUR"
    },
    duration: "2-4 semanas",
    category: "security",
    popular: true
  },
  {
    id: "network-setup",
    name: "Configuração de Rede Segura",
    description: "Implementação de infraestrutura de rede com foco em segurança",
    features: [
      "Design de arquitetura",
      "Configuração de equipamentos",
      "Implementação de VPNs",
      "Segmentação de rede",
      "Monitoramento",
      "Documentação técnica"
    ],
    pricing: {
      type: "project",
      value: "2.000 - 8.000",
      currency: "EUR"
    },
    duration: "3-6 semanas",
    category: "network",
    popular: true
  },
  {
    id: "iot-security",
    name: "Segurança IoT",
    description: "Proteção de dispositivos e redes IoT contra ameaças",
    features: [
      "Avaliação de dispositivos IoT",
      "Configuração segura",
      "Monitoramento de tráfego",
      "Políticas de acesso",
      "Atualizações de firmware",
      "Treinamento de equipe"
    ],
    pricing: {
      type: "project",
      value: "1.000 - 4.000",
      currency: "EUR"
    },
    duration: "2-4 semanas",
    category: "iot",
    popular: false
  },
  {
    id: "incident-response",
    name: "Resposta a Incidentes 24/7",
    description: "Suporte especializado para resposta rápida a incidentes de segurança",
    features: [
      "Disponibilidade 24/7",
      "Resposta em até 1 hora",
      "Contenção de ameaças",
      "Análise forense",
      "Recuperação de sistemas",
      "Relatório pós-incidente"
    ],
    pricing: {
      type: "hourly",
      value: "75 - 150",
      currency: "EUR"
    },
    duration: "Conforme necessário",
    category: "security",
    popular: true
  },
  {
    id: "it-support",
    name: "Suporte Técnico Especializado",
    description: "Suporte técnico completo para infraestrutura de TI",
    features: [
      "Suporte remoto e presencial",
      "Manutenção preventiva",
      "Resolução de problemas",
      "Configuração de sistemas",
      "Backup e recuperação",
      "Treinamento de usuários"
    ],
    pricing: {
      type: "hourly",
      value: "45 - 85",
      currency: "EUR"
    },
    duration: "Conforme necessário",
    category: "support",
    popular: false
  },
  {
    id: "consulting",
    name: "Consultoria Estratégica",
    description: "Consultoria especializada em estratégia de cibersegurança",
    features: [
      "Análise de maturidade",
      "Roadmap de segurança",
      "Seleção de tecnologias",
      "Políticas e procedimentos",
      "Conformidade regulatória",
      "Gestão de riscos"
    ],
    pricing: {
      type: "consultation",
      value: "100 - 200",
      currency: "EUR"
    },
    duration: "1-3 meses",
    category: "consulting",
    popular: true
  }
];

// =====================================================
// 🎯 ÁREAS DE ESPECIALIZAÇÃO
// =====================================================
export const specializations = [
  {
    title: "Cibersegurança",
    description: "Proteção avançada contra ameaças digitais",
    icon: "🛡️",
    skills: ["Network Security", "Incident Response", "Vulnerability Assessment", "GDPR Compliance"],
    projects: ["enterprise-network-security", "incident-response-platform"]
  },
  {
    title: "Redes e Infraestrutura",
    description: "Gestão e otimização de infraestruturas de rede",
    icon: "🌐",
    skills: ["Network Administration", "Firewall Configuration", "VPN Implementation", "Network Monitoring"],
    projects: ["enterprise-network-security", "proxmox-virtualization"]
  },
  {
    title: "Internet das Coisas (IoT)",
    description: "Desenvolvimento e segurança de soluções IoT",
    icon: "📡",
    skills: ["IoT Security", "Arduino Development", "Smart Home Systems"],
    projects: ["smart-home-security", "iot-monitoring-dashboard"]
  },
  {
    title: "Suporte Técnico",
    description: "Suporte especializado e manutenção de sistemas",
    icon: "🔧",
    skills: ["Technical Support", "Hardware Maintenance", "System Troubleshooting"],
    projects: []
  }
];

// =====================================================
// 📊 ESTATÍSTICAS
// =====================================================
export const stats = {
  projectsCompleted: projects.filter(p => p.status === 'completed').length,
  yearsExperience: 5,
  clientsSatisfied: 25,
  certificationsEarned: certifications.length,
  technologiesMastered: skills.length,
  securityIncidentsResolved: 150
};

// =====================================================
// 🎨 CONFIGURAÇÕES DE TEMA
// =====================================================
export const themeConfig = {
  primaryColor: "#00ff41",
  secondaryColor: "#0099ff",
  accentColor: "#ff3860",
  successColor: "#00cc99",
  warningColor: "#ffcc00",
  errorColor: "#ff3860",
  fontPrimary: "Inter",
  fontMono: "IBM Plex Mono"
};

// =====================================================
// 📞 INFORMAÇÕES DE CONTATO DETALHADAS
// =====================================================
export const contactInfo = {
  availability: {
    timezone: "WET (Western European Time)",
    workingHours: "09:00 - 18:00",
    emergencySupport: "24/7 para clientes premium",
    responseTime: "< 24 horas"
  },
  languages: ["Português", "English", "Español"],
  preferredContact: "email",
  meetingTypes: ["Presencial", "Video chamada", "Telefone"],
  serviceAreas: ["Portugal", "Europa", "Remoto Global"]
};

// =====================================================
// 🔄 INSTRUÇÕES DE ATUALIZAÇÃO
// =====================================================
/*
COMO ATUALIZAR O PORTFÓLIO:

1. INFORMAÇÕES PESSOAIS:
   - Edite o objeto 'personalInfo' para atualizar dados de contato

2. ADICIONAR NOVA HABILIDADE:
   - Adicione um novo objeto ao array 'skills'
   - Defina nome, nível (0-100), categoria e descrição

3. ADICIONAR NOVO PROJETO:
   - Adicione um novo objeto ao array 'projects'
   - Use um ID único e preencha todos os campos obrigatórios
   - Marque 'featured: true' para destacar o projeto

4. ATUALIZAR EXPERIÊNCIA:
   - Adicione/edite objetos no array 'experiences'
   - Para cargo atual, use 'current: true' e 'endDate: ""'

5. ADICIONAR CERTIFICAÇÃO:
   - Adicione ao array 'certifications'
   - Defina categoria, nível e status

6. MODIFICAR SERVIÇOS:
   - Edite o array 'services' para atualizar preços e descrições
   - Marque 'popular: true' para destacar serviços

7. PERSONALIZAR TEMA:
   - Edite 'themeConfig' para mudar cores e fontes

DICAS:
- Mantenha sempre a estrutura dos objetos
- Use as interfaces TypeScript como guia
- Teste após cada mudança
- Faça backup antes de grandes alterações
*/