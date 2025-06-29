import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Clock, Star, Tag } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  relevance: number;
  type: 'page' | 'project' | 'skill' | 'content';
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dados de busca simulados
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Sobre Mim',
      description: 'Conheça minha experiência em cibersegurança e background profissional',
      category: 'Página',
      url: '/about',
      relevance: 0.9,
      type: 'page'
    },
    {
      id: '2',
      title: 'Habilidades Técnicas',
      description: 'Network Security, IoT Protection, Python, Java e mais',
      category: 'Competências',
      url: '/skills',
      relevance: 0.85,
      type: 'page'
    },
    {
      id: '3',
      title: 'Sistema de Login Seguro',
      description: 'Projeto de autenticação com PHP e MySQL',
      category: 'Projeto',
      url: '/projects',
      relevance: 0.8,
      type: 'project'
    },
    {
      id: '4',
      title: 'Contato',
      description: 'Entre em contato para consultoria em cibersegurança',
      category: 'Página',
      url: '/contact',
      relevance: 0.75,
      type: 'page'
    },
    {
      id: '5',
      title: 'Network Security',
      description: 'Especialização em segurança de redes e firewalls',
      category: 'Habilidade',
      url: '/skills#network-security',
      relevance: 0.9,
      type: 'skill'
    },
    {
      id: '6',
      title: 'Servidor Proxmox',
      description: 'Configuração de ambiente virtualizado',
      category: 'Projeto',
      url: '/projects',
      relevance: 0.7,
      type: 'project'
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recent-searches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simular delay de busca
    setTimeout(() => {
      const filtered = searchData.filter(item => {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        return searchTerms.some(term => 
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
        );
      }).sort((a, b) => b.relevance - a.relevance);

      setResults(filtered);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 300);
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    performSearch(searchQuery);
  };

  const handleSelect = (result: SearchResult) => {
    // Salvar busca recente
    const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recent-searches', JSON.stringify(newRecentSearches));

    onNavigate(result.url);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'project': return '🚀';
      case 'skill': return '⚡';
      case 'page': return '📄';
      default: return '🔍';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 9999,
              backdropFilter: 'blur(5px)'
            }}
          />
          
          <motion.div
            className="search-modal"
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '600px',
              backgroundColor: 'var(--color-background)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              zIndex: 10000,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Search size={20} style={{ color: 'var(--color-primary)' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar no portfólio..."
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'none',
                  fontSize: '18px',
                  color: 'var(--color-text)',
                  outline: 'none'
                }}
              />
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {/* Loading */}
              {isLoading && (
                <div style={{ 
                  padding: '40px', 
                  textAlign: 'center',
                  color: 'var(--color-text-secondary)'
                }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block' }}
                  >
                    <Search size={24} />
                  </motion.div>
                  <p style={{ marginTop: '12px' }}>Buscando...</p>
                </div>
              )}

              {/* Results */}
              {!isLoading && results.length > 0 && (
                <div>
                  <div style={{ 
                    padding: '12px 20px', 
                    fontSize: '14px', 
                    color: 'var(--color-text-secondary)',
                    borderBottom: '1px solid var(--color-border)'
                  }}>
                    {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                  </div>
                  
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        backgroundColor: index === selectedIndex ? 'var(--color-background-secondary)' : 'transparent',
                        borderBottom: index < results.length - 1 ? '1px solid var(--color-border)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                      whileHover={{ backgroundColor: 'var(--color-background-secondary)' }}
                    >
                      <div style={{ fontSize: '20px' }}>
                        {getTypeIcon(result.type)}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          margin: '0 0 4px 0', 
                          fontSize: '16px',
                          color: 'var(--color-text)'
                        }}>
                          {result.title}
                        </h4>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '14px',
                          color: 'var(--color-text-secondary)',
                          lineHeight: '1.4'
                        }}>
                          {result.description}
                        </p>
                        <div style={{
                          marginTop: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            fontSize: '12px',
                            color: 'var(--color-primary)',
                            backgroundColor: 'rgba(0, 255, 65, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '12px'
                          }}>
                            {result.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No results */}
              {!isLoading && query && results.length === 0 && (
                <div style={{ 
                  padding: '40px', 
                  textAlign: 'center',
                  color: 'var(--color-text-secondary)'
                }}>
                  <Search size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                    Nenhum resultado encontrado
                  </h3>
                  <p>Tente usar termos diferentes ou mais gerais</p>
                </div>
              )}

              {/* Recent searches */}
              {!query && recentSearches.length > 0 && (
                <div>
                  <div style={{ 
                    padding: '12px 20px', 
                    fontSize: '14px', 
                    color: 'var(--color-text-secondary)',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Clock size={16} />
                    Buscas recentes
                  </div>
                  
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearch(search)}
                      style={{
                        padding: '12px 20px',
                        cursor: 'pointer',
                        borderBottom: index < recentSearches.length - 1 ? '1px solid var(--color-border)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <Search size={16} style={{ color: 'var(--color-text-secondary)' }} />
                      <span style={{ color: 'var(--color-text)' }}>{search}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!query && recentSearches.length === 0 && (
                <div style={{ 
                  padding: '40px', 
                  textAlign: 'center',
                  color: 'var(--color-text-secondary)'
                }}>
                  <Search size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                    Buscar no portfólio
                  </h3>
                  <p>Digite para encontrar páginas, projetos e habilidades</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid var(--color-border)',
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <kbd style={{ 
                  padding: '2px 6px', 
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: '4px',
                  marginRight: '4px'
                }}>
                  ↑↓
                </kbd>
                navegar
                <kbd style={{ 
                  padding: '2px 6px', 
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: '4px',
                  margin: '0 4px 0 12px'
                }}>
                  ↵
                </kbd>
                selecionar
              </div>
              <div>
                <kbd style={{ 
                  padding: '2px 6px', 
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: '4px',
                  marginRight: '4px'
                }}>
                  esc
                </kbd>
                fechar
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdvancedSearch;