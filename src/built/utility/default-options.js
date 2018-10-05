const defaultOptions = {
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
    fnShowPageItem: function ($pageItem) {
        return $pageItem && $pageItem.show && $pageItem.show();
    },
    fnHidePageItem: function ($pageItem) {
        return $pageItem && $pageItem.hide && $pageItem.hide();
    },
    onBeforeSwitch: undefined,
    onAfterSwitch: undefined,
    titleSelector: 'h1,h2,h3,h4,h5,h6',
    fnGetTitleContent: function ($title) {
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
    labelItemTemplate: '<span></span>',
    labelItemClass: 'label-item',
    labelItemActiveClass: 'label-active',
    labelItemInactiveClass: 'label-inactive',
    pageContainerTemplate: '<div></div>',
    pageContainerClass: 'page-container',
    pageItemTemplate: '<div></div>',
    pageItemClass: 'page-item',
    pageItemActiveClass: 'page-active',
    pageItemInactiveClass: 'page-inactive'
};
export default defaultOptions;
