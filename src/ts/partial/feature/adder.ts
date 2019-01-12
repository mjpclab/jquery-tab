import $ from 'jquery';
import Getter from './getter';
import SaveLoad from './save-load';
import Switcher from './switcher';
import createTabItem from '../create/item/create-tab-item';

class Adder {
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
}

export default Adder;
