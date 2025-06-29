// Utilitários de performance avançados
export class PerformanceUtils {
  // Debounce function melhorado
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate: boolean = false
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    let result: ReturnType<T>;

    return function(this: any, ...args: Parameters<T>) {
      const callNow = immediate && !timeout;
      
      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) result = func.apply(this, args);
      }, wait);
      
      if (callNow) result = func.apply(this, args);
      return result;
    };
  }

  // Throttle function melhorado
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number,
    options: { leading?: boolean; trailing?: boolean } = {}
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false;
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    
    const { leading = true, trailing = true } = options;

    return function(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        if (leading) func.apply(this, args);
        lastRan = Date.now();
        inThrottle = true;
      } else {
        if (trailing) {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      }
    };
  }

  // Lazy loading observer melhorado
  static createIntersectionObserver(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '50px',
      threshold: [0, 0.1, 0.5, 1],
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  }

  // Monitor de performance avançado
  static monitorPerformance(): void {
    // Memory monitoring
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.group('🧠 Memory Usage');
      console.log(`Used: ${Math.round(memory.usedJSHeapSize / 1048576)} MB`);
      console.log(`Total: ${Math.round(memory.totalJSHeapSize / 1048576)} MB`);
      console.log(`Limit: ${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`);
      console.log(`Usage: ${Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)}%`);
      console.groupEnd();
    }

    // Navigation timing
    if ('getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.group('⚡ Navigation Performance');
        console.log(`DNS Lookup: ${Math.round(navigation.domainLookupEnd - navigation.domainLookupStart)}ms`);
        console.log(`TCP Connect: ${Math.round(navigation.connectEnd - navigation.connectStart)}ms`);
        console.log(`Request: ${Math.round(navigation.responseStart - navigation.requestStart)}ms`);
        console.log(`Response: ${Math.round(navigation.responseEnd - navigation.responseStart)}ms`);
        console.log(`DOM Loading: ${Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)}ms`);
        console.log(`Total Load: ${Math.round(navigation.loadEventEnd - navigation.navigationStart)}ms`);
        console.groupEnd();
      }
    }

    // Core Web Vitals
    this.measureCoreWebVitals();
  }

  // Medição de Core Web Vitals
  static measureCoreWebVitals(): void {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`🎯 LCP: ${Math.round(lastEntry.startTime)}ms`);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        console.log(`👆 FID: ${Math.round(entry.processingStart - entry.startTime)}ms`);
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log(`📐 CLS: ${clsValue.toFixed(4)}`);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Otimização de imagens avançada
  static async optimizeImage(
    file: File, 
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      format?: 'jpeg' | 'webp' | 'png';
    } = {}
  ): Promise<Blob> {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
      format = 'jpeg'
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      img.onload = () => {
        // Calcular dimensões mantendo aspect ratio
        const aspectRatio = img.width / img.height;
        let { width, height } = img;

        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }

        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;

        // Aplicar filtros de qualidade
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          `image/${format}`,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Cache inteligente
  static createSmartCache<T>(maxSize: number = 100, ttl: number = 300000) {
    const cache = new Map<string, { value: T; timestamp: number; hits: number }>();

    return {
      get(key: string): T | null {
        const item = cache.get(key);
        if (!item) return null;

        // Verificar TTL
        if (Date.now() - item.timestamp > ttl) {
          cache.delete(key);
          return null;
        }

        // Incrementar hits para LRU
        item.hits++;
        return item.value;
      },

      set(key: string, value: T): void {
        // Limpar cache se exceder tamanho máximo
        if (cache.size >= maxSize) {
          // Remover item menos usado (LRU)
          let leastUsed = { key: '', hits: Infinity };
          for (const [k, v] of cache.entries()) {
            if (v.hits < leastUsed.hits) {
              leastUsed = { key: k, hits: v.hits };
            }
          }
          cache.delete(leastUsed.key);
        }

        cache.set(key, {
          value,
          timestamp: Date.now(),
          hits: 0
        });
      },

      clear(): void {
        cache.clear();
      },

      size(): number {
        return cache.size;
      }
    };
  }

  // Preload de recursos críticos
  static preloadResource(url: string, type: 'script' | 'style' | 'image' | 'font' = 'script'): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      
      switch (type) {
        case 'script':
          link.as = 'script';
          break;
        case 'style':
          link.as = 'style';
          break;
        case 'image':
          link.as = 'image';
          break;
        case 'font':
          link.as = 'font';
          link.crossOrigin = 'anonymous';
          break;
      }

      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload ${url}`));
      
      document.head.appendChild(link);
    });
  }

  // Detecção de conexão lenta
  static isSlowConnection(): boolean {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType === 'slow-2g' || 
             connection.effectiveType === '2g' ||
             connection.saveData === true;
    }
    return false;
  }

  // Bundle analyzer simples
  static analyzeBundleSize(): void {
    if ('getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      const analysis = resources.reduce((acc, resource) => {
        const type = this.getResourceType(resource.name);
        if (!acc[type]) acc[type] = { count: 0, size: 0 };
        
        acc[type].count++;
        acc[type].size += resource.transferSize || 0;
        
        return acc;
      }, {} as Record<string, { count: number; size: number }>);

      console.group('📦 Bundle Analysis');
      Object.entries(analysis).forEach(([type, data]) => {
        console.log(`${type}: ${data.count} files, ${Math.round(data.size / 1024)}KB`);
      });
      console.groupEnd();
    }
  }

  private static getResourceType(url: string): string {
    if (url.includes('.js')) return 'JavaScript';
    if (url.includes('.css')) return 'CSS';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'Images';
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'Fonts';
    return 'Other';
  }

  // Cleanup de event listeners
  static createEventManager() {
    const listeners: Array<{
      element: EventTarget;
      event: string;
      handler: EventListener;
      options?: boolean | AddEventListenerOptions;
    }> = [];

    return {
      add(
        element: EventTarget,
        event: string,
        handler: EventListener,
        options?: boolean | AddEventListenerOptions
      ) {
        element.addEventListener(event, handler, options);
        listeners.push({ element, event, handler, options });
      },

      remove(element: EventTarget, event: string, handler: EventListener) {
        element.removeEventListener(event, handler);
        const index = listeners.findIndex(
          l => l.element === element && l.event === event && l.handler === handler
        );
        if (index > -1) listeners.splice(index, 1);
      },

      cleanup() {
        listeners.forEach(({ element, event, handler }) => {
          element.removeEventListener(event, handler);
        });
        listeners.length = 0;
      }
    };
  }
}