import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createPageItem(content, options) {
    const $pageItem = $(options.pageItemTemplate)
        .addClass(options.pageItemClass)
        .addClass(options.pageItemInactiveClass)
        .attr('role', 'tabpanel');
    const $pageItemLeaf = getLeafElement($pageItem);
    $pageItemLeaf.append(content);
    return { $pageItem, $pageItemLeaf };
}
export default createPageItem;
