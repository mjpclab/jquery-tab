import $ from "jquery";
import Getter from "./getter";
import SaveLoad from "./save-load";
import Switcher from './switcher';
import createTabItem from "./create-tab-item";

class AddRemove {
	private readonly getter: Getter;
	private readonly saveLoad: SaveLoad;
	private readonly switcher: Switcher;

	private readonly containers: JQueryTab.Containers;
	private readonly context: JQueryTab.Context;
	private readonly options: JQueryTab.ExpandedOptions;

	constructor(
		getter: Getter,
		saveLoad: SaveLoad,
		switcher: Switcher,
		containers: JQueryTab.Containers,
		context: JQueryTab.Context,
		options: JQueryTab.ExpandedOptions
	) {
		this.getter = getter;
		this.saveLoad = saveLoad;
		this.switcher = switcher;

		this.containers = containers;
		this.context = context;
		this.options = options;
	}

	private _switchIfInitial() {
		const {switcher, context} = this;
		if (context.currentIndex === -1 && context.itemCount) {
			switcher.switchTo(0);
		}
	}

	insertTabItemWithoutSwitch(
		position: JQueryTab.TabItemPosition,
		tabItem: JQueryTab.TabItem
	) {
		const {getter, saveLoad, containers, context, options} = this;
		const {$headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainerLeaf} = containers;

		const {$panelItem, cloneLabelItem} = createTabItem(tabItem, context, options);

		let index = getter.positionToIndex(position);
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
					saveLoad.savePosition(context.currentIndex);
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
	}

	insertTabItem(
		position: JQueryTab.TabItemPosition,
		tabItem: JQueryTab.TabItem
	) {
		this.insertTabItemWithoutSwitch(position, tabItem);
		this._switchIfInitial();
	}

	addTabItemWithoutSwitch(tabItem: JQueryTab.TabItem) {
		this.insertTabItemWithoutSwitch(this.context.itemCount, tabItem);
	}

	addTabItem(tabItem: JQueryTab.TabItem) {
		this.addTabItemWithoutSwitch(tabItem);
		this._switchIfInitial();
	}

	insertWithoutSwitch(
		position: JQueryTab.TabItemPosition,
		sourceRegion: JQueryTab.JQueriable
	) {
		const {getter} = this;

		const {
			titleSelector,
			fnGetTitleContent,
			keepTitleVisible,
			fnGetTabItemName,
			fnIsTabItemDisabled,
			fnIsTabItemHidden
		} = this.options;

		const $sourceRegion = $(sourceRegion);
		let inserted = 0;
		const index = getter.positionToIndex(position);
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
			this.insertTabItemWithoutSwitch(index + inserted, tabItem);
			inserted++;
		}
	}

	insert(
		position: JQueryTab.TabItemPosition,
		sourceRegion: JQueryTab.JQueriable
	) {
		this.insertWithoutSwitch(position, sourceRegion);
		this._switchIfInitial();
	}

	addWithoutSwitch(sourceRegion: JQueryTab.JQueriable) {
		this.insertWithoutSwitch(this.context.itemCount, sourceRegion);
	}

	add(sourceRegion: JQueryTab.JQueriable) {
		this.addWithoutSwitch(sourceRegion);
		this._switchIfInitial();
	}

	remove(positions: JQueryTab.TabItemPosition[]) {
		if (!positions.length) {
			return;
		}

		const {getter, saveLoad, switcher, context} = this;
		const removeIndecies = [];
		for (let i = 0, len = positions.length; i < len; i++) {
			const removeIndex = getter.positionToIndex(positions[i]);
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
			switcher.switchNext({exclude: removeIndecies}) ||
			switcher.switchPrevious({exclude: removeIndecies}) ||
			switcher.switchNext({includeDisabled: true, exclude: removeIndecies}) ||
			switcher.switchPrevious({includeDisabled: true, exclude: removeIndecies}) ||
			switcher.switchNext({includeHidden: true, exclude: removeIndecies}) ||
			switcher.switchPrevious({includeHidden: true, exclude: removeIndecies}) ||
			switcher.switchNext({includeDisabled: true, includeHidden: true, exclude: removeIndecies}) ||
			switcher.switchPrevious({includeDisabled: true, includeHidden: true, exclude: removeIndecies});
		}

		let currentIndexChanged = false;
		for (let i = 0, len = removeIndecies.length; i < len; i++) {
			const removeIndex = removeIndecies[i];
			const $labelItems = getter.getHeaderFooterLabels(removeIndex);
			const $panelItem = getter.getPanel(removeIndex);

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
			saveLoad.savePosition(context.currentIndex);
		}

		return removeIndecies.length;
	}
}

export default AddRemove;
