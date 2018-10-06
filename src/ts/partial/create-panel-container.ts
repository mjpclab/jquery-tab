import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";

function createPanelContainer(options: JQueryTab.ExpandedOptions) {
	const $panelContainer = $(options.panelContainerTemplate).addClass(options.panelContainerClass);
	const $panelContainerLeaf = getLeafElement($panelContainer);

	return {$panelContainer, $panelContainerLeaf};
}

export default createPanelContainer;