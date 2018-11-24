import createLabelContainer from './create-label-container';

function createHeaderLabelContainer(options: JQueryTab.ExpandedOptions) {
	let $headerLabelContainer: JQuery | undefined;
	let $headerLabelContainerLeaf: JQuery | undefined;

	if (options.showHeaderLabelContainer) {
		const {
			$labelContainer,
			$labelContainerLeaf
		} = createLabelContainer(options);
		$labelContainer
			.addClass(options.headerLabelContainerClass)
			.addClass(options.modeHeaderLabelContainerClass);

		$headerLabelContainer = $labelContainer;
		$headerLabelContainerLeaf = $labelContainerLeaf;
	}

	return {$headerLabelContainer, $headerLabelContainerLeaf}
}

export default createHeaderLabelContainer;
