import createLabelContainer from './create-label-container';
function createFooterLabelContainer(options) {
    var $footerLabelContainer;
    var $footerLabelContainerLeaf;
    if (options.showFooterLabelContainer) {
        var _a = createLabelContainer(options), $labelContainer = _a.$labelContainer, $labelContainerLeaf = _a.$labelContainerLeaf;
        $labelContainer
            .addClass(options.footerLabelContainerClass)
            .addClass(options.modeFooterLabelContainerClass);
        $footerLabelContainer = $labelContainer;
        $footerLabelContainerLeaf = $labelContainerLeaf;
    }
    return { $footerLabelContainer: $footerLabelContainer, $footerLabelContainerLeaf: $footerLabelContainerLeaf };
}
export default createFooterLabelContainer;
