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

	interface SwitchResult {
		index: number;
		name?: string;
	}

	type fnPositionToIndex = (position: TabItemPosition) => number;
	type fnParsePosition = (position: TabItemPosition) => { index: number, name?: string };
	type fnParseHashPosition = () => TabItemPosition;
	type fnSwitchTo = (position: TabItemPosition) => SwitchResult | undefined;
	type fnSwitchNeighbor = (switchOptions?: SwitchOptions) => SwitchResult | undefined;
	type fnSavePosition = (position: TabItemPosition) => void;
	type fnGetLabel = (position: TabItemPosition) => JQuery;
	type fnGetPanel = (position: TabItemPosition) => JQuery;
}

declare function isFinite(number: string): boolean;