import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ChatBot.css';
import TypingAnimation from '../animations/TypingAnimation';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  typing?: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Hello! I'm CyberGuard AI, your cybersecurity assistant. I can help you with questions about network security, IoT protection, IT support, and my professional experience. How can I assist you today?",
  sender: 'bot',
  timestamp: new Date()
};

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Enhanced multilingual responses with better keyword matching
  const botResponses: Record<string, string[]> = {
    // English greetings
    'hello': [
      "Hello! Great to meet you! I'm here to help with any cybersecurity questions you might have. What would you like to know?",
      "Hi there! Welcome to my portfolio. I'm passionate about cybersecurity and would love to discuss how I can help secure your digital environment."
    ],
    'hi': [
      "Hi! Thanks for visiting my portfolio. I specialize in network security, IoT protection, and IT support. What interests you most?",
      "Hello! I'm excited to chat with you about cybersecurity. What specific area would you like to explore?"
    ],
    'hey': [
      "Hey! How can I help you today? I'm here to discuss cybersecurity, network administration, or any of my technical skills.",
      "Hey there! What brings you to my portfolio? I'd love to help with any questions about my experience or services."
    ],
    
    // Portuguese greetings
    'olá': [
      "Olá! É um prazer conhecê-lo! Estou aqui para ajudar com qualquer questão sobre cibersegurança. O que gostaria de saber?",
      "Olá! Bem-vindo ao meu portfólio. Sou apaixonado por cibersegurança e adoraria discutir como posso ajudar a proteger seu ambiente digital."
    ],
    'oi': [
      "Oi! Obrigado por visitar meu portfólio. Sou especialista em segurança de redes, proteção IoT e suporte de TI. O que mais te interessa?",
      "Olá! Estou animado para conversar sobre cibersegurança. Que área específica gostaria de explorar?"
    ],
    'bom dia': [
      "Bom dia! Como posso ajudá-lo hoje? Estou aqui para discutir cibersegurança, administração de redes ou qualquer uma das minhas habilidades técnicas.",
      "Bom dia! O que o trouxe ao meu portfólio? Adoraria ajudar com qualquer pergunta sobre minha experiência ou serviços."
    ],
    'boa tarde': [
      "Boa tarde! Em que posso ajudá-lo? Tenho experiência em segurança de redes, IoT e suporte técnico.",
      "Boa tarde! Seja bem-vindo! Como posso auxiliá-lo com questões de cibersegurança hoje?"
    ],
    'boa noite': [
      "Boa noite! Como posso ajudá-lo? Estou disponível para discutir qualquer aspecto da cibersegurança.",
      "Boa noite! O que posso fazer por você hoje? Especializo-me em segurança digital e proteção de sistemas."
    ],
    
    // Technical topics in English
    'network': [
      "Network security is my specialty! I work with firewalls, VPNs, intrusion detection systems, and secure network architecture. I've implemented security protocols for various environments, from small offices to complex infrastructures. What specific network security challenge are you facing?",
      "Great question about networks! I have hands-on experience with pfSense, OpenVPN, network monitoring tools like Wireshark, and designing secure network topologies. I can help with everything from basic router configuration to advanced threat detection. What's your current setup?"
    ],
    'iot': [
      "IoT security is fascinating and challenging! I've worked on securing smart home systems, industrial IoT devices, and implementing proper authentication protocols. The key challenges include device authentication, secure firmware updates, and network segmentation. Are you working with specific IoT devices?",
      "IoT security requires a multi-layered approach. I focus on device hardening, secure communication protocols, and network isolation. I've developed solutions for Arduino-based systems and worked with various IoT platforms. What IoT security concerns do you have?"
    ],
    'security': [
      "Security is my passion! I approach it holistically - from network perimeter defense and endpoint protection to user education and incident response planning. I believe in layered security, regular assessments, and staying current with threat landscapes. What security challenges are you facing?",
      "Great topic! I implement security through multiple layers: network firewalls, intrusion detection, secure coding practices, regular vulnerability assessments, and user training. I've worked with various security tools and frameworks. What aspect of security interests you most?"
    ],
    
    // Technical topics in Portuguese
    'rede': [
      "Segurança de redes é minha especialidade! Trabalho com firewalls, VPNs, sistemas de detecção de intrusão e arquitetura de rede segura. Implementei protocolos de segurança para vários ambientes, desde pequenos escritórios até infraestruturas complexas. Que desafio específico de segurança de rede você está enfrentando?",
      "Ótima pergunta sobre redes! Tenho experiência prática com pfSense, OpenVPN, ferramentas de monitoramento de rede como Wireshark e design de topologias de rede seguras. Posso ajudar desde configuração básica de roteadores até detecção avançada de ameaças."
    ],
    'segurança': [
      "Segurança é minha paixão! Abordo de forma holística - desde defesa de perímetro de rede e proteção de endpoints até educação do usuário e planejamento de resposta a incidentes. Acredito em segurança em camadas, avaliações regulares e manter-se atualizado com cenários de ameaças. Que desafios de segurança você está enfrentando?",
      "Ótimo tópico! Implemento segurança através de múltiplas camadas: firewalls de rede, detecção de intrusão, práticas de codificação segura, avaliações regulares de vulnerabilidade e treinamento de usuários."
    ],
    'cibersegurança': [
      "Cibersegurança é minha área de especialização! Trabalho com proteção de sistemas, análise de vulnerabilidades, resposta a incidentes e implementação de políticas de segurança. Tenho experiência com várias ferramentas como Kali Linux, Nmap, Wireshark e muito mais. Como posso ajudá-lo?",
      "Excelente! A cibersegurança é fundamental nos dias de hoje. Minha abordagem inclui prevenção, detecção e resposta a ameaças. Trabalho com segurança de redes, proteção de dados e educação em segurança. Que aspecto da cibersegurança te interessa mais?"
    ],
    
    // Experience and skills
    'experience': [
      "I have diverse experience in cybersecurity and IT! I've worked as a Technical Support Assistant, developed secure web applications with PHP and Python, managed Proxmox virtualization environments, and created IoT security solutions. I'm also certified in various cybersecurity domains. Would you like details about any specific area?",
      "My background spans from hands-on IT support to advanced cybersecurity implementations. I've built secure login systems, managed network infrastructures, developed automation solutions with Arduino, and continuously update my skills with the latest security practices. What aspect of my experience interests you most?"
    ],
    'experiência': [
      "Tenho experiência diversificada em cibersegurança e TI! Trabalhei como Assistente de Suporte Técnico, desenvolvi aplicações web seguras com PHP e Python, geri ambientes de virtualização Proxmox e criei soluções de segurança IoT. Também sou certificado em vários domínios de cibersegurança. Gostaria de detalhes sobre alguma área específica?",
      "Minha experiência vai desde suporte técnico prático até implementações avançadas de cibersegurança. Construí sistemas de login seguros, geri infraestruturas de rede, desenvolvi soluções de automação com Arduino e atualizo continuamente minhas habilidades com as práticas de segurança mais recentes."
    ],
    
    'skills': [
      "My core skills include network security (70%), Python programming (80%), IoT device management (70%), and various cybersecurity tools like Kali Linux, Wireshark, and Nmap. I'm also proficient in web development with HTML, CSS, JavaScript, and frameworks like Django. I hold multiple certifications including advanced cybersecurity training. What skill area would you like to know more about?",
      "I bring a comprehensive skill set: network administration, server management, programming in Python/Java/PHP, cybersecurity analysis, and IoT security implementation. I'm constantly learning - recently completed certifications in AI, ethical hacking, and GDPR compliance. Which technical area interests you?"
    ],
    'habilidades': [
      "Minhas principais habilidades incluem segurança de redes (70%), programação Python (80%), gestão de dispositivos IoT (70%) e várias ferramentas de cibersegurança como Kali Linux, Wireshark e Nmap. Também sou proficiente em desenvolvimento web com HTML, CSS, JavaScript e frameworks como Django. Possuo múltiplas certificações incluindo treinamento avançado em cibersegurança. Sobre que área de habilidades gostaria de saber mais?",
      "Trago um conjunto abrangente de habilidades: administração de redes, gestão de servidores, programação em Python/Java/PHP, análise de cibersegurança e implementação de segurança IoT. Estou constantemente aprendendo - recentemente completei certificações em IA, hacking ético e conformidade GDPR."
    ],
    
    'projects': [
      "I've worked on exciting projects! From secure login systems and e-commerce platforms to smart home automation with Arduino and network infrastructure management with Proxmox. Each project taught me valuable lessons about security implementation and user experience. Check out my Projects section for detailed case studies!",
      "My projects range from web applications with robust security features to IoT automation systems and network infrastructure setups. I particularly enjoyed building a residential automation model and implementing secure payment systems. Would you like to hear about a specific project?"
    ],
    'projetos': [
      "Trabalhei em projetos empolgantes! Desde sistemas de login seguros e plataformas de e-commerce até automação residencial inteligente com Arduino e gestão de infraestrutura de rede com Proxmox. Cada projeto me ensinou lições valiosas sobre implementação de segurança e experiência do usuário. Confira minha seção de Projetos para estudos de caso detalhados!",
      "Meus projetos vão desde aplicações web com recursos robustos de segurança até sistemas de automação IoT e configurações de infraestrutura de rede. Gostei particularmente de construir um modelo de automação residencial e implementar sistemas de pagamento seguros."
    ],
    
    'contact': [
      "I'd love to connect! You can reach me at support@joaocgaspar.pt or +351 968196979. I'm always excited to discuss cybersecurity opportunities, whether it's consulting, full-time positions, or collaborative projects. Feel free to use the contact form as well!",
      "Let's talk! I'm available for cybersecurity consulting, IT support projects, or discussing potential collaborations. You can contact me through the Contact section or directly via email. I typically respond within 24 hours."
    ],
    'contato': [
      "Adoraria me conectar! Você pode me contatar em support@joaocgaspar.pt ou +351 968196979. Estou sempre animado para discutir oportunidades de cibersegurança, seja consultoria, posições em tempo integral ou projetos colaborativos. Sinta-se à vontade para usar o formulário de contato também!",
      "Vamos conversar! Estou disponível para consultoria em cibersegurança, projetos de suporte de TI ou discussão de potenciais colaborações. Você pode me contatar através da seção Contato ou diretamente via email. Normalmente respondo em 24 horas."
    ],
    
    'help': [
      "I'm here to help! I can provide information about cybersecurity best practices, network security implementation, IoT device protection, my professional experience, or discuss potential collaboration opportunities. I can also explain technical concepts in an accessible way. What would you like to explore?",
      "Absolutely! I can assist with cybersecurity questions, explain my technical background, discuss project approaches, or provide insights into current security trends. I enjoy making complex security concepts understandable. What specific help do you need?"
    ],
    'ajuda': [
      "Estou aqui para ajudar! Posso fornecer informações sobre melhores práticas de cibersegurança, implementação de segurança de rede, proteção de dispositivos IoT, minha experiência profissional ou discutir oportunidades de colaboração potenciais. Também posso explicar conceitos técnicos de forma acessível. O que gostaria de explorar?",
      "Absolutamente! Posso auxiliar com questões de cibersegurança, explicar meu background técnico, discutir abordagens de projetos ou fornecer insights sobre tendências atuais de segurança. Gosto de tornar conceitos complexos de segurança compreensíveis."
    ],
    
    'python': [
      "Python is one of my strongest languages (80% proficiency)! I use it for automation scripts, security tools, web development with Django, and data analysis. I've built everything from simple utilities to complex web applications. Python's versatility makes it perfect for cybersecurity tasks. Are you working on a Python project?",
      "I love Python! It's incredibly powerful for cybersecurity - from writing penetration testing scripts to building secure web applications. I've used it for network analysis, automation, and even IoT device programming. What Python applications interest you?"
    ],
    
    'certification': [
      "I hold multiple certifications including Advanced Cybersecurity Training, Ethical Hacking Fundamentals, Business English, Python programming, and various specialized courses in AI and GDPR compliance. I believe in continuous learning to stay current with evolving threats and technologies. Are you pursuing any certifications?",
      "Continuous learning is crucial in cybersecurity! My certifications span from technical skills like Python and ethical hacking to business aspects like GDPR compliance and AI applications. I recently completed courses in generative AI and incident response. What certifications are you considering?"
    ],
    'certificação': [
      "Possuo múltiplas certificações incluindo Treinamento Avançado em Cibersegurança, Fundamentos de Hacking Ético, Inglês Comercial, programação Python e vários cursos especializados em IA e conformidade GDPR. Acredito no aprendizado contínuo para me manter atualizado com ameaças e tecnologias em evolução. Está buscando alguma certificação?",
      "O aprendizado contínuo é crucial em cibersegurança! Minhas certificações abrangem desde habilidades técnicas como Python e hacking ético até aspectos comerciais como conformidade GDPR e aplicações de IA. Recentemente completei cursos em IA generativa e resposta a incidentes."
    ],
    
    // Common questions
    'what': [
      "I'm João Gaspar, a cybersecurity specialist focused on network security, IoT protection, and IT support. I help organizations secure their digital infrastructure through comprehensive security assessments, implementation of robust security measures, and ongoing monitoring. What specific aspect would you like to know more about?",
      "I specialize in creating secure digital environments through network security, cybersecurity consulting, and IT support services. My approach combines technical expertise with practical implementation to protect against modern cyber threats. How can I help secure your systems?"
    ],
    'o que': [
      "Sou João Gaspar, especialista em cibersegurança focado em segurança de redes, proteção IoT e suporte de TI. Ajudo organizações a proteger sua infraestrutura digital através de avaliações abrangentes de segurança, implementação de medidas robustas de segurança e monitoramento contínuo. Sobre que aspecto específico gostaria de saber mais?",
      "Especializo-me em criar ambientes digitais seguros através de segurança de redes, consultoria em cibersegurança e serviços de suporte de TI. Minha abordagem combina expertise técnica com implementação prática para proteger contra ameaças cibernéticas modernas."
    ],
    
    'who': [
      "I'm João Gaspar, a Computer Technician specialized in Network Management and Cybersecurity. I'm passionate about technology and digital security, combining hands-on experience in networks, servers, and data protection with solid programming skills in Java, Python, PHP, and JavaScript. I focus on building secure, efficient solutions and am constantly evolving as a cybersecurity professional.",
      "I'm a cybersecurity enthusiast with expertise in network administration, IT support, and secure system implementation. My background includes technical support, web development, IoT security, and various cybersecurity certifications. I'm always eager to help solve security challenges and share knowledge about digital protection."
    ],
    'quem': [
      "Sou João Gaspar, Técnico de Informática especializado em Gestão de Redes e Cibersegurança. Sou apaixonado por tecnologia e segurança digital, combinando experiência prática em redes, servidores e proteção de dados com sólidas habilidades de programação em Java, Python, PHP e JavaScript. Foco na construção de soluções seguras e eficientes e estou constantemente evoluindo como profissional de cibersegurança.",
      "Sou um entusiasta de cibersegurança com expertise em administração de redes, suporte de TI e implementação de sistemas seguros. Meu background inclui suporte técnico, desenvolvimento web, segurança IoT e várias certificações em cibersegurança."
    ],
    
    'where': [
      "I'm based in Castelo Branco, Portugal, but I work with clients globally through remote consulting and support services. My location allows me to serve both European and international markets effectively. I'm available for both on-site and remote cybersecurity projects. Are you looking for local or remote assistance?",
      "I'm located in Castelo Branco, CB, Portugal. I provide cybersecurity services both locally and internationally through remote consultation. My expertise is available worldwide thanks to modern communication technologies. What type of support are you looking for?"
    ],
    'onde': [
      "Estou baseado em Castelo Branco, Portugal, mas trabalho com clientes globalmente através de consultoria remota e serviços de suporte. Minha localização me permite atender efetivamente tanto mercados europeus quanto internacionais. Estou disponível para projetos de cibersegurança tanto presenciais quanto remotos. Está procurando assistência local ou remota?",
      "Estou localizado em Castelo Branco, CB, Portugal. Forneço serviços de cibersegurança tanto localmente quanto internacionalmente através de consultoria remota. Minha expertise está disponível mundialmente graças às tecnologias modernas de comunicação."
    ],
    
    'when': [
      "I'm currently available for new cybersecurity projects and consulting opportunities. My schedule is flexible, and I can adapt to different time zones for international clients. I typically respond to inquiries within 24 hours and can start projects based on urgency and scope. When do you need assistance?",
      "I'm available now for cybersecurity consulting, IT support, and security implementation projects. I maintain flexible hours to accommodate different client needs and time zones. Emergency security issues can be addressed immediately. What's your timeline?"
    ],
    'quando': [
      "Estou atualmente disponível para novos projetos de cibersegurança e oportunidades de consultoria. Minha agenda é flexível e posso me adaptar a diferentes fusos horários para clientes internacionais. Normalmente respondo a consultas em 24 horas e posso iniciar projetos baseado na urgência e escopo. Quando você precisa de assistência?",
      "Estou disponível agora para consultoria em cibersegurança, suporte de TI e projetos de implementação de segurança. Mantenho horários flexíveis para acomodar diferentes necessidades de clientes e fusos horários."
    ],
    
    'how': [
      "I approach cybersecurity through a comprehensive methodology: assessment, planning, implementation, and monitoring. I start by evaluating current security posture, identify vulnerabilities, design tailored solutions, implement security measures, and provide ongoing monitoring and support. Each project is customized to specific needs and requirements. What security challenges are you facing?",
      "My process involves thorough security analysis, risk assessment, solution design, and implementation with ongoing support. I use industry-standard tools and frameworks while adapting to each client's unique environment. I believe in education and knowledge transfer to ensure long-term security success. How can I help with your security needs?"
    ],
    'como': [
      "Abordo a cibersegurança através de uma metodologia abrangente: avaliação, planejamento, implementação e monitoramento. Começo avaliando a postura atual de segurança, identifico vulnerabilidades, projeto soluções personalizadas, implemento medidas de segurança e forneço monitoramento e suporte contínuos. Cada projeto é customizado para necessidades e requisitos específicos. Que desafios de segurança você está enfrentando?",
      "Meu processo envolve análise completa de segurança, avaliação de riscos, design de soluções e implementação com suporte contínuo. Uso ferramentas e frameworks padrão da indústria enquanto me adapto ao ambiente único de cada cliente."
    ],
    
    'why': [
      "I chose cybersecurity because it's one of the most critical challenges of our digital age. Every day, organizations face new threats, and I'm passionate about protecting digital assets and ensuring business continuity. My combination of technical skills, continuous learning, and practical experience allows me to provide effective security solutions. Cybersecurity isn't just my profession - it's my mission to make the digital world safer.",
      "Cybersecurity chose me as much as I chose it! The field combines my love for technology, problem-solving, and helping others. In today's interconnected world, security is fundamental to everything we do digitally. I find great satisfaction in protecting organizations and individuals from cyber threats while enabling them to leverage technology safely and effectively."
    ],
    'por que': [
      "Escolhi a cibersegurança porque é um dos desafios mais críticos da nossa era digital. Todos os dias, organizações enfrentam novas ameaças, e sou apaixonado por proteger ativos digitais e garantir continuidade de negócios. Minha combinação de habilidades técnicas, aprendizado contínuo e experiência prática me permite fornecer soluções de segurança eficazes. Cibersegurança não é apenas minha profissão - é minha missão tornar o mundo digital mais seguro.",
      "A cibersegurança me escolheu tanto quanto eu a escolhi! A área combina meu amor por tecnologia, resolução de problemas e ajudar outros. No mundo interconectado de hoje, segurança é fundamental para tudo que fazemos digitalmente."
    ],
    
    // Pricing and services
    'price': [
      "My pricing varies depending on the scope and complexity of the project. I offer competitive rates for cybersecurity consulting, network security implementation, IT support, and security assessments. I provide detailed quotes after understanding your specific requirements. Would you like to discuss your project so I can provide an accurate estimate?",
      "I believe in transparent, value-based pricing. Costs depend on factors like project duration, complexity, required expertise, and deliverables. I offer both project-based and hourly consulting rates. Let's discuss your needs so I can provide a customized quote that fits your budget and requirements."
    ],
    'preço': [
      "Meus preços variam dependendo do escopo e complexidade do projeto. Ofereço tarifas competitivas para consultoria em cibersegurança, implementação de segurança de rede, suporte de TI e avaliações de segurança. Forneço orçamentos detalhados após entender seus requisitos específicos. Gostaria de discutir seu projeto para que eu possa fornecer uma estimativa precisa?",
      "Acredito em preços transparentes e baseados em valor. Os custos dependem de fatores como duração do projeto, complexidade, expertise necessária e entregáveis. Ofereço tanto tarifas baseadas em projeto quanto consultoria por hora."
    ],
    
    'service': [
      "I offer comprehensive cybersecurity services including: network security assessment and implementation, IoT device security, IT support and troubleshooting, secure web application development, security training and awareness, incident response planning, and ongoing security monitoring. Each service is tailored to meet specific client needs. Which service interests you most?",
      "My services span the full cybersecurity spectrum: vulnerability assessments, penetration testing, security architecture design, compliance consulting, emergency incident response, and preventive security measures. I work with businesses of all sizes, from small startups to established enterprises. What security challenges can I help you solve?"
    ],
    'serviço': [
      "Ofereço serviços abrangentes de cibersegurança incluindo: avaliação e implementação de segurança de rede, segurança de dispositivos IoT, suporte de TI e solução de problemas, desenvolvimento de aplicações web seguras, treinamento e conscientização em segurança, planejamento de resposta a incidentes e monitoramento contínuo de segurança. Cada serviço é personalizado para atender necessidades específicas do cliente. Qual serviço mais te interessa?",
      "Meus serviços abrangem todo o espectro de cibersegurança: avaliações de vulnerabilidade, testes de penetração, design de arquitetura de segurança, consultoria de conformidade, resposta de emergência a incidentes e medidas preventivas de segurança."
    ]
  };

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced response generation with better language detection and keyword matching
  const generateResponse = (input: string): string => {
    const normalizedInput = input.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .trim();
    
    // Check for exact matches first
    if (botResponses[normalizedInput]) {
      const responses = botResponses[normalizedInput];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Check for partial matches with priority scoring
    const keywords = Object.keys(botResponses);
    const matches = keywords
      .map(keyword => ({
        keyword,
        score: calculateMatchScore(normalizedInput, keyword)
      }))
      .filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score);
    
    if (matches.length > 0) {
      const bestMatch = matches[0];
      const responses = botResponses[bestMatch.keyword];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Detect language and provide appropriate default response
    const isPortuguese = detectPortuguese(normalizedInput);
    
    if (isPortuguese) {
      const portugueseResponses = [
        "Essa é uma pergunta interessante! Embora eu me especialize em cibersegurança, administração de redes e suporte de TI, ficaria feliz em explorar como seu tópico se relaciona com segurança digital. Poderia fornecer mais contexto?",
        "Agradeço sua pergunta! Minha expertise é principalmente em cibersegurança e segurança de redes. Se você está procurando informações sobre como proteger sistemas ou redes relacionadas à sua consulta, posso definitivamente ajudar. Quais aspectos específicos de segurança te preocupam?",
        "Obrigado por entrar em contato! Foco em cibersegurança, segurança IoT e infraestrutura de TI. Se sua pergunta se relaciona com alguma dessas áreas, adoraria me aprofundar. Caso contrário, sinta-se à vontade para perguntar sobre minha experiência ou conferir meus projetos no portfólio!",
        "Ótima pergunta! Embora minha especialidade seja cibersegurança e administração de redes, sempre fico curioso para aprender como diferentes tópicos se cruzam com segurança digital. Poderia me contar mais sobre o que está trabalhando?",
        "Ficaria feliz em ajudar! Meu background é em cibersegurança, segurança de redes e suporte de TI. Se você tem perguntas sobre proteção de sistemas, segurança de redes ou minha experiência profissional, sou seu cara! O que gostaria de saber?"
      ];
      return portugueseResponses[Math.floor(Math.random() * portugueseResponses.length)];
    } else {
      const englishResponses = [
        "That's an interesting question! While I specialize in cybersecurity, network administration, and IT support, I'd be happy to explore how your topic relates to digital security. Could you provide more context?",
        "I appreciate your question! My expertise is primarily in cybersecurity and network security. If you're looking for information about securing systems or networks related to your query, I can definitely help. What specific security aspects are you concerned about?",
        "Thanks for reaching out! I focus on cybersecurity, IoT security, and IT infrastructure. If your question relates to any of these areas, I'd love to dive deeper. Otherwise, feel free to ask about my experience or check out my portfolio projects!",
        "Great question! While my specialty is cybersecurity and network administration, I'm always curious to learn how different topics intersect with digital security. Could you tell me more about what you're working on?",
        "I'd be happy to help! My background is in cybersecurity, network security, and IT support. If you have questions about protecting systems, securing networks, or my professional experience, I'm your guy! What would you like to know?"
      ];
      return englishResponses[Math.floor(Math.random() * englishResponses.length)];
    }
  };

  // Calculate match score for better keyword matching
  const calculateMatchScore = (input: string, keyword: string): number => {
    let score = 0;
    
    // Exact match gets highest score
    if (input === keyword) return 100;
    
    // Check if input contains the keyword
    if (input.includes(keyword)) score += 50;
    
    // Check if keyword contains the input
    if (keyword.includes(input)) score += 30;
    
    // Check for word boundaries
    const inputWords = input.split(' ');
    const keywordWords = keyword.split(' ');
    
    for (const inputWord of inputWords) {
      for (const keywordWord of keywordWords) {
        if (inputWord === keywordWord) score += 20;
        if (inputWord.includes(keywordWord) || keywordWord.includes(inputWord)) score += 10;
      }
    }
    
    // Bonus for similar length
    const lengthDiff = Math.abs(input.length - keyword.length);
    if (lengthDiff < 3) score += 5;
    
    return score;
  };

  // Detect Portuguese language
  const detectPortuguese = (text: string): boolean => {
    const portugueseWords = [
      'ola', 'oi', 'bom', 'dia', 'tarde', 'noite', 'obrigado', 'obrigada',
      'por', 'favor', 'como', 'esta', 'voce', 'que', 'isso', 'isso',
      'sim', 'nao', 'talvez', 'onde', 'quando', 'porque', 'quem',
      'seguranca', 'rede', 'computador', 'sistema', 'projeto', 'trabalho',
      'experiencia', 'habilidades', 'certificacao', 'contato', 'ajuda',
      'servico', 'preco', 'ciberseguranca', 'tecnologia', 'programacao'
    ];
    
    const words = text.split(' ');
    let portugueseCount = 0;
    
    for (const word of words) {
      if (portugueseWords.includes(word)) {
        portugueseCount++;
      }
    }
    
    return portugueseCount > 0 || words.length < 3; // For short messages, be more lenient
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    const userInput = inputValue.toLowerCase();
    setInputValue('');
    setIsTyping(true);
    
    // Simulate more realistic typing delay based on response length
    const response = generateResponse(userInput);
    const typingDelay = Math.min(Math.max(response.length * 30, 1000), 3000);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const newBotMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, typingDelay);
  };

  // Handle input submission with Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle chat minimized state
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMinimized(!minimized);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Animation variants
  const chatVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3 } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      transition: { duration: 0.3 } 
    }
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20 
      } 
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && !minimized && (
          <motion.div 
            className="chatbot-container"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <div className="bot-avatar">
                  <Bot size={18} />
                </div>
                <div className="title-info">
                  <h3>CyberGuard AI</h3>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="chatbot-controls">
                <button onClick={toggleMinimize} aria-label="Minimize chat">
                  <Minimize2 size={18} />
                </button>
                <button onClick={toggleChat} aria-label="Close chat">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div 
                  key={message.id} 
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="message-avatar">
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  className="message bot-message typing-message"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="message-content">
                    <TypingAnimation />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chatbot-input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about cybersecurity..."
                disabled={isTyping}
              />
              <button 
                onClick={handleSendMessage} 
                disabled={inputValue.trim() === '' || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {minimized && isOpen && (
        <motion.div 
          className="chatbot-minimized"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          onClick={() => setMinimized(false)}
        >
          <Bot size={20} />
          <span>CyberGuard AI</span>
          {messages.length > 1 && (
            <div className="unread-indicator">{messages.length - 1}</div>
          )}
        </motion.div>
      )}

      {!isOpen && (
        <motion.button 
          className="chatbot-toggle"
          onClick={toggleChat}
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={24} />
          <div className="chat-pulse"></div>
        </motion.button>
      )}
    </>
  );
};

export default ChatBot;