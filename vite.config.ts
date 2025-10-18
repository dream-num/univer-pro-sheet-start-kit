import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'

import packageJson from './package.json'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    server: {
      cors: true,
      proxy: {
        '/universer-api': {
          target: env.UNIVER_ENDPOINT,
          changeOrigin: true,
          ws: true,
        },
      },
      allowedHosts: ['local.univer.plus'],
    },
    define: {
      'process.env.UNIVER_CLIENT_LICENSE': `"${env.UNIVER_CLIENT_LICENSE}"` || '"%%UNIVER_CLIENT_LICENSE_PLACEHOLDER%%"',
      'process.env.UNIVER_VERSION': `"${packageJson.dependencies['@univerjs/presets']}"`,
    },
    base: './',
    worker: {
      rollupOptions: {
        output: {
          entryFileNames: 'worker.js',
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'main.js',
        },
      },
    },
  })
}
