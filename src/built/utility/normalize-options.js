import $ from 'jquery';
function normalizeOptions(options) {
    if (!options) {
        return;
    }
    var normalizedOptions = $.extend({}, options);
    var mode = normalizedOptions.mode;
    if (mode) {
        if (mode !== "horizontal" /* Horizontal */ && mode !== "vertical" /* Vertical */) {
            normalizedOptions.mode = "horizontal" /* Horizontal */;
        }
    }
    return normalizedOptions;
}
export default normalizeOptions;
