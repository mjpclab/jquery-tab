import $ from "jquery";
import createTabItem from "./create-tab-item";

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
	const remove = function (...positions: JQueryTab.TabItemPosition[]) {
		if (!positions.length) {
			return;
		}

		const removeIndecies = [];
		for (let i = 0, len = positions.length; i < len; i++) {
			const removeIndex = fnPositionToIndex(positions[i]);
			if (removeIndex >= 0 && removeIndex < context.itemCount && $.inArray(removeIndex, removeIndecies) === -1) {
				removeIndecies.push(removeIndex);
			}
		}
		if (!removeIndecies.length) {
			return;
		}
		removeIndecies.sort(function (prev, next) {
			return next - prev;
		});

		if (context.itemCount > 1 && $.inArray(context.currentIndex, removeIndecies) >= 0) {
			fnSwitchNext({exclude: removeIndecies}) ||
			fnSwitchPrevious({exclude: removeIndecies}) ||
			fnSwitchNext({includeDisabled: true, exclude: removeIndecies}) ||
			fnSwitchPrevious({includeDisabled: true, exclude: removeIndecies}) ||
			fnSwitchNext({includeHidden: true, exclude: removeIndecies}) ||
			fnSwitchPrevious({includeHidden: true, exclude: removeIndecies}) ||
			fnSwitchNext({includeDisabled: true, includeHidden: true, exclude: removeIndecies}) ||
			fnSwitchPrevious({includeDisabled: true, includeHidden: true, exclude: removeIndecies});
		}

		let currentIndexChanged = false;
		for (let i = 0, len = removeIndecies.length; i < len; i++) {
			const removeIndex = removeIndecies[i];
			const $labelItems = fnGetHeaderFooterLabels(removeIndex);
			const $panelItem = fnGetPanel(removeIndex);

			$labelItems.remove();
			$panelItem.remove();


			if (removeIndex < context.currentIndex) {
				context.currentIndex--;
				currentIndexChanged = true;
			}
			context.itemCount--;
		}

		if (context.itemCount === 0) {
			context.currentIndex = -1;
			context.currentName = undefined;
		}
		else if (currentIndexChanged && !context.currentName) {
			fnSavePosition(context.currentIndex);
		}

		return removeIndecies.length;
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
