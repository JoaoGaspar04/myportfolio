import { useState, useEffect } from 'react';
import {
  personalInfo,
  skills,
  projects,
  experiences,
  certifications,
  services,
  specializations,
  stats,
  contactInfo,
  themeConfig
} from '../data/portfolioData';

// Hook para acessar todos os dados do portfólio
export const usePortfolioData = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Funções utilitárias
  const getProjectsByCategory = (category: string) => {
    return projects.filter(project => project.category === category);
  };

  const getFeaturedProjects = () => {
    return projects.filter(project => project.featured);
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getActiveCertifications = () => {
    return certifications.filter(cert => cert.status === 'active');
  };

  const getPopularServices = () => {
    return services.filter(service => service.popular);
  };

  const getCurrentExperience = () => {
    return experiences.find(exp => exp.current);
  };

  const getExperienceByType = (type: string) => {
    return experiences.filter(exp => exp.type === type);
  };

  // Estatísticas calculadas
  const getCalculatedStats = () => {
    return {
      ...stats,
      avgSkillLevel: Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length),
      totalYearsExperience: experiences.reduce((acc, exp) => {
        const start = new Date(exp.startDate);
        const end = exp.current ? new Date() : new Date(exp.endDate);
        const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
        return acc + years;
      }, 0),
      projectsInProgress: projects.filter(p => p.status === 'in-progress').length,
      projectsPlanned: projects.filter(p => p.status === 'planned').length
    };
  };

  return {
    // Dados principais
    personalInfo,
    skills,
    projects,
    experiences,
    certifications,
    services,
    specializations,
    stats: getCalculatedStats(),
    contactInfo,
    themeConfig,
    
    // Estado
    isLoading,
    
    // Funções utilitárias
    getProjectsByCategory,
    getFeaturedProjects,
    getSkillsByCategory,
    getActiveCertifications,
    getPopularServices,
    getCurrentExperience,
    getExperienceByType
  };
};

// Hook específico para projetos
export const useProjects = () => {
  const { projects, getProjectsByCategory, getFeaturedProjects } = usePortfolioData();

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const getRecentProjects = (limit: number = 3) => {
    return projects
      .sort((a, b) => b.year - a.year)
      .slice(0, limit);
  };

  const getProjectsByTechnology = (technology: string) => {
    return projects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  };

  return {
    projects,
    getProjectById,
    getProjectsByCategory,
    getFeaturedProjects,
    getRecentProjects,
    getProjectsByTechnology
  };
};

// Hook específico para habilidades
export const useSkills = () => {
  const { skills, getSkillsByCategory } = usePortfolioData();

  const getTopSkills = (limit: number = 5) => {
    return skills
      .sort((a, b) => b.level - a.level)
      .slice(0, limit);
  };

  const getSkillsByLevel = (minLevel: number) => {
    return skills.filter(skill => skill.level >= minLevel);
  };

  const getSkillCategories = () => {
    return [...new Set(skills.map(skill => skill.category))];
  };

  return {
    skills,
    getSkillsByCategory,
    getTopSkills,
    getSkillsByLevel,
    getSkillCategories
  };
};

// Hook específico para serviços
export const useServices = () => {
  const { services, getPopularServices } = usePortfolioData();

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };

  const getServicesByCategory = (category: string) => {
    return services.filter(service => service.category === category);
  };

  const getServicesByPriceRange = (minPrice: number, maxPrice: number) => {
    return services.filter(service => {
      if (service.pricing.type === 'hourly' || service.pricing.type === 'consultation') {
        const price = parseInt(service.pricing.value?.split(' - ')[0] || '0');
        return price >= minPrice && price <= maxPrice;
      }
      return true;
    });
  };

  return {
    services,
    getServiceById,
    getServicesByCategory,
    getPopularServices,
    getServicesByPriceRange
  };
};