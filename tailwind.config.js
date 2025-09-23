/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", ".js"],
  theme: {
    extend: {
      keyframes: {
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)'},
        },
      },
      animation: {
        fadeRight: 'fadeRight 1s ease-out forwards',
        fadeLeft: 'fadeLeft 1s ease-out forwards',
        fadeUp: 'fadeUp 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}

