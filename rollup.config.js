import terser from '@rollup/plugin-terser';

const getConfig = function (filename) {
	const isMinify = filename.indexOf('.min') >= 0;

	const config = {
		input: 'built/index.js',
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
			isMinify && terser({
				compress: {ie8: true}
			})
		],
	};

	return config;
};

export default [
	getConfig('jquery-tab'),
	getConfig('jquery-tab.min')
];
