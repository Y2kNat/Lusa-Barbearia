import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    assetsInlineLimit: 0,
    // sem sourcemap: menos arquivos e menos peso no deploy
    sourcemap: false,
  },
})
