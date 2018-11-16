import $ from 'jquery';
import tabPlugin from './tab-plugin';
function registerPlugin(pluginName) {
    $.fn[pluginName] = tabPlugin;
}
export default registerPlugin;
