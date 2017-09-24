/// <reference types="jquery" />

type JQueriable = JQuery.Selector | JQuery.TypeOrArray<JQuery.Node> | JQuery<JQuery.Node>
type JQueryContent = JQuery | string | number | boolean;

declare module 'jquery-tab' {
	export = jQuery;
}

interface JQueryTabOptions {
	triggerEvents?: string;
	delayTriggerEvents?: string;
	delayTriggerCancelEvents?: string;
	delayTriggerLatency?: number;
	statusFieldSelector?: string;
	statusHashTemplate?: string;
	statusHashSeparator?: string;
	fixedHeight?: boolean;

	activeIndex?: number;
	createEmptyTab?: boolean;
	fnShowPageItem?: (this: JQuery, $pageItem: JQuery) => JQuery;
	fnHidePageItem?: (this: JQuery, $pageItem: JQuery) => JQuery;
	onBeforeSwitch?: (this: JQuery, oldIndex: number, newIndex: number) => void;
	onAfterSwitch?: (this: JQuery, oldIndex: number, newIndex: number) => void;

	titleSelector?: string;
	titleContentFilter?: (this: JQuery, $title: JQuery) => (JQuery<HTMLElement | Text | Comment> | string | number);
	keepTitleVisible?: boolean;

	tabContainerTemplate?: string;
	tabContainerClass?: string;

	labelContainerTemplate?: string;
	labelContainerClass?: string;
	showHeaderLabelContainer?: boolean;
	showFooterLabelContainer?: boolean;
	headerLabelContainerClass?: string;
	footerLabelContainerClass?: string;
	labelItemTemplate?: string;
	labelItemClass?: string;
	labelItemActiveClass?: string;
	labelItemInactiveClass?: string;

	pageContainerTemplate?: string;
	pageContainerClass?: string;
	pageItemTemplate?: string;
	pageItemClass?: string;
	pageItemActiveClass?: string;
	pageItemInactiveClass?: string;
}

interface JQuery {
	tab(options?: JQueryTabOptions): JQuery;
}
