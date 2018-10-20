import updateActiveState from "./update-active-state";

function generateSwitchTo(
	fnGetHeaderFooterLabels: JQueryTab.fnGetLabel,
	fnGetPanel: JQueryTab.fnGetPanel,
	fnSaveIndex: JQueryTab.fnSaveIndex,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const switchToWithoutSave = function (newIndex: number) {
		const {$tabContainer} = containers;

		const oldIndex = context.currentIndex;

		//before switching callback
		if (typeof (options.onBeforeSwitch) === 'function') {
			options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
		}

		//labels & panels
		const $newLabel = fnGetHeaderFooterLabels(newIndex);
		const $newPanel = fnGetPanel(newIndex);
		const $otherPanels = $newPanel.siblings();

		updateActiveState($newLabel, $newPanel, options);

		//function to hide panels
		if (typeof options.fnHidePanelItem === 'function') {
			options.fnHidePanelItem.call($otherPanels, $otherPanels);
		}

		//function to show panel
		if (typeof options.fnShowPanelItem === 'function') {
			options.fnShowPanelItem.call($newPanel, $newPanel);
		}

		//finalize
		context.currentIndex = newIndex;

		//after switching callback
		if (typeof (options.onAfterSwitch) === 'function') {
			options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
		}
	};
	const switchTo = function (newIndex: number) {
		switchToWithoutSave(newIndex);
		fnSaveIndex(newIndex);
	};

	return {switchToWithoutSave, switchTo};
}

export default generateSwitchTo;