import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  } | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }

    try {
      await emailjs.send(
        'service_ggmbbqd',
        'template_0sbtf5h',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'Eme8qMU9zn3AtG-vG'
      );

      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully!'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  return (
    <motion.div 
      className="contact-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants}>Get In Touch</motion.h1>
      
      <motion.div 
        className="contact-wrapper"
        variants={itemVariants}
      >
        <motion.div 
          className="contact-info"
          variants={itemVariants}
        >
          <h2>Contact Information</h2>
          <p>
            Feel free to say hello!
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">
                <Mail size={24} />
              </div>
              <div className="method-details">
                <h3>Email</h3>
                <p>support@joaocgaspar.pt</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">
                <Phone size={24} />
              </div>
              <div className="method-details">
                <h3>Phone</h3>
                <p>+351 968196979</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">
                <MapPin size={24} />
              </div>
              <div className="method-details">
                <h3>Location</h3>
                <p>Castelo Branco, CB</p>
              </div>
            </div>
          </div>
          
          <div className="availability">
            <h3>Availability</h3>
            <p>
              Currently available help.
            </p>
          </div>
          
          <div className="security-note">
            <div className="secure-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <p>
              All communications are secured using end-to-end encryption for your privacy and security.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="contact-form-container"
          variants={itemVariants}
        >
          <h2>Send a Message</h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message <span className="required">*</span></label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={5}
                required
              ></textarea>
            </div>
            
            {formStatus && (
              <motion.div 
                className={`form-status ${formStatus.success ? 'success' : 'error'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {formStatus.message}
              </motion.div>
            )}
            
            <motion.button 
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;