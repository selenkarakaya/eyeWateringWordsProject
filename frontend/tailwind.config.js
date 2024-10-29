/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "1026px", xl: "1440px" },
    extend: {
      colors: {
        darkestGreen: "#081c15",
        darkenGreen: "#1b4332",
        darkGreen: "#2d6a4f",
        mediumGreen: "#52b788",
        partialGreen: "#74c69d",
        lightGreen: "#95d5b2",
        lightenGreen: "#b7e4c7",
        lightestGreen: "#d8f3dc",
        darkPurple: "#3d0066",
        mediumPurple: "#510087",
        lightPurple: "#5c0099",
        darkYellow: "#fdc500",
        mediumYellow: "#ffdd32",
        lightYellow: "#ffe97f",
      },

      boxShadow: {
        hover: "0 20px 40px rgba(0,0,0,0.4)",
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
