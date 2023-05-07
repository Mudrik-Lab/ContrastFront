/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 11px 44px rgba(0, 0, 0, 0.1);',
        
      },
      colors: {
        blue: "#66BFF1",
        grayHeavy: "#6D6D6D",
        grayReg: "#999999",
        grayLight: "#E9E9E9",
        yellow: "#D2CC7F",
        orange: "#D7A77F",
        pink:"#DB7C82",
        lilac: "#BD7DB2",
        purple: "#9379BB",
        navyBlue: "#6789B9",
        darkTeal: "#5A9DB4",
        teal: "#58ACB5",
        lightGreen:"#72CC7C",
        lightTeal: "#5FB8A5",
        lightGreen: "#72CC7C",

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
  plugins: [
    require('flowbite/plugin')
]
,
};
