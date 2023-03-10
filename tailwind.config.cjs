/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    fontFamily: {
      Medieval: ["Peralta", "cursive"],
      Messiri: ["El Messiri", "sans-serif"],
      Solitreo: ["Solitreo", "cursive"],
    },
    extend: {
      backgroundImage: {
        backgroundLogo: "url('./assets/background.gif')",
        backgroundLoading: "url('./assets/loading.jpg')",
      },
      rotate: {
        720: "720deg",
      },
      colors: {
        blue: {
          700: "#213363",
          1000: "#011550",
        },
        red: {
          200: "#FF321B",
          300: "#D41500",
          400: "#742121",
          500: "#632121",
          600: "#601518",
          1000: "#320A0D",
        },
        gray: {
          100: "#E1E1E6",
          200: "#C4C4CC",
          400: "#7C7C8A",
          700: "#35353b",
          800: "#202024",
          900: "#1B1B1E",
          1000: "#121214",
          "opacity-10": "rgba(24, 24, 24, 0.52)",
          opacity: "rgba(0, 0, 0, 0.7)",
        },
        black: {
          opacity: "rgba(0, 0, 0, 0.76)",
          100: "rgba(0, 0, 0)",
          200: "#0B0B0B",
        },
        purple: {
          700: "#402164",
          1000: "#2F0153",
        },
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px)

      md: "768px",
      // => @media (min-width: 768px)

      lg: "1024px",
      // => @media (min-width: 1024px)

      xl: "1280px",
      // => @media (min-width: 1280px)

      "2xl": "1920px",
      // => @media (min-width: 1920px)
    },
  },
  plugins: [],
};
