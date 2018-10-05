import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";

function createLabelContainer(options: JQueryTab.NecessaryOptions) {
	const $labelContainer = $(options.labelContainerTemplate).addClass(options.labelContainerClass);
	const $labelContainerLeaf = getLeafElement($labelContainer);

	return {$labelContainer, $labelContainerLeaf};
}

export default createLabelContainer;