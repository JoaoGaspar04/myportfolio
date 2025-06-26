import React from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, Shield, DownloadCloud, Network, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  const navigate = useNavigate();

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

  const handleDownloadResume = () => {
    window.open('https://rxresu.me/joaogaspar04/portfolio-publico', '_blank');
  };

  const handleConnect = () => {
    navigate('/contact');
  };

  // Experience timeline data
  const experiences = [
    {
      title: 'Technical Support Assistant',
      company: 'Freelance / Internship',
      period: '2024',
      description: 'Provided basic user support, troubleshooting Windows operating systems and office applications. Developed diagnostic and problem-solving skills in IT environments.'
    },
    {
      title: 'Junior Software Developer',
      company: 'Self-learning',
      period: '2022',
      description: 'Advanced knowledge in Python and Java for developing simple scripts and applications. Currently learning frameworks and best coding practices.'
    },
    {
      title: 'Network and Technical Support Specialist',
      company: 'Freelance / Internship',
      period: '2022',
      description: 'Supported end users and managed local networks, including configuration and maintenance of routers and switches. Advised on and managed security solutions for small and medium-sized environments.'
    },
    {
      title: 'IT Technician',
      company: 'Freelance / Internship',
      period: '2022',
      description: 'Supported and maintained Windows operating systems and productivity tools (Word, Excel, PowerPoint, Access). Managed social networks and email services (Gmail, Outlook, Hotmail). Configured and managed OpenWRT and Active Directory for corporate environments.'
    },
    {
      title: 'ETPos System Trainee',
      company: 'ETPos',
      period: '2022',
      description: 'Completed training on the ETPos billing system, covering its operation and various modules. Performed practical tests, including backup creation, peripheral integration, and execution of practical examples.'
    },
    {
      title: 'Arduino Developer',
      company: 'Academic Projects',
      period: '2022',
      description: 'Developed projects and solutions with Arduino, utilizing C programming and integrating sensors and actuators in embedded systems.'
    },
    {
      title: 'Cybersecurity Student',
      company: 'Self-learning',
      period: '2021',
      description: 'Acquired knowledge in implementing security practices in networks and systems, vulnerability analysis, and applying solutions to mitigate risks and protect data.'
    },
    {
      title: 'Web Developer',
      company: 'Freelance / Projects',
      period: '2021',
      description: 'Developed websites and web applications using HTML, CSS, and JavaScript, with ongoing study of frameworks such as Laravel. Created customized web solutions and automated processes.'
    }

  ];

  return (
    <motion.div
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        className="about-hero"
        variants={itemVariants}
      >
        <div className="about-content">
          <motion.h1 variants={itemVariants}>About Me</motion.h1>
          <motion.p variants={itemVariants} className="about-intro">
            Hi! I'm João Gaspar, a Computer Technician specialized in Network Management and Cybersecurity.
            Passionate about tech and digital security, I combine hands-on experience in networks, servers, and data protection with solid programming skills (Java, Python, PHP, JavaScript).
            I focus on building secure, efficient solutions and am constantly evolving as a cybersecurity professional.
          </motion.p>

          <motion.div
            className="about-actions"
            variants={itemVariants}
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
            >
              <DownloadCloud size={16} />
              Download CV
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnect}
            >
              <Users size={16} />
              Connect
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="terminal-animation"
          variants={itemVariants}
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button red"></span>
                <span className="terminal-button yellow"></span>
                <span className="terminal-button green"></span>
              </div>
              <div className="terminal-title">~/about_me</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-prompt">$</span> whoami
              </div>
              <div className="terminal-response">Cybersecurity Iniciant , Network Administrator and IT Support</div>

              <div className="terminal-line">
                <span className="terminal-prompt">$</span> ls -la skills/
              </div>
              <div className="terminal-response">
                drwxr-xr-x  network_security<br />
                drwxr-xr-x  infrastructure_management<br />
                drwxr-xr-x  iot_security<br />
                drwxr-xr-x  incident_response<br />
                drwxr-xr-x  support_it
              </div>

              <div className="terminal-line">
                <span className="terminal-prompt">$</span> cat mission.txt
              </div>
              <div className="terminal-response">
                To secure digital environments through expert implementation<br />
                of robust security measures and proactive defense strategies.
              </div>

              <div className="terminal-line">
                <span className="terminal-prompt">$</span> <span className="blinking-cursor">_</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="expertise-section"
        variants={itemVariants}
      >
        <h2>My Approach</h2>
        <div className="approach-grid">
          <motion.div
            className="approach-card"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 255, 65, 0.15)' }}
          >
            <div className="approach-icon">
              <MonitorSmartphone size={32} />
            </div>
            <h3>IT Support</h3>
            <p>
              I work in the maintenance and repair of computers, offering efficient technical support to ensure the optimized operation of the equipment and the quick resolution of technical problems.
            </p>
          </motion.div>

          <motion.div
            className="approach-card"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 255, 65, 0.15)' }}
          >
            <div className="approach-icon">
              <Shield size={32} />
            </div>
            <h3>Cybersecurity</h3>
            <p>
              I work on implementing cybersecurity measures, protecting systems and data against digital threats and guaranteeing the integrity, confidentiality and availability of information.            </p>
          </motion.div>

          <motion.div
            className="approach-card"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 255, 65, 0.15)' }}
          >
            <div className="approach-icon">
              <Network size={32} />
            </div>
            <h3>Network</h3>
            <p>
              I work on the installation, configuration and maintenance of computer networks, ensuring connectivity, performance and efficient troubleshooting to guarantee the availability and security of network infrastructures.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="experience-section"
        variants={itemVariants}
      >
        <h2>Experience Timeline</h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-content">
                <div className="timeline-date">{exp.period}</div>
                <h3>{exp.title}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p>{exp.description}</p>
              </div>
            </motion.div>
          ))}

          <div className="timeline-line"></div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;