import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: [
      'myportfolio-7rdo.onrender.com',
      'www.joaocgaspar.pt'
    ]
  }
});
