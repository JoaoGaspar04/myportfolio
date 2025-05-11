import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Globe, Cpu, ExternalLink, X } from 'lucide-react';
import NetworkDiagram from '../components/visualizations/NetworkDiagram';
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
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');

  // Project data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Login Form',
      description: 'Developed a secure user authentication system with registration and login features using PHP and MySQL.',
      category: 'web application',
      technologies: ['PHP', 'MySQL'],
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg', // (You can replace this with your preferred login form image)
      icon: null,
      details: 'This project features a user-friendly web page that allows users to register and securely log in. Built with PHP and connected to a MySQL database, it ensures the protection of user credentials through secure data handling practices. The application supports user registration, login authentication, and basic session management. All user data is stored securely in the database, and the system is designed to prevent common vulnerabilities such as SQL injection. This project demonstrates best practices in web development and user data security.',
    },
    {
      id: 2,
      title: 'Credit Card Form',
      description: 'Built an interactive credit card form using HTML, CSS, and JavaScript, featuring real-time card preview and dynamic data display.',
      category: 'web application',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg', // Replace with your preferred image
      icon: null,
      details: 'This project features an interactive credit card form developed with HTML, CSS, and JavaScript. As users fill in the card number, cardholder name, expiration date, and CVV, the form dynamically updates a visual card preview in real time. The implementation includes DOM manipulation, input validation, and smooth CSS transitions for an engaging user experience. The project simulates a real credit card interface and demonstrates best practices in modern web UI development, including responsive design and accessibility considerations.'
    },
    {
      id: 3,
      title: 'Book Sell',
      description: 'Developed a PHP-based bookselling website where users can browse books, add items to a shopping cart, and make payments securely.',
      category: 'web application',
      technologies: ['PHP'],
      image: 'https://images.pexels.com/photos/279222/pexels-photo-279222.jpeg', // Substitute with your preferred book-related image
      icon: null,
      details: 'This project is a dynamic bookselling platform built with PHP. Users can browse a catalog of books, add selected titles to their shopping cart, and proceed to checkout for payment. The application features session-based cart management, product listing from a database, and secure handling of user actions like adding, removing, or updating cart items. The site demonstrates core e-commerce functionalities such as displaying book details, managing stock, and processing orders, following best practices in PHP web development.'
    },
    {
      id: 4,
      title: 'Multiplication Table',
      description: 'Created a Python function to generate and display the multiplication table for any integer provided by the user.',
      category: 'utility',
      technologies: ['Python'],
      image: 'https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg', // Substitute with your preferred math/table image
      icon: null,
      details: 'This project features a Python function called multiplication_table(x) that calculates and displays the multiplication table for a user-supplied integer. When a user inputs an integer, the server responds with a neatly formatted multiplication table for that value, showing the results of multiplying the input number by 1 through 10. The function organizes the output for clarity, making it easy for users to understand and use the results. This project demonstrates fundamental programming concepts such as loops, user input handling, and formatted output in Python.'
    },
    {
      id: 6,
      title: 'My Server',
      description: 'Set up a Proxmox server hosting multiple virtual machines and containers, each running different systems for various workloads.',
      category: 'infrastructure',
      technologies: ['Proxmox'],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg', // Substitute with your preferred server image
      icon: null,
      details: 'This project involves configuring a Proxmox Virtual Environment (VE) on a dedicated computer to manage multiple VMs (Virtual Machines) and LXC containers, each running distinct operating systems and services. Proxmox VE provides a unified web interface for easy management, supports both full virtualization (KVM) and lightweight containers (LXC), and offers flexible storage options for VM and container images. The setup allows for efficient resource allocation, isolation, and scalability, making it suitable for development, testing, or production workloads. Key features include snapshot and backup management, high availability options, and centralized control of all virtualized resources.'
    },
    {
      id: 7,
      title: 'Residential Model',
      description: 'Developed a prototype smart home model using Arduino, enabling remote control and monitoring of household systems via a mobile device.',
      category: 'automation',
      technologies: ['Arduino'],
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', // Substitute with your preferred home automation image
      icon: null,
      details: 'This project was created for the Professional Aptitude Project, addressing the increasing integration of electronics in daily life to enhance efficiency and accessibility in residential environments. The prototype consists of a model house equipped with Arduino-based components, allowing users to remotely control and monitor devices such as lights, fans, or appliances through a mobile device. The system leverages Arduino’s ability to interface with relays and sensors, supporting wireless communication modules (e.g., Bluetooth or Wi-Fi) for remote operation. The solution demonstrates core home automation concepts, including real-time device management and remote status monitoring, and can be expanded to integrate additional smart features as needed.'
    },
    {
      id: 8,
      title: 'Website in HTML, CSS, JavaScript',
      description: 'Developed a company website for SupportDreams.LDA using HTML, CSS, and JavaScript, featuring centralized information management and customer relationship tools for the accounting sector.',
      category: 'web application',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg', // Substitute with your preferred website image
      icon: null,
      details: 'This project consists of a modern website built for SupportDreams.LDA to centralize company information and manage customer relationships in the accounting field. The frontend was developed using HTML, CSS, and JavaScript to create a responsive and interactive user experience. For user authentication and registration, Firebase was integrated, providing a secure and efficient login process. Data management for customers, products, and sellers was achieved using QuintaDB, which enabled the creation and handling of dynamic forms. The site demonstrates best practices in web development, including modular code structure, secure authentication, and seamless integration with external data platforms.'
    },
    {
      id: 9,
      title: 'Web Portfolio',
      description: 'Developed a simple personal website using Django and Python to showcase skills, projects, and professional experiences, including sections for About Me, Project Portfolio, and Contact Information.',
      category: 'web application',
      technologies: ['Django', 'Python'],
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg', // Substitute with your preferred portfolio image
      icon: null,
      details: 'This project features a personal web portfolio built with Django, designed to highlight key skills, completed projects, and professional background. The site includes an About Me section, a dynamic project gallery, and a contact form. Django’s modular architecture was used to create separate apps for static pages and project listings, leveraging models, views, templates, and the Django admin interface for easy content management. The website structure follows best practices for maintainability and scalability, with responsive design for optimal viewing on any device. This project demonstrates proficiency in Python web development and the use of Django’s core features for building modern, content-driven sites.'
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

  return (
    <motion.div
      className="projects-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants}>Recent Projects</motion.h1>

      <motion.div
        className="project-filters"
        variants={itemVariants}
      >
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'web application' ? 'active' : ''}`}
          onClick={() => setFilter('web application')}
        >
          Web Application
        </button>
        <button
          className={`filter-btn ${filter === 'infrastructure' ? 'active' : ''}`}
          onClick={() => setFilter('infrastructure')}
        >
          Infrastructure
        </button>
        <button
          className={`filter-btn ${filter === 'utility' ? 'active' : ''}`}
          onClick={() => setFilter('utility')}
        >
          Utility
        </button>
        <button
          className={`filter-btn ${filter === 'automation' ? 'active' : ''}`}
          onClick={() => setFilter('automation')}
        >
          Automation
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
              boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)'
            }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-card-image" style={{ backgroundImage: `url(${project.image})` }}>
              <div className="project-category">
                {project.icon}
                <span>{project.category}</span>
              </div>
            </div>
            <div className="project-card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
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
        <h2>Interactive Network Visualization</h2>
        <p>Explore an interactive topology of a secured  network</p>
        <div className="diagram-container">
          <NetworkDiagram width={800} height={400} interactive={true} />
        </div>
      </motion.section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="modal-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="project-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()} // Impede fechar ao clicar dentro
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>
              <div
                className="modal-image"
                style={{ backgroundImage: `url(${selectedProject.image})` }}
              >
                <div className="project-category modal-category">
                  {selectedProject.icon}
                  <span>{selectedProject.category}</span>
                </div>
              </div>
              <div className="modal-content">
                <h2>{selectedProject.title}</h2>
                <div className="modal-technologies">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="modal-description">
                  <p>{selectedProject.details}</p>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-primary">
                    <ExternalLink size={16} />
                    Case Study
                  </button>
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