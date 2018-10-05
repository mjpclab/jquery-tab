import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
function createPageContainer(options) {
    const $pageContainer = $(options.pageContainerTemplate).addClass(options.pageContainerClass);
    const $pageContainerLeaf = getLeafElement($pageContainer);
    return { $pageContainer, $pageContainerLeaf };
}
export default createPageContainer;
