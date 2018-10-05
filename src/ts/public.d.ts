/// <reference types="jquery" />

declare namespace JQueryTab {
	type JQueriable = string | JQuery.TypeOrArray<JQuery.Node | JQuery<JQuery.Node>>;
	type Template = string | JQuery.Node | JQuery<JQuery.Node>;

	interface NecessaryOptions {
		triggerEvents: string;
		delayTriggerEvents: string;
		delayTriggerCancelEvents: string;
		delayTriggerLatency: number;
		statusFieldSelector: string;
		statusHashTemplate: string;
		statusHashSeparator: string;
		fnSaveIndex?: (this: JQuery, index: number) => void;
		fnLoadIndex?: (this: JQuery) => number;
		fixedHeight: boolean;

		activeIndex: number;
		createEmptyTab: boolean;
		fnShowPanelItem: (this: JQuery, $panelItem: JQuery) => JQuery;
		fnHidePanelItem: (this: JQuery, $panelItem: JQuery) => JQuery;
		onBeforeSwitch?: (this: JQuery, oldIndex: number, newIndex: number) => void;
		onAfterSwitch?: (this: JQuery, oldIndex: number, newIndex: number) => void;

		titleSelector: string;
		fnGetTitleContent: (this: JQuery, $title: JQuery) => (JQuery<HTMLElement | Text | Comment> | string | number);
		keepTitleVisible: boolean;

		tabContainerTemplate: Template;
		tabContainerClass: string;

		labelContainerTemplate: Template;
		labelContainerClass: string;
		showHeaderLabelContainer: boolean;
		showFooterLabelContainer: boolean;
		headerLabelContainerClass: string;
		footerLabelContainerClass: string;
		labelItemTemplate: Template;
		labelItemClass: string;
		labelItemActiveClass: string;
		labelItemInactiveClass: string;

		panelContainerTemplate: Template;
		panelContainerClass: string;
		panelItemTemplate: Template;
		panelItemClass: string;
		panelItemActiveClass: string;
		panelItemInactiveClass: string;
	}

	type Options = Partial<NecessaryOptions>;
}

interface JQueryStatic {
	(jQueriable: JQueryTab.JQueriable): JQuery;
}

interface JQuery {
	tab(options?: JQueryTab.Options): JQuery;
}