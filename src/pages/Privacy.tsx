import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Mail, Phone, Server, UserCheck, AlertTriangle, FileText } from 'lucide-react';
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
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
        <motion.div className="legal-icon" variants={iconVariants}>
          <Shield size={48} />
        </motion.div>
        <h1>Política de Privacidade</h1>
        <p className="legal-subtitle">
          Sua privacidade é fundamental para nós. Esta política explica como coletamos, usamos e protegemos suas informações com os mais altos padrões de segurança cibernética.
        </p>
        <div className="last-updated">
          Última atualização: Janeiro 2025
        </div>
      </motion.div>

      <motion.div className="legal-content" variants={itemVariants}>
        <motion.section className="legal-section" variants={itemVariants}>
          <div className="section-icon">
            <Eye size={24} />
          </div>
          <h2>Informações que Coletamos</h2>
          <div className="section-content">
            <h3>Informações Pessoais</h3>
            <p>
              Quando você entra em contato conosco através do nosso site, podemos coletar:
            </p>
            <ul>
              <li><strong>Dados de Identificação:</strong> Nome completo e endereço de email (quando você preenche formulários de contato)</li>
              <li><strong>Dados de Comunicação:</strong> Número de telefone (se fornecido voluntariamente)</li>
              <li><strong>Conteúdo de Mensagens:</strong> Conteúdo das mensagens e preferências de comunicação</li>
              <li><strong>Dados Técnicos:</strong> Endereço IP, informações do navegador e dados de sessão para fins de segurança</li>
              <li><strong>Dados de Localização:</strong> Localização aproximada baseada no IP para fins de segurança e conformidade</li>
            </ul>

            <h3>Informações Coletadas Automaticamente</h3>
            <p>
              Coletamos automaticamente certas informações quando você visita nosso site:
            </p>
            <ul>
              <li><strong>Dados do Navegador:</strong> Tipo e versão do navegador, sistema operacional</li>
              <li><strong>Dados de Navegação:</strong> Páginas visitadas, tempo gasto no site, padrões de clique</li>
              <li><strong>Dados de Referência:</strong> Endereços de sites de referência e termos de pesquisa</li>
              <li><strong>Dados do Dispositivo:</strong> Informações do dispositivo (resolução da tela, tipo de dispositivo)</li>
              <li><strong>Dados de Performance:</strong> Métricas de carregamento e performance para otimização</li>
            </ul>

            <h3>Dados de Segurança</h3>
            <p>
              Para proteger nosso site e usuários, coletamos:
            </p>
            <ul>
              <li><strong>Logs de Segurança:</strong> Tentativas de acesso, padrões de tráfego suspeito</li>
              <li><strong>Dados de Autenticação:</strong> Informações de sessão criptografadas</li>
              <li><strong>Dados de Prevenção de Fraude:</strong> Análise comportamental para detectar atividades maliciosas</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <div className="section-icon">
            <Database size={24} />
          </div>
          <h2>Como Usamos Suas Informações</h2>
          <div className="section-content">
            <p>Utilizamos as informações coletadas para os seguintes propósitos:</p>
            
            <h3>Comunicação e Suporte</h3>
            <ul>
              <li>Responder às suas consultas e fornecer suporte ao cliente</li>
              <li>Enviar confirmações e atualizações sobre seus pedidos ou consultas</li>
              <li>Fornecer informações técnicas e de segurança relevantes</li>
            </ul>

            <h3>Melhoria de Serviços</h3>
            <ul>
              <li>Analisar o uso do site e otimizar a experiência do usuário</li>
              <li>Desenvolver novos recursos e melhorar funcionalidades existentes</li>
              <li>Realizar pesquisas de mercado e análise de tendências</li>
            </ul>

            <h3>Segurança e Conformidade</h3>
            <ul>
              <li>Proteger contra fraudes e garantir a segurança do site</li>
              <li>Cumprir obrigações legais e regulamentares</li>
              <li>Detectar e prevenir atividades maliciosas ou não autorizadas</li>
              <li>Manter logs de auditoria para fins de segurança</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <div className="section-icon">
            <Lock size={24} />
          </div>
          <h2>Proteção e Segurança de Dados</h2>
          <div className="section-content">
            <p>
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais:
            </p>
            
            <h3>Medidas Técnicas</h3>
            <ul>
              <li><strong>Criptografia SSL/TLS:</strong> Todas as transmissões de dados são criptografadas</li>
              <li><strong>Servidores Seguros:</strong> Infraestrutura com atualizações regulares de segurança</li>
              <li><strong>Firewalls Avançados:</strong> Proteção multicamada contra ameaças</li>
              <li><strong>Monitoramento 24/7:</strong> Detecção contínua de ameaças e anomalias</li>
              <li><strong>Backup Seguro:</strong> Backups criptografados e geograficamente distribuídos</li>
            </ul>

            <h3>Medidas Organizacionais</h3>
            <ul>
              <li><strong>Controles de Acesso:</strong> Acesso restrito baseado no princípio do menor privilégio</li>
              <li><strong>Treinamento de Segurança:</strong> Equipe treinada em melhores práticas de segurança</li>
              <li><strong>Auditorias Regulares:</strong> Avaliações periódicas de segurança e conformidade</li>
              <li><strong>Políticas de Segurança:</strong> Procedimentos documentados e atualizados regularmente</li>
              <li><strong>Minimização de Dados:</strong> Coletamos apenas informações necessárias</li>
            </ul>

            <h3>Certificações e Conformidade</h3>
            <ul>
              <li>Conformidade com GDPR (Regulamento Geral de Proteção de Dados)</li>
              <li>Aderência às melhores práticas de segurança cibernética</li>
              <li>Implementação de frameworks de segurança reconhecidos</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <div className="section-icon">
            <Server size={24} />
          </div>
          <h2>Cookies e Tecnologias de Rastreamento</h2>
          <div className="section-content">
            <p>
              Nosso site utiliza cookies e tecnologias similares para melhorar sua experiência:
            </p>
            
            <h3>Tipos de Cookies</h3>
            <ul>
              <li><strong>Cookies Essenciais:</strong> Necessários para funcionalidade básica do site</li>
              <li><strong>Cookies de Performance:</strong> Nos ajudam a entender como os visitantes usam nosso site</li>
              <li><strong>Cookies de Funcionalidade:</strong> Lembram suas configurações e preferências</li>
              <li><strong>Cookies de Segurança:</strong> Protegem contra atividades maliciosas</li>
            </ul>

            <h3>Gerenciamento de Cookies</h3>
            <p>
              Você pode gerenciar suas preferências de cookies através do nosso banner de cookies ou configurações do navegador. 
              Note que desabilitar certos cookies pode afetar a funcionalidade do site.
            </p>

            <h3>Tecnologias Adicionais</h3>
            <ul>
              <li><strong>Local Storage:</strong> Para armazenar preferências do usuário</li>
              <li><strong>Session Storage:</strong> Para dados temporários da sessão</li>
              <li><strong>Web Beacons:</strong> Para análise de performance (quando aplicável)</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <div className="section-icon">
            <UserCheck size={24} />
          </div>
          <h2>Seus Direitos sob o GDPR</h2>
          <div className="section-content">
            <p>
              Como titular de dados, você possui os seguintes direitos:
            </p>
            
            <h3>Direitos Fundamentais</h3>
            <ul>
              <li><strong>Direito de Acesso:</strong> Solicitar cópias de seus dados pessoais</li>
              <li><strong>Direito de Retificação:</strong> Solicitar correção de dados imprecisos</li>
              <li><strong>Direito ao Apagamento:</strong> Solicitar exclusão de seus dados pessoais</li>
              <li><strong>Direito à Limitação:</strong> Solicitar limitação do processamento de dados</li>
              <li><strong>Direito à Portabilidade:</strong> Solicitar transferência de seus dados</li>
              <li><strong>Direito de Oposição:</strong> Opor-se ao processamento de seus dados pessoais</li>
            </ul>

            <h3>Como Exercer Seus Direitos</h3>
            <p>
              Para exercer qualquer um desses direitos, entre em contato conosco usando as informações abaixo. 
              Responderemos à sua solicitação dentro de 30 dias, conforme exigido pelo GDPR.
            </p>

            <h3>Direito de Reclamação</h3>
            <p>
              Você tem o direito de apresentar uma reclamação a uma autoridade supervisora se acreditar que 
              o processamento de seus dados pessoais viola o GDPR.
            </p>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <div className="section-icon">
            <FileText size={24} />
          </div>
          <h2>Retenção de Dados</h2>
          <div className="section-content">
            <p>
              Retemos seus dados pessoais apenas pelo tempo necessário:
            </p>
            
            <h3>Períodos de Retenção</h3>
            <ul>
              <li><strong>Formulários de contato:</strong> 3 anos a partir do último contato</li>
              <li><strong>Dados de analytics:</strong> 26 meses (anonimizados após 14 meses)</li>
              <li><strong>Logs de segurança:</strong> 2 anos para fins de auditoria</li>
              <li><strong>Comunicações por email:</strong> Até que você solicite a exclusão</li>
              <li><strong>Dados de cookies:</strong> Conforme configurado em cada tipo de cookie</li>
            </ul>

            <h3>Exclusão Automática</h3>
            <p>
              Implementamos sistemas automatizados para exclusão de dados expirados, garantindo que 
              informações desnecessárias não sejam mantidas além do período necessário.
            </p>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <div className="section-icon">
            <AlertTriangle size={24} />
          </div>
          <h2>Serviços de Terceiros</h2>
          <div className="section-content">
            <p>
              Podemos utilizar serviços de terceiros que coletam informações:
            </p>
            
            <h3>Serviços Utilizados</h3>
            <ul>
              <li><strong>EmailJS:</strong> Para funcionalidade de formulários de contato</li>
              <li><strong>Firebase:</strong> Para hospedagem e analytics básicos</li>
              <li><strong>Netlify:</strong> Para deployment e CDN do site</li>
              <li><strong>Google Fonts:</strong> Para tipografia (carregamento otimizado)</li>
            </ul>

            <h3>Proteções Implementadas</h3>
            <ul>
              <li>Todos os serviços terceiros são avaliados quanto à conformidade com GDPR</li>
              <li>Contratos de processamento de dados estabelecidos quando necessário</li>
              <li>Monitoramento regular da conformidade de terceiros</li>
              <li>Minimização de dados compartilhados com terceiros</li>
            </ul>

            <p>
              Estes serviços possuem suas próprias políticas de privacidade e medidas de proteção de dados.
            </p>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <h2>Transferências Internacionais</h2>
          <div className="section-content">
            <p>
              Quando transferimos dados para fora da União Europeia, garantimos proteções adequadas:
            </p>
            <ul>
              <li><strong>Cláusulas Contratuais Padrão:</strong> Para transferências para países terceiros</li>
              <li><strong>Decisões de Adequação:</strong> Transferências apenas para países com proteção adequada</li>
              <li><strong>Certificações:</strong> Verificação de certificações de segurança de provedores</li>
              <li><strong>Criptografia:</strong> Todos os dados são criptografados durante a transferência</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <h2>Menores de Idade</h2>
          <div className="section-content">
            <p>
              Nosso site não é direcionado a menores de 16 anos. Não coletamos intencionalmente 
              informações pessoais de menores. Se tomarmos conhecimento de que coletamos dados 
              de um menor, tomaremos medidas para excluir essas informações imediatamente.
            </p>
            <p>
              Se você é pai/mãe ou responsável e acredita que seu filho nos forneceu informações 
              pessoais, entre em contato conosco imediatamente.
            </p>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <h2>Informações de Contato</h2>
          <div className="section-content">
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos, entre em contato:
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
            
            <h3>Encarregado de Proteção de Dados (DPO)</h3>
            <p>
              Para questões específicas sobre proteção de dados, você pode entrar em contato 
              diretamente com nosso responsável pela proteção de dados através dos canais acima.
            </p>
          </div>
        </motion.section>

        <motion.section className="legal-section" variants={itemVariants}>
          <h2>Alterações nesta Política</h2>
          <div className="section-content">
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
              quaisquer alterações publicando a nova Política de Privacidade nesta página e 
              atualizando a data de "Última atualização".
            </p>
            <p>
              Para alterações significativas, forneceremos aviso mais proeminente, incluindo 
              notificação por email quando apropriado.
            </p>
            
            <h3>Histórico de Versões</h3>
            <ul>
              <li><strong>v2.0 - Janeiro 2025:</strong> Atualização completa com melhorias de segurança</li>
              <li><strong>v1.0 - Janeiro 2024:</strong> Versão inicial da política</li>
            </ul>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default Privacy;