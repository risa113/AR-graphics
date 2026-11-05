import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/AR-graphics/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) {
            return 'vendor-three';
          }
          if (id.includes('gsap') || id.includes('split-type')) {
            return 'vendor-gsap';
          }
          if (id.includes('framer-motion') || id.includes('lenis')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        }
      }
    },
    chunkSizeWarningLimit: 900
  }
});
