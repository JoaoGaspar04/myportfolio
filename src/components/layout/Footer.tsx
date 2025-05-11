import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>CyberGuard_<span className="blinking-cursor">|</span></h3>
          <p>Cybersecurity, Network Security, and IT Support</p>
        </div>

        <div className="footer-right">
          <div className="social-links">
            <a href="https://github.com/JoaoGaspar04" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/jonygaspar04/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/o.gaspar_04/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">              <Instagram size={20} />
            </a>
            <a href="mailto:support@joaocgaspar.pt" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>&copy; {currentYear} CyberGuard Security. All Rights Reserved.</p>
        </div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;