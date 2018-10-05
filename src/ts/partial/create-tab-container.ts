import $ from "jquery";

import createHeaderLabelContainer from './create-header-label-container';
import createPageContainer from './create-page-container';
import createFooterLabelContainer from './create-footer-label-container';

function createTabContainer(options: JQueryTab.NecessaryOptions) {
	//container
	const $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);

	//header labels
	const {$headerLabelContainer, $headerLabelContainerLeaf} = createHeaderLabelContainer(options);
	$headerLabelContainer && $tabContainer.append($headerLabelContainer);

	//page
	const {$pageContainer, $pageContainerLeaf} = createPageContainer(options);
	$tabContainer.append($pageContainer);

	//footer labels
	const {$footerLabelContainer, $footerLabelContainerLeaf} = createFooterLabelContainer(options);
	$footerLabelContainer && $tabContainer.append($footerLabelContainer);

	return {
		$tabContainer,
		$headerLabelContainer,
		$headerLabelContainerLeaf,
		$pageContainer,
		$pageContainerLeaf,
		$footerLabelContainer,
		$footerLabelContainerLeaf
	}
}

export default createTabContainer;