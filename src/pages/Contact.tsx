import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Shield, Clock, Globe, Award, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useSecureForm } from '../hooks/useSecureForm';
import { AccessibilityUtils } from '../utils/accessibility';
import '../styles/Contact.css';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
  newsletter: boolean;
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
      company: '',
      subject: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
      consent: false,
      newsletter: false
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
      company: {
        maxLength: 200
      },
      subject: { 
        maxLength: 200 
      },
      projectType: {
        required: true
      },
      budget: {
        required: true
      },
      timeline: {
        required: true
      },
      message: { 
        required: true, 
        minLength: 20, 
        maxLength: 2000 
      },
      consent: {
        required: true,
        custom: (value) => value === 'true' ? null : 'Você deve aceitar os termos para continuar'
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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
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
          company: values.company || 'Não informado',
          subject: values.subject || `Projeto: ${values.projectType}`,
          project_type: values.projectType,
          budget: values.budget,
          timeline: values.timeline,
          message: values.message,
          newsletter: values.newsletter ? 'Sim' : 'Não'
        },
        'Eme8qMU9zn3AtG-vG'
      );

      setSubmitStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Retornarei em até 24 horas com uma proposta detalhada.'
      });

      AccessibilityUtils.announce('Mensagem enviada com sucesso!');
      resetForm();

      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 8000);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente via WhatsApp.'
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

  const projectTypes = [
    { value: 'security-audit', label: 'Auditoria de Segurança' },
    { value: 'network-setup', label: 'Configuração de Rede' },
    { value: 'iot-security', label: 'Segurança IoT' },
    { value: 'incident-response', label: 'Resposta a Incidentes' },
    { value: 'consulting', label: 'Consultoria Geral' },
    { value: 'training', label: 'Treinamento em Segurança' },
    { value: 'other', label: 'Outro' }
  ];

  const budgetRanges = [
    { value: 'under-1k', label: 'Até €1.000' },
    { value: '1k-5k', label: '€1.000 - €5.000' },
    { value: '5k-10k', label: '€5.000 - €10.000' },
    { value: '10k-25k', label: '€10.000 - €25.000' },
    { value: 'over-25k', label: 'Acima de €25.000' },
    { value: 'discuss', label: 'Prefiro discutir' }
  ];

  const timelines = [
    { value: 'urgent', label: 'Urgente (1-2 semanas)' },
    { value: 'fast', label: 'Rápido (1 mês)' },
    { value: 'normal', label: 'Normal (2-3 meses)' },
    { value: 'flexible', label: 'Flexível (3+ meses)' }
  ];

  return (
    <motion.div 
      className="contact-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants}>Entre em Contato</motion.h1>
      <motion.p className="contact-subtitle" variants={itemVariants}>
        Vamos conversar sobre como posso ajudar a proteger sua infraestrutura digital com soluções personalizadas de cibersegurança.
      </motion.p>
      
      <motion.div 
        className="contact-wrapper"
        variants={itemVariants}
      >
        <motion.div 
          className="contact-info"
          variants={cardVariants}
        >
          <h2>Informações de Contato</h2>
          <p>
            Especialista em cibersegurança com foco em proteção empresarial e consultoria técnica.
          </p>
          
          <div className="contact-methods">
            <motion.div 
              className="contact-method"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="method-icon" aria-hidden="true">
                <Mail size={24} />
              </div>
              <div className="method-details">
                <h3>Email Profissional</h3>
                <a href="mailto:support@joaocgaspar.pt" aria-label="Enviar email para support@joaocgaspar.pt">
                  support@joaocgaspar.pt
                </a>
                <span className="method-note">Resposta em até 24h</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-method"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="method-icon" aria-hidden="true">
                <Phone size={24} />
              </div>
              <div className="method-details">
                <h3>WhatsApp Business</h3>
                <a href="https://wa.me/351968196979" target="_blank" rel="noopener noreferrer" aria-label="Contatar via WhatsApp">
                  +351 968 196 979
                </a>
                <span className="method-note">Seg-Sex: 9h-18h</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-method"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="method-icon" aria-hidden="true">
                <MapPin size={24} />
              </div>
              <div className="method-details">
                <h3>Localização</h3>
                <p>Castelo Branco, Portugal</p>
                <span className="method-note">Atendimento remoto e presencial</span>
              </div>
            </motion.div>
          </div>

          <div className="service-highlights">
            <h3>Serviços Especializados</h3>
            <div className="highlights-grid">
              <div className="highlight-item">
                <Shield size={20} />
                <span>Auditoria de Segurança</span>
              </div>
              <div className="highlight-item">
                <Globe size={20} />
                <span>Segurança de Redes</span>
              </div>
              <div className="highlight-item">
                <Award size={20} />
                <span>Consultoria Especializada</span>
              </div>
              <div className="highlight-item">
                <Clock size={20} />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
          
          <div className="availability">
            <h3>Disponibilidade</h3>
            <p>
              <CheckCircle size={16} className="check-icon" />
              Atualmente disponível para novos projetos
            </p>
            <p>
              <CheckCircle size={16} className="check-icon" />
              Consulta inicial gratuita (30 minutos)
            </p>
            <p>
              <CheckCircle size={16} className="check-icon" />
              Proposta detalhada em 24-48 horas
            </p>
          </div>
          
          <div className="security-note">
            <div className="secure-icon" aria-hidden="true">
              <Shield size={24} />
            </div>
            <div>
              <h4>Comunicação Segura</h4>
              <p>
                Todas as comunicações são protegidas com criptografia end-to-end. 
                Seus dados e informações do projeto são tratados com máxima confidencialidade.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="contact-form-container"
          variants={cardVariants}
        >
          <h2>Solicitar Orçamento</h2>
          <p className="form-description">
            Preencha o formulário abaixo para receber uma proposta personalizada para seu projeto de cibersegurança.
          </p>
          
          <form 
            className="contact-form" 
            onSubmit={handleFormSubmit}
            noValidate
            aria-label="Formulário de solicitação de orçamento"
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  Nome Completo <span className="required" aria-label="obrigatório">*</span>
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
                  <div className="field-error" role="alert" aria-live="polite">
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
                  placeholder="seu.email@empresa.com"
                  required
                  aria-required="true"
                  autoComplete="email"
                />
                {fields.email.error && fields.email.touched && (
                  <div className="field-error" role="alert" aria-live="polite">
                    {fields.email.error}
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Empresa/Organização</label>
                <input
                  type="text"
                  id="company"
                  {...getFieldProps('company')}
                  placeholder="Nome da sua empresa"
                  autoComplete="organization"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  {...getFieldProps('subject')}
                  placeholder="Resumo do seu projeto"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="projectType">
                  Tipo de Projeto <span className="required" aria-label="obrigatório">*</span>
                </label>
                <select
                  id="projectType"
                  {...getFieldProps('projectType')}
                  required
                  aria-required="true"
                >
                  <option value="">Selecione o tipo de projeto</option>
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {fields.projectType.error && fields.projectType.touched && (
                  <div className="field-error" role="alert" aria-live="polite">
                    {fields.projectType.error}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="budget">
                  Orçamento Estimado <span className="required" aria-label="obrigatório">*</span>
                </label>
                <select
                  id="budget"
                  {...getFieldProps('budget')}
                  required
                  aria-required="true"
                >
                  <option value="">Selecione a faixa de orçamento</option>
                  {budgetRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                {fields.budget.error && fields.budget.touched && (
                  <div className="field-error" role="alert" aria-live="polite">
                    {fields.budget.error}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="timeline">
                Prazo Desejado <span className="required" aria-label="obrigatório">*</span>
              </label>
              <select
                id="timeline"
                {...getFieldProps('timeline')}
                required
                aria-required="true"
              >
                <option value="">Selecione o prazo</option>
                {timelines.map(timeline => (
                  <option key={timeline.value} value={timeline.value}>
                    {timeline.label}
                  </option>
                ))}
              </select>
              {fields.timeline.error && fields.timeline.touched && (
                <div className="field-error" role="alert" aria-live="polite">
                  {fields.timeline.error}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">
                Descrição do Projeto <span className="required" aria-label="obrigatório">*</span>
              </label>
              <textarea
                id="message"
                {...getFieldProps('message')}
                placeholder="Descreva detalhadamente seu projeto, objetivos, infraestrutura atual e principais preocupações de segurança..."
                rows={6}
                required
                aria-required="true"
              />
              {fields.message.error && fields.message.touched && (
                <div className="field-error" role="alert" aria-live="polite">
                  {fields.message.error}
                </div>
              )}
              <div className="char-count">
                {fields.message.value.length}/2000 caracteres
              </div>
            </div>

            <div className="form-checkboxes">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="consent"
                  {...getFieldProps('consent')}
                  required
                  aria-required="true"
                />
                <label htmlFor="consent">
                  <span className="required">*</span> Concordo com a <a href="/privacy" target="_blank">Política de Privacidade</a> e 
                  autorizo o processamento dos meus dados para fins de contato comercial.
                </label>
                {fields.consent.error && fields.consent.touched && (
                  <div className="field-error" role="alert" aria-live="polite">
                    {fields.consent.error}
                  </div>
                )}
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="newsletter"
                  {...getFieldProps('newsletter')}
                />
                <label htmlFor="newsletter">
                  Desejo receber newsletters com dicas de segurança e atualizações sobre cibersegurança.
                </label>
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
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              aria-describedby={hasErrors ? "form-errors" : undefined}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" aria-hidden="true"></div>
                  Enviando Solicitação...
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  Solicitar Orçamento Gratuito
                </>
              )}
            </motion.button>

            {hasErrors && (
              <div id="form-errors" className="form-errors" role="alert">
                Por favor, corrija os erros acima antes de enviar.
              </div>
            )}

            <div className="form-footer">
              <p>
                <Shield size={16} />
                Seus dados estão protegidos e serão usados apenas para responder à sua solicitação.
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;