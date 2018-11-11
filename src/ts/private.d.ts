declare namespace JQueryTab {
	interface ExpandedOptions extends NecessaryOptions {
		horizontalTabContainerClass: string;
		verticalTabContainerClass: string;

		headerLabelContainerClass: string;
		footerLabelContainerClass: string;

		tabItemNameAttr: string;

		activeLabelItemClass: string;
		inactiveLabelItemClass: string;
		disabledLabelItemClass: string;
		hiddenLabelItemClass: string;

		activePanelItemClass: string;
		inactivePanelItemClass: string;
		disabledPanelItemClass: string;
		hiddenPanelItemClass: string;
		evaluatingPanelItemClass: string;
	}

	interface Context {
		tabState: TabState;
		containerId: number;
		nextItemId: number;
		itemCount: number;
		currentIndex: number;
		currentName?: string;
	}

	interface Containers {
		$region: JQuery;
		$tabContainer: JQuery;
		$tabContainerLeaf: JQuery;
		$headerLabelContainer?: JQuery;
		$headerLabelContainerLeaf?: JQuery;
		$panelContainer: JQuery;
		$panelContainerLeaf: JQuery;
		$footerLabelContainer?: JQuery;
		$footerLabelContainerLeaf?: JQuery;
	}
}

declare function isFinite(number: string): boolean;
