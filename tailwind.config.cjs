/** @type {import('tailwindcss').Config} */
const colors = require('./src/utils/colors/colors.json');
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors
  },
  plugins: [],
}
