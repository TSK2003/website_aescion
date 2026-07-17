import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../apps/**/*.{ts,tsx}",
    "../../packages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#2E17C2",
          orange: "#F97316",
        },
        neutral: {
          gray: "#404040",
        },
      },
    },
  },
  plugins: [],
};
export default config;
