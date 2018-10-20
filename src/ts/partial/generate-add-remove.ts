import createTabItem from "./create-tab-item";
import $ from "jquery";

function generateAddRemove(
	fnTabItemPositionToIndex: JQueryTab.fnPositionToIndex,
	fnGetHeaderFooterLabels: JQueryTab.fnGetLabel,
	fnGetPanel: JQueryTab.fnGetPanel,
	fnSavePosition: JQueryTab.fnSavePosition,
	fnSwitchTo: JQueryTab.fnSwitchTo,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const insertTabItemWithoutSwitch = function (
		$labelContent: JQueryTab.JQueriable,
		$panelContent: JQueryTab.JQueriable,
		tabItemName: string,
		position: JQueryTab.TabItemPosition
	) {
		const {$headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainerLeaf} = containers;

		const {$panelItem, cloneLabelItem} = createTabItem($labelContent, $panelContent, tabItemName, context, options);
		if (context.currentIndex > -1 && typeof options.fnHidePanelItem === 'function') {
			options.fnHidePanelItem.call($panelItem, $panelItem);
		}

		let index = fnTabItemPositionToIndex(position);
		if (index < 0) {
			index = 0;
		}
		if (context.itemCount > 0 && index < context.itemCount) {
			if ($headerLabelContainerLeaf) {
				$headerLabelContainerLeaf.children(':eq(' + index + ')').before(cloneLabelItem());
			}
			if ($footerLabelContainerLeaf) {
				$footerLabelContainerLeaf.children(':eq(' + index + ')').before(cloneLabelItem());
			}
			$panelContainerLeaf.children(':eq(' + index + ')').before($panelItem);

			if (index <= context.currentIndex) {
				context.currentIndex++;
				fnSavePosition(tabItemName || context.currentIndex);
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
		title: JQueryTab.JQueriable,
		content: JQueryTab.JQueriable,
		tabItemName: string,
		position: JQueryTab.TabItemPosition
	) {
		insertTabItemWithoutSwitch(title, content, tabItemName, position);
		if (context.currentIndex === -1 && context.itemCount) {
			fnSwitchTo(0);
		}
	};
	const addTabItemWithoutSwitch = function (
		title: JQueryTab.JQueriable,
		content: JQueryTab.JQueriable,
		tabItemName: string,
	) {
		insertTabItemWithoutSwitch(title, content, tabItemName, context.itemCount);
	};
	const addTabItem = function (
		title: JQueryTab.JQueriable,
		content: JQueryTab.JQueriable,
		tabItemName: string,
	) {
		addTabItemWithoutSwitch(title, content, tabItemName);
		if (context.currentIndex === -1 && context.itemCount) {
			fnSwitchTo(0);
		}
	};

	const insertWithoutSwitch = function (
		sourceRegion: JQueryTab.JQueriable,
		position: JQueryTab.TabItemPosition
	) {
		const {titleSelector, fnGetTitleContent, keepTitleVisible, fnGetName} = options;

		const $sourceRegion = $(sourceRegion);
		let inserted = 0;
		const index = fnTabItemPositionToIndex(position);
		while (true) {
			const $title = $sourceRegion.find(titleSelector).first();
			if ($title.length === 0) {
				break;
			}
			if (!keepTitleVisible) {
				$title.hide();
			}

			const $rest = $title.nextUntil(titleSelector);

			const $labelContent = fnGetTitleContent.call($title, $title);
			const $panelContent = $([]).add($title).add($rest);
			const tabItemName = fnGetName.call($sourceRegion, $title, $rest);
			insertTabItemWithoutSwitch($labelContent, $panelContent, tabItemName, index + inserted);
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
		const index = fnTabItemPositionToIndex(position);
		if (index < 0 || index >= context.itemCount) {
			return;
		}

		const $labelItems = fnGetHeaderFooterLabels(index);
		const $panelItem = fnGetPanel(index);

		$labelItems.remove();
		$panelItem.remove();
		context.itemCount--;

		if (index < context.currentIndex) {
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