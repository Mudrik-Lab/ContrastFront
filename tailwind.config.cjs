/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#66BFF1",
        greyHeavy: "#6D6D6D",
        greyReg: "#999999",
        greyLight: "E9E9E9"
      },
      gridTemplateRows: {
        // Simple 12 row grid
        12: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
