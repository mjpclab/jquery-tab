import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createLabelItem(tabItem, options) {
    const $labelItem = $(options.labelItemTemplate)
        .addClass(options.labelItemClass)
        .addClass(options.inactiveLabelItemClass)
        .attr('role', 'tab');
    const $labelItemLeaf = getLeafElement($labelItem);
    $labelItemLeaf.append(tabItem.title);
    return { $labelItem, $labelItemLeaf };
}
export default createLabelItem;
