declare namespace JQueryTab {
	interface ExpandedOptions extends NecessaryOptions {
		horizontalTabContainerClass: string;
		verticalTabContainerClass: string;

		headerLabelContainerClass: string;
		footerLabelContainerClass: string;

		activeLabelItemClass: string;
		inactiveLabelItemClass: string;

		activePanelItemClass: string;
		inactivePanelItemClass: string;
	}

	interface Context {
		containerId: number;
		nextItemId: number;
		itemCount: number;
		currentIndex: number;
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
