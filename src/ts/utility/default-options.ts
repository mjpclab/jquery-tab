const defaultOptions: JQueryTab.NecessaryOptions = {
	triggerEvents: 'click',
	delayTriggerEvents: '',
	delayTriggerCancelEvents: '',
	delayTriggerLatency: 200,
	statusFieldSelector: '',
	statusHashTemplate: '',
	statusHashSeparator: '&',
	fixedHeight: false,

	mode: JQueryTab.Mode.Horizontal,
	activePosition: 0,
	createEmptyTab: false,
	fnShowPanelItem: function ($panelItem: JQuery) {
		return $panelItem && $panelItem.show && $panelItem.show();
	},
	fnHidePanelItem: function ($panelItem: JQuery) {
		return $panelItem && $panelItem.hide && $panelItem.hide();
	},
	onBeforeSwitch: undefined,
	onAfterSwitch: undefined,

	titleSelector: 'h1,h2,h3,h4,h5,h6',
	fnGetTitleContent: function ($title: JQuery) {
		return $title.contents();
	},
	keepTitleVisible: false,
	fnGetTabItemName: function ($title: JQuery) {
		return $title.attr('data-tab-item-name');
	},
	fnIsTabItemDisabled: function ($title: JQuery) {
		const attrDisabled = $title.attr('data-tab-item-disabled');
		return attrDisabled !== undefined && attrDisabled !== 'false';
	},
	fnIsTabItemHidden: function ($title: JQuery) {
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