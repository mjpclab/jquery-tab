import $ from "jquery";

function handleHashChangeEvent(
	fnParseHashPosition: JQueryTab.fnParseHashPosition,
	fnSwitchTo: JQueryTab.fnSwitchTo,
	options: JQueryTab.ExpandedOptions
) {
	if (options.statusHashTemplate && window) {
		$(window).on('hashchange', function () {
			const position = fnParseHashPosition();
			fnSwitchTo(position);
		});
	}
}

export default handleHashChangeEvent;