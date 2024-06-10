/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        logo: 'Satisfy, cursive',
        cover: 'Amaranth, sans-serif'
      },
      colors: {
        bisque: '#ffe4c4'
      }
    }
  },
  darkMode: 'selector',
  plugins: []
};
