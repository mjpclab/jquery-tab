import $ from "jquery";
import SaveLoad from "./save-load";
import Switcher from "./switcher";

const EVENT_HASH_CHANGE = 'hashchange';

function handleHashChangeEvent(
	saveLoad: SaveLoad,
	switcher: Switcher,
	options: JQueryTab.ExpandedOptions
) {
	if (options.statusHashTemplate && window) {
		$(window).on(EVENT_HASH_CHANGE, function () {
			const position = saveLoad.parseHashPosition();
			switcher.switchTo(position);
		});
	}
}

export default handleHashChangeEvent;
