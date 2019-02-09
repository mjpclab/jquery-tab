import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (format, filename) {
	const isMinify = filename.indexOf('.min') >= 0;

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
	getConfig('umd', 'jquery-tab'),
	getConfig('umd', 'jquery-tab.min')
];
