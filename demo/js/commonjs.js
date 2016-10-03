var jsdom = require("jsdom");

jsdom.env(
	'<p>hello world</p>',
	function (err, window) {
		var jquery=require('jquery')(window);
		require('../../src/jquery-tab')(jquery);
		console.log(jquery.fn.tab);
	}
);