var JSDOM = require('jsdom').JSDOM;
var dom = new JSDOM('<p>hello world</p>');

var window = dom.window;
var jquery = require('jquery')(window);
require('../../src/js/jquery-tab')(jquery);
console.log(jquery.fn.tab);
