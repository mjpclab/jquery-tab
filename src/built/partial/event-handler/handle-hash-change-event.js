import $ from "jquery";
var EVENT_HASH_CHANGE = 'hashchange';
function handleHashChangeEvent(saveLoad, switcher, options) {
    if (options.statusHashTemplate && window) {
        $(window).on(EVENT_HASH_CHANGE, function () {
            var position = saveLoad.parseHashPosition();
            switcher.switchTo(position);
        });
    }
}
export default handleHashChangeEvent;
