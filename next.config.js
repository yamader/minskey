import withPWAInit from "@ducanh2912/next-pwa"

const withPWA = withPWAInit({
  dest: "public",
  fallbacks: {
    document: "/~offline",
  },
})

export default withPWA({
  output: "export",
  images: {
    unoptimized: true,
  },
})
