import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, MonitorSmartphone , Wifi, Monitor, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  // Terminal typing effect
  useEffect(() => {
    const terminalText = "Securing digital infrastructures with advanced network solutions...";
    const terminalElement = document.getElementById('terminal-text');
    
    if (terminalElement) {
      let i = 0;
      const typeWriter = () => {
        if (i < terminalText.length) {
          terminalElement.textContent += terminalText.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        } else {
          // Add blinking cursor after typing is complete
          const cursor = document.createElement('span');
          cursor.className = 'blinking-cursor';
          cursor.textContent = '_';
          terminalElement.appendChild(cursor);
        }
      };
      
      // Start typing after a delay
      setTimeout(typeWriter, 1000);
    }
  }, []);

  return (
    <motion.div 
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="hero">
        <motion.div 
          className="hero-content"
          variants={itemVariants}
        >
          <motion.h1 
            className="glitch" 
            data-text="CYBERGUARD_"
            variants={itemVariants}
          >
            CYBERGUARD_
          </motion.h1>
          
          <motion.div 
            className="terminal"
            variants={itemVariants}
          >
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button red"></span>
                <span className="terminal-button yellow"></span>
                <span className="terminal-button green"></span>
              </div>
              <div className="terminal-title">~/ggaspar</div>
            </div>
            <div className="terminal-body">
              <span className="terminal-prompt">$ </span>
              <span id="terminal-text"></span>
            </div>
          </motion.div>
          
          <motion.p variants={itemVariants}>
            Network Security | IoT Protection | IT Support
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            variants={itemVariants}
          >
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator" 
          onClick={scrollToContent}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      <div ref={scrollRef}>
        <section className="expertise-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Areas of Expertise
          </motion.h2>
          
          <div className="expertise-grid">
            <motion.div
              className="expertise-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)' }}
            >
              <Shield size={48} className="expertise-icon" />
              <h3>Network</h3>
              <p>Implementing robust security protocols and intrusion detection systems to protect critical network.</p>
            </motion.div>
            
            <motion.div
              className="expertise-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)' }}
            >
              <MonitorSmartphone  size={48} className="expertise-icon" />
              <h3>IT Support</h3>
              <p>I install, configure and maintain computers, networks and systems, providing technical support to users and ensuring the efficient and secure operation of IT environments.</p>
            </motion.div>
            
            <motion.div
              className="expertise-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)' }}
            >
              <Wifi size={48} className="expertise-icon" />
              <h3>IoT Security</h3>
              <p>Securing Internet of Things devices with specialized protocols designed for resource-constrained environments.</p>
            </motion.div>
            
   
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;