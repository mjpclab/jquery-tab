import $ from "jquery";
function handleHashChangeEvent(fnParseHashPosition, fnSwitchTo, options) {
    if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
            var position = fnParseHashPosition();
            fnSwitchTo(position);
        });
    }
}
export default handleHashChangeEvent;
