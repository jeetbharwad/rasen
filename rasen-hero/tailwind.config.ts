import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#071a28",
          900: "#0a2338",
          800: "#0e2f48",
        },
        teal: {
          600: "#0e7d8f",
          400: "#3fc3cf",
          200: "#bdeef2",
        },
        foam: "#f4fbfc",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
      maxWidth: {
        container: "1280px",
      },
      screens: {
        xs: "420px",
        '2xl': '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
