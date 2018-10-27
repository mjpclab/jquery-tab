import updateActiveState from "./update-active-state";

enum SwitchDirection { Backward, Forward}

function generateSwitch(
	fnParsePosition: JQueryTab.fnParsePosition,
	fnGetHeaderFooterLabels: JQueryTab.fnGetLabel,
	fnGetPanel: JQueryTab.fnGetPanel,
	fnSavePosition: JQueryTab.fnSavePosition,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const switchToWithoutSave = function (newPosition: JQueryTab.TabItemPosition) {
		const {index: newIndex, name: newName} = fnParsePosition(newPosition);
		if (newIndex < 0 || newIndex >= context.itemCount || newIndex === context.currentIndex) {
			return;
		}
		const {$tabContainer} = containers;
		const {currentIndex: oldIndex, currentName: oldName} = context;
		const {onBeforeSwitch, onAfterSwitch} = options;

		//before switching callback
		if (typeof (onBeforeSwitch) === 'function') {
			onBeforeSwitch.call(
				$tabContainer,
				{index: oldIndex, name: oldName},
				{index: newIndex, name: newName}
			);
		}

		//update state
		const $newLabel = fnGetHeaderFooterLabels(newIndex);
		const $newPanel = fnGetPanel(newIndex);
		updateActiveState($newLabel, $newPanel, options);

		//finalize
		context.currentIndex = newIndex;
		context.currentName = newName;

		//after switching callback
		if (typeof (onAfterSwitch) === 'function') {
			onAfterSwitch.call(
				$tabContainer,
				{index: oldIndex, name: oldName},
				{index: newIndex, name: newName}
			);
		}

		return {index: newIndex, name: newName};
	};
	const switchTo = function (newPosition: JQueryTab.TabItemPosition) {
		const result = switchToWithoutSave(newPosition);
		if (result) {
			const {index, name} = result;
			fnSavePosition(name || index);
		}
		return result;
	};

	const _switchNeighbor = function (
		direction: SwitchDirection,
		switchOptions?: JQueryTab.SwitchOptions
	) {
		const opts = switchOptions || {};
		const {includeDisabled, includeHidden, loop} = opts;

		const {$panelContainer} = containers;
		const $panelItems = $panelContainer.children();

		const {itemCount, currentIndex} = context;
		const {disabledPanelItemClass, hiddenPanelItemClass} = options;

		let maxIterationCount = -1;
		if (loop) {
			maxIterationCount = itemCount - 1;
		}
		else if (direction === SwitchDirection.Backward) {
			maxIterationCount = currentIndex;
		}
		else if (direction === SwitchDirection.Forward) {
			maxIterationCount = itemCount - currentIndex - 1;
		}

		const iterationStep = direction === SwitchDirection.Backward ? -1 : 1;

		for (let i = 1; i <= maxIterationCount; i++) {
			const panelIndex = (currentIndex + i * iterationStep + itemCount) % itemCount;
			const $panel = $panelItems.eq(panelIndex);
			const panelIsDisabled = $panel.hasClass(disabledPanelItemClass);
			const panelIsHidden = $panel.hasClass(hiddenPanelItemClass);
			if (
				(!panelIsDisabled && !panelIsHidden) ||
				(includeDisabled && !panelIsHidden) ||
				(!panelIsDisabled && includeHidden) ||
				(includeDisabled && includeHidden)
			) {
				return switchTo(panelIndex);
			}
		}
	};

	const switchPrevious = function (switchOptions?: JQueryTab.SwitchOptions) {
		return _switchNeighbor(SwitchDirection.Backward, switchOptions);
	};

	const switchNext = function (switchOptions?: JQueryTab.SwitchOptions) {
		return _switchNeighbor(SwitchDirection.Forward, switchOptions);
	};

	return {switchToWithoutSave, switchTo, switchPrevious, switchNext};
}

export default generateSwitch;