import withSerwistInit from "@serwist/next"

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
})

export default withSerwist({
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: false,
  output: "export",
})
