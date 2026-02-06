import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    proxy: {
      '/api': {
        target: 'https://apiskilltracker.tw1.ru', // ваш бекенд
        changeOrigin: true,
        secure: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@api': path.resolve(__dirname, './src/api'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@providers': path.resolve(__dirname, './src/providers'),
    },
  },
})