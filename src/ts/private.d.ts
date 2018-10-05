declare namespace JQueryTab {
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
