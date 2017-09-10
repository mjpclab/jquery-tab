/// <reference types="jquery" />

declare module 'jquery-tab' {
	export = jQuery;
}

interface IJQueryTabOptions {
	triggerEvents?: string;
	delayTriggerEvents?: string;
	delayTriggerCancelEvents?: string;
	delayTriggerLatency?: number;
	statusFieldSelector?: string;
	statusHashTemplate?: string;
	statusHashSeparator?: string;
	fixedHeight?: boolean;
	showTopLabelContainer?: boolean;
	showBottomLabelContainer?: boolean;
	titleSelector?: string;
	titleContentFilter?: (this: JQuery) => string;
	keepTitleVisible?: boolean;
	containerTemplate?: string;
	labelContainerTemplate?: string;
	labelItemTemplate?: string;
	labelActiveClass?: string;
	labelInactiveClass?: string;
	pageContainerTemplate?: string;
	pageItemTemplate?: string;
	pageActiveClass?: string;
	pageInactiveClass?: string;
	activeIndex?: number;
	showPageItem?: ($pageItem: JQuery) => JQuery;
	hidePageItem?: ($pageItem: JQuery) => JQuery;
	beforeSwitch?: (oldIndex: number, newIndex: number) => void;
	afterSwitch?: (oldIndex: number, newIndex: number) => void;
}

interface JQuery {
	tab(options?: IJQueryTabOptions): JQuery;
}
