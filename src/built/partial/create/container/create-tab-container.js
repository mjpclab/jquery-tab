import $ from "jquery";
import getLeafElement from "../../../utility/get-leaf-element";
import createHeaderLabelContainer from './create-header-label-container';
import createPanelContainer from './create-panel-container';
import createFooterLabelContainer from './create-footer-label-container';
function createTabContainer(options) {
    //container
    var $tabContainer = $(options.tabContainerTemplate)
        .addClass(options.tabContainerClass)
        .addClass(options.modeTabContainerClass);
    var $tabContainerLeaf = getLeafElement($tabContainer);
    //header labels
    var _a = createHeaderLabelContainer(options), $headerLabelContainer = _a.$headerLabelContainer, $headerLabelContainerLeaf = _a.$headerLabelContainerLeaf;
    $headerLabelContainer && $tabContainerLeaf.append($headerLabelContainer);
    //panel
    var _b = createPanelContainer(options), $panelContainer = _b.$panelContainer, $panelContainerLeaf = _b.$panelContainerLeaf;
    $tabContainerLeaf.append($panelContainer);
    //footer labels
    var _c = createFooterLabelContainer(options), $footerLabelContainer = _c.$footerLabelContainer, $footerLabelContainerLeaf = _c.$footerLabelContainerLeaf;
    $footerLabelContainer && $tabContainerLeaf.append($footerLabelContainer);
    return {
        $tabContainer: $tabContainer,
        $tabContainerLeaf: $tabContainerLeaf,
        $headerLabelContainer: $headerLabelContainer,
        $headerLabelContainerLeaf: $headerLabelContainerLeaf,
        $panelContainer: $panelContainer,
        $panelContainerLeaf: $panelContainerLeaf,
        $footerLabelContainer: $footerLabelContainer,
        $footerLabelContainerLeaf: $footerLabelContainerLeaf
    };
}
export default createTabContainer;
