import withPWAInit from "@ducanh2912/next-pwa"

const withPWA = withPWAInit({
  dest: "public",
  fallbacks: {
    document: "/~offline",
  },
})

export default withPWA({
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: "export",
})
