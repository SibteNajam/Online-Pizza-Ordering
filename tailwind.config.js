/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      fontFamily: {
        sans: ['Roboto Mono'],
      },

      colors: {
        pizza: '#45fb56',
      },
    },
  },
  plugins: [],
};