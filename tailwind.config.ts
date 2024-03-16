import { Config } from "tailwindcss"

export default {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        misskey: "#86b300",
      },
      fontFamily: {
        inter: ["Inter Variable"],
        mono: ["Fira Code Variable"],
        zkgn: ["Zen Kaku Gothic New"],
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")({
      variantPrefix: "rdx",
    }),
    function ({ addVariant }: { addVariant: (name: string, selector: string) => void }) {
      addVariant("child", "& > *")
    },
  ],
} satisfies Config
