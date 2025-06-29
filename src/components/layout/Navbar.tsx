import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Navbar.css';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import { AccessibilityUtils } from '../../utils/accessibility';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Announce menu state change
    AccessibilityUtils.announce(
      isOpen ? 'Menu fechado' : 'Menu aberto'
    );
  };

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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        AccessibilityUtils.announce('Menu fechado');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

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

  const handleNavLinkClick = (pageName: string) => {
    setIsOpen(false);
    AccessibilityUtils.announce(`Navegando para ${pageName}`);
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      id="navigation"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="navbar-container">
        <motion.div className="navbar-logo" variants={itemVariants}>
          <NavLink 
            to="/" 
            className="logo-link"
            onClick={() => handleNavLinkClick('página inicial')}
            aria-label="CyberGuard - Ir para página inicial"
          >
            <Shield className="logo-icon" aria-hidden="true" />
            <span className="logo-text">CyberGuard</span>
            <span className="blinking-cursor" aria-hidden="true">_</span>
          </NavLink>
        </motion.div>

        <div className="navbar-right">
          <motion.div 
            className="navbar-links-desktop"
            variants={itemVariants}
          >
            <NavLink 
              to="/" 
              className={({isActive}) => isActive ? 'active' : ''}
              onClick={() => handleNavLinkClick('página inicial')}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => isActive ? 'active' : ''}
              onClick={() => handleNavLinkClick('sobre')}
            >
              About
            </NavLink>
            <NavLink 
              to="/skills" 
              className={({isActive}) => isActive ? 'active' : ''}
              onClick={() => handleNavLinkClick('habilidades')}
            >
              Skills
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({isActive}) => isActive ? 'active' : ''}
              onClick={() => handleNavLinkClick('projetos')}
            >
              Projects
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => isActive ? 'active' : ''}
              onClick={() => handleNavLinkClick('contato')}
            >
              Contact
            </NavLink>
          </motion.div>

          <motion.div 
            className="navbar-actions"
            variants={itemVariants}
          >
            <ThemeToggle />
            <motion.button 
              className="nav-toggle"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </motion.button>
          </motion.div>
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
            id="mobile-menu"
            role="menu"
            aria-label="Menu de navegação móvel"
          >
            <NavLink 
              to="/" 
              onClick={() => handleNavLinkClick('página inicial')} 
              className={({isActive}) => isActive ? 'active' : ''}
              role="menuitem"
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => handleNavLinkClick('sobre')} 
              className={({isActive}) => isActive ? 'active' : ''}
              role="menuitem"
            >
              About
            </NavLink>
            <NavLink 
              to="/skills" 
              onClick={() => handleNavLinkClick('habilidades')} 
              className={({isActive}) => isActive ? 'active' : ''}
              role="menuitem"
            >
              Skills
            </NavLink>
            <NavLink 
              to="/projects" 
              onClick={() => handleNavLinkClick('projetos')} 
              className={({isActive}) => isActive ? 'active' : ''}
              role="menuitem"
            >
              Projects
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => handleNavLinkClick('contato')} 
              className={({isActive}) => isActive ? 'active' : ''}
              role="menuitem"
            >
              Contact
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;