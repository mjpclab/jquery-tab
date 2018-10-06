import createLabelContainer from "./create-label-container";

function createFooterLabelContainer(options: JQueryTab.ExpandedOptions) {
	let $footerLabelContainer: JQuery | undefined;
	let $footerLabelContainerLeaf: JQuery | undefined;

	if (options.showFooterLabelContainer) {
		const {
			$labelContainer,
			$labelContainerLeaf
		} = createLabelContainer(options);
		$labelContainer.addClass(options.footerLabelContainerClass);

		$footerLabelContainer = $labelContainer;
		$footerLabelContainerLeaf = $labelContainerLeaf;
	}

	return {$footerLabelContainer, $footerLabelContainerLeaf}
}

export default createFooterLabelContainer;