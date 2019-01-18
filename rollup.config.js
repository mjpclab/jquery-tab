import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (format, isMinify, filename) {
	const config = {
		input: 'src/built/index.js',
		output: {
			name: 'jquery-tab',
			format: format,
			globals: {
				jquery: 'jQuery'
			},
			file: `dist/${filename}.js`,
		},
		external: ['jquery'],
		plugins: [
			resolve(),
			commonjs(),
			isMinify && uglify({ie8: true})
		],
	};

	return config;
};

export default [
	getConfig('umd', false, 'jquery-tab'),
	getConfig('umd', true, 'jquery-tab.min')
];
