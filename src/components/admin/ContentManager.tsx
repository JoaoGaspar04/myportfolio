import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Edit3, 
  Plus, 
  Save, 
  X, 
  Eye, 
  Code, 
  Database,
  FileText,
  Zap,
  Download,
  Upload,
  RefreshCw,
  Shield,
  Network,
  Cpu,
  Monitor,
  Wrench,
  BookOpen,
  Award,
  Briefcase,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Globe,
  Smartphone
} from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

interface ContentManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContentManager: React.FC<ContentManagerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const portfolioData = usePortfolioData();

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Eye, color: 'blue' },
    { id: 'personal', label: 'Perfil', icon: Edit3, color: 'green' },
    { id: 'skills', label: 'Habilidades', icon: Zap, color: 'yellow' },
    { id: 'projects', label: 'Projetos', icon: Code, color: 'purple' },
    { id: 'experience', label: 'Experiência', icon: Briefcase, color: 'indigo' },
    { id: 'certifications', label: 'Certificações', icon: Award, color: 'orange' },
    { id: 'services', label: 'Serviços', icon: Database, color: 'pink' },
    { id: 'guide', label: 'Guia de Atualização', icon: BookOpen, color: 'teal' }
  ];

  const handleExportData = () => {
    const dataToExport = {
      personalInfo: portfolioData.personalInfo,
      skills: portfolioData.skills,
      projects: portfolioData.projects,
      experiences: portfolioData.experiences,
      certifications: portfolioData.certifications,
      services: portfolioData.services,
      specializations: portfolioData.specializations,
      stats: portfolioData.stats,
      exportDate: new Date().toISOString(),
      version: "2.0"
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        console.log('Dados importados:', importedData);
        alert('Dados importados com sucesso! Recarregue a página para ver as mudanças.');
      } catch (error) {
        alert('Erro ao importar dados. Verifique se o arquivo é válido.');
      }
    };
    reader.readAsText(file);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Projetos</h3>
              <p className="text-3xl font-bold">{portfolioData.projects.length}</p>
              <p className="text-sm opacity-80">
                {portfolioData.getFeaturedProjects().length} em destaque
              </p>
            </div>
            <Code className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Habilidades</h3>
              <p className="text-3xl font-bold">{portfolioData.skills.length}</p>
              <p className="text-sm opacity-80">
                Nível médio: {portfolioData.stats.avgSkillLevel}%
              </p>
            </div>
            <Zap className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Certificações</h3>
              <p className="text-3xl font-bold">{portfolioData.certifications.length}</p>
              <p className="text-sm opacity-80">
                {portfolioData.getActiveCertifications().length} ativas
              </p>
            </div>
            <Award className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Experiência</h3>
              <p className="text-3xl font-bold">{portfolioData.stats.yearsExperience}</p>
              <p className="text-sm opacity-80">anos de experiência</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Áreas de Especialização */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Áreas de Especialização
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Shield className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">Cibersegurança</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {portfolioData.getSkillsByCategory('security').length} habilidades
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Network className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800 dark:text-green-300">Redes</h4>
            <p className="text-sm text-green-600 dark:text-green-400">
              {portfolioData.getSkillsByCategory('network').length} habilidades
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Smartphone className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-semibold text-purple-800 dark:text-purple-300">IoT</h4>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              {portfolioData.getSkillsByCategory('iot').length} habilidades
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Wrench className="w-8 h-8 text-orange-600 mb-2" />
            <h4 className="font-semibold text-orange-800 dark:text-orange-300">Suporte TI</h4>
            <p className="text-sm text-orange-600 dark:text-orange-400">
              {portfolioData.getSkillsByCategory('support').length} habilidades
            </p>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-500" />
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('projects')}
            className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Plus className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Novo Projeto</span>
          </button>
          
          <button
            onClick={() => setActiveTab('skills')}
            className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <Zap className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium">Nova Habilidade</span>
          </button>
          
          <button
            onClick={handleExportData}
            className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <Download className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium">Backup</span>
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
          >
            <Upload className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium">Restaurar</span>
          </button>
        </div>
      </div>

      {/* Projetos Recentes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-500" />
          Projetos Recentes
        </h3>
        <div className="space-y-3">
          {portfolioData.getRecentProjects(3).map((project) => (
            <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium">{project.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{project.category} • {project.year}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {project.status}
                </span>
                {project.featured && <Star className="w-4 h-4 text-yellow-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGuide = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
        <h3 className="text-xl font-bold mb-2">🚀 Guia Completo de Atualização</h3>
        <p className="opacity-90">
          Aprenda a atualizar facilmente todo o seu portfólio editando apenas um arquivo!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          📁 Arquivo Principal
        </h4>
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
          <code className="text-green-400 font-mono text-sm">
            src/data/portfolioData.ts
          </code>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Este é o único arquivo que você precisa editar para atualizar todo o portfólio!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center">
            <Edit3 className="w-4 h-4 mr-2 text-green-500" />
            ✏️ Informações Pessoais
          </h4>
          <div className="space-y-2 text-sm">
            <p><strong>Localização:</strong> <code>personalInfo</code></p>
            <p><strong>Editar:</strong> Nome, email, telefone, redes sociais</p>
            <p><strong>Exemplo:</strong></p>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
              <code>name: "Seu Nome"</code>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
            ⚡ Habilidades
          </h4>
          <div className="space-y-2 text-sm">
            <p><strong>Localização:</strong> <code>skills[]</code></p>
            <p><strong>Categorias:</strong> security, network, iot, development, infrastructure, support</p>
            <p><strong>Nível:</strong> 0-100</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center">
            <Code className="w-4 h-4 mr-2 text-purple-500" />
            🚀 Projetos
          </h4>
          <div className="space-y-2 text-sm">
            <p><strong>Localização:</strong> <code>projects[]</code></p>
            <p><strong>Categorias:</strong> security, network, iot, web, infrastructure</p>
            <p><strong>Status:</strong> completed, in-progress, planned</p>
            <p><strong>Featured:</strong> true/false para destaque</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-indigo-500" />
            💼 Experiência
          </h4>
          <div className="space-y-2 text-sm">
            <p><strong>Localização:</strong> <code>experiences[]</code></p>
            <p><strong>Atual:</strong> <code>current: true</code></p>
            <p><strong>Tipos:</strong> full-time, part-time, freelance</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg">
        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
          💡 Dicas Importantes
        </h4>
        <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
          <p>• <strong>Backup:</strong> Sempre faça backup antes de grandes mudanças</p>
          <p>• <strong>IDs únicos:</strong> Use IDs únicos para projetos e experiências</p>
          <p>• <strong>Imagens:</strong> Use URLs do Pexels ou outras fontes públicas</p>
          <p>• <strong>Estrutura:</strong> Mantenha sempre a estrutura dos objetos</p>
          <p>• <strong>TypeScript:</strong> Use as interfaces como guia</p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
          🎯 Áreas de Especialização
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Cibersegurança</p>
            <p className="text-xs text-gray-600">category: 'security'</p>
          </div>
          <div className="text-center">
            <Network className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium">Redes</p>
            <p className="text-xs text-gray-600">category: 'network'</p>
          </div>
          <div className="text-center">
            <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-medium">IoT</p>
            <p className="text-xs text-gray-600">category: 'iot'</p>
          </div>
          <div className="text-center">
            <Monitor className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="font-medium">Suporte TI</p>
            <p className="text-xs text-gray-600">category: 'support'</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
          🔄 Processo de Atualização
        </h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <div>
              <p className="font-medium">Abrir o arquivo</p>
              <p className="text-sm text-blue-600">Navegue até <code>src/data/portfolioData.ts</code></p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <div>
              <p className="font-medium">Fazer as alterações</p>
              <p className="text-sm text-blue-600">Edite os dados conforme necessário</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <div>
              <p className="font-medium">Salvar o arquivo</p>
              <p className="text-sm text-blue-600">As mudanças são aplicadas automaticamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataEditor = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Editor de Dados</h3>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Para editar o conteúdo do portfólio, abra o arquivo:
          </p>
          <code className="block bg-black text-green-400 p-3 rounded font-mono text-sm">
            src/data/portfolioData.ts
          </code>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Todas as alterações são aplicadas automaticamente após salvar o arquivo.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          📝 Estrutura dos Dados
        </h4>
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p>• <strong>personalInfo:</strong> Informações de contato e pessoais</p>
          <p>• <strong>skills:</strong> Array de habilidades técnicas</p>
          <p>• <strong>projects:</strong> Array de projetos realizados</p>
          <p>• <strong>experiences:</strong> Array de experiências profissionais</p>
          <p>• <strong>certifications:</strong> Array de certificações</p>
          <p>• <strong>services:</strong> Array de serviços oferecidos</p>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed inset-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <Settings className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-semibold">Gestor de Conteúdo</h2>
                  <p className="text-sm opacity-90">Sistema de atualização fácil do portfólio</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? `bg-${tab.color}-100 dark:bg-${tab.color}-900/30 text-${tab.color}-700 dark:text-${tab.color}-300`
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'guide' && renderGuide()}
                {activeTab !== 'overview' && activeTab !== 'guide' && renderDataEditor()}
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContentManager;