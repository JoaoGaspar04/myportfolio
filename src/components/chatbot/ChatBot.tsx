import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ChatBot.css';
import TypingAnimation from '../animations/TypingAnimation';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  typing?: boolean;
}

interface ChatBotProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Hello! I'm your cybersecurity assistant. How can I help you today?",
  sender: 'bot'
};

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Pre-defined responses based on keywords
  const botResponses: Record<string, string[]> = {
    'hello': ["Hello! How can I assist you with cybersecurity today?"],
    'hi': ["Hi there! What cybersecurity topic are you interested in?"],
    'network': [
      "Network security is a vital part of cybersecurity. Would you like to know about firewalls, VPNs, or intrusion detection systems?",
      "I specialize in network administration and security. Do you have specific questions about network protocols or security measures?"
    ],
    'iot': [
      "Internet of Things (IoT) security is increasingly important. Common concerns include device authentication, encryption, and secure firmware updates.",
      "IoT devices often have unique security challenges due to their limited resources. Would you like to discuss IoT security best practices?"
    ],
    'rj45': [
      "RJ45 is the standard connector for Ethernet cables. It's essential for creating secure physical network connections.",
      "For proper RJ45 termination, you need to follow the T568A or T568B wiring standards. Which would you like to know more about?"
    ],
    'project': ["You can find all my cybersecurity projects in the Projects section. Would you like me to highlight any specific area?"],
    'contact': ["Feel free to reach out through the Contact section. I'm always open to discussing cybersecurity opportunities!"],
    'help': ["I can help with information about cybersecurity, networking, IoT security, and more. What specific area are you interested in?"],
    'skills': ["My skills include network security, IoT device protection, secure network administration, penetration testing, and more. Which area interests you?"]
  };

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Add typing indicator
    const typingMessage: Message = {
      id: messages.length + 2,
      text: '',
      sender: 'bot',
      typing: true
    };
    
    setMessages(prev => [...prev, typingMessage]);
    
    // Generate bot response after delay
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.typing));
      
      // Find matching response based on keywords
      const botResponse = generateResponse(inputValue.toLowerCase());
      
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1500);
  };

  // Generate response based on input
  const generateResponse = (input: string): string => {
    // Check for keyword matches
    for (const [keyword, responses] of Object.entries(botResponses)) {
      if (input.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Default responses if no keyword matches
    const defaultResponses = [
      "I'm here to help with cybersecurity questions. Could you provide more details?",
      "That's an interesting topic. Would you like to know how it relates to cybersecurity?",
      "I can provide information about network security, IoT, or administration. What specifically interests you?",
      "Feel free to explore the portfolio to see projects related to cybersecurity and networking."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Handle input submission with Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Toggle chat minimized state
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMinimized(!minimized);
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
                <MessageSquare size={18} />
                <h3>CyberGuard Assistant</h3>
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
                <div 
                  key={message.id} 
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  {message.typing ? (
                    <TypingAnimation />
                  ) : (
                    <div className="message-text">{message.text}</div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chatbot-input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage} disabled={inputValue.trim() === ''}>
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
          <Maximize2 size={20} />
          <span>Chat</span>
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
        </motion.button>
      )}
    </>
  );
};

export default ChatBot;