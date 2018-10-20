function generateUpdateFixedHeight(
	containers: JQueryTab.Containers,
	options: JQueryTab.ExpandedOptions
) {
	return function updateFixedHeader() {
		if (!options.fixedHeight) {
			return;
		}

		let maxHeight = 0;

		containers.$panelContainerLeaf.children().each(function (index, panelItem) {
			const panelHeight = panelItem.scrollHeight;
			if (panelHeight > maxHeight) {
				maxHeight = panelHeight;
			}
		}).height(maxHeight);
	};
}

export default generateUpdateFixedHeight;