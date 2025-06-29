import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Shield } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useSecureForm } from '../hooks/useSecureForm';
import { AccessibilityUtils } from '../utils/accessibility';
import '../styles/Contact.css';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const {
    fields,
    getFieldProps,
    handleSubmit,
    resetForm,
    isSubmitting,
    hasErrors,
    isFormValid
  } = useSecureForm<ContactFormData>(
    {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    {
      name: { 
        required: true, 
        minLength: 2, 
        maxLength: 100,
        pattern: /^[a-zA-ZÀ-ÿ\s]+$/
      },
      email: { 
        required: true, 
        email: true 
      },
      subject: { 
        maxLength: 200 
      },
      message: { 
        required: true, 
        minLength: 10, 
        maxLength: 2000 
      }
    }
  );

  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  const onSubmit = async (values: ContactFormData) => {
    try {
      await emailjs.send(
        'service_ggmbbqd',
        'template_0sbtf5h',
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject || 'Contato via Portfolio',
          message: values.message,
        },
        'Eme8qMU9zn3AtG-vG'
      );

      setSubmitStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Retornarei em breve.'
      });

      AccessibilityUtils.announce('Mensagem enviada com sucesso!');
      resetForm();

      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.'
      });

      AccessibilityUtils.announce('Erro ao enviar mensagem', 'assertive');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await handleSubmit(onSubmit, `contact-${Date.now()}`);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
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
      <motion.h1 variants={itemVariants}>Entre em Contato</motion.h1>
      
      <motion.div 
        className="contact-wrapper"
        variants={itemVariants}
      >
        <motion.div 
          className="contact-info"
          variants={itemVariants}
        >
          <h2>Informações de Contato</h2>
          <p>
            Vamos conversar sobre como posso ajudar a proteger sua infraestrutura digital!
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon" aria-hidden="true">
                <Mail size={24} />
              </div>
              <div className="method-details">
                <h3>Email</h3>
                <a href="mailto:support@joaocgaspar.pt" aria-label="Enviar email para support@joaocgaspar.pt">
                  support@joaocgaspar.pt
                </a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon" aria-hidden="true">
                <Phone size={24} />
              </div>
              <div className="method-details">
                <h3>Telefone</h3>
                <a href="tel:+351968196979" aria-label="Ligar para +351 968196979">
                  +351 968196979
                </a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon" aria-hidden="true">
                <MapPin size={24} />
              </div>
              <div className="method-details">
                <h3>Localização</h3>
                <p>Castelo Branco, Portugal</p>
              </div>
            </div>
          </div>
          
          <div className="availability">
            <h3>Disponibilidade</h3>
            <p>
              Atualmente disponível para novos projetos de cibersegurança e consultoria.
              Resposta garantida em até 24 horas.
            </p>
          </div>
          
          <div className="security-note">
            <div className="secure-icon" aria-hidden="true">
              <Shield size={24} />
            </div>
            <p>
              Todas as comunicações são protegidas e tratadas com máxima confidencialidade.
              Seus dados estão seguros conosco.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="contact-form-container"
          variants={itemVariants}
        >
          <h2>Enviar Mensagem</h2>
          
          <form 
            className="contact-form" 
            onSubmit={handleFormSubmit}
            noValidate
            aria-label="Formulário de contato"
          >
            <div className="form-group">
              <label htmlFor="name">
                Nome <span className="required" aria-label="obrigatório">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...getFieldProps('name')}
                placeholder="Seu nome completo"
                required
                aria-required="true"
                autoComplete="name"
              />
              {fields.name.error && fields.name.touched && (
                <div 
                  id="name-error" 
                  className="field-error"
                  role="alert"
                  aria-live="polite"
                >
                  {fields.name.error}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required" aria-label="obrigatório">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...getFieldProps('email')}
                placeholder="seu.email@exemplo.com"
                required
                aria-required="true"
                autoComplete="email"
              />
              {fields.email.error && fields.email.touched && (
                <div 
                  id="email-error" 
                  className="field-error"
                  role="alert"
                  aria-live="polite"
                >
                  {fields.email.error}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <input
                type="text"
                id="subject"
                {...getFieldProps('subject')}
                placeholder="Sobre o que gostaria de falar?"
                autoComplete="off"
              />
              {fields.subject.error && fields.subject.touched && (
                <div 
                  id="subject-error" 
                  className="field-error"
                  role="alert"
                  aria-live="polite"
                >
                  {fields.subject.error}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">
                Mensagem <span className="required" aria-label="obrigatório">*</span>
              </label>
              <textarea
                id="message"
                {...getFieldProps('message')}
                placeholder="Descreva seu projeto ou dúvida..."
                rows={5}
                required
                aria-required="true"
              />
              {fields.message.error && fields.message.touched && (
                <div 
                  id="message-error" 
                  className="field-error"
                  role="alert"
                  aria-live="polite"
                >
                  {fields.message.error}
                </div>
              )}
              <div className="char-count">
                {fields.message.value.length}/2000 caracteres
              </div>
            </div>
            
            {submitStatus.type && (
              <motion.div 
                className={`form-status ${submitStatus.type}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                aria-live="polite"
              >
                {submitStatus.message}
              </motion.div>
            )}
            
            <motion.button 
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || hasErrors}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              aria-describedby={hasErrors ? "form-errors" : undefined}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" aria-hidden="true"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  Enviar Mensagem
                </>
              )}
            </motion.button>

            {hasErrors && (
              <div id="form-errors" className="form-errors" role="alert">
                Por favor, corrija os erros acima antes de enviar.
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;