import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ← ДОБАВЬ ЭТО!

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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