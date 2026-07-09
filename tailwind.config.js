/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Hinge-like: cream canvas, white cards, restrained eggplant accent.
        canvas: "#F2EEE7",
        brand: {
          DEFAULT: "#5B2E8A",
          soft: "#8B5FB0",
          dark: "#2A1140",
        },
        ink: {
          DEFAULT: "#231F1D",
          muted: "#7D746B",
          faint: "#B7ADA3",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          sunken: "#F0EBE3",
        },
      },
      borderRadius: {
        card: "26px",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
