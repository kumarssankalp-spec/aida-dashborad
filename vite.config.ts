import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor modules automatically
          if (id.includes('node_modules')) {
            // Example: react-related packages into "react-vendor"
            if (id.includes('react')) return 'react-vendor';
            // Example: other dependencies grouped by package name
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
      chunkSizeWarningLimit: 800, // adjust threshold if needed
    },
  },
});
