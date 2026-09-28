import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages project site: https://abuukar699.github.io/Mohammed_Portfolio/
const GH_PAGES_BASE = '/Mohammed_Portfolio/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? GH_PAGES_BASE : '/',
  plugins: [
    react(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        if (mode !== 'production') return
        const index = resolve('dist/index.html')
        const fallback = resolve('dist/404.html')
        if (existsSync(index)) copyFileSync(index, fallback)
      },
    },
  ],
}))
