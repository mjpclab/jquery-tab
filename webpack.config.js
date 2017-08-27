const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const PACKAGE_FILE = 'package.json';
const packageInfo = JSON.parse(fs.readFileSync(PACKAGE_FILE));

const getEntryConfig = function () {
	return path.resolve(__dirname, packageInfo.main);
};

const getOutputConfig = function (mainFileName) {
	return {
		library: packageInfo.name,
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist/'),
		filename: mainFileName + '.js'
	};
};

const getExternalsConfig = function () {
	return {
		jquery: {
			commonjs: 'jquery',
			commonjs2: 'jquery',
			amd: 'jquery',
			root: 'jQuery'
		}
	};
};

module.exports = [
	{
		entry: getEntryConfig(),
		output: getOutputConfig(packageInfo.name),
		externals: getExternalsConfig(),
		plugins: [],
		devtool: 'source-map'
	},
	{
		entry: getEntryConfig(),
		output: getOutputConfig(packageInfo.name + '.min'),
		externals: getExternalsConfig(),
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					properties: false
				},
				sourceMap: true
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			})
		],
		devtool: 'source-map'
	}
];