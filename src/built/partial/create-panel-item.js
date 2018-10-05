import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createPanelItem(content, options) {
    const $panelItem = $(options.panelItemTemplate)
        .addClass(options.panelItemClass)
        .addClass(options.panelItemInactiveClass)
        .attr('role', 'tabpanel');
    const $panelItemLeaf = getLeafElement($panelItem);
    $panelItemLeaf.append(content);
    return { $panelItem, $panelItemLeaf };
}
export default createPanelItem;
