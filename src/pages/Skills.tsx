import React from 'react';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,      // Shield
  faLock,           // Lock
  faServer,         // Server
  faMicrochip,      // Cpu
  faProjectDiagram, // Network
  faWifi,           // Wifi
  faClock,          // Clock
  faCode,           // Code (genérico)
  faDatabase,       // Database (Django)
  faKey,            // OpenVPN
  faMicrochip as faArduino, // Arduino (usando microchip)
  faCodeBranch,     // VS Code
  faBug,            // Kali Linux
  faServer as faXampp // XAMPP (usando server)
} from '@fortawesome/free-solid-svg-icons';

import {
  faJava as faJavaBrand,
  faJs as faJsBrand,
  faPython as faPythonBrand,
  faPhp as faPhpBrand,
  faDocker as faDockerBrand,
  faLinux as faLinuxBrand,
  faHtml5 as faHtml5Brand,
  faCss3Alt as faCss3Brand,
  faWindows as faWindowsBrand
} from '@fortawesome/free-brands-svg-icons';

import '../styles/Skills.css';

// Definindo os ícones para cada skill
const skills = [
  { name: 'Network Security', level: 70, icon: faShieldAlt, category: 'security' },
  { name: 'Firewall Configuration', level: 50, icon: faLock, category: 'security' },
  { name: 'Server Administration', level: 45, icon: faServer, category: 'infrastructure' },
  { name: 'IoT Device Management', level: 70, icon: faMicrochip, category: 'iot' },
  { name: 'Network Topology', level: 55, icon: faProjectDiagram, category: 'infrastructure' },
  { name: 'Wireless Security', level: 75, icon: faWifi, category: 'security' },
  { name: 'Incident Response', level: 45, icon: faClock, category: 'security' },
  { name: 'Python Programming', level: 80, icon: faPythonBrand, category: 'development' },
  { name: 'HTML5', level: 75, icon: faHtml5Brand, category: 'web' },
  { name: 'CSS3', level: 70, icon: faCss3Brand, category: 'web' },
  { name: 'Java Development', level: 60, icon: faJavaBrand, category: 'development' },
  { name: 'JavaScript', level: 75, icon: faJsBrand, category: 'web' },
  { name: 'Django', level: 65, icon: faDatabase, category: 'web' },
  { name: 'PHP', level: 60, icon: faPhpBrand, category: 'web' },
  { name: 'Docker', level: 65, icon: faDockerBrand, category: 'devops' },
  { name: 'Linux Administration', level: 70, icon: faLinuxBrand, category: 'infrastructure' },
  { name: 'OpenVPN', level: 60, icon: faKey, category: 'security' },
  { name: 'Arduino', level: 55, icon: faMicrochip, category: 'iot' },
  { name: 'Visual Studio', level: 60, icon: faWindowsBrand, category: 'development' },
  { name: 'VS Code', level: 80, icon: faCodeBranch, category: 'development' },
  { name: 'Kali Linux', level: 65, icon: faBug, category: 'security' },
  { name: 'XAMPP', level: 50, icon: faServer, category: 'infrastructure' },
];

const certifications = [
  { name: 'Cybersecurty', year: '2025' },
  { name: 'Business', year: '2024' },
  { name: 'Business English', year: '2024' },
  { name: 'C-Academy – Advanced Cybersecurity Training', year: '2024' },
  { name: 'Citizen Cyber-informed', year: '2024' },
  { name: 'Cybersecure Citizen', year: '2024' },
  { name: 'Cybersecure Consumer', year: '2024' },
  { name: 'Cybersocial Citizen', year: '2024' },
  { name: 'E-Commerce and Commercial Management', year: '2024' },
  { name: 'Excel Course', year: '2024' },
  { name: 'Fundamentals of ChatGPT', year: '2024' },
  { name: 'GDPR for Citizens Attentive', year: '2024' },
  { name: 'Generative AI', year: '2024' },
  { name: 'Google: Artificial Intelligence and Productivity', year: '2024' },
  { name: 'I want to be digital', year: '2024' },
  { name: 'Initial Capacity Building of Incident Response Teams', year: '2024' },
  { name: 'Python', year: '2024' },
  { name: 'Supercomputing', year: '2024' },
  { name: 'Fundamentals of Ethical hacking', year: '2022' },
];


const tools = [
  'Network Security', 'Firewall Configuration', 'Server Administration', 'IoT Device Management', 'Network Topology',
  'Wireless Security', 'Incident Response', 'Python Programming', 'HTML5', 'CSS3', 'Java Development', 'JavaScript',
  'Django', 'PHP', 'Docker', 'Linux Administration', 'OpenVPN', 'Arduino', 'Visual Studio', 'VS Code', 'Kali Linux',
  'XAMPP', 'Wireshark', 'Nmap', 'Metasploit', 'Snort IDS', 'pfSense', 'OpenVAS', 'Burp Suite', 'Nessus', 'Splunk'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

const Skills = () => (
  <motion.div
    className="skills-container"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1 variants={itemVariants}>Technical Skills</motion.h1>
    <motion.div className="skills-grid" variants={itemVariants}>
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="skill-card"
          variants={itemVariants}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 10px 30px rgba(0, 255, 65, 0.15)'
          }}
        >
          <div className="skill-icon">
            <FontAwesomeIcon icon={skill.icon} size="2x" />
          </div>
          <div className="skill-info">
            <h3>{skill.name}</h3>
            <div className="skill-bar-container">
              <motion.div
                className="skill-bar"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              ></motion.div>
              <span className="skill-level">{skill.level}%</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    <div className="skills-sections">
      <motion.section className="certifications" variants={itemVariants}>
        <h2>Certifications</h2>
        <ul className="cert-list">
          {certifications.map((cert, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="cert-name">{cert.name}</div>
              <div className="cert-year">{cert.year}</div>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      <motion.section className="tools-section" variants={itemVariants}>
        <h2>Tools & Technologies</h2>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="tool-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 65, 0.1)' }}
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>

    <motion.section className="code-showcase" variants={itemVariants}>
      <h2>Code Knowledge</h2>
      <div className="code-terminal">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button red"></span>
            <span className="terminal-button yellow"></span>
            <span className="terminal-button green"></span>
          </div>
          <div className="terminal-title">bash_script.sh</div>
        </div>
        <div className="terminal-body">
          <pre><code>
{`#!/bin/bash
# Network Security Monitoring Script

echo "Starting network security scan..."

# Check open ports
echo "Scanning for open ports..."
nmap -sS -p 1-1000 192.168.1.0/24 > scan_results.txt

# Check for suspicious connections
echo "Analyzing current connections..."
netstat -tunap | grep -v "127.0.0.1" > connections.txt

# Monitor system logs
echo "Checking system logs for intrusion attempts..."
grep -i "failed password" /var/log/auth.log | tail -n 20 > failed_logins.txt

# Alert on findings
echo "Scan complete. Results saved to security_report.txt"
`}
          </code></pre>
        </div>
      </div>
    </motion.section>
  </motion.div>
);

export default Skills;
