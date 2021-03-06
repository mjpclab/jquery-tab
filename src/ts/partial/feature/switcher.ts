import $ from 'jquery';
import Getter from './getter';
import DomUpdater from './dom-updater';
import SaveLoad from './save-load';

enum SwitchDirection {Backward, Forward}

class Switcher {
	private readonly getter: Getter;
	private readonly domUpdater: DomUpdater;
	private readonly saveLoad: SaveLoad;

	private readonly containers: JQueryTab.Containers;
	private readonly context: JQueryTab.Context;
	private readonly options: JQueryTab.ExpandedOptions;

	constructor(
		getter: Getter,
		domUpdater: DomUpdater,
		saveLoad: SaveLoad,
		containers: JQueryTab.Containers,
		context: JQueryTab.Context,
		options: JQueryTab.ExpandedOptions
	) {
		this.getter = getter;
		this.domUpdater = domUpdater;
		this.saveLoad = saveLoad;

		this.containers = containers;
		this.context = context;
		this.options = options;
	}

	switchToWithoutSave(newPosition: JQueryTab.TabItemPosition): JQueryTab.SwitchResult {
		const {context, getter} = this;

		const newNormalizedPos = getter.normalizePosition(newPosition);
		const {index: newIndex, name: newName} = newNormalizedPos;
		if (newIndex < 0 || newIndex >= context.itemCount || newIndex === context.currentIndex) {
			return;
		}
		const {currentIndex: oldIndex, currentName: oldName, tabState} = context;
		const oldNormalizedPos: JQueryTab.NormalizedTabItemPosition = {index: oldIndex, name: oldName};

		const {$tabContainer} = this.containers;
		const {onBeforeSwitch, onAfterSwitch} = this.options;

		//before switching callback
		if (typeof (onBeforeSwitch) === 'function') {
			const callBackResult = onBeforeSwitch.call(
				$tabContainer,
				oldNormalizedPos,
				newNormalizedPos,
				tabState
			);
			if (callBackResult === false) {
				return false;
			}
		}

		//update state
		this.domUpdater.updateActiveState(newIndex);

		//finalize
		context.switched = true;
		context.currentIndex = newIndex;
		context.currentName = newName;

		//after switching callback
		if (typeof (onAfterSwitch) === 'function') {
			onAfterSwitch.call(
				$tabContainer,
				oldNormalizedPos,
				newNormalizedPos,
				tabState
			);
		}

		return newNormalizedPos;
	}

	switchTo(newPosition: JQueryTab.TabItemPosition): JQueryTab.SwitchResult {
		const result = this.switchToWithoutSave(newPosition);
		if (result) {
			const {saveLoad} = this;
			const {index, name} = result;
			saveLoad.savePosition(name || index);
		}
		return result;
	}

	private _switchNeighbor(
		fromIndex: number,
		direction: SwitchDirection,
		switchOptions?: JQueryTab.SwitchOptions
	): JQueryTab.SwitchResult {
		const {getter} = this;
		const opts = switchOptions || {};
		const {includeDisabled, includeHidden, loop, exclude} = opts;
		const excludeIndecies = exclude && exclude.length ? $.map(exclude, function (position) {
			return getter.positionToIndex(position);
		}) : [];

		const {$panelContainer} = this.containers;
		const $panelItems = $panelContainer.children();

		const {itemCount} = this.context;
		const {disabledPanelItemClass, hiddenPanelItemClass} = this.options;

		let maxIterationCount = -1;
		if (loop) {
			if (fromIndex >= 0 && fromIndex < itemCount) {
				maxIterationCount = itemCount - 1;
			} else {
				maxIterationCount = itemCount;
			}
		} else if (direction === SwitchDirection.Backward) {
			maxIterationCount = fromIndex;
		} else if (direction === SwitchDirection.Forward) {
			maxIterationCount = itemCount - fromIndex - 1;
		}

		const iterationStep = direction === SwitchDirection.Backward ? -1 : 1;

		for (let i = 1; i <= maxIterationCount; i++) {
			const panelIndex = (fromIndex + i * iterationStep + itemCount) % itemCount;
			if ($.inArray(panelIndex, excludeIndecies) >= 0) {
				continue;
			}
			const $panel = $panelItems.eq(panelIndex);
			const panelIsDisabled = $panel.hasClass(disabledPanelItemClass);
			const panelIsHidden = $panel.hasClass(hiddenPanelItemClass);
			if (
				(!panelIsDisabled && !panelIsHidden) ||
				(includeDisabled && !panelIsHidden) ||
				(!panelIsDisabled && includeHidden) ||
				(includeDisabled && includeHidden)
			) {
				return this.switchTo(panelIndex);
			}
		}
	}

	switchPrevious(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult {
		return this._switchNeighbor(this.context.currentIndex, SwitchDirection.Backward, switchOptions);
	}

	switchNext(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult {
		return this._switchNeighbor(this.context.currentIndex, SwitchDirection.Forward, switchOptions);
	}

	switchFirst(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult {
		return this._switchNeighbor(-1, SwitchDirection.Forward, switchOptions);
	}

	switchLast(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult {
		return this._switchNeighbor(this.context.itemCount, SwitchDirection.Backward, switchOptions);
	}
}

export default Switcher;
