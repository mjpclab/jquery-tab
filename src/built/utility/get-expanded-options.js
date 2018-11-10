import $ from 'jquery';
function getExpandedOptions(defaultOptions, dataOptions, customOptions) {
    var options = $.extend({}, defaultOptions, dataOptions, customOptions);
    var tabContainerClass = options.tabContainerClass, labelContainerClass = options.labelContainerClass, labelItemClass = options.labelItemClass, panelItemClass = options.panelItemClass;
    var expandedOptions = $.extend(options, {
        horizontalTabContainerClass: tabContainerClass + '-horizontal',
        verticalTabContainerClass: tabContainerClass + '-vertical',
        headerLabelContainerClass: labelContainerClass + '-header',
        footerLabelContainerClass: labelContainerClass + '-footer',
        tabItemNameAttr: 'tabItemName',
        activeLabelItemClass: labelItemClass + '-active',
        inactiveLabelItemClass: labelItemClass + '-inactive',
        disabledLabelItemClass: labelItemClass + '-disabled',
        hiddenLabelItemClass: labelItemClass + '-hidden',
        activePanelItemClass: panelItemClass + '-active',
        inactivePanelItemClass: panelItemClass + '-inactive',
        disabledPanelItemClass: panelItemClass + '-disabled',
        hiddenPanelItemClass: panelItemClass + '-hidden',
        evaluatingPanelItemClass: panelItemClass + '-evaluating'
    });
    return expandedOptions;
}
export default getExpandedOptions;
