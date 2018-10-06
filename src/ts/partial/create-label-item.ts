import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";

function createLabelItem(title: JQueryTab.JQueriable, options: JQueryTab.ExpandedOptions) {
	const $labelItem = $(options.labelItemTemplate)
		.addClass(options.labelItemClass)
		.addClass(options.inactiveLabelItemClass)
		.attr('role', 'tab');
	const $labelItemLeaf = getLeafElement($labelItem);
	$labelItemLeaf.empty().append(title);

	return {$labelItem, $labelItemLeaf};
}

export default createLabelItem;