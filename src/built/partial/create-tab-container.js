import $ from "jquery";
import createHeaderLabelContainer from './create-header-label-container';
import createPanelContainer from './create-panel-container';
import createFooterLabelContainer from './create-footer-label-container';
function createTabContainer(options) {
    //container
    var $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);
    if (options.mode === "horizontal" /* Horizontal */) {
        $tabContainer.addClass(options.horizontalTabContainerClass);
    }
    else if (options.mode === "vertical" /* Vertical */) {
        $tabContainer.addClass(options.verticalTabContainerClass);
    }
    //header labels
    var _a = createHeaderLabelContainer(options), $headerLabelContainer = _a.$headerLabelContainer, $headerLabelContainerLeaf = _a.$headerLabelContainerLeaf;
    $headerLabelContainer && $tabContainer.append($headerLabelContainer);
    //panel
    var _b = createPanelContainer(options), $panelContainer = _b.$panelContainer, $panelContainerLeaf = _b.$panelContainerLeaf;
    $tabContainer.append($panelContainer);
    //footer labels
    var _c = createFooterLabelContainer(options), $footerLabelContainer = _c.$footerLabelContainer, $footerLabelContainerLeaf = _c.$footerLabelContainerLeaf;
    $footerLabelContainer && $tabContainer.append($footerLabelContainer);
    return {
        $tabContainer: $tabContainer,
        $headerLabelContainer: $headerLabelContainer,
        $headerLabelContainerLeaf: $headerLabelContainerLeaf,
        $panelContainer: $panelContainer,
        $panelContainerLeaf: $panelContainerLeaf,
        $footerLabelContainer: $footerLabelContainer,
        $footerLabelContainerLeaf: $footerLabelContainerLeaf
    };
}
export default createTabContainer;
