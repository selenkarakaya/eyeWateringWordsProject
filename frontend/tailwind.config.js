/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "1026px", xl: "1440px" },
    extend: {
      colors: {
        darkRed: "#921A40",
        mediumRed: "#C63C51",
        lightRed: "#D95F59",
        darkPink: "#8C3061",
        mediumPink: "#C75B7A",
        mediumBeige: "#D9ABAB",
        lightBeige: "#F4D9D0",
        purple: "#522258",
        black: "#021526",
        darkBlue: "#03346E",
        mediumBlue: "#6EACDA",
      },
      backgroundImage: {
        main: "url('../image/main2.jpg')",
      },
      size: {
        45: "45rem",
        35: "35rem",
        25: "25rem",
        15: "15rem",
      },
      fontFamily: {
        imbue: ['"Imbue"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
