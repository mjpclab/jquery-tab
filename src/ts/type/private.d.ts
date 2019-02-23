declare namespace JQueryTab {
	interface ExpandedOptions extends NecessaryOptions {
		modeTabContainerClass: string;

		modeLabelContainerClass: string;
		headerLabelContainerClass: string;
		modeHeaderLabelContainerClass: string;
		footerLabelContainerClass: string;
		modeFooterLabelContainerClass: string;

		tabItemNameAttr: string;

		activeLabelItemClass: string;
		inactiveLabelItemClass: string;
		disabledLabelItemClass: string;
		hiddenLabelItemClass: string;

		modePanelContainerClass: string;

		activePanelItemClass: string;
		inactivePanelItemClass: string;
		disabledPanelItemClass: string;
		hiddenPanelItemClass: string;
		evaluatingPanelItemClass: string;
	}

	interface Context {
		tabState: TabState;
		switched: boolean;
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

declare function isFinite(value: number | string): boolean;
