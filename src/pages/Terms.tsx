import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Scale, Users } from 'lucide-react';
import '../styles/Legal.css';

const Terms = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <motion.div
      className="legal-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="legal-hero" variants={itemVariants}>
        <div className="legal-icon">
          <FileText size={48} />
        </div>
        <h1>Terms of Service</h1>
        <p className="legal-subtitle">
          Please read these terms carefully before using our website and services.
        </p>
        <div className="last-updated">
          Last updated: January 2025
        </div>
      </motion.div>

      <motion.div className="legal-content" variants={itemVariants}>
        <section className="legal-section">
          <div className="section-icon">
            <Scale size={24} />
          </div>
          <h2>Acceptance of Terms</h2>
          <div className="section-content">
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <div className="section-icon">
            <Users size={24} />
          </div>
          <h2>Use License</h2>
          <div className="section-content">
            <p>
              Permission is granted to temporarily download one copy of the materials on CyberGuard's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by CyberGuard at any time.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Disclaimer</h2>
          <div className="section-content">
            <p>
              The materials on CyberGuard's website are provided on an 'as is' basis. CyberGuard makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, CyberGuard does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <div className="section-icon">
            <AlertTriangle size={24} />
          </div>
          <h2>Limitations</h2>
          <div className="section-content">
            <p>
              In no event shall CyberGuard or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CyberGuard's website, even if CyberGuard or a CyberGuard authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Accuracy of Materials</h2>
          <div className="section-content">
            <p>
              The materials appearing on CyberGuard's website could include technical, typographical, or photographic errors. CyberGuard does not warrant that any of the materials on its website are accurate, complete, or current. CyberGuard may make changes to the materials contained on its website at any time without notice. However, CyberGuard does not make any commitment to update the materials.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Links</h2>
          <div className="section-content">
            <p>
              CyberGuard has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by CyberGuard of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Modifications</h2>
          <div className="section-content">
            <p>
              CyberGuard may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Governing Law</h2>
          <div className="section-content">
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Portugal and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Privacy Policy</h2>
          <div className="section-content">
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Contact Information</h2>
          <div className="section-content">
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span>Email: support@joaocgaspar.pt</span>
              </div>
              <div className="contact-item">
                <span>Phone: +351 968196979</span>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default Terms;