import $ from 'jquery';

function getExpandedOptions(
	defaultOptions: JQueryTab.NecessaryOptions,
	dataOptions: JQueryTab.Options,
	customOptions?: JQueryTab.Options,
): JQueryTab.ExpandedOptions {
	const options: JQueryTab.NecessaryOptions = $.extend({}, defaultOptions, dataOptions, customOptions);

	const {tabContainerClass, labelContainerClass, labelItemClass, panelItemClass} = options;

	const expandedOptions: JQueryTab.ExpandedOptions = $.extend(options, {
		horizontalTabContainerClass: tabContainerClass + '-horizontal',
		verticalTabContainerClass: tabContainerClass + '-vertical',

		headerLabelContainerClass: labelContainerClass + '-header',
		footerLabelContainerClass: labelContainerClass + '-footer',

		activeLabelItemClass: labelItemClass + '-active',
		inactiveLabelItemClass: labelItemClass + '-inactive',

		activePanelItemClass: panelItemClass + '-active',
		inactivePanelItemClass: panelItemClass + '-inactive',
	});

	return expandedOptions;
}

export default getExpandedOptions;