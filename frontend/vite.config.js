import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindPostcss(), autoprefixer()]
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        timeout: 300000,
        proxyTimeout: 300000
      }
    }
  }
})
