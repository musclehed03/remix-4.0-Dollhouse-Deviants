import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
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
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
build: {
  minify: 'terser',
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
        firebase: [
          'firebase/app',
          'firebase/auth',
          'firebase/firestore'
        ],
        react: [
          'react',
          'react-dom',
          'react-router-dom'
        ],
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
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
