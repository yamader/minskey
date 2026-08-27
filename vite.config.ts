import { copyFileSync } from "node:fs"
import { URL, fileURLToPath } from "node:url"
import preact from "@preact/preset-vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    preact(),
    {
      // GitHub Pages 用: SPA のディープリンクを index.html にフォールバックさせる
      name: "spa-fallback",
      apply: "build",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html")
      },
    },
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
  },
})
