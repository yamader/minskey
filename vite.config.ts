import { reactRouter } from "@react-router/dev/vite"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    reactRouter({
      appDirectory: "src",
      prerender: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
    }),
    tsconfigPaths(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
