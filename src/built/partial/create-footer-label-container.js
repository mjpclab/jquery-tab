import createLabelContainer from "./create-label-container";
function createFooterLabelContainer(options) {
    let $footerLabelContainer;
    let $footerLabelContainerLeaf;
    if (options.showFooterLabelContainer) {
        const { $labelContainer, $labelContainerLeaf } = createLabelContainer(options);
        $labelContainerLeaf.addClass(options.footerLabelContainerClass);
        $footerLabelContainer = $labelContainer;
        $footerLabelContainerLeaf = $labelContainerLeaf;
    }
    return { $footerLabelContainer, $footerLabelContainerLeaf };
}
export default createFooterLabelContainer;
