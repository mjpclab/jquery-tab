import $ from 'jquery';

function expandedOptions(
	defaultOptions: JQueryTab.NecessaryOptions,
	dataOptions: JQueryTab.Options,
	customOptions?: JQueryTab.Options,
): JQueryTab.ExpandedOptions {
	const options: JQueryTab.NecessaryOptions = $.extend({}, defaultOptions, dataOptions, customOptions);

	const {mode, tabContainerClass, labelContainerClass, labelItemClass, panelContainerClass, panelItemClass} = options;

	const expandedOptions: JQueryTab.ExpandedOptions = $.extend(options, {
		modeTabContainerClass: tabContainerClass + '-' + mode,

		modeLabelContainerClass: labelContainerClass + '-' + mode,
		headerLabelContainerClass: labelContainerClass + '-header',
		modeHeaderLabelContainerClass: labelContainerClass + '-header' + '-' + mode,
		footerLabelContainerClass: labelContainerClass + '-footer',
		modeFooterLabelContainerClass: labelContainerClass + '-footer' + '-' + mode,

		tabItemNameAttr: 'tabItemName',

		activeLabelItemClass: labelItemClass + '-active',
		inactiveLabelItemClass: labelItemClass + '-inactive',
		disabledLabelItemClass: labelItemClass + '-disabled',
		hiddenLabelItemClass: labelItemClass + '-hidden',

		modePanelContainerClass: panelContainerClass + '-' + mode,

		activePanelItemClass: panelItemClass + '-active',
		inactivePanelItemClass: panelItemClass + '-inactive',
		disabledPanelItemClass: panelItemClass + '-disabled',
		hiddenPanelItemClass: panelItemClass + '-hidden',
		evaluatingPanelItemClass: panelItemClass + '-evaluating'
	});

	return expandedOptions;
}

export default expandedOptions;
