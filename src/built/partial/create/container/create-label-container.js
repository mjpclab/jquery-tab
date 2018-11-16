import $ from "jquery";
import getLeafElement from "../../utility/get-leaf-element";
function createLabelContainer(options) {
    var $labelContainer = $(options.labelContainerTemplate)
        .addClass(options.labelContainerClass)
        .addClass(options.modeLabelContainerClass)
        .attr('role', 'tablist');
    if (options.mode === "vertical" /* Vertical */) {
        $labelContainer.attr('aria-orientation', 'vertical');
    }
    var $labelContainerLeaf = getLeafElement($labelContainer);
    return { $labelContainer: $labelContainer, $labelContainerLeaf: $labelContainerLeaf };
}
export default createLabelContainer;
