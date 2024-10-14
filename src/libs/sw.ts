/// <reference types="vite-plugin-pwa/client" />

;(async () => {
  if (typeof window !== "undefined") {
    const { registerSW } = await import("virtual:pwa-register")
    registerSW()
  }
})()
