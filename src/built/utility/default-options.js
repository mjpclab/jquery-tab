const defaultOptions = {
    triggerEvents: 'click',
    delayTriggerEvents: '',
    delayTriggerCancelEvents: '',
    delayTriggerLatency: 200,
    statusFieldSelector: '',
    statusHashTemplate: '',
    statusHashSeparator: '&',
    fixedHeight: false,
    mode: "horizontal" /* Horizontal */,
    activePosition: 0,
    createEmptyTab: false,
    fnShowPanelItem: function ($panelItem) {
        return $panelItem && $panelItem.show && $panelItem.show();
    },
    fnHidePanelItem: function ($panelItem) {
        return $panelItem && $panelItem.hide && $panelItem.hide();
    },
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
        const attrDisabled = $title.attr('data-tab-item-disabled');
        return attrDisabled !== undefined && attrDisabled !== 'false';
    },
    fnIsTabItemHidden: function ($title) {
        const attrHidden = $title.attr('data-tab-item-hidden');
        return attrHidden !== undefined && attrHidden !== 'false';
    },
    tabContainerTemplate: '<div></div>',
    tabContainerClass: 'tab-container',
    labelContainerTemplate: '<div></div>',
    labelContainerClass: 'label-container',
    showHeaderLabelContainer: true,
    showFooterLabelContainer: false,
    labelItemTemplate: '<label></label>',
    labelItemClass: 'label-item',
    panelContainerTemplate: '<div></div>',
    panelContainerClass: 'panel-container',
    panelItemTemplate: '<div></div>',
    panelItemClass: 'panel-item',
};
export default defaultOptions;
