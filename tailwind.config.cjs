/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // fontSize:{
    //   xxs: '0.625rem',
      
    // },

    extend: {
      boxShadow: {
        '3xl': '0px 11px 44px rgba(0, 0, 0, 0.1);',
        
      },
      colors: {
        blue: "#159DEA",
        grayHeavy: "#6D6D6D",
        grayReg: "#999999",
        grayLight: "#E9E9E9",
        grayFrame:"#CCCCCC",
        grayDisable:"#F2F2F2",
        yellow: "#D2CC7F",
        orange: "#D7A77F",
        pink:"#DB7C82",
        lilac: "#BD7DB2",
        purple: "#9379BB",
        navyBlue: "#6789B9",
        darkTeal: "#5A9DB4",
        darkBlue: "#3A5C8D",
        teal: "#58ACB5",
        lightGreen:"#72CC7C",
        lightTeal: "#5FB8A5",
        lightGreen: "#72CC7C",
        flourishRed: "#ED5252",
        revoltingGreen: "#088515"

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
      backgroundImage: {
        'brain': "url('../assets/images/brain-prism-wide.jpg')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
,
safelist: [{
  pattern: /(bg|text|border)-( blue|grayHeavy|grayReg|grayLight|grayFrame|grayDisable|yellow|orange|pink|lilac|purple|navyBlue|darkTeal|teal|lightGreen|lightTeal|lightGreen|flourishRed|revoltingGreen)/
}

]
};
