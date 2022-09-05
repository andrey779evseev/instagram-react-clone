/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      dark: '#262626',
      gray50: '#8E8E8E',
      gray20: '#DBDBDB',
      gray10: '#EFEFEF',
      cobalt: '#0095F6',
      red: '#ed4956',
      white: '#fff',
      green: '#33b626'
    }
  },
  plugins: [],
}
