import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (filename) {
	const isMinify = filename.indexOf('.min') >= 0;

	const config = {
		input: 'src/built/index.js',
		output: {
			name: 'jquery-tab',
			format: 'umd',
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
	getConfig('jquery-tab'),
	getConfig('jquery-tab.min')
];
