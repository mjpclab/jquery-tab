var defaultOptions = {
    triggerEvents: 'click',
    delayTriggerEvents: '',
    delayTriggerCancelEvents: '',
    delayTriggerLatency: 200,
    keyboardSwitch: true,
    statusFieldSelector: '',
    statusHashTemplate: '',
    statusHashSeparator: '&',
    fixedHeight: false,
    mode: "horizontal" /* Horizontal */,
    activePosition: 0,
    createEmptyTab: false,
    onBeforeSwitch: undefined,
    onAfterSwitch: undefined,
    titleSelector: 'h1,h2,h3,h4,h5,h6',
    fnGetTitleContent: function ($title) {
        return $title.contents();
    },
    keepTitleVisible: false,
    fnGetTabItemName: function ($title) {
        return $title.attr('data-tab-item-name');
    },
    fnIsTabItemDisabled: function ($title) {
        var attrDisabled = $title.attr('data-tab-item-disabled');
        return attrDisabled !== undefined && attrDisabled !== 'false';
    },
    fnIsTabItemHidden: function ($title) {
        var attrHidden = $title.attr('data-tab-item-hidden');
        return attrHidden !== undefined && attrHidden !== 'false';
    },
    tabContainerTemplate: '<div></div>',
    tabContainerClass: 'tab-container',
    labelContainerTemplate: '<div></div>',
    labelContainerClass: 'label-container',
    showHeaderLabelContainer: true,
    showFooterLabelContainer: false,
    labelItemTemplate: '<span></span>',
    labelItemClass: 'label-item',
    panelContainerTemplate: '<div></div>',
    panelContainerClass: 'panel-container',
    panelItemTemplate: '<div></div>',
    panelItemClass: 'panel-item'
};
export default defaultOptions;
