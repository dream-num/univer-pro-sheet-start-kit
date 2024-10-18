import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    cors: true,
    proxy: {
      '/universer-api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  define: {
    'process.env.UNIVER_CLIENT_LICENSE': '"%%UNIVER_CLIENT_LICENSE_PLACEHOLDER%%"',
  },
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
      },
    },
  },
})
