
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'

import packageJson from './package.json'

const __unconfig_default =  ({ mode }) => {
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

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;