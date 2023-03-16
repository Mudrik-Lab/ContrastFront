/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#66BFF1",
        grayHeavy: "#6D6D6D",
        grayReg: "#999999",
        grayLight: "#E9E9E9",
      },
      gridTemplateRows: {
        // Simple 12 row grid
        12: "repeat(12, minmax(0, 1fr))",
      },
      width: {
        128: "32rem",
        144: "36rem",
        192: "42rem",
        256: "64rem",
      },
    },
  },
  plugins: [],
};
