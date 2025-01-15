import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ["vitest-setup.js"],
    environment: 'jsdom',
    dir: 'src/lbcamden/components/'
  }
})
