import { vitePlugin as remix } from "@remix-run/dev"
import { flatRoutes } from "remix-flat-routes"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      appDirectory: "src",
      ignoredRouteFiles: ["**/*"],
      routes: r => flatRoutes("routes", r, { appDir: "src" }),
      ssr: false,
    }),
    tsconfigPaths(),
  ],
})
