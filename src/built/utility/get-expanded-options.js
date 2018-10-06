import $ from 'jquery';
function getExpandedOptions(defaultOptions, dataOptions, customOptions) {
    const options = $.extend({}, defaultOptions, dataOptions, customOptions);
    const { tabContainerClass, labelContainerClass, labelItemClass, panelItemClass } = options;
    const expandedOptions = $.extend(options, {
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
