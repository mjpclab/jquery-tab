import createTabItem from "./create-tab-item";
import $ from "jquery";

function generateAddRemove(
	fnPositionToIndex: JQueryTab.fnPositionToIndex,
	fnGetHeaderFooterLabels: JQueryTab.fnGetLabel,
	fnGetPanel: JQueryTab.fnGetPanel,
	fnSavePosition: JQueryTab.fnSavePosition,
	fnSwitchTo: JQueryTab.fnSwitchTo,
	fnSwitchPrevious: JQueryTab.fnSwitchNeighbor,
	fnSwitchNext: JQueryTab.fnSwitchNeighbor,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const _switchIfInitial = function () {
		if (context.currentIndex === -1 && context.itemCount) {
			fnSwitchTo(0);
		}
	};

	const insertTabItemWithoutSwitch = function (
		position: JQueryTab.TabItemPosition,
		tabItem: JQueryTab.TabItem
	) {
		const {$headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainerLeaf} = containers;

		const {$panelItem, cloneLabelItem} = createTabItem(tabItem, context, options);

		let index = fnPositionToIndex(position);
		if (index < 0) {
			index = 0;
		}
		if (context.itemCount > 0 && index < context.itemCount) {
			if ($headerLabelContainerLeaf) {
				$headerLabelContainerLeaf.children().eq(index).before(cloneLabelItem());
			}
			if ($footerLabelContainerLeaf) {
				$footerLabelContainerLeaf.children().eq(index).before(cloneLabelItem());
			}
			$panelContainerLeaf.children().eq(index).before($panelItem);

			if (index <= context.currentIndex) {
				context.currentIndex++;
				if (!context.currentName) {
					fnSavePosition(context.currentIndex);
				}
			}
		}
		else {
			if ($headerLabelContainerLeaf) {
				$headerLabelContainerLeaf.append(cloneLabelItem());
			}
			if ($footerLabelContainerLeaf) {
				$footerLabelContainerLeaf.append(cloneLabelItem());
			}
			$panelContainerLeaf.append($panelItem);
		}

		context.itemCount++;
	};
	const insertTabItem = function (
		position: JQueryTab.TabItemPosition,
		tabItem: JQueryTab.TabItem
	) {
		insertTabItemWithoutSwitch(position, tabItem);
		_switchIfInitial();
	};
	const addTabItemWithoutSwitch = function (tabItem: JQueryTab.TabItem) {
		insertTabItemWithoutSwitch(context.itemCount, tabItem);
	};
	const addTabItem = function (tabItem: JQueryTab.TabItem) {
		addTabItemWithoutSwitch(tabItem);
		_switchIfInitial();
	};

	const insertWithoutSwitch = function (
		position: JQueryTab.TabItemPosition,
		sourceRegion: JQueryTab.JQueriable
	) {
		const {
			titleSelector,
			fnGetTitleContent,
			keepTitleVisible,
			fnGetTabItemName,
			fnIsTabItemDisabled,
			fnIsTabItemHidden
		} = options;

		const $sourceRegion = $(sourceRegion);
		let inserted = 0;
		const index = fnPositionToIndex(position);
		while (true) {
			const $title = $sourceRegion.find(titleSelector).first();
			if ($title.length === 0) {
				break;
			}
			if (!keepTitleVisible) {
				$title.hide();
			}

			const $rest = $title.nextUntil(titleSelector);

			const tabItem = {
				title: fnGetTitleContent.call($sourceRegion, $title, $rest),
				content: $([]).add($title).add($rest),
				name: fnGetTabItemName.call($sourceRegion, $title, $rest),
				disabled: fnIsTabItemDisabled.call($sourceRegion, $title, $rest),
				hidden: fnIsTabItemHidden.call($sourceRegion, $title, $rest)
			};
			insertTabItemWithoutSwitch(index + inserted, tabItem);
			inserted++;
		}
	};
	const insert = function (
		sourceRegion: JQueryTab.JQueriable,
		position: JQueryTab.TabItemPosition
	) {
		insertWithoutSwitch(position, sourceRegion);
		_switchIfInitial();
	};
	const addWithoutSwitch = function (sourceRegion: JQueryTab.JQueriable) {
		insertWithoutSwitch(context.itemCount, sourceRegion);
	};
	const add = function (sourceRegion: JQueryTab.JQueriable) {
		addWithoutSwitch(sourceRegion);
		_switchIfInitial();
	};
	const remove = function (position: JQueryTab.TabItemPosition) {
		const removeIndex = fnPositionToIndex(position);
		if (removeIndex < 0 || removeIndex >= context.itemCount) {
			return;
		}

		const $labelItems = fnGetHeaderFooterLabels(removeIndex);
		const $panelItem = fnGetPanel(removeIndex);

		let switchResult: JQueryTab.SwitchResult | undefined;
		if (context.itemCount > 1 && removeIndex === context.currentIndex) {
			switchResult = fnSwitchNext() ||
				fnSwitchPrevious() ||
				fnSwitchNext({includeDisabled: true}) ||
				fnSwitchPrevious({includeDisabled: true}) ||
				fnSwitchNext({includeHidden: true}) ||
				fnSwitchPrevious({includeHidden: true}) ||
				fnSwitchNext({includeDisabled: true, includeHidden: true}) ||
				fnSwitchPrevious({includeDisabled: true, includeHidden: true});
		}

		$labelItems.remove();
		$panelItem.remove();
		context.itemCount--;

		if (context.itemCount === 0) {
			context.currentIndex = -1;
			context.currentName = undefined;
		}
		else if (switchResult && switchResult.index > removeIndex) {
			context.currentIndex = switchResult.index - 1;
			if (!context.currentName) {
				fnSavePosition(context.currentIndex);
			}
		}
		else if (removeIndex < context.currentIndex) {
			context.currentIndex--;
			if (!context.currentName) {
				fnSavePosition(context.currentIndex);
			}
		}

		return $panelItem;
	};

	return {
		insertTabItemWithoutSwitch,
		insertTabItem,
		addTabItemWithoutSwitch,
		addTabItem,
		insert,
		insertWithoutSwitch,
		add,
		addWithoutSwitch,
		remove
	};
}

export default generateAddRemove;