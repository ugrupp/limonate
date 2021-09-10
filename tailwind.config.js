/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.json",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      normal: 400,
      bold: 700,
    },
    colors: {
      light: "#FFF6A7",
      dark: "#000",
    },
    fontSize: {
      16: "1rem",
      20: "1.25rem",
      23: "1.4375rem",
      25: "1.5625rem",
      35: "2.1875rem",
      40: "2.5rem",
      50: "3.125rem",
      55: "3.4375rem",
      75: "4.6875rem",
    },
    spacing: {
      0: "0px",
      px: "1px",
      2: "0.125rem",
      4: "0.25rem",
      6: "0.375rem",
      8: "0.5rem",
      10: "0.625rem",
      15: "0.9375rem",
      16: "1rem",
      20: "1.25rem",
      30: "1.875rem",
      40: "2.5rem",
      50: "3.125rem",
      60: "3.75rem",
      70: "4.375rem",
      80: "5rem",
      90: "5.625rem",
    },
    extend: {
      fontFamily: {
        serif: ["rzzaaa", "Georgia", "serif"],
        sans: ["Brut Grotesque", "Arial", "sans-serif"],
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1600px",
        "3xl": "1920px",
      },
      maxWidth: {
        "8xl": `${1920 - 2 * 90}px`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
