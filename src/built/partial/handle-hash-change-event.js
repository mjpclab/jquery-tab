import $ from "jquery";
function handleHashChangeEvent(fnParseHashPosition, fnSwitchTo, options) {
    if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
            const position = fnParseHashPosition();
            fnSwitchTo(position);
        });
    }
}
export default handleHashChangeEvent;
