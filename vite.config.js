import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, './src/scripts'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
});