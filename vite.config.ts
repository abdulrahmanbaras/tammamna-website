import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/.test(id)) {
              return 'react';
            }
            if (id.includes('framer-motion')) return 'motion';
            return undefined;
          }
          // Arabic copy is a static import (language switching is instant, with
          // no loading state), but it gets its own chunk so it downloads in
          // parallel with the app shell and caches independently of it.
          if (id.includes('/data/ar/') || id.includes('dictionary.ar')) return 'i18n-ar';
          return undefined;
        },
      },
    },
  },
});
