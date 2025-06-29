import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/TypingAnimation.css';

const TypingAnimation: React.FC = () => {
  const dotVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: { 
      scale: [1, 1.2, 1], 
      opacity: [0.5, 1, 0.5] 
    }
  };

  return (
    <div className="typing-animation" role="status" aria-label="CyberGuard AI está digitando">
      <motion.span 
        className="dot"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.span 
        className="dot"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      <motion.span 
        className="dot"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />
      <span className="sr-only">Digitando...</span>
    </div>
  );
};

export default TypingAnimation;