import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => ({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],

  build: {
    minify: 'terser' as const,
    terserOptions: {
      compress: {
        drop_console: true,
        dead_code: true,
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
}));
