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
  
  // Enhanced responses with more context and personality
  const botResponses: Record<string, string[]> = {
    'hello': [
      "Hello! Great to meet you! I'm here to help with any cybersecurity questions you might have. What would you like to know?",
      "Hi there! Welcome to my portfolio. I'm passionate about cybersecurity and would love to discuss how I can help secure your digital environment."
    ],
    'hi': [
      "Hi! Thanks for visiting my portfolio. I specialize in network security, IoT protection, and IT support. What interests you most?",
      "Hello! I'm excited to chat with you about cybersecurity. What specific area would you like to explore?"
    ],
    'network': [
      "Network security is my specialty! I work with firewalls, VPNs, intrusion detection systems, and secure network architecture. I've implemented security protocols for various environments, from small offices to complex infrastructures. What specific network security challenge are you facing?",
      "Great question about networks! I have hands-on experience with pfSense, OpenVPN, network monitoring tools like Wireshark, and designing secure network topologies. I can help with everything from basic router configuration to advanced threat detection. What's your current setup?"
    ],
    'iot': [
      "IoT security is fascinating and challenging! I've worked on securing smart home systems, industrial IoT devices, and implementing proper authentication protocols. The key challenges include device authentication, secure firmware updates, and network segmentation. Are you working with specific IoT devices?",
      "IoT security requires a multi-layered approach. I focus on device hardening, secure communication protocols, and network isolation. I've developed solutions for Arduino-based systems and worked with various IoT platforms. What IoT security concerns do you have?"
    ],
    'experience': [
      "I have diverse experience in cybersecurity and IT! I've worked as a Technical Support Assistant, developed secure web applications with PHP and Python, managed Proxmox virtualization environments, and created IoT security solutions. I'm also certified in various cybersecurity domains. Would you like details about any specific area?",
      "My background spans from hands-on IT support to advanced cybersecurity implementations. I've built secure login systems, managed network infrastructures, developed automation solutions with Arduino, and continuously update my skills with the latest security practices. What aspect of my experience interests you most?"
    ],
    'skills': [
      "My core skills include network security (70%), Python programming (80%), IoT device management (70%), and various cybersecurity tools like Kali Linux, Wireshark, and Nmap. I'm also proficient in web development with HTML, CSS, JavaScript, and frameworks like Django. I hold multiple certifications including advanced cybersecurity training. What skill area would you like to know more about?",
      "I bring a comprehensive skill set: network administration, server management, programming in Python/Java/PHP, cybersecurity analysis, and IoT security implementation. I'm constantly learning - recently completed certifications in AI, ethical hacking, and GDPR compliance. Which technical area interests you?"
    ],
    'projects': [
      "I've worked on exciting projects! From secure login systems and e-commerce platforms to smart home automation with Arduino and network infrastructure management with Proxmox. Each project taught me valuable lessons about security implementation and user experience. Check out my Projects section for detailed case studies!",
      "My projects range from web applications with robust security features to IoT automation systems and network infrastructure setups. I particularly enjoyed building a residential automation model and implementing secure payment systems. Would you like to hear about a specific project?"
    ],
    'contact': [
      "I'd love to connect! You can reach me at support@joaocgaspar.pt or +351 968196979. I'm always excited to discuss cybersecurity opportunities, whether it's consulting, full-time positions, or collaborative projects. Feel free to use the contact form as well!",
      "Let's talk! I'm available for cybersecurity consulting, IT support projects, or discussing potential collaborations. You can contact me through the Contact section or directly via email. I typically respond within 24 hours."
    ],
    'help': [
      "I'm here to help! I can provide information about cybersecurity best practices, network security implementation, IoT device protection, my professional experience, or discuss potential collaboration opportunities. I can also explain technical concepts in an accessible way. What would you like to explore?",
      "Absolutely! I can assist with cybersecurity questions, explain my technical background, discuss project approaches, or provide insights into current security trends. I enjoy making complex security concepts understandable. What specific help do you need?"
    ],
    'security': [
      "Security is my passion! I approach it holistically - from network perimeter defense and endpoint protection to user education and incident response planning. I believe in layered security, regular assessments, and staying current with threat landscapes. What security challenges are you facing?",
      "Great topic! I implement security through multiple layers: network firewalls, intrusion detection, secure coding practices, regular vulnerability assessments, and user training. I've worked with various security tools and frameworks. What aspect of security interests you most?"
    ],
    'python': [
      "Python is one of my strongest languages (80% proficiency)! I use it for automation scripts, security tools, web development with Django, and data analysis. I've built everything from simple utilities to complex web applications. Python's versatility makes it perfect for cybersecurity tasks. Are you working on a Python project?",
      "I love Python! It's incredibly powerful for cybersecurity - from writing penetration testing scripts to building secure web applications. I've used it for network analysis, automation, and even IoT device programming. What Python applications interest you?"
    ],
    'certification': [
      "I hold multiple certifications including Advanced Cybersecurity Training, Ethical Hacking Fundamentals, Business English, Python programming, and various specialized courses in AI and GDPR compliance. I believe in continuous learning to stay current with evolving threats and technologies. Are you pursuing any certifications?",
      "Continuous learning is crucial in cybersecurity! My certifications span from technical skills like Python and ethical hacking to business aspects like GDPR compliance and AI applications. I recently completed courses in generative AI and incident response. What certifications are you considering?"
    ]
  };

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    
    // Simulate more realistic typing delay
    const typingDelay = Math.min(Math.max(userInput.length * 50, 1000), 3000);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate bot response
      const botResponse = generateResponse(userInput);
      
      const newBotMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, typingDelay);
  };

  // Enhanced response generation with context awareness
  const generateResponse = (input: string): string => {
    // Check for keyword matches with priority
    const keywords = Object.keys(botResponses);
    const matchedKeywords = keywords.filter(keyword => input.includes(keyword));
    
    if (matchedKeywords.length > 0) {
      // Prioritize more specific matches
      const bestMatch = matchedKeywords.reduce((a, b) => a.length > b.length ? a : b);
      const responses = botResponses[bestMatch];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Context-aware default responses
    const contextualResponses = [
      "That's an interesting question! While I specialize in cybersecurity, network administration, and IT support, I'd be happy to explore how your topic relates to digital security. Could you provide more context?",
      "I appreciate your question! My expertise is primarily in cybersecurity and network security. If you're looking for information about securing systems or networks related to your query, I can definitely help. What specific security aspects are you concerned about?",
      "Thanks for reaching out! I focus on cybersecurity, IoT security, and IT infrastructure. If your question relates to any of these areas, I'd love to dive deeper. Otherwise, feel free to ask about my experience or check out my portfolio projects!",
      "Great question! While my specialty is cybersecurity and network administration, I'm always curious to learn how different topics intersect with digital security. Could you tell me more about what you're working on?",
      "I'd be happy to help! My background is in cybersecurity, network security, and IT support. If you have questions about protecting systems, securing networks, or my professional experience, I'm your guy! What would you like to know?"
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
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