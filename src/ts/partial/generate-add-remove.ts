import createTabItem from "./create-tab-item";
import $ from "jquery";

function generateAddRemove(
	fnPositionToIndex: JQueryTab.fnPositionToIndex,
	fnGetHeaderFooterLabels: JQueryTab.fnGetLabel,
	fnGetPanel: JQueryTab.fnGetPanel,
	fnSavePosition: JQueryTab.fnSavePosition,
	fnSwitchTo: JQueryTab.fnSwitchTo,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const insertTabItemWithoutSwitch = function (
		tabItem: JQueryTab.TabItem,
		position: JQueryTab.TabItemPosition
	) {
		const {$headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainerLeaf} = containers;

		const {$panelItem, cloneLabelItem} = createTabItem(tabItem, context, options);
		if (context.currentIndex > -1 && typeof options.fnHidePanelItem === 'function') {
			options.fnHidePanelItem.call($panelItem, $panelItem);
		}

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
				fnSavePosition(tabItem.name || context.currentIndex);
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
		tabItem: JQueryTab.TabItem,
		position: JQueryTab.TabItemPosition
	) {
		insertTabItemWithoutSwitch(tabItem, position);
		if (context.currentIndex === -1 && context.itemCount) {
			fnSwitchTo(0);
		}
	};
	const addTabItemWithoutSwitch = function (tabItem: JQueryTab.TabItem) {
		insertTabItemWithoutSwitch(tabItem, context.itemCount);
	};
	const addTabItem = function (tabItem: JQueryTab.TabItem) {
		addTabItemWithoutSwitch(tabItem);
		if (context.currentIndex === -1 && context.itemCount) {
			fnSwitchTo(0);
		}
	};

	const insertWithoutSwitch = function (
		sourceRegion: JQueryTab.JQueriable,
		position: JQueryTab.TabItemPosition
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
			insertTabItemWithoutSwitch(tabItem, index + inserted);
			inserted++;
		}
	};
	const insert = function (
		sourceRegion: JQueryTab.JQueriable,
		position: JQueryTab.TabItemPosition
	) {
		insertWithoutSwitch(sourceRegion, position);
		if (context.currentIndex === -1 && context.itemCount) {
			fnSwitchTo(0);
		}
	};
	const addWithoutSwitch = function (sourceRegion: JQueryTab.JQueriable) {
		insertWithoutSwitch(sourceRegion, context.itemCount);
	};
	const add = function (sourceRegion: JQueryTab.JQueriable) {
		addWithoutSwitch(sourceRegion);
		if (context.currentIndex === -1 && context.itemCount) {
			fnSwitchTo(0);
		}
	};
	const remove = function (position: JQueryTab.TabItemPosition) {
		const index = fnPositionToIndex(position);
		if (index < 0 || index >= context.itemCount) {
			return;
		}

		const $labelItems = fnGetHeaderFooterLabels(index);
		const $panelItem = fnGetPanel(index);

		$labelItems.remove();
		$panelItem.remove();
		context.itemCount--;

		if (context.itemCount === 0) {
			context.currentIndex = -1;
			context.currentName = undefined;
		}
		else if (index < context.currentIndex) {
			fnSwitchTo(context.currentIndex - 1);
		}
		else if (index === context.currentIndex) {
			if (index === context.itemCount) {
				fnSwitchTo(context.currentIndex - 1);
			}
			else {
				fnSwitchTo(context.currentIndex);
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