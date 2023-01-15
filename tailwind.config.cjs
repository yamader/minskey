module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        misskey: "#86b300",
      },
      fontFamily: {
        inter: ["var(--f-inter)"],
        zkgn: ["var(--f-zkgn)"],
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")({
      variantPrefix: "rdx",
    }),
  ],
}
