import $ from "jquery";
function handleHashChangeEvent(fnParseHashPosition, fnSwitchTo, context, options) {
    if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
            const hashIndex = fnParseHashPosition();
            if (hashIndex > -1 && hashIndex !== context.currentIndex) {
                fnSwitchTo(hashIndex);
            }
        });
    }
}
export default handleHashChangeEvent;
