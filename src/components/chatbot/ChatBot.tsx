import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecurityUtils } from '../../utils/security';
import { AccessibilityUtils } from '../../utils/accessibility';
import { PerformanceUtils } from '../../utils/performance';
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
  text: "Olá! Sou o CyberGuard AI, seu assistente de cibersegurança. Posso ajudar com questões sobre segurança de redes, proteção IoT, suporte de TI e minha experiência profissional. Como posso ajudá-lo hoje?",
  sender: 'bot',
  timestamp: new Date()
};

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced multilingual responses with better security
  const botResponses: Record<string, string[]> = {
    // Saudações em português
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
    
    // Saudações em inglês
    'hello': [
      "Hello! Great to meet you! I'm here to help with any cybersecurity questions you might have. What would you like to know?",
      "Hi there! Welcome to my portfolio. I'm passionate about cybersecurity and would love to discuss how I can help secure your digital environment."
    ],
    'hi': [
      "Hi! Thanks for visiting my portfolio. I specialize in network security, IoT protection, and IT support. What interests you most?",
      "Hello! I'm excited to chat with you about cybersecurity. What specific area would you like to explore?"
    ],
    
    // Tópicos técnicos
    'segurança': [
      "Segurança é minha paixão! Abordo de forma holística - desde defesa de perímetro de rede e proteção de endpoints até educação do usuário e planejamento de resposta a incidentes. Que desafios de segurança você está enfrentando?",
      "Ótimo tópico! Implemento segurança através de múltiplas camadas: firewalls de rede, detecção de intrusão, práticas de codificação segura, avaliações regulares de vulnerabilidade e treinamento de usuários."
    ],
    'network': [
      "Network security is my specialty! I work with firewalls, VPNs, intrusion detection systems, and secure network architecture. What specific network security challenge are you facing?",
      "Great question about networks! I have hands-on experience with pfSense, OpenVPN, network monitoring tools like Wireshark, and designing secure network topologies."
    ],
    'iot': [
      "IoT security is fascinating and challenging! I've worked on securing smart home systems, industrial IoT devices, and implementing proper authentication protocols. Are you working with specific IoT devices?",
      "IoT security requires a multi-layered approach. I focus on device hardening, secure communication protocols, and network segmentation."
    ],
    
    // Experiência e habilidades
    'experiência': [
      "Tenho experiência diversificada em cibersegurança e TI! Trabalhei como Assistente de Suporte Técnico, desenvolvi aplicações web seguras com PHP e Python, geri ambientes de virtualização Proxmox e criei soluções de segurança IoT. Gostaria de detalhes sobre alguma área específica?",
      "Minha experiência vai desde suporte técnico prático até implementações avançadas de cibersegurança. Construí sistemas de login seguros, geri infraestruturas de rede e desenvolvi soluções de automação com Arduino."
    ],
    'skills': [
      "My core skills include network security (70%), Python programming (80%), IoT device management (70%), and various cybersecurity tools like Kali Linux, Wireshark, and Nmap. What skill area would you like to know more about?",
      "I bring a comprehensive skill set: network administration, server management, programming in Python/Java/PHP, cybersecurity analysis, and IoT security implementation."
    ],
    
    // Contato
    'contato': [
      "Adoraria me conectar! Você pode me contatar em support@joaocgaspar.pt ou +351 968196979. Estou sempre animado para discutir oportunidades de cibersegurança. Sinta-se à vontade para usar o formulário de contato também!",
      "Vamos conversar! Estou disponível para consultoria em cibersegurança, projetos de suporte de TI ou discussão de potenciais colaborações. Normalmente respondo em 24 horas."
    ],
    'contact': [
      "I'd love to connect! You can reach me at support@joaocgaspar.pt or +351 968196979. I'm always excited to discuss cybersecurity opportunities. Feel free to use the contact form as well!",
      "Let's talk! I'm available for cybersecurity consulting, IT support projects, or discussing potential collaborations. I typically respond within 24 hours."
    ]
  };

  // Scroll to bottom with performance optimization
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && !minimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, minimized]);

  // Trap focus when chat is open
  useEffect(() => {
    if (isOpen && !minimized && chatContainerRef.current) {
      const cleanup = AccessibilityUtils.trapFocus(chatContainerRef.current);
      return cleanup;
    }
  }, [isOpen, minimized]);

  // Enhanced response generation with security
  const generateResponse = useCallback((input: string): string => {
    const sanitizedInput = SecurityUtils.sanitizeInput(input.toLowerCase());
    
    // Check for exact matches first
    if (botResponses[sanitizedInput]) {
      const responses = botResponses[sanitizedInput];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Check for partial matches
    const keywords = Object.keys(botResponses);
    const matches = keywords
      .map(keyword => ({
        keyword,
        score: calculateMatchScore(sanitizedInput, keyword)
      }))
      .filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score);
    
    if (matches.length > 0) {
      const bestMatch = matches[0];
      const responses = botResponses[bestMatch.keyword];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default responses based on language detection
    const isPortuguese = detectPortuguese(sanitizedInput);
    
    if (isPortuguese) {
      const portugueseResponses = [
        "Essa é uma pergunta interessante! Embora eu me especialize em cibersegurança, adoraria explorar como seu tópico se relaciona com segurança digital. Poderia fornecer mais contexto?",
        "Obrigado por entrar em contato! Foco em cibersegurança, segurança IoT e infraestrutura de TI. Se sua pergunta se relaciona com alguma dessas áreas, adoraria me aprofundar.",
        "Ficaria feliz em ajudar! Meu background é em cibersegurança, segurança de redes e suporte de TI. O que gostaria de saber?"
      ];
      return portugueseResponses[Math.floor(Math.random() * portugueseResponses.length)];
    } else {
      const englishResponses = [
        "That's an interesting question! While I specialize in cybersecurity, I'd be happy to explore how your topic relates to digital security. Could you provide more context?",
        "Thanks for reaching out! I focus on cybersecurity, IoT security, and IT infrastructure. If your question relates to any of these areas, I'd love to dive deeper.",
        "I'd be happy to help! My background is in cybersecurity, network security, and IT support. What would you like to know?"
      ];
      return englishResponses[Math.floor(Math.random() * englishResponses.length)];
    }
  }, []);

  // Calculate match score for better keyword matching
  const calculateMatchScore = (input: string, keyword: string): number => {
    let score = 0;
    
    if (input === keyword) return 100;
    if (input.includes(keyword)) score += 50;
    if (keyword.includes(input)) score += 30;
    
    const inputWords = input.split(' ');
    const keywordWords = keyword.split(' ');
    
    for (const inputWord of inputWords) {
      for (const keywordWord of keywordWords) {
        if (inputWord === keywordWord) score += 20;
        if (inputWord.includes(keywordWord) || keywordWord.includes(inputWord)) score += 10;
      }
    }
    
    return score;
  };

  // Detect Portuguese language
  const detectPortuguese = (text: string): boolean => {
    const portugueseWords = [
      'ola', 'oi', 'bom', 'dia', 'tarde', 'noite', 'obrigado', 'obrigada',
      'por', 'favor', 'como', 'esta', 'voce', 'que', 'isso',
      'sim', 'nao', 'talvez', 'onde', 'quando', 'porque', 'quem',
      'seguranca', 'rede', 'computador', 'sistema', 'projeto', 'trabalho',
      'experiencia', 'habilidades', 'certificacao', 'contato', 'ajuda'
    ];
    
    const words = text.split(' ');
    return words.some(word => portugueseWords.includes(word));
  };

  // Handle sending a new message with security and rate limiting
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTyping) return;
    
    // Rate limiting
    if (!SecurityUtils.checkRateLimit('chatbot', 10, 60000)) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Muitas mensagens enviadas. Aguarde um momento antes de enviar outra.',
        sender: 'bot',
        timestamp: new Date()
      }]);
      return;
    }
    
    // Sanitize input
    const sanitizedInput = SecurityUtils.sanitizeInput(trimmedInput);
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now(),
      text: sanitizedInput,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);
    
    // Announce message for screen readers
    AccessibilityUtils.announce(`Você disse: ${sanitizedInput}`);
    
    // Generate response with realistic delay
    const response = generateResponse(sanitizedInput);
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
      AccessibilityUtils.announce(`CyberGuard AI respondeu: ${response}`);
    }, typingDelay);
  }, [inputValue, isTyping, generateResponse]);

  // Handle input submission with Enter key
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Debounced input change
  const debouncedInputChange = PerformanceUtils.debounce((value: string) => {
    setInputValue(SecurityUtils.sanitizeInput(value));
  }, 100);

  // Toggle chat minimized state
  const toggleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMinimized(!minimized);
    AccessibilityUtils.announce(minimized ? 'Chat expandido' : 'Chat minimizado');
  }, [minimized]);

  // Format timestamp
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

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
            ref={chatContainerRef}
            className="chatbot-container"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-labelledby="chatbot-title"
            aria-describedby="chatbot-description"
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <div className="bot-avatar" aria-hidden="true">
                  <Bot size={18} />
                </div>
                <div className="title-info">
                  <h3 id="chatbot-title">CyberGuard AI</h3>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="chatbot-controls">
                <button 
                  onClick={toggleMinimize} 
                  aria-label="Minimizar chat"
                  type="button"
                >
                  <Minimize2 size={18} />
                </button>
                <button 
                  onClick={toggleChat} 
                  aria-label="Fechar chat"
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div 
              className="chatbot-messages"
              role="log"
              aria-live="polite"
              aria-label="Histórico de mensagens do chat"
            >
              <div id="chatbot-description" className="sr-only">
                Chat com assistente de cibersegurança. Use as setas para navegar pelas mensagens.
              </div>
              
              {messages.map((message) => (
                <motion.div 
                  key={message.id} 
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  role="article"
                  aria-label={`${message.sender === 'user' ? 'Você' : 'CyberGuard AI'} às ${formatTime(message.timestamp)}`}
                >
                  <div className="message-avatar" aria-hidden="true">
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
                  aria-label="CyberGuard AI está digitando"
                >
                  <div className="message-avatar" aria-hidden="true">
                    <Bot size={16} />
                  </div>
                  <div className="message-content">
                    <TypingAnimation />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form 
              className="chatbot-input"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Digite sua mensagem
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => debouncedInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre cibersegurança..."
                disabled={isTyping}
                maxLength={500}
                aria-describedby="chat-input-help"
                autoComplete="off"
              />
              <div id="chat-input-help" className="sr-only">
                Pressione Enter para enviar, Shift+Enter para nova linha
              </div>
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Enviar mensagem"
              >
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {minimized && isOpen && (
        <motion.button 
          className="chatbot-minimized"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          onClick={() => setMinimized(false)}
          aria-label={`Expandir chat. ${messageCount} mensagens`}
        >
          <Bot size={20} aria-hidden="true" />
          <span>CyberGuard AI</span>
          {messageCount > 1 && (
            <div className="unread-indicator" aria-hidden="true">
              {messageCount - 1}
            </div>
          )}
        </motion.button>
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
          aria-label="Abrir chat com assistente de cibersegurança"
        >
          <MessageSquare size={24} aria-hidden="true" />
          <div className="chat-pulse" aria-hidden="true"></div>
        </motion.button>
      )}
    </>
  );
};

export default React.memo(ChatBot);