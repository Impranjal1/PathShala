import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your API backend
        changeOrigin: true,             // Adjusts the origin of the host header
        secure: false,                 // Set to false if your API server is running over HTTP (not HTTPS)
      },
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',       // Ensure COOP is set
      'Cross-Origin-Embedder-Policy': 'require-corp',    // Ensure COEP is set
    },
  }
  
});
