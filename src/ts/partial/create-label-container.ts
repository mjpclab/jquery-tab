import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";

function createLabelContainer(options: JQueryTab.ExpandedOptions) {
	const $labelContainer = $(options.labelContainerTemplate)
		.addClass(options.labelContainerClass)
		.addClass(options.modeLabelContainerClass)
		.attr('role', 'tablist');
	if (options.mode === JQueryTab.Mode.Vertical) {
		$labelContainer.attr('aria-orientation', 'vertical');
	}
	const $labelContainerLeaf = getLeafElement($labelContainer);

	return {$labelContainer, $labelContainerLeaf};
}

export default createLabelContainer;
