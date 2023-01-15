/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    fontFamily: {
      'medieval': ['Peralta', 'cursive']
    },
    extend: {
      backgroundImage: {
        backgroundLogo: "url('./assets/background.gif')",
        backgroundLoading: "url('./assets/loading.jfif')",
      },
      rotate: {
        '720': '720deg',
      },
      colors: {
        blue: {
          "1000": "rgb(0, 6, 97)"
        },
        red: {
          "300": "#fc1500",
          "blood-1000": "#320A0D",
          "blood-800": "#601518",
          "button": "#430000",
        },
        gray: {
          "1000": "#121214",
          "800": "#202024",
          "400": "#7C7C8A",
          "100": "#E1E1E6",
          "200": "#C4C4CC",
          "900": "#1B1B1E",
          "opacity-10": "rgba(24, 24, 24, 0.52)",
          "opacity": "rgba(0, 0, 0, 0.7)",
        },
        black: {
          "opacity": "rgba(0, 0, 0, 0.76)",
          "100": "rgba(0, 0, 0)",
        }
      },
    },
  },
  plugins: [],
};
