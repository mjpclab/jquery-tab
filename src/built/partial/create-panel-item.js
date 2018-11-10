import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createPanelItem(tabItem, options) {
    var $panelItem = $(options.panelItemTemplate)
        .addClass(options.panelItemClass)
        .addClass(options.inactivePanelItemClass)
        .attr('role', 'tabpanel');
    var $panelItemLeaf = getLeafElement($panelItem);
    $panelItemLeaf.append(tabItem.content);
    return { $panelItem: $panelItem, $panelItemLeaf: $panelItemLeaf };
}
export default createPanelItem;
