import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The proxy link used for testing in development phase.
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
})
