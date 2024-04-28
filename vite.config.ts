import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    cors: true,
    proxy: {
      '/universer-api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
