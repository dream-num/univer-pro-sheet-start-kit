/// <reference types="vite/client" />

import type { FUniver } from '@univerjs-pro/facade'

declare global {
  interface Window {
    univerAPI: FUniver
  }
}

export {}
