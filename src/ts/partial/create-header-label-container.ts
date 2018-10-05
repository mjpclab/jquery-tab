import createLabelContainer from "./create-label-container";

function createHeaderLabelContainer(options: JQueryTab.NecessaryOptions) {
	let $headerLabelContainer: JQuery | undefined;
	let $headerLabelContainerLeaf: JQuery | undefined;

	if (options.showHeaderLabelContainer) {
		const {
			$labelContainer,
			$labelContainerLeaf
		} = createLabelContainer(options);
		$labelContainerLeaf.addClass(options.headerLabelContainerClass);

		$headerLabelContainer = $labelContainer;
		$headerLabelContainerLeaf = $labelContainerLeaf;
	}

	return {$headerLabelContainer, $headerLabelContainerLeaf}
}

export default createHeaderLabelContainer;