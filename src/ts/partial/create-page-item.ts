import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";

function createPageItem(content: JQueryTab.JQueriable, options: JQueryTab.NecessaryOptions) {
	const $pageItem = $(options.pageItemTemplate).addClass(options.pageItemClass).addClass(options.pageItemInactiveClass);
	const $pageItemLeaf = getLeafElement($pageItem);
	$pageItemLeaf.append(content);

	return {$pageItem, $pageItemLeaf};
}

export default createPageItem;