/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		fontFamily: {
			heebo: ['Heebo', 'sans-serif'],
			source: ['Source Code Pro', 'monospace'],
			logofont: ['Archivo Black', 'sans-serif']
		},
		screens: {
			xs: '400px',
			sm: '640px'
		},
		extend: {
			colors: {
				grey: '#404040',
				pink1: '#d499ff',
				pink2: '#c97eff',
				black: '#000000',
				pink3: '#e3befd'
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};
