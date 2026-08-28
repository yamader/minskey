import { copyFileSync } from 'node:fs'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    {
      // GitHub Pages 用: SPA のディープリンクを index.html にフォールバックさせる
      name: 'spa-fallback',
      apply: 'build',
      closeBundle() {
        copyFileSync('dist/index.html', 'dist/404.html')
      },
    },
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
