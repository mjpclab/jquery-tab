import $ from 'jquery';
import normalizeOptions from '../utility/normalize-options';
import tablize from './tablize';

function tabPlugin(this: JQuery, options?: JQueryTab.Options) {
	const normalizedOptions = normalizeOptions(options);
	this.each(function (index, region) {
		tablize($(region), normalizedOptions);
	});

	return this;
}

export default tabPlugin;
