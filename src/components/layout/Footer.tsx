import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import '../../styles/Footer.css';
import { AccessibilityUtils } from '../../utils/accessibility';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string) => {
    AccessibilityUtils.announce(`Abrindo ${platform} em nova aba`);
  };

  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-left">
          <h3>CyberGuard_<span className="blinking-cursor" aria-hidden="true">|</span></h3>
          <p>Cybersecurity, Network Security, and IT Support</p>
        </div>

        <div className="footer-right">
          <nav className="social-links" aria-label="Redes sociais">
            <a 
              href="https://github.com/JoaoGaspar04" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub - Abre em nova aba"
              onClick={() => handleSocialClick('GitHub')}
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <a 
              href="https://www.linkedin.com/in/jonygaspar04/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn - Abre em nova aba"
              onClick={() => handleSocialClick('LinkedIn')}
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a 
              href="https://www.instagram.com/o.gaspar_04/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram - Abre em nova aba"
              onClick={() => handleSocialClick('Instagram')}
            >
              <Instagram size={20} aria-hidden="true" />
            </a>
            <a 
              href="mailto:support@joaocgaspar.pt" 
              aria-label="Enviar email"
              onClick={() => handleSocialClick('Email')}
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>&copy; {currentYear} CyberGuard Security. All Rights Reserved.</p>
        </div>
        <nav className="footer-links" aria-label="Links legais">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;