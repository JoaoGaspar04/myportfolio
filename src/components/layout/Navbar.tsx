import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Shield, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Navbar.css';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      transition: { 
        duration: 0.3
      } 
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="navbar-container">
        <motion.div className="navbar-logo" variants={itemVariants}>
          <NavLink to="/" className="logo-link">
            <Shield className="logo-icon" />
            <span className="logo-text">CyberGuard</span>
            <span className="blinking-cursor">_</span>
          </NavLink>
        </motion.div>

        <div className="navbar-right">
          <motion.div 
            className="navbar-links-desktop"
            variants={itemVariants}
          >
            <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
            <NavLink to="/skills" className={({isActive}) => isActive ? 'active' : ''}>Skills</NavLink>
            <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
          </motion.div>

          <motion.button 
            className="nav-toggle"
            onClick={toggleMenu}
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <NavLink to="/" onClick={toggleMenu} className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/about" onClick={toggleMenu} className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
            <NavLink to="/skills" onClick={toggleMenu} className={({isActive}) => isActive ? 'active' : ''}>Skills</NavLink>
            <NavLink to="/projects" onClick={toggleMenu} className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink>
            <NavLink to="/contact" onClick={toggleMenu} className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;