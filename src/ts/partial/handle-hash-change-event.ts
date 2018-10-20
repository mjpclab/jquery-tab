import $ from "jquery";

function handleHashChangeEvent(
	fnParseHashPosition: JQueryTab.fnParseHashPosition,
	fnSwitchTo: JQueryTab.fnSwitchTo,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
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