const path = require('path');
const fs = require('fs');

const PACKAGE_FILE = 'package.json';
const thePackage = JSON.parse(fs.readFileSync(PACKAGE_FILE));

const jsEntryConfig = {
	[thePackage.name]: path.resolve(__dirname, thePackage.main),
};

const jsModuleConfig = {
	rules: [
		{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
	]
};

const getJsOutputConfig = function (isMinify) {
	return {
		library: '[name]',
		libraryTarget: 'umd',
		libraryExport: 'default',
		path: path.resolve(__dirname, 'dist/'),
		filename: '[name]' + (isMinify ? '.min' : '') + '.js'
	};
};

const jsExternalsConfig = {
	jquery: {
		commonjs: 'jquery',
		commonjs2: 'jquery',
		amd: 'jquery',
		root: 'jQuery'
	}
};

module.exports = [
	{
		mode: 'none',
		entry: jsEntryConfig,
		module: jsModuleConfig,
		output: getJsOutputConfig(false),
		externals: jsExternalsConfig,
	}, {
		mode: 'production',
		entry: jsEntryConfig,
		module: jsModuleConfig,
		output: getJsOutputConfig(true),
		externals: jsExternalsConfig,
	}
];
