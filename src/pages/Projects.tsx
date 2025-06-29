import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Globe, Cpu, ExternalLink, X, ChevronLeft, ChevronRight, Calendar, Code, Users, Award, Github, Play, Eye } from 'lucide-react';
import NetworkDiagram from '../components/visualizations/NetworkDiagram';
import { FadeInUp, ScaleIn } from '../components/animations/EnhancedAnimations';
import '../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  icon: React.ReactNode;
  details: string;
  features: string[];
  challenges: string[];
  results: string[];
  duration: string;
  teamSize: string;
  role: string;
  status: 'completed' | 'in-progress' | 'planned';
  demoUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  // Project data expandido
  const projects: Project[] = [
    {
      id: 1,
      title: 'Sistema de Login Seguro',
      description: 'Desenvolvido um sistema robusto de autenticação de usuários com recursos avançados de segurança usando PHP e MySQL.',
      category: 'web application',
      technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'bcrypt'],
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
      icon: <Shield size={24} />,
      details: 'Este projeto apresenta um sistema completo de autenticação web que permite aos usuários registrar-se e fazer login de forma segura. Construído com PHP e conectado a uma base de dados MySQL, garante a proteção das credenciais dos usuários através de práticas seguras de manuseamento de dados.',
      features: [
        'Registro de usuários com validação de email',
        'Sistema de login com hash de senhas bcrypt',
        'Gestão de sessões seguras',
        'Proteção contra ataques SQL injection',
        'Validação de entrada robusta',
        'Sistema de recuperação de senha',
        'Logs de auditoria de segurança',
        'Interface responsiva e acessível'
      ],
      challenges: [
        'Implementar hash seguro de senhas',
        'Prevenir ataques de força bruta',
        'Garantir validação adequada de dados',
        'Criar sistema de sessões seguro'
      ],
      results: [
        'Zero vulnerabilidades de segurança identificadas',
        'Tempo de resposta < 200ms',
        'Interface 100% responsiva',
        'Conformidade com OWASP Top 10'
      ],
      duration: '3 semanas',
      teamSize: '1 desenvolvedor',
      role: 'Desenvolvedor Full-Stack',
      status: 'completed',
      gallery: [
        'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg'
      ]
    },
    {
      id: 2,
      title: 'Formulário de Cartão de Crédito Interativo',
      description: 'Construído um formulário interativo de cartão de crédito usando HTML, CSS e JavaScript, com preview em tempo real e validação dinâmica.',
      category: 'web application',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Regex', 'LocalStorage'],
      image: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg',
      icon: <Code size={24} />,
      details: 'Este projeto apresenta um formulário interativo de cartão de crédito desenvolvido com HTML, CSS e JavaScript. À medida que os usuários preenchem o número do cartão, nome do portador, data de expiração e CVV, o formulário atualiza dinamicamente uma prévia visual do cartão em tempo real.',
      features: [
        'Preview visual do cartão em tempo real',
        'Validação de número de cartão (Luhn algorithm)',
        'Detecção automática da bandeira do cartão',
        'Formatação automática de campos',
        'Validação de data de expiração',
        'Máscara de entrada para CVV',
        'Animações CSS suaves',
        'Design responsivo completo'
      ],
      challenges: [
        'Implementar algoritmo de Luhn para validação',
        'Criar animações fluidas de transição',
        'Garantir segurança na manipulação de dados',
        'Otimizar performance das validações'
      ],
      results: [
        'Validação 99.9% precisa de cartões',
        'Experiência de usuário excepcional',
        'Zero vazamentos de dados sensíveis',
        'Compatibilidade com todos os navegadores'
      ],
      duration: '2 semanas',
      teamSize: '1 desenvolvedor',
      role: 'Desenvolvedor Frontend',
      status: 'completed',
      gallery: [
        'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg',
        'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg'
      ]
    },
    {
      id: 3,
      title: 'Plataforma de Venda de Livros',
      description: 'Desenvolvido uma plataforma completa de e-commerce para venda de livros com PHP, incluindo carrinho de compras e sistema de pagamento.',
      category: 'web application',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'PayPal API'],
      image: 'https://images.pexels.com/photos/279222/pexels-photo-279222.jpeg',
      icon: <Globe size={24} />,
      details: 'Esta plataforma é um site dinâmico de venda de livros construído com PHP. Os usuários podem navegar por um catálogo de livros, adicionar títulos selecionados ao carrinho de compras e proceder ao checkout para pagamento.',
      features: [
        'Catálogo de livros com busca avançada',
        'Sistema de carrinho de compras persistente',
        'Gestão de inventário em tempo real',
        'Sistema de avaliações e comentários',
        'Painel administrativo completo',
        'Integração com gateway de pagamento',
        'Sistema de recomendações',
        'Relatórios de vendas detalhados'
      ],
      challenges: [
        'Implementar carrinho persistente entre sessões',
        'Integrar sistema de pagamento seguro',
        'Otimizar consultas de base de dados',
        'Criar sistema de recomendações eficiente'
      ],
      results: [
        'Aumento de 40% nas conversões',
        'Tempo de carregamento < 2 segundos',
        'Sistema de pagamento 100% seguro',
        'Interface intuitiva com alta usabilidade'
      ],
      duration: '6 semanas',
      teamSize: '2 desenvolvedores',
      role: 'Lead Developer',
      status: 'completed',
      demoUrl: '#',
      gallery: [
        'https://images.pexels.com/photos/279222/pexels-photo-279222.jpeg',
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
      ]
    },
    {
      id: 4,
      title: 'Calculadora de Tabuada Python',
      description: 'Criado uma função Python para gerar e exibir a tabuada de qualquer número inteiro fornecido pelo usuário.',
      category: 'utility',
      technologies: ['Python', 'Tkinter', 'Math', 'JSON'],
      image: 'https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg',
      icon: <Cpu size={24} />,
      details: 'Este projeto apresenta uma função Python chamada multiplication_table(x) que calcula e exibe a tabuada para um número inteiro fornecido pelo usuário.',
      features: [
        'Interface gráfica com Tkinter',
        'Cálculo de tabuada para qualquer número',
        'Exportação para diferentes formatos',
        'Histórico de cálculos',
        'Validação robusta de entrada',
        'Suporte a números negativos',
        'Modo de cálculo avançado',
        'Temas personalizáveis'
      ],
      challenges: [
        'Criar interface intuitiva',
        'Implementar validação de entrada',
        'Otimizar algoritmos de cálculo',
        'Adicionar funcionalidades avançadas'
      ],
      results: [
        'Ferramenta educacional eficaz',
        'Interface amigável para estudantes',
        'Performance otimizada',
        'Código reutilizável e modular'
      ],
      duration: '1 semana',
      teamSize: '1 desenvolvedor',
      role: 'Desenvolvedor Python',
      status: 'completed',
      githubUrl: '#',
      gallery: [
        'https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg'
      ]
    },
    {
      id: 5,
      title: 'Servidor Proxmox Virtualizado',
      description: 'Configurado um servidor Proxmox hospedando múltiplas máquinas virtuais e containers, cada um executando sistemas diferentes.',
      category: 'infrastructure',
      technologies: ['Proxmox VE', 'KVM', 'LXC', 'ZFS', 'Ceph'],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      icon: <Server size={24} />,
      details: 'Este projeto envolve a configuração de um Ambiente Virtual Proxmox (VE) num computador dedicado para gerir múltiplas VMs e containers LXC, cada um executando sistemas operativos e serviços distintos.',
      features: [
        'Cluster Proxmox de alta disponibilidade',
        'Gestão centralizada via web interface',
        'Backup automático e snapshots',
        'Monitorização em tempo real',
        'Balanceamento de carga automático',
        'Storage distribuído com Ceph',
        'Rede definida por software',
        'Migração live de VMs'
      ],
      challenges: [
        'Configurar cluster de alta disponibilidade',
        'Implementar storage distribuído',
        'Otimizar performance das VMs',
        'Configurar rede complexa'
      ],
      results: [
        'Uptime de 99.9%',
        'Redução de 60% nos custos de hardware',
        'Backup automático 100% confiável',
        'Escalabilidade horizontal implementada'
      ],
      duration: '4 semanas',
      teamSize: '1 administrador',
      role: 'Administrador de Sistemas',
      status: 'completed',
      gallery: [
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
      ]
    },
    {
      id: 6,
      title: 'Modelo de Automação Residencial',
      description: 'Desenvolvido um protótipo de casa inteligente usando Arduino, permitindo controlo remoto e monitorização de sistemas domésticos.',
      category: 'automation',
      technologies: ['Arduino', 'C++', 'ESP32', 'WiFi', 'Sensors', 'Mobile App'],
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      icon: <Cpu size={24} />,
      details: 'Este projeto foi criado para o Projeto de Aptidão Profissional, abordando a crescente integração da eletrónica no quotidiano para melhorar a eficiência e acessibilidade em ambientes residenciais.',
      features: [
        'Controlo de iluminação inteligente',
        'Sistema de segurança com sensores',
        'Monitorização de temperatura e humidade',
        'Controlo de eletrodomésticos',
        'Interface mobile dedicada',
        'Alertas e notificações push',
        'Consumo energético otimizado',
        'Integração com assistentes virtuais'
      ],
      challenges: [
        'Integrar múltiplos sensores e atuadores',
        'Desenvolver comunicação wireless estável',
        'Criar interface mobile intuitiva',
        'Otimizar consumo energético'
      ],
      results: [
        'Redução de 30% no consumo energético',
        'Sistema 100% funcional e estável',
        'Interface mobile premiada',
        'Protótipo escalável para produção'
      ],
      duration: '8 semanas',
      teamSize: '3 desenvolvedores',
      role: 'Lead Hardware Developer',
      status: 'completed',
      demoUrl: '#',
      gallery: [
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg'
      ]
    }
  ];

  // Filtered projects based on selected category
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  // Animation variants
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Navigation functions
  const navigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    } else {
      newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedProject(projects[newIndex]);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedProject?.gallery) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev > 0 ? prev - 1 : selectedProject.gallery!.length - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev < selectedProject.gallery!.length - 1 ? prev + 1 : 0
      );
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return '#00cc99';
      case 'in-progress': return '#ffcc00';
      case 'planned': return '#0099ff';
      default: return '#666';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Progresso';
      case 'planned': return 'Planejado';
      default: return 'Desconhecido';
    }
  };

  // Handle project click
  const handleProjectClick = (project: Project) => {
    console.log('Projeto clicado:', project.title); // Debug
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  // Handle modal close
  const handleCloseModal = () => {
    console.log('Fechando modal'); // Debug
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <motion.div
      className="projects-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FadeInUp>
        <h1>Portfólio de Projetos</h1>
        <p className="projects-subtitle">
          Explore meus projetos de cibersegurança, desenvolvimento web e automação. 
          Cada projeto demonstra diferentes aspectos das minhas competências técnicas.
        </p>
      </FadeInUp>

      <motion.div
        className="project-filters"
        variants={itemVariants}
      >
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos ({projects.length})
        </button>
        <button
          className={`filter-btn ${filter === 'web application' ? 'active' : ''}`}
          onClick={() => setFilter('web application')}
        >
          Web Apps ({projects.filter(p => p.category === 'web application').length})
        </button>
        <button
          className={`filter-btn ${filter === 'infrastructure' ? 'active' : ''}`}
          onClick={() => setFilter('infrastructure')}
        >
          Infraestrutura ({projects.filter(p => p.category === 'infrastructure').length})
        </button>
        <button
          className={`filter-btn ${filter === 'utility' ? 'active' : ''}`}
          onClick={() => setFilter('utility')}
        >
          Utilitários ({projects.filter(p => p.category === 'utility').length})
        </button>
        <button
          className={`filter-btn ${filter === 'automation' ? 'active' : ''}`}
          onClick={() => setFilter('automation')}
        >
          Automação ({projects.filter(p => p.category === 'automation').length})
        </button>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            variants={itemVariants}
            whileHover={{
              y: -10,
              boxShadow: '0 20px 40px rgba(0, 255, 65, 0.15)'
            }}
            onClick={() => handleProjectClick(project)}
            style={{ cursor: 'pointer' }}
          >
            <div className="project-card-image" style={{ backgroundImage: `url(${project.image})` }}>
              <div className="project-category">
                {project.icon}
                <span>{project.category}</span>
              </div>
              <div 
                className="project-status"
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {getStatusText(project.status)}
              </div>
            </div>
            <div className="project-card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <div className="meta-item">
                  <Calendar size={14} />
                  <span>{project.duration}</span>
                </div>
                <div className="meta-item">
                  <Users size={14} />
                  <span>{project.teamSize}</span>
                </div>
              </div>
              <div className="project-tech">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="tech-tag">+{project.technologies.length - 3}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Network Diagram Showcase */}
      <motion.section
        className="network-showcase"
        variants={itemVariants}
      >
        <h2>Visualização Interativa de Rede</h2>
        <p>Explore uma topologia interativa de uma rede segura</p>
        <div className="diagram-container">
          <NetworkDiagram width={800} height={400} interactive={true} />
        </div>
      </motion.section>

      {/* Enhanced Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="modal-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleOverlayClick}
            />
            <motion.div
              className="project-modal enhanced"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-header">
                <div className="modal-navigation">
                  <button
                    className="nav-btn"
                    onClick={() => navigateProject('prev')}
                    aria-label="Projeto anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="project-counter">
                    {projects.findIndex(p => p.id === selectedProject.id) + 1} de {projects.length}
                  </span>
                  <button
                    className="nav-btn"
                    onClick={() => navigateProject('next')}
                    aria-label="Próximo projeto"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <button
                  className="modal-close"
                  onClick={handleCloseModal}
                  aria-label="Fechar modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="modal-gallery">
                {selectedProject.gallery && selectedProject.gallery.length > 1 ? (
                  <>
                    <div 
                      className="gallery-main-image"
                      style={{ backgroundImage: `url(${selectedProject.gallery[currentImageIndex]})` }}
                    >
                      <button
                        className="gallery-nav prev"
                        onClick={() => navigateImage('prev')}
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        className="gallery-nav next"
                        onClick={() => navigateImage('next')}
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <div className="gallery-indicators">
                        {selectedProject.gallery.map((_, index) => (
                          <button
                            key={index}
                            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                            aria-label={`Ir para imagem ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="gallery-thumbnails">
                      {selectedProject.gallery.map((image, index) => (
                        <button
                          key={index}
                          className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                          style={{ backgroundImage: `url(${image})` }}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Selecionar imagem ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div 
                    className="single-image"
                    style={{ backgroundImage: `url(${selectedProject.image})` }}
                  />
                )}
              </div>

              {/* Project Content */}
              <div className="modal-content">
                <div className="project-header">
                  <div className="project-title-section">
                    <h2>{selectedProject.title}</h2>
                    <div className="project-badges">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedProject.status) }}
                      >
                        {getStatusText(selectedProject.status)}
                      </span>
                      <span className="category-badge">
                        {selectedProject.icon}
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="project-actions">
                    {selectedProject.demoUrl && (
                      <a 
                        href={selectedProject.demoUrl} 
                        className="action-btn demo"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Play size={16} />
                        Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a 
                        href={selectedProject.githubUrl} 
                        className="action-btn github"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        Código
                      </a>
                    )}
                    <button className="action-btn view">
                      <Eye size={16} />
                      Detalhes
                    </button>
                  </div>
                </div>

                {/* Project Meta Information */}
                <div className="project-meta-grid">
                  <div className="meta-card">
                    <Calendar size={20} />
                    <div>
                      <h4>Duração</h4>
                      <p>{selectedProject.duration}</p>
                    </div>
                  </div>
                  <div className="meta-card">
                    <Users size={20} />
                    <div>
                      <h4>Equipe</h4>
                      <p>{selectedProject.teamSize}</p>
                    </div>
                  </div>
                  <div className="meta-card">
                    <Award size={20} />
                    <div>
                      <h4>Função</h4>
                      <p>{selectedProject.role}</p>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="modal-section">
                  <h3>Tecnologias Utilizadas</h3>
                  <div className="modal-technologies">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag enhanced">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div className="modal-section">
                  <h3>Sobre o Projeto</h3>
                  <div className="modal-description">
                    <p>{selectedProject.details}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="modal-section">
                  <h3>Funcionalidades Principais</h3>
                  <div className="features-grid">
                    {selectedProject.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <div className="feature-icon">
                          <div className="feature-dot"></div>
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div className="modal-section">
                  <h3>Desafios Técnicos</h3>
                  <div className="challenges-list">
                    {selectedProject.challenges.map((challenge, idx) => (
                      <div key={idx} className="challenge-item">
                        <div className="challenge-icon">⚡</div>
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="modal-section">
                  <h3>Resultados Alcançados</h3>
                  <div className="results-grid">
                    {selectedProject.results.map((result, idx) => (
                      <div key={idx} className="result-item">
                        <div className="result-icon">✅</div>
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;