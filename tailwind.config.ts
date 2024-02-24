import { Config } from "tailwindcss"

export default {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        misskey: "#86b300",
      },
      fontFamily: {
        mono: ["var(--f-firacode)"],
        inter: ["var(--f-inter)"],
        zkgn: ["var(--f-zkgn)"],
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
