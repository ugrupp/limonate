module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
    extend: {
      fontFamily: {
        sans: ["rzzaaa", "Georgia", "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
