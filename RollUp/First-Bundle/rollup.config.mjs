import json from '@rollup/plugin-json';

export default {
	input: 'src/main.js',
	output: {
		file: 'build/main-bundle.js',
		format: 'cjs'
	},
	plugins: [json()]
};
