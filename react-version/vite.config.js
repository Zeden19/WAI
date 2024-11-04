// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        linkedin: resolve(__dirname, 'scripts/linkedin.js'),
        default: resolve(__dirname, 'src/popups/default/homePage.html'),
        addProfile: resolve(__dirname, 'src/popups/addProfile/addProfile.html'),

        background: resolve(__dirname, 'src/background.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    },
    outDir: 'dist', // Output to 'dist' folder
  }
});
