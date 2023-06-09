import { UserConfigExport, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setup-tests.ts',
    coverage: {
      all: true,
    },
  },
} as UserConfigExport)
