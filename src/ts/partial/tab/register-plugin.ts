import $ from 'jquery';
import tabPlugin from './tab-plugin'

function registerPlugin(pluginName: keyof typeof $.fn) {
	$.fn[pluginName] = tabPlugin;
}

export default registerPlugin;
