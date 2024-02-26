const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		require('postcss-import'),
		require('tailwindcss')(),
		require('postcss-preset-env')({ stage: 1 })
	]
};

module.exports = config;
