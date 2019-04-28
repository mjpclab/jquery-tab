import createLabelContainer from './create-label-container';
function createHeaderLabelContainer(options) {
    var $headerLabelContainer;
    var $headerLabelContainerLeaf;
    if (options.showHeaderLabelContainer) {
        var _a = createLabelContainer(options), $labelContainer = _a.$labelContainer, $labelContainerLeaf = _a.$labelContainerLeaf;
        $labelContainer
            .addClass(options.headerLabelContainerClass)
            .addClass(options.modeHeaderLabelContainerClass);
        $headerLabelContainer = $labelContainer;
        $headerLabelContainerLeaf = $labelContainerLeaf;
    }
    return { $headerLabelContainer: $headerLabelContainer, $headerLabelContainerLeaf: $headerLabelContainerLeaf };
}
export default createHeaderLabelContainer;
