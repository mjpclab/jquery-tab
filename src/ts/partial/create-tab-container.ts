import $ from "jquery";

import createHeaderLabelContainer from './create-header-label-container';
import createPanelContainer from './create-panel-container';
import createFooterLabelContainer from './create-footer-label-container';

function createTabContainer(options: JQueryTab.ExpandedOptions) {
	//container
	const $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);
	if (options.mode === JQueryTab.Mode.Horizontal) {
		$tabContainer.addClass(options.horizontalTabContainerClass);
	} else if (options.mode === JQueryTab.Mode.Vertical) {
		$tabContainer.addClass(options.verticalTabContainerClass);
	}

	//header labels
	const {$headerLabelContainer, $headerLabelContainerLeaf} = createHeaderLabelContainer(options);
	$headerLabelContainer && $tabContainer.append($headerLabelContainer);

	//panel
	const {$panelContainer, $panelContainerLeaf} = createPanelContainer(options);
	$tabContainer.append($panelContainer);

	//footer labels
	const {$footerLabelContainer, $footerLabelContainerLeaf} = createFooterLabelContainer(options);
	$footerLabelContainer && $tabContainer.append($footerLabelContainer);

	return {
		$tabContainer,
		$headerLabelContainer,
		$headerLabelContainerLeaf,
		$panelContainer,
		$panelContainerLeaf,
		$footerLabelContainer,
		$footerLabelContainerLeaf
	}
}

export default createTabContainer;