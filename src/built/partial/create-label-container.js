import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createLabelContainer(options) {
    const $labelContainer = $(options.labelContainerTemplate)
        .addClass(options.labelContainerClass)
        .attr('role', 'tablist');
    if (options.tabContainerClass.toLocaleLowerCase().indexOf('vert') >= 0) {
        $labelContainer.attr('aria-orientation', 'vertical');
    }
    const $labelContainerLeaf = getLeafElement($labelContainer);
    return { $labelContainer, $labelContainerLeaf };
}
export default createLabelContainer;
