import createLabelContainer from "./create-label-container";
function createHeaderLabelContainer(options) {
    let $headerLabelContainer;
    let $headerLabelContainerLeaf;
    if (options.showHeaderLabelContainer) {
        const { $labelContainer, $labelContainerLeaf } = createLabelContainer(options);
        $labelContainerLeaf.addClass(options.headerLabelContainerClass);
        $headerLabelContainer = $labelContainer;
        $headerLabelContainerLeaf = $labelContainerLeaf;
    }
    return { $headerLabelContainer, $headerLabelContainerLeaf };
}
export default createHeaderLabelContainer;
