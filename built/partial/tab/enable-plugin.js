import $ from 'jquery';
import tabPlugin from './tab-plugin';
import applyDefaultRegion from './apply-default-region';
var enabled = false;
function enablePlugin() {
    $.fn.tab = tabPlugin;
    if (!enabled) {
        enabled = true;
        applyDefaultRegion();
    }
}
export default enablePlugin;
