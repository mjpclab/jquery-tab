import updateActiveState from "./update-active-state";

function generateSwitchTo(
	fnTabItemPositionToIndex: JQueryTab.fnPositionToIndex,
	fnGetHeaderFooterLabels: JQueryTab.fnGetLabel,
	fnGetPanel: JQueryTab.fnGetPanel,
	fnSavePosition: JQueryTab.fnSavePosition,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const switchToWithoutSave = function (newPosition: JQueryTab.TabItemPosition) {
		const newIndex = fnTabItemPositionToIndex(newPosition);
		if (newIndex < 0 || newIndex >= context.itemCount) {
			return;
		}
		const oldIndex = context.currentIndex;
		const {$tabContainer} = containers;

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
	const switchTo = function (newPosition: JQueryTab.TabItemPosition) {
		switchToWithoutSave(newPosition);
		fnSavePosition(newPosition);
	};

	return {switchToWithoutSave, switchTo};
}

export default generateSwitchTo;