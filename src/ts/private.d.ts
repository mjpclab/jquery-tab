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
	}

	interface Context {
		containerId: number;
		nextItemId: number;
		itemCount: number;
		currentIndex: number;
		currentName?: string;
	}

	interface Containers {
		$region: JQuery;
		$tabContainer: JQuery;
		$headerLabelContainer?: JQuery;
		$headerLabelContainerLeaf?: JQuery;
		$panelContainer: JQuery;
		$panelContainerLeaf: JQuery;
		$footerLabelContainer?: JQuery;
		$footerLabelContainerLeaf?: JQuery;
	}
}

declare function isFinite(number: string): boolean;