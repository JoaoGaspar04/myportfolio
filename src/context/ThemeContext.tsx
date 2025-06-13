import React, { createContext, useState, useContext, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to document
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
      
      // Dark mode CSS variables
      root.style.setProperty('--color-text', '#ffffff');
      root.style.setProperty('--color-text-secondary', '#a0a0a0');
      root.style.setProperty('--color-background', '#0a0a0a');
      root.style.setProperty('--color-background-secondary', '#111111');
      root.style.setProperty('--color-background-tertiary', '#1a1a1a');
      root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--color-border-hover', 'rgba(0, 255, 65, 0.3)');
      root.style.setProperty('--color-card-bg', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--color-input-bg', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--color-overlay', 'rgba(0, 0, 0, 0.8)');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
      
      // Light mode CSS variables
      root.style.setProperty('--color-text', '#1a1a1a');
      root.style.setProperty('--color-text-secondary', '#666666');
      root.style.setProperty('--color-background', '#ffffff');
      root.style.setProperty('--color-background-secondary', '#f8f9fa');
      root.style.setProperty('--color-background-tertiary', '#e9ecef');
      root.style.setProperty('--color-border', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--color-border-hover', 'rgba(0, 255, 65, 0.5)');
      root.style.setProperty('--color-card-bg', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--color-input-bg', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--color-overlay', 'rgba(255, 255, 255, 0.9)');
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};