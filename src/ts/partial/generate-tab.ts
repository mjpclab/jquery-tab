import $ from "jquery";
import defaultOptions from "../utility/default-options";

import createTabContainer from './create-tab-container';
import createTabItem from './create-tab-item';
import updateActiveState from './update-active-state';

const RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;

let nextContainerId = 0;

function generateTab($region: JQuery, customOptions?: JQueryTab.Options) {
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
	const getCount = function () {
		return context.itemCount;
	};
	const getCurrentIndex = function () {
		return context.currentIndex;
	};
	const getLabel = function ($container: JQuery, index: number) {
		if (!isFinite(index)) {
			throw new Error('invalid index');
		}
		return $container.children(':eq(' + index + ')');
	};
	const getHeaderLabel = function (index: number) {
		if ($headerLabelContainerLeaf) {
			return getLabel($headerLabelContainerLeaf, index);
		}
		return $([]);
	};
	const getFooterLabel = function (index: number) {
		if ($footerLabelContainerLeaf) {
			return getLabel($footerLabelContainerLeaf, index);
		}
		return $([]);
	};
	const getHeaderFooterLabels = function (index: number) {
		return getHeaderLabel(index).add(getFooterLabel(index));
	};
	const getPanel = function (index: number) {
		if (!isFinite(index)) {
			throw new Error('invalid index');
		}
		return $panelContainerLeaf.children(':eq(' + index + ')');
	};

	//utilities
	let $statusFields = $region.find(options.statusFieldSelector);
	if (!$statusFields.length) {
		$statusFields = $(options.statusFieldSelector);
	}
	let RE_STATUS_HASH: RegExp;
	let RE_STATUS_HASH_DIGITS: RegExp;
	if (options.statusHashTemplate) {
		RE_STATUS_HASH = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '-?\\d+');
		RE_STATUS_HASH_DIGITS = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '(-?\\d+)');
	}
	const saveIndex = function saveIndex(index: number) {
		$statusFields.val(index);

		if (options.statusHashTemplate) {
			let hash = location.hash;
			const statusHash = options.statusHashTemplate + index;
			if (hash.indexOf(options.statusHashTemplate) > -1) {
				hash = hash.replace(RE_STATUS_HASH, statusHash);
			}
			else {
				if (hash.length) {
					hash += options.statusHashSeparator;
				}
				hash += statusHash;
			}

			location.hash = hash;
		}

		if (options.fnSaveIndex) {
			options.fnSaveIndex.call($tabContainer, index);
		}
	};
	const loadIndex = function () {
		let index = -1;
		if (context.itemCount === 0) {
			return index;
		}

		$statusFields.each(function () {
			const status = $(this).val() as string | number;
			if (typeof status === 'number') {
				index = status;
				return false;
			}
			else if (status.length) {
				const intStatus = parseInt(status);
				if (isFinite(intStatus) && !isNaN(intStatus)) {
					index = parseInt(status);
					return false;
				}
			}
		});
		if ((index === -1 || isNaN(index)) && options.statusHashTemplate) {
			const searchResult = location.hash.match(RE_STATUS_HASH_DIGITS);
			if (searchResult && searchResult[1]) {
				index = parseInt(searchResult[1]);
			}
		}
		if ((index === -1 || isNaN(index)) && options.fnLoadIndex) {
			index = parseInt(options.fnLoadIndex.call($tabContainer));
		}
		if (index === -1 || isNaN(index)) {
			index = Number(options.activeIndex) || 0;
		}

		if (index < 0) {
			index = 0;
		}
		else if (index >= context.itemCount) {
			index = context.itemCount - 1;
		}

		return index;
	};

	//methods
	const switchTo = function (newIndex: number, shouldSaveIndex = true) {
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

		//keep new index for restoring
		shouldSaveIndex && saveIndex(newIndex);

		//finalize
		context.currentIndex = newIndex;

		//after switching callback
		if (typeof (options.onAfterSwitch) === 'function') {
			options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
		}
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
	switchTo(loadIndex(), false);

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

export default generateTab;