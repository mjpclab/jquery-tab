import $ from "jquery";
function handleHashChangeEvent(fnParseHashIndex, fnSwitchTo, context, options) {
    if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
            const hashIndex = fnParseHashIndex();
            if (hashIndex > -1 && hashIndex !== context.currentIndex) {
                fnSwitchTo(hashIndex);
            }
        });
    }
}
export default handleHashChangeEvent;
