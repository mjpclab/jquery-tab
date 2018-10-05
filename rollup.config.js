import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (isMinify) {
	const config = {
		input: 'src/built/index.js',
		output: {
			name: 'jquery-tab',
			format: 'umd',
			globals: {
				jquery: 'jQuery'
			},
			dir: 'dist',
			file: `jquery-tab${isMinify ? '.min' : ''}.js`,
		},
		external: ['jquery'],
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			babel(),
			isMinify && uglify()
		],
	};

	return config;
};

export default [
	getConfig(false),
	getConfig(true)
];