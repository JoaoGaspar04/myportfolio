import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/Loader.css';

const Loader = () => {
  const iconVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { 
      opacity: 1, 
      pathLength: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const loadingText = "INITIALIZING SECURE ENVIRONMENT";

  return (
    <div className="loader-container">
      <div className="loader-content">
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#00FF41"
            strokeWidth="5"
            fill="none"
            variants={iconVariants}
          />
          <motion.path
            d="M50 10 L50 90 M10 50 L90 50"
            stroke="#00FF41"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            variants={iconVariants}
          />
        </motion.svg>

        <motion.div 
          className="loader-text"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {loadingText.split('').map((letter, index) => (
            <motion.span 
              key={index}
              variants={letterVariants}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
          <span className="blinking-cursor">_</span>
        </motion.div>

        <div className="loader-progress">
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default Loader;