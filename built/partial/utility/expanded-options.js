import $ from 'jquery';
var reCssPropHeight = /[Hh]eight/;
function expandedOptions(defaultOptions, dataOptions, customOptions) {
    var options = $.extend({}, defaultOptions, dataOptions, customOptions);
    var mode = options.mode, tabContainerClass = options.tabContainerClass, labelContainerClass = options.labelContainerClass, labelItemClass = options.labelItemClass, panelContainerClass = options.panelContainerClass, panelItemClass = options.panelItemClass;
    var expandedOptions = $.extend(options, {
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
    if (!reCssPropHeight.test(expandedOptions.fixedHeightProp)) {
        expandedOptions.fixedHeightProp = defaultOptions.fixedHeightProp;
    }
    return expandedOptions;
}
export default expandedOptions;
