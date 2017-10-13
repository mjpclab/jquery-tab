/// <reference path='main.d.ts' />

import $ = require('jquery');

function getLeafElement($node: JQuery) {
	let $result = $node;
	let $deeper;
	while ($deeper = $result.children(), $deeper.length) {
		$result = $deeper;
	}
	return $result.eq(0);
}

$.fn.tab = function (customOptions?: JQueryTabOptions) {
	const defaultOptions: JQueryTabOptions = {
		triggerEvents: 'click',
		delayTriggerEvents: '',
		delayTriggerCancelEvents: '',
		delayTriggerLatency: 200,
		statusFieldSelector: '',
		statusHashTemplate: '',
		statusHashSeparator: '&',
		fixedHeight: false,

		activeIndex: 0,
		createEmptyTab: false,
		fnShowPageItem: function ($pageItem: JQuery) {
			return $pageItem && $pageItem.show && $pageItem.show();
		},
		fnHidePageItem: function ($pageItem: JQuery) {
			return $pageItem && $pageItem.hide && $pageItem.hide();
		},
		onBeforeSwitch: undefined,
		onAfterSwitch: undefined,

		titleSelector: 'h1,h2,h3,h4,h5,h6',
		fnGetTitleContent: function ($title: JQuery) {
			return $title.contents();
		},
		keepTitleVisible: false,

		tabContainerTemplate: '<div></div>',
		tabContainerClass: 'tab-container',

		labelContainerTemplate: '<div></div>',
		labelContainerClass: 'label-container',
		showHeaderLabelContainer: true,
		showFooterLabelContainer: false,
		headerLabelContainerClass: 'header-container',
		footerLabelContainerClass: 'footer-container',
		labelItemTemplate: '<span></span>',
		labelItemClass: 'label-item',
		labelItemActiveClass: 'label-active',
		labelItemInactiveClass: 'label-inactive',

		pageContainerTemplate: '<div></div>',
		pageContainerClass: 'page-container',
		pageItemTemplate: '<div></div>',
		pageItemClass: 'page-item',
		pageItemActiveClass: 'page-active',
		pageItemInactiveClass: 'page-inactive'
	};

	const generateStructure = function ($item: JQuery) {
		const dataOptions = $item.data();
		const options = $.extend({}, defaultOptions, dataOptions, customOptions);

		let pageCount = 0;
		let currentIndex = -1;

		//container
		const $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass!);

		//top label
		let $topLabelContainer: JQuery | undefined;
		let $topLabelContainerLeaf: JQuery | undefined;
		if (options.showHeaderLabelContainer) {
			$topLabelContainer = $(options.labelContainerTemplate!).addClass(options.labelContainerClass!).addClass(options.headerLabelContainerClass!);
			$tabContainer.append($topLabelContainer);

			$topLabelContainerLeaf = getLeafElement($topLabelContainer);
		}

		//page
		const $pageContainer = $(options.pageContainerTemplate).addClass(options.pageContainerClass!);
		$tabContainer.append($pageContainer);

		const $pageContainerLeaf = getLeafElement($pageContainer);

		//bottom label
		let $bottomLabelContainer: JQuery | undefined;
		let $bottomLabelContainerLeaf: JQuery | undefined;
		if (options.showFooterLabelContainer) {
			$bottomLabelContainer = $(options.labelContainerTemplate!).addClass(options.labelContainerClass!).addClass(options.footerLabelContainerClass!);
			$tabContainer.append($bottomLabelContainer);

			$bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);
		}


		//getters
		const getCount = function () {
			return pageCount;
		};
		const getCurrentIndex = function () {
			return currentIndex;
		};
		const getLabel = function ($container: JQuery, index: number) {
			if (!isFinite(index)) {
				throw new Error('invalid index');
			}
			return $container.children(':eq(' + index + ')');
		};
		const getHeaderLabel = function (index: number) {
			if ($topLabelContainerLeaf) {
				return getLabel($topLabelContainerLeaf, index);
			}
			return $([]);
		};
		const getFooterLabel = function (index: number) {
			if ($bottomLabelContainerLeaf) {
				return getLabel($bottomLabelContainerLeaf, index);
			}
			return $([]);
		};
		const getHeaderFooterLabels = function (index: number) {
			return getHeaderLabel(index).add(getFooterLabel(index));
		};
		const getPage = function (index: number) {
			if (!isFinite(index)) {
				throw new Error('invalid index');
			}
			return $pageContainerLeaf.children(':eq(' + index + ')');
		};

		//add labels & pages
		const newLabelItem = function (title: JQueriable) {
			const $labelItem = $(options.labelItemTemplate).addClass(options.labelItemClass!).addClass(options.labelItemInactiveClass!);
			const $labelItemLeaf = getLeafElement($labelItem);
			$labelItemLeaf.empty().append(title);

			return $labelItem;
		};
		const newPageItem = function (content: JQueriable) {
			const $pageItem = $(options.pageItemTemplate).addClass(options.pageItemClass!).addClass(options.pageItemInactiveClass!);
			const $pageItemLeaf = getLeafElement($pageItem);
			$pageItemLeaf.append(content);

			return $pageItem;
		};


		//utilities
		let $statusFields = $item.find(options.statusFieldSelector!);
		if (!$statusFields.length) {
			$statusFields = $(options.statusFieldSelector);
		}
		let RE_STATUS_HASH: RegExp;
		let RE_STATUS_HASH_DIGITS: RegExp;
		if (options.statusHashTemplate) {
			const RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
			RE_STATUS_HASH = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '-?\\d+');
			RE_STATUS_HASH_DIGITS = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '(-?\\d+)');
		}
		const saveIndex = function (index: number) {
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
			if (pageCount === 0) {
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
			else if (index >= pageCount) {
				index = pageCount - 1;
			}

			return index;
		};

		//methods
		const _updateClass = function ($activeLabelItem: JQuery, $activePageItem: JQuery) {
			$activeLabelItem.addClass(options.labelItemActiveClass!).removeClass(options.labelItemInactiveClass);
			$activeLabelItem.siblings().removeClass(options.labelItemActiveClass).addClass(options.labelItemInactiveClass!);

			$activePageItem.addClass(options.pageItemActiveClass!).removeClass(options.pageItemInactiveClass);
			$activePageItem.siblings().removeClass(options.pageItemActiveClass).addClass(options.pageItemInactiveClass!);
		};

		const switchTo = function (newIndex: number) {
			const oldIndex = currentIndex;

			//before switching callback
			if (typeof (options.onBeforeSwitch) === 'function') {
				options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
			}

			//labels & pages
			const $newLabel = getHeaderFooterLabels(newIndex);
			const $newPage = getPage(newIndex);
			const $otherPages = $newPage.siblings();

			_updateClass($newLabel, $newPage);

			//function to hide pages
			if (typeof options.fnHidePageItem === 'function') {
				options.fnHidePageItem.call($otherPages, $otherPages);
			}

			//function to show page
			if (typeof options.fnShowPageItem === 'function') {
				options.fnShowPageItem.call($newPage, $newPage);
			}

			//keep new index for restoring
			saveIndex(newIndex);

			//finalize
			currentIndex = newIndex;

			//after switching callback
			if (typeof (options.onAfterSwitch) === 'function') {
				options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
			}
		};

		const _insertTabPage = function (title: JQueriable, content: JQueriable, index: number) {
			const $labelItem = newLabelItem(title);
			const $pageItem = newPageItem(content);
			if (currentIndex > -1 && typeof options.fnHidePageItem === 'function') {
				options.fnHidePageItem.call($pageItem, $pageItem);
			}

			if (index < 0) {
				index = 0;
			}
			if (pageCount > 0 && index < pageCount) {
				if ($topLabelContainerLeaf) {
					$topLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
				}
				if ($bottomLabelContainerLeaf) {
					$bottomLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
				}
				$pageContainerLeaf.children(':eq(' + index + ')').before($pageItem);

				if (index <= currentIndex) {
					saveIndex(++currentIndex);
				}
			}
			else {
				if ($topLabelContainerLeaf) {
					$topLabelContainerLeaf.append($labelItem.clone());
				}
				if ($bottomLabelContainerLeaf) {
					$bottomLabelContainerLeaf.append($labelItem.clone());
				}
				$pageContainerLeaf.append($pageItem);
			}

			pageCount++;
		};
		const insertTabPage = function (title: JQueriable, content: JQueriable, index: number) {
			_insertTabPage(title, content, index);
			if (currentIndex === -1 && pageCount) {
				switchTo(0);
			}
		};
		const addTabPage = function (title: JQueriable, content: JQueriable) {
			_insertTabPage(title, content, pageCount);
			if (currentIndex === -1 && pageCount) {
				switchTo(0);
			}
		};

		const _insert = function (sourceRegion: JQueriable, index: number) {
			const $sourceRegion = $(sourceRegion);
			let inserted = 0;
			while (true) {
				const $title = $sourceRegion.find(options.titleSelector!).first();
				if ($title.length === 0) {
					break;
				}
				if (!options.keepTitleVisible) {
					$title.hide();
				}

				const title = options.fnGetTitleContent!.call($title, $title);
				const content = $title.add($title.nextUntil(options.titleSelector));
				_insertTabPage(title, content, index + inserted);
				inserted++;
			}
		};
		const insert = function (sourceRegion: JQueriable, index: number) {
			_insert(sourceRegion, index);
			if (currentIndex === -1 && pageCount) {
				switchTo(0);
			}
		};
		const _add = function (sourceRegion: JQueriable) {
			_insert(sourceRegion, pageCount);
		};
		const add = function (sourceRegion: JQueriable) {
			_add(sourceRegion);
			if (currentIndex === -1 && pageCount) {
				switchTo(0);
			}
		};
		const remove = function (index: number) {
			if (index === undefined || !isFinite(index) || index < 0 || index >= pageCount) {
				return;
			}

			const $labelItems = getHeaderFooterLabels(index);
			const $pageItem = getPage(index);

			$labelItems.remove();
			$pageItem.remove();
			pageCount--;

			if (index < currentIndex) {
				saveIndex(--currentIndex);
			}
			else if (index === currentIndex) {
				if (currentIndex === pageCount) {
					switchTo(currentIndex - 1);
				}
				else {
					switchTo(currentIndex);
				}
			}

			return $pageItem;
		};

		_add($item);

		//replace original content
		if (!pageCount && !options.createEmptyTab) {
			return;
		}
		$item.append($tabContainer);

		//check if param:fixed height
		const updateFixedHeight = function () {
			if (options.fixedHeight) {
				let maxHeight = 0;

				$pageContainerLeaf.children().each(function () {
					const $pageItem = $(this);
					const pageHeight = $pageItem[0].scrollHeight;
					if (pageHeight > maxHeight) {
						maxHeight = pageHeight;
					}
				}).height(maxHeight);
			}
		};
		updateFixedHeight();

		//init show active page
		switchTo(loadIndex());

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
			if (activeLabelIndex === currentIndex) {
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
			if (activeLabelIndex === currentIndex) {
				return;
			}

			cancelDelayTrigger();
		};

		if (options.delayTriggerEvents) {
			if ($topLabelContainerLeaf) {
				$topLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
			}
			if ($bottomLabelContainerLeaf) {
				$bottomLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
			}

			if (options.delayTriggerCancelEvents) {
				if ($topLabelContainerLeaf) {
					$topLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
				}
				if ($bottomLabelContainerLeaf) {
					$bottomLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
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
			if (activeLabelIndex === currentIndex) {
				return;
			}

			switchTo(activeLabelIndex);
		};

		if (options.triggerEvents) {
			if ($topLabelContainerLeaf) {
				$topLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
			}
			if ($bottomLabelContainerLeaf) {
				$bottomLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
			}
		}

		//controller
		const controller = {
			getCount: getCount,
			getCurrentIndex: getCurrentIndex,
			getHeaderLabel: getHeaderLabel,
			getFooterLabel: getFooterLabel,
			getHeaderFooterLabels: getHeaderFooterLabels,
			getPage: getPage,
			updateFixedHeight: updateFixedHeight,
			switchTo: switchTo,
			addTabPage: addTabPage,
			insertTabPage: insertTabPage,
			add: add,
			insert: insert,
			remove: remove
		};
		$item.data('tab-controller', controller);
		$tabContainer.data('tab-controller', controller);
	};

	if (this.length) {
		this.each(function () {
			const $item = $(this);
			generateStructure($item);
		});
	}

	return this;
};

$('.tab-region').tab();

export = $;
