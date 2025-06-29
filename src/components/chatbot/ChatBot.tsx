import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Bot, User, Brain, Zap, Shield, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecurityUtils } from '../../utils/security';
import { AccessibilityUtils } from '../../utils/accessibility';
import { PerformanceUtils } from '../../utils/performance';
import { AIService } from '../../services/AIService';
import '../../styles/ChatBot.css';
import TypingAnimation from '../animations/TypingAnimation';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  typing?: boolean;
  timestamp: Date;
  confidence?: number;
  category?: string;
  suggestions?: string[];
  isAI?: boolean;
}

interface ChatBotProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "🤖 Olá! Sou o CyberGuard AI, seu assistente inteligente de cibersegurança. Posso ajudar com análises de segurança, conselhos personalizados, detecção de ameaças e muito mais. Como posso proteger você hoje?",
  sender: 'bot',
  timestamp: new Date(),
  isAI: true,
  confidence: 100,
  category: 'greeting'
};

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
  const [aiMode, setAiMode] = useState<'basic' | 'advanced' | 'expert'>('advanced');
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize AI Service
  const aiService = new AIService();

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

  // Enhanced AI response generation
  const generateAIResponse = useCallback(async (input: string, context: string[]): Promise<{
    text: string;
    confidence: number;
    category: string;
    suggestions: string[];
  }> => {
    try {
      // Analyze input for security context
      const analysis = await aiService.analyzeSecurityQuery(input, context);
      
      // Generate contextual response based on analysis
      const response = await aiService.generateResponse(input, {
        mode: aiMode,
        context: context,
        userProfile: {
          expertise: 'intermediate', // Could be dynamic based on conversation
          interests: ['network-security', 'iot', 'incident-response']
        },
        analysis: analysis
      });

      return response;
    } catch (error) {
      console.error('AI Service error:', error);
      
      // Fallback to enhanced rule-based system
      return aiService.getFallbackResponse(input, context);
    }
  }, [aiMode, aiService]);

  // Handle sending a new message with AI integration
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTyping) return;
    
    // Rate limiting
    if (!SecurityUtils.checkRateLimit('chatbot', 15, 60000)) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: '⚠️ Muitas mensagens enviadas. Aguarde um momento antes de enviar outra.',
        sender: 'bot',
        timestamp: new Date(),
        category: 'rate-limit'
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
    
    // Update conversation context
    const newContext = [...conversationContext, sanitizedInput].slice(-5); // Keep last 5 messages
    setConversationContext(newContext);
    
    // Announce message for screen readers
    AccessibilityUtils.announce(`Você disse: ${sanitizedInput}`);
    
    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(sanitizedInput, newContext);
      
      // Realistic typing delay based on response length and complexity
      const baseDelay = Math.min(Math.max(aiResponse.text.length * 25, 1500), 4000);
      const complexityMultiplier = aiResponse.confidence < 80 ? 1.5 : 1;
      const typingDelay = baseDelay * complexityMultiplier;
      
      setTimeout(() => {
        setIsTyping(false);
        
        const newBotMessage: Message = {
          id: Date.now() + 1,
          text: aiResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          confidence: aiResponse.confidence,
          category: aiResponse.category,
          suggestions: aiResponse.suggestions,
          isAI: true
        };
        
        setMessages(prev => [...prev, newBotMessage]);
        setConversationContext(prev => [...prev, aiResponse.text].slice(-5));
        
        AccessibilityUtils.announce(`CyberGuard AI respondeu: ${aiResponse.text}`);
        
        // Add suggestions as quick replies if available
        if (aiResponse.suggestions && aiResponse.suggestions.length > 0) {
          setTimeout(() => {
            const suggestionsMessage: Message = {
              id: Date.now() + 2,
              text: "💡 Sugestões relacionadas:",
              sender: 'bot',
              timestamp: new Date(),
              suggestions: aiResponse.suggestions,
              category: 'suggestions'
            };
            setMessages(prev => [...prev, suggestionsMessage]);
          }, 500);
        }
      }, typingDelay);
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsTyping(false);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "🔧 Desculpe, estou tendo dificuldades técnicas. Tente reformular sua pergunta ou entre em contato diretamente via email: support@joaocgaspar.pt",
        sender: 'bot',
        timestamp: new Date(),
        category: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
      AccessibilityUtils.announce('Erro na resposta da IA. Tente novamente.', 'assertive');
    }
  }, [inputValue, isTyping, generateAIResponse, conversationContext]);

  // Handle suggestion clicks
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  }, [handleSendMessage]);

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

  // Get confidence color
  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return '#666';
    if (confidence >= 90) return '#00ff41';
    if (confidence >= 70) return '#00cc99';
    if (confidence >= 50) return '#ffcc00';
    return '#ff3860';
  };

  // Get category icon
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'security': return <Shield size={12} />;
      case 'analysis': return <Brain size={12} />;
      case 'threat': return <AlertTriangle size={12} />;
      case 'ai': return <Zap size={12} />;
      default: return <Bot size={12} />;
    }
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
            ref={chatContainerRef}
            className="chatbot-container enhanced"
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
                <div className="bot-avatar ai-enhanced" aria-hidden="true">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(0, 255, 65, 0.4)',
                        '0 0 0 10px rgba(0, 255, 65, 0)',
                        '0 0 0 0 rgba(0, 255, 65, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Brain size={18} />
                  </motion.div>
                </div>
                <div className="title-info">
                  <h3 id="chatbot-title">CyberGuard AI</h3>
                  <div className="ai-status">
                    <span className="status">🧠 IA Avançada</span>
                    <div className="ai-mode-selector">
                      <select 
                        value={aiMode} 
                        onChange={(e) => setAiMode(e.target.value as any)}
                        className="mode-select"
                        aria-label="Modo da IA"
                      >
                        <option value="basic">Básico</option>
                        <option value="advanced">Avançado</option>
                        <option value="expert">Especialista</option>
                      </select>
                    </div>
                  </div>
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
              className="chatbot-messages enhanced"
              role="log"
              aria-live="polite"
              aria-label="Histórico de mensagens do chat com IA"
            >
              <div id="chatbot-description" className="sr-only">
                Chat com assistente de IA especializado em cibersegurança. Use as setas para navegar pelas mensagens.
              </div>
              
              {messages.map((message) => (
                <motion.div 
                  key={message.id} 
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'} ${message.isAI ? 'ai-message' : ''}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  role="article"
                  aria-label={`${message.sender === 'user' ? 'Você' : 'CyberGuard AI'} às ${formatTime(message.timestamp)}`}
                >
                  <div className="message-avatar" aria-hidden="true">
                    {message.sender === 'user' ? (
                      <User size={16} />
                    ) : (
                      <div className={`bot-icon ${message.isAI ? 'ai-powered' : ''}`}>
                        {message.isAI ? <Brain size={16} /> : <Bot size={16} />}
                      </div>
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-text">
                      {message.text}
                      {message.isAI && message.confidence && (
                        <div className="ai-metadata">
                          <div className="confidence-indicator">
                            <div 
                              className="confidence-bar"
                              style={{ 
                                width: `${message.confidence}%`,
                                backgroundColor: getConfidenceColor(message.confidence)
                              }}
                            />
                            <span className="confidence-text">
                              {getCategoryIcon(message.category)}
                              {message.confidence}% confiança
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="message-suggestions">
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            className="suggestion-chip"
                            onClick={() => handleSuggestionClick(suggestion)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  className="message bot-message typing-message ai-thinking"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  aria-label="CyberGuard AI está processando sua pergunta"
                >
                  <div className="message-avatar" aria-hidden="true">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain size={16} />
                    </motion.div>
                  </div>
                  <div className="message-content">
                    <div className="ai-thinking-indicator">
                      <TypingAnimation />
                      <span className="thinking-text">Analisando com IA...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form 
              className="chatbot-input enhanced"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Digite sua pergunta para a IA
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => debouncedInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte qualquer coisa sobre cibersegurança..."
                disabled={isTyping}
                maxLength={1000}
                aria-describedby="chat-input-help"
                autoComplete="off"
              />
              <div id="chat-input-help" className="sr-only">
                Pressione Enter para enviar, Shift+Enter para nova linha. IA avançada ativada.
              </div>
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Enviar pergunta para IA"
                className="send-button ai-enhanced"
              >
                {isTyping ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain size={18} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <Send size={18} aria-hidden="true" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {minimized && isOpen && (
        <motion.button 
          className="chatbot-minimized ai-enhanced"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          onClick={() => setMinimized(false)}
          aria-label={`Expandir chat com IA. ${messageCount} mensagens`}
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(0, 255, 65, 0.4)',
                '0 0 0 8px rgba(0, 255, 65, 0)',
                '0 0 0 0 rgba(0, 255, 65, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain size={20} aria-hidden="true" />
          </motion.div>
          <span>CyberGuard AI</span>
          <div className="ai-badge">🧠</div>
          {messageCount > 1 && (
            <div className="unread-indicator" aria-hidden="true">
              {messageCount - 1}
            </div>
          )}
        </motion.button>
      )}

      {!isOpen && (
        <motion.button 
          className="chatbot-toggle ai-enhanced"
          onClick={toggleChat}
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Abrir chat com IA especializada em cibersegurança"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(0, 255, 65, 0.4)',
                '0 0 0 12px rgba(0, 255, 65, 0)',
                '0 0 0 0 rgba(0, 255, 65, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Brain size={24} aria-hidden="true" />
          </motion.div>
          <div className="chat-pulse ai-pulse" aria-hidden="true"></div>
          <div className="ai-indicator">🧠 IA</div>
        </motion.button>
      )}
    </>
  );
};

export default React.memo(ChatBot);