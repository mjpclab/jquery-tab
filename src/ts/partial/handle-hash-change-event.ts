import $ from "jquery";

function handleHashChangeEvent(
	fnParseHashIndex: JQueryTab.fnParseHashIndex,
	fnSwitchTo: JQueryTab.fnSwitchTo,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
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