import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';
import '../styles/Legal.css';

const Privacy = () => {
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
          <Shield size={48} />
        </div>
        <h1>Privacy Policy</h1>
        <p className="legal-subtitle">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
        <div className="last-updated">
          Last updated: January 2025
        </div>
      </motion.div>

      <motion.div className="legal-content" variants={itemVariants}>
        <section className="legal-section">
          <div className="section-icon">
            <Eye size={24} />
          </div>
          <h2>Information We Collect</h2>
          <div className="section-content">
            <h3>Personal Information</h3>
            <p>
              When you contact us through our website, we may collect:
            </p>
            <ul>
              <li>Name and email address (when you fill out contact forms)</li>
              <li>Phone number (if provided voluntarily)</li>
              <li>Message content and communication preferences</li>
              <li>IP address and browser information for security purposes</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              We automatically collect certain information when you visit our website:
            </p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
              <li>Device information (screen resolution, device type)</li>
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <div className="section-icon">
            <Database size={24} />
          </div>
          <h2>How We Use Your Information</h2>
          <div className="section-content">
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our website and services</li>
              <li>To analyze website usage and optimize user experience</li>
              <li>To comply with legal obligations</li>
              <li>To protect against fraud and ensure website security</li>
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <div className="section-icon">
            <Lock size={24} />
          </div>
          <h2>Data Protection & Security</h2>
          <div className="section-content">
            <p>
              We implement appropriate technical and organizational measures to protect your personal data:
            </p>
            <ul>
              <li>SSL encryption for all data transmission</li>
              <li>Secure servers with regular security updates</li>
              <li>Access controls and authentication measures</li>
              <li>Regular security audits and monitoring</li>
              <li>Data minimization - we only collect necessary information</li>
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <h2>Cookies and Tracking</h2>
          <div className="section-content">
            <p>
              Our website uses cookies to enhance your browsing experience:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p>
              You can manage your cookie preferences through our cookie banner or browser settings.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Your Rights Under GDPR</h2>
          <div className="section-content">
            <p>
              As a data subject, you have the following rights:
            </p>
            <ul>
              <li><strong>Right of Access:</strong> Request copies of your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information below.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Data Retention</h2>
          <div className="section-content">
            <p>
              We retain your personal data only for as long as necessary:
            </p>
            <ul>
              <li>Contact form submissions: 2 years from last contact</li>
              <li>Analytics data: 26 months (anonymized)</li>
              <li>Security logs: 1 year</li>
              <li>Email communications: Until you request deletion</li>
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <h2>Third-Party Services</h2>
          <div className="section-content">
            <p>
              We may use third-party services that collect information:
            </p>
            <ul>
              <li><strong>EmailJS:</strong> For contact form functionality</li>
              <li><strong>Firebase:</strong> For hosting and analytics</li>
              <li><strong>Netlify:</strong> For website deployment</li>
            </ul>
            <p>
              These services have their own privacy policies and data protection measures.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Contact Information</h2>
          <div className="section-content">
            <p>
              If you have questions about this Privacy Policy or want to exercise your rights, contact us:
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={20} />
                <span>support@joaocgaspar.pt</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>+351 968196979</span>
              </div>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>Changes to This Policy</h2>
          <div className="section-content">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default Privacy;