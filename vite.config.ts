import react from '@vitejs/plugin-react'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import * as path from 'path'
import { defineConfig } from 'vite'
import { scssColor } from './src/utils/colors/ColorParser'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
	],
	base: 'https://insta-react-clone.vercel.app/',
	resolve: {
		alias: {
			'@guards': path.resolve(__dirname, './src/guards'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@store': path.resolve(__dirname, './src/store'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@api': path.resolve(__dirname, './src/api'),
			'@models': path.resolve(__dirname, './src/models'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@components': path.resolve(__dirname, './src/components'),
			'@hoc': path.resolve(__dirname, './src/hoc'),
			'@config': path.resolve(__dirname, './src/config'),
			'@providers': path.resolve(__dirname, './src/providers'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: scssColor(),
			},
		},
	},
})
