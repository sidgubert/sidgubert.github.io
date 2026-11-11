import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' gera caminhos relativos -> funciona no GitHub Pages (raiz ou subpasta)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})

