import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

// Solo logger limpio
const logger = createLogger();
const loggerError = logger.error;
logger.error = (msg, options) => {
  if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
    return;
  }
  loggerError(msg, options);
};

export default defineConfig({
  customLogger: logger,
  plugins: [
    react()
    // si quieres conservar transformIndexHtml lo puedes agregar aquí después
  ],
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
    allowedHosts: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@babel/parser',
        '@babel/traverse',
        '@babel/generator',
        '@babel/types'
      ]
    }
  }
});
