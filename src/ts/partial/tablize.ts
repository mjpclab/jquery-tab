import $ from "jquery";
import defaultOptions from "../utility/default-options";

import createTabContainer from './create-tab-container';
import createTabItem from './create-tab-item';
import generateGetters from './generate-getters';
import generateSaveLoadIndex from './generate-save-load-index';
import updateActiveState from './update-active-state';

let nextContainerId = 0;

function tablize($region: JQuery, customOptions?: JQueryTab.Options) {
	const dataOptions = $region.data();
	const options: JQueryTab.NecessaryOptions = {...defaultOptions, ...dataOptions, ...customOptions};

	const context: JQueryTab.Context = {
		containerId: nextContainerId++,
		nextItemId: 0,
		itemCount: 0,
		currentIndex: -1
	};

	const containers: JQueryTab.Containers = {
		$region,
		...createTabContainer(options)
	};
	const {
		$tabContainer, $headerLabelContainerLeaf, $panelContainerLeaf, $footerLabelContainerLeaf
	} = containers;

	//getters
	const {
		getCount,
		getCurrentIndex,
		getLabel,
		getHeaderLabel,
		getFooterLabel,
		getHeaderFooterLabels,
		getPanel
	} = generateGetters(containers, context);

	//save/load
	const {saveIndex, loadIndex} = generateSaveLoadIndex(containers, context, options);

	//methods
	const _switchTo = function (newIndex: number) {
		const oldIndex = context.currentIndex;

		//before switching callback
		if (typeof (options.onBeforeSwitch) === 'function') {
			options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
		}

		//labels & panels
		const $newLabel = getHeaderFooterLabels(newIndex);
		const $newPanel = getPanel(newIndex);
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
		_switchTo(newIndex);
		saveIndex(newIndex);
	};

	const _insertTabItem = function (title: JQueryTab.JQueriable, content: JQueryTab.JQueriable, index: number) {
		const {$panelItem, cloneLabelItem} = createTabItem(title, content, context, options);
		if (context.currentIndex > -1 && typeof options.fnHidePanelItem === 'function') {
			options.fnHidePanelItem.call($panelItem, $panelItem);
		}

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
				saveIndex(++context.currentIndex);
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
	const insertTabItem = function (title: JQueryTab.JQueriable, content: JQueryTab.JQueriable, index: number) {
		_insertTabItem(title, content, index);
		if (context.currentIndex === -1 && context.itemCount) {
			switchTo(0);
		}
	};
	const addTabItem = function (title: JQueryTab.JQueriable, content: JQueryTab.JQueriable) {
		_insertTabItem(title, content, context.itemCount);
		if (context.currentIndex === -1 && context.itemCount) {
			switchTo(0);
		}
	};

	const _insert = function (sourceRegion: JQueryTab.JQueriable, index: number) {
		const $sourceRegion = $(sourceRegion);
		let inserted = 0;
		while (true) {
			const $title = $sourceRegion.find(options.titleSelector).first();
			if ($title.length === 0) {
				break;
			}
			if (!options.keepTitleVisible) {
				$title.hide();
			}

			const title = options.fnGetTitleContent.call($title, $title);
			const content = $title.add($title.nextUntil(options.titleSelector));
			_insertTabItem(title, content, index + inserted);
			inserted++;
		}
	};
	const insert = function (sourceRegion: JQueryTab.JQueriable, index: number) {
		_insert(sourceRegion, index);
		if (context.currentIndex === -1 && context.itemCount) {
			switchTo(0);
		}
	};
	const _add = function (sourceRegion: JQueryTab.JQueriable) {
		_insert(sourceRegion, context.itemCount);
	};
	const add = function (sourceRegion: JQueryTab.JQueriable) {
		_add(sourceRegion);
		if (context.currentIndex === -1 && context.itemCount) {
			switchTo(0);
		}
	};
	const remove = function (index: number) {
		if (index === undefined || !isFinite(index) || index < 0 || index >= context.itemCount) {
			return;
		}

		const $labelItems = getHeaderFooterLabels(index);
		const $panelItem = getPanel(index);

		$labelItems.remove();
		$panelItem.remove();
		context.itemCount--;

		if (index < context.currentIndex) {
			saveIndex(--context.currentIndex);
		}
		else if (index === context.currentIndex) {
			if (context.currentIndex === context.itemCount) {
				switchTo(context.currentIndex - 1);
			}
			else {
				switchTo(context.currentIndex);
			}
		}

		return $panelItem;
	};

	_add($region);

	//replace original content
	if (!context.itemCount && !options.createEmptyTab) {
		return;
	}
	$region.append($tabContainer);

	//check if param:fixed height
	const updateFixedHeight = function () {
		if (options.fixedHeight) {
			let maxHeight = 0;

			$panelContainerLeaf.children().each(function () {
				const $panelItem = $(this);
				const panelHeight = $panelItem[0].scrollHeight;
				if (panelHeight > maxHeight) {
					maxHeight = panelHeight;
				}
			}).height(maxHeight);
		}
	};
	updateFixedHeight();

	//init show active panel
	_switchTo(loadIndex());

	//handle delay trigger event
	let delayTriggerHandler: number;
	const startDelayTrigger = function (labelIndex: number) {
		delayTriggerHandler = setTimeout(function () {
			switchTo(labelIndex);
		}, options.delayTriggerLatency);
	};

	const cancelDelayTrigger = function () {
		if (delayTriggerHandler) {
			clearTimeout(delayTriggerHandler);
			delayTriggerHandler = 0;
		}
	};

	const labelItemDelayClick = function (e: any) {
		if (e.currentTarget.parentNode !== e.delegateTarget) {
			return;
		}
		cancelDelayTrigger();
		const $activeLabel = $(e.currentTarget);
		const activeLabelIndex = $activeLabel.index();
		if (activeLabelIndex === context.currentIndex) {
			return;
		}

		startDelayTrigger(activeLabelIndex);
	};
	const labelItemCancelDelayClick = function (e: any) {
		if (e.currentTarget.parentNode !== e.delegateTarget) {
			return;
		}
		const $activeLabel = $(e.currentTarget);
		const activeLabelIndex = $activeLabel.index();
		if (activeLabelIndex === context.currentIndex) {
			return;
		}

		cancelDelayTrigger();
	};

	if (options.delayTriggerEvents) {
		if ($headerLabelContainerLeaf) {
			$headerLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
		}
		if ($footerLabelContainerLeaf) {
			$footerLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
		}

		if (options.delayTriggerCancelEvents) {
			if ($headerLabelContainerLeaf) {
				$headerLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
			}
			if ($footerLabelContainerLeaf) {
				$footerLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
			}
		}
	}

	//handle trigger event
	const labelItemClick = function (e: any) {
		if (e.currentTarget.parentNode !== e.delegateTarget) {
			return;
		}
		cancelDelayTrigger();
		const $activeLabel = $(e.currentTarget);
		const activeLabelIndex = $activeLabel.index();
		if (activeLabelIndex === context.currentIndex) {
			return;
		}

		switchTo(activeLabelIndex);
	};

	if (options.triggerEvents) {
		if ($headerLabelContainerLeaf) {
			$headerLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
		}
		if ($footerLabelContainerLeaf) {
			$footerLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
		}
	}

	//controller
	const controller = {
		getCount,
		getCurrentIndex,
		getHeaderLabel,
		getFooterLabel,
		getHeaderFooterLabels,
		getPanel,
		updateFixedHeight,
		switchTo,
		addTabItem,
		insertTabItem,
		add,
		insert,
		remove
	};
	$region.data('tab-controller', controller);
	$tabContainer.data('tab-controller', controller);
}

export default tablize;