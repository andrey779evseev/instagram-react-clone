/** @type {import('tailwindcss').Config} */
const colors = require('./src/utils/colors/colors.json')
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontSize: {
				s: '.625rem',
				xxl: '1.375rem',
			},
			keyframes: {
				bubble: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
					'100%': { transform: 'scale(1)' },
				},
			},
			animation: {
				buble: 'bubble .22s ease-in-out',
			},
		},
		colors,
	},
	plugins: [],
}
