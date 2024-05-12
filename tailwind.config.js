/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      red: "#ff1100",
      neutral: {
        25: "#fafafa",
        50: "#f2f2f2",
        75: "#d8d8d88f",
        100: "#d8d8d8",
        200: "#c5c5c5",
        300: "#aaaaaa",
        400: "#999999",
        500: "#808080",
        600: "#747474",
        700: "#5b5b5b",
        800: "#464646",
        900: "#363636",
      },
      orange: {
        50: "#fdfdfd",
        100: "#ffd6b0",
        200: "#ffc28a",
        300: "#ffa754",
        400: "#ff9533",
        500: "#ea7a12",
        600: "#e87000",
        700: "#b55700",
        800: "#8c4400",
        900: "#6b3400",
      },
      turquoise: {
        50: "#f1f9f8",
        100: "#d4ebe9",
        200: "#bfe2de",
        300: "#a1d4cf",
        400: "#8fccc6",
        500: "#73bfb8",
        600: "#69aea7",
        700: "#528883",
        800: "#3f6965",
        900: "#30504d",
      },
      blue: {
        50: "#e9f0f7",
        100: "#bbcfe5",
        200: "#9ab8d8",
        300: "#6c97c6",
        400: "#4f83bb",
        500: "#2364aa",
        550: "#205b9bc5",
        600: "#205b9b",
        700: "#194779",
        800: "#13375e",
        900: "#0f2a47",
      },
      lightBlue: {
        50: "#ecf6fb",
        100: "#c3e3f3",
        200: "#a6d6ee",
        300: "#7dc3e6",
        400: "#64b7e1",
        500: "#3da5d9",
        600: "#3896c5",
        700: "#2b759a",
        800: "#225b77",
        900: "#1a455b",
      },
    },
    fontFamily: {
      "roboto-slab": ["Roboto Slab"],
    },

    screens: {
      largeDesktop: "1440px",
      desktop: "992px",
      tablet: "768px",
      largePhone: "600px",
    },

    extend: {
      boxShadow: {
        "3xl": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        custom1:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        custom2: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)",
        custom3: "rgba(149, 157, 165, 0.2) 0px 10px 24px;",
        custom4: "box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        custom5: "inset -24px -1px 46px -44px rgba(0,0,0,0.09);",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "10xl": "100rem",
      },
      spacing: {
        custom: "clamp(2.5rem, 20.5vw - 11rem, 10rem)",
      },
      fontSize: {
        xs2: "0.8125rem",
        "2.5xl": "29px",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
