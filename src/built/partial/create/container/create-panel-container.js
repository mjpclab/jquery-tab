import $ from "jquery";
import getLeafElement from "../../utility/get-leaf-element";
function createPanelContainer(options) {
    var $panelContainer = $(options.panelContainerTemplate)
        .addClass(options.panelContainerClass)
        .addClass(options.modePanelContainerClass);
    var $panelContainerLeaf = getLeafElement($panelContainer);
    return { $panelContainer: $panelContainer, $panelContainerLeaf: $panelContainerLeaf };
}
export default createPanelContainer;
