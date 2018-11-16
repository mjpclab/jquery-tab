import $ from "jquery";
import tabPlugin from './tab-plugin';
function applyDefaultRegion() {
    var $regions = $('.tab-region');
    tabPlugin.call($regions);
}
export default applyDefaultRegion;
