import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createPanelItem(tabItem, options) {
    const $panelItem = $(options.panelItemTemplate)
        .addClass(options.panelItemClass)
        .addClass(options.inactivePanelItemClass)
        .attr('role', 'tabpanel');
    const $panelItemLeaf = getLeafElement($panelItem);
    $panelItemLeaf.append(tabItem.content);
    return { $panelItem, $panelItemLeaf };
}
export default createPanelItem;
