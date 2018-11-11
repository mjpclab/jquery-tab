/// <reference types="jquery" />

declare namespace JQueryTab {
	type JQueriable = string | JQuery.TypeOrArray<JQuery.Node | JQuery<JQuery.Node>>;
	type Template = string | JQuery.Node | JQuery<JQuery.Node>;

	const enum TabState {
		Initializing = 0,
		Ready = 1,
	}

	const enum Mode {
		Horizontal = 'horizontal',
		Vertical = 'vertical',
	}

	type TabItemPosition = number | string;

	interface TabItem {
		title: JQueryTab.JQueriable;
		content: JQueryTab.JQueriable;
		name?: string;
		disabled?: boolean;
		hidden?: boolean;
	}

	interface NecessaryOptions {
		triggerEvents: string;
		delayTriggerEvents: string;
		delayTriggerCancelEvents: string;
		delayTriggerLatency: number;
		statusFieldSelector: string;
		statusHashTemplate: string;
		statusHashSeparator: string;
		fnSavePosition?: (this: JQuery, position: TabItemPosition) => void;
		fnLoadPosition?: (this: JQuery) => TabItemPosition;
		fixedHeight: boolean;

		mode: Mode;
		activePosition: TabItemPosition;
		createEmptyTab: boolean;
		onBeforeSwitch?: (this: JQuery, oldIndex: number, newIndex: number) => void;
		onAfterSwitch?: (this: JQuery, oldIndex: number, newIndex: number) => void;

		titleSelector: string;
		fnGetTitleContent: (this: JQuery, $title: JQuery) => JQueryTab.JQueriable;
		keepTitleVisible: boolean;
		fnGetTabItemName: (this: JQuery, $title: JQuery, $rest: JQuery) => string | undefined;
		fnIsTabItemDisabled: (this: JQuery, $title: JQuery, $rest: JQuery) => boolean;
		fnIsTabItemHidden: (this: JQuery, $title: JQuery, $rest: JQuery) => boolean;

		tabContainerTemplate: Template;
		tabContainerClass: string;

		labelContainerTemplate: Template;
		labelContainerClass: string;
		showHeaderLabelContainer: boolean;
		showFooterLabelContainer: boolean;
		labelItemTemplate: Template;
		labelItemClass: string;

		panelContainerTemplate: Template;
		panelContainerClass: string;
		panelItemTemplate: Template;
		panelItemClass: string;
	}

	type Options = Partial<NecessaryOptions>;

	interface SwitchOptions {
		includeDisabled?: boolean;
		includeHidden?: boolean;
		exclude?: TabItemPosition[]
		loop?: boolean;
	}

	interface SwitchResult {
		index: number;
		name?: string;
	}
}

interface JQueryStatic {
	(jQueriable: JQueryTab.JQueriable): JQuery;
}

interface JQuery {
	tab(options?: JQueryTab.Options): JQuery;
}
