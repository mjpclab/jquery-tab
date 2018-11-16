import $ from 'jquery';

function normalizeOptions(options?: JQueryTab.Options) {
	if (!options) {
		return;
	}

	const normalizedOptions = $.extend({}, options);
	const {mode} = normalizedOptions;
	if (mode) {
		if (mode !== JQueryTab.Mode.Horizontal && mode !== JQueryTab.Mode.Vertical) {
			normalizedOptions.mode = JQueryTab.Mode.Horizontal;
		}
	}

	return normalizedOptions;
}

export default normalizeOptions;
