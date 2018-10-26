import $ from 'jquery';
function getExpandedOptions(defaultOptions, dataOptions, customOptions) {
    const options = $.extend({}, defaultOptions, dataOptions, customOptions);
    const { tabContainerClass, labelContainerClass, labelItemClass, panelItemClass } = options;
    const expandedOptions = $.extend(options, {
        horizontalTabContainerClass: tabContainerClass + '-horizontal',
        verticalTabContainerClass: tabContainerClass + '-vertical',
        headerLabelContainerClass: labelContainerClass + '-header',
        footerLabelContainerClass: labelContainerClass + '-footer',
        tabItemNameAttr: 'data-tab-item-name',
        activeLabelItemClass: labelItemClass + '-active',
        inactiveLabelItemClass: labelItemClass + '-inactive',
        disabledLabelItemClass: labelItemClass + '-disabled',
        hiddenLabelItemClass: labelItemClass + '-hidden',
        activePanelItemClass: panelItemClass + '-active',
        inactivePanelItemClass: panelItemClass + '-inactive',
        disabledPanelItemClass: panelItemClass + '-disabled',
        hiddenPanelItemClass: panelItemClass + '-hidden'
    });
    return expandedOptions;
}
export default getExpandedOptions;
