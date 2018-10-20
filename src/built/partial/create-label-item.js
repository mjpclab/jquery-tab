import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createLabelItem($labelContent, options) {
    const $labelItem = $(options.labelItemTemplate)
        .addClass(options.labelItemClass)
        .addClass(options.inactiveLabelItemClass)
        .attr('role', 'tab');
    const $labelItemLeaf = getLeafElement($labelItem);
    $labelItemLeaf.empty().append($labelContent);
    return { $labelItem, $labelItemLeaf };
}
export default createLabelItem;
