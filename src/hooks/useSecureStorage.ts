import { useState, useEffect, useCallback } from 'react';

interface StorageOptions {
  encrypt?: boolean;
  expiry?: number; // em milissegundos
}

export const useSecureStorage = <T>(
  key: string,
  defaultValue: T,
  options: StorageOptions = {}
) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simples "criptografia" usando base64 (para dados não sensíveis)
  const encrypt = (data: string): string => {
    if (!options.encrypt) return data;
    return btoa(encodeURIComponent(data));
  };

  const decrypt = (data: string): string => {
    if (!options.encrypt) return data;
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return data; // Fallback se não conseguir descriptografar
    }
  };

  const getStoredValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      const parsedItem = JSON.parse(decrypt(item));
      
      // Verificar expiração
      if (options.expiry && parsedItem.expiry && Date.now() > parsedItem.expiry) {
        localStorage.removeItem(key);
        return defaultValue;
      }

      return parsedItem.value || defaultValue;
    } catch (err) {
      console.error(`Erro ao ler ${key} do localStorage:`, err);
      setError('Erro ao carregar dados salvos');
      return defaultValue;
    }
  }, [key, defaultValue, options.expiry]);

  const setStoredValue = useCallback((newValue: T) => {
    try {
      const dataToStore = {
        value: newValue,
        expiry: options.expiry ? Date.now() + options.expiry : null
      };

      const serializedValue = encrypt(JSON.stringify(dataToStore));
      localStorage.setItem(key, serializedValue);
      setValue(newValue);
      setError(null);
    } catch (err) {
      console.error(`Erro ao salvar ${key} no localStorage:`, err);
      setError('Erro ao salvar dados');
    }
  }, [key, options.expiry, options.encrypt]);

  const removeStoredValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(defaultValue);
      setError(null);
    } catch (err) {
      console.error(`Erro ao remover ${key} do localStorage:`, err);
      setError('Erro ao remover dados');
    }
  }, [key, defaultValue]);

  useEffect(() => {
    const storedValue = getStoredValue();
    setValue(storedValue);
    setLoading(false);
  }, [getStoredValue]);

  // Listener para mudanças em outras abas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        const newValue = getStoredValue();
        setValue(newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, getStoredValue]);

  return {
    value,
    setValue: setStoredValue,
    removeValue: removeStoredValue,
    loading,
    error
  };
};