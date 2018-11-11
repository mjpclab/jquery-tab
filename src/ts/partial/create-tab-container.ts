import $ from "jquery";
import getLeafElement from "../utility/get-leaf-element";
import createHeaderLabelContainer from './create-header-label-container';
import createPanelContainer from './create-panel-container';
import createFooterLabelContainer from './create-footer-label-container';

function createTabContainer(options: JQueryTab.ExpandedOptions) {
	//container
	const $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);
	const $tabContainerLeaf = getLeafElement($tabContainer);

	if (options.mode === JQueryTab.Mode.Horizontal) {
		$tabContainer.addClass(options.horizontalTabContainerClass);
	} else if (options.mode === JQueryTab.Mode.Vertical) {
		$tabContainer.addClass(options.verticalTabContainerClass);
	}

	//header labels
	const {$headerLabelContainer, $headerLabelContainerLeaf} = createHeaderLabelContainer(options);
	$headerLabelContainer && $tabContainerLeaf.append($headerLabelContainer);

	//panel
	const {$panelContainer, $panelContainerLeaf} = createPanelContainer(options);
	$tabContainerLeaf.append($panelContainer);

	//footer labels
	const {$footerLabelContainer, $footerLabelContainerLeaf} = createFooterLabelContainer(options);
	$footerLabelContainer && $tabContainerLeaf.append($footerLabelContainer);

	return {
		$tabContainer,
		$tabContainerLeaf,
		$headerLabelContainer,
		$headerLabelContainerLeaf,
		$panelContainer,
		$panelContainerLeaf,
		$footerLabelContainer,
		$footerLabelContainerLeaf
	}
}

export default createTabContainer;
