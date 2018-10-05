const defaultOptions: JQueryTab.NecessaryOptions = {
	triggerEvents: 'click',
	delayTriggerEvents: '',
	delayTriggerCancelEvents: '',
	delayTriggerLatency: 200,
	statusFieldSelector: '',
	statusHashTemplate: '',
	statusHashSeparator: '&',
	fixedHeight: false,

	activeIndex: 0,
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

	tabContainerTemplate: '<div></div>',
	tabContainerClass: 'tab-container',

	labelContainerTemplate: '<div></div>',
	labelContainerClass: 'label-container',
	showHeaderLabelContainer: true,
	showFooterLabelContainer: false,
	headerLabelContainerClass: 'header-container',
	footerLabelContainerClass: 'footer-container',
	labelItemTemplate: '<label></label>',
	labelItemClass: 'label-item',
	labelItemActiveClass: 'label-active',
	labelItemInactiveClass: 'label-inactive',

	panelContainerTemplate: '<div></div>',
	panelContainerClass: 'panel-container',
	panelItemTemplate: '<div></div>',
	panelItemClass: 'panel-item',
	panelItemActiveClass: 'panel-active',
	panelItemInactiveClass: 'panel-inactive'
};

export default defaultOptions;