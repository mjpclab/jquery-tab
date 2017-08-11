(function (factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	}
	else if (jQuery) {
		factory(jQuery);
	}
}(function ($) {
	$.fn.tab = function (customOptions) {
		var defaultOptions = {
			triggerEvents: 'click',
			statusFieldSelector: '',
			statusHashTemplate: '',
			statusHashSeparator: '&',
			fixedHeight: false,
			showTopLabel: true,
			showBottomLabel: false,
			titleSelector: 'h1,h2,h3,h4,h5,h6',
			titleContentFilter: function () {
				return this.text();
			},
			keepTitleVisible: false,
			containerTemplate: '<div class="tab-container"></div>',
			labelContainerTemplate: '<div class="label-container {position}"></div>',
			labelItemTemplate: '<span class="label-item"></span>',
			labelActiveClass: 'label-active',
			labelInactiveClass: 'label-inactive',
			pageContainerTemplate: '<div class="page-container"></div>',
			pageItemTemplate: '<div class="page-item"></div>',
			pageActiveClass: 'page-active',
			showPageItem: function ($pageItem) {
				return $pageItem && $pageItem.show && $pageItem.show();
			},
			hidePageItem: function ($pageItem) {
				return $pageItem && $pageItem.hide && $pageItem.hide();
			},
			beforeSwitch: null,
			afterSwitch: null
		};
		var options = $.extend({}, defaultOptions, customOptions);

		var getLeafElement = function ($node) {
			var result = $node[0];
			while (result.hasChildNodes()) {
				result = result.firstChild;
			}

			return $(result);
		};

		var generateStructure = function ($item) {
			var pageCount = 0;
			var currentIndex = -1;

			//container
			var $outerContainer = $(options.containerTemplate);

			//top label
			var $topLabelContainer;
			var $topLabelContainerLeaf;
			if (options.showTopLabel) {
				$topLabelContainer = $(options.labelContainerTemplate.replace('{position}', 'top'));
				$outerContainer.append($topLabelContainer);

				$topLabelContainerLeaf = getLeafElement($topLabelContainer);
			}

			//page
			var $pageContainer = $(options.pageContainerTemplate);
			$outerContainer.append($pageContainer);

			var $pageContainerLeaf = getLeafElement($pageContainer);

			//bottom label
			var $bottomLabelContainer;
			var $bottomLabelContainerLeaf;
			if (options.showBottomLabel) {
				$bottomLabelContainer = $(options.labelContainerTemplate.replace('{position}', 'bottom'));
				$outerContainer.append($bottomLabelContainer);

				$bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);
			}


			//getters
			var getCount = function () {
				return pageCount;
			};
			var getCurrentIndex = function () {
				return currentIndex;
			};
			var getLabel = function ($container, index) {
				if (!isFinite(index)) {
					return;
				}
				return $container.children(':eq(' + index + ')');
			};
			var getTopLabel = function (index) {
				if ($topLabelContainerLeaf) {
					return getLabel($topLabelContainerLeaf, index);
				}
				return $([]);
			};
			var getBottomLabel = function (index) {
				if ($bottomLabelContainerLeaf) {
					return getLabel($bottomLabelContainerLeaf, index);
				}
				return $([]);
			};
			var getTopBottomLabels = function (index) {
				return getTopLabel(index).add(getBottomLabel(index));
			};
			var getPage = function (index) {
				if (!isFinite(index)) {
					return;
				}
				return $pageContainerLeaf.children(':eq(' + index + ')');
			};
			//add labels & pages
			var newLabelItem = function (title) {
				var $labelItem = $(options.labelItemTemplate);
				var $labelItemLeaf = getLeafElement($labelItem);
				$labelItemLeaf.html(title);

				return $labelItem;
			};
			var newPageItem = function (content) {
				var $pageItem = $(options.pageItemTemplate);
				var $pageItemLeaf = getLeafElement($pageItem);
				$pageItemLeaf.append(content);

				return $pageItem;
			};
			var insertTabPage = function (title, content, index) {
				var $labelItem = newLabelItem(title);
				var $pageItem = newPageItem(content);
				if (currentIndex > -1 && typeof options.hidePageItem === 'function') {
					options.hidePageItem($pageItem);
				}

				if (index < 0) {
					index = 0;
				}
				if (index < pageCount) {
					if ($topLabelContainerLeaf) {
						$topLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
					}
					if ($bottomLabelContainerLeaf) {
						$bottomLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
					}
					$pageContainerLeaf.children(':eq(' + index + ')').before($pageItem);

					if (index <= currentIndex) {
						currentIndex++;
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

				//finalize
				pageCount++;
			};
			var addTabPage = function (title, content) {
				insertTabPage(title, content);
			};

			var add = function ($sourceContainer) {
				while (true) {
					var $title = $sourceContainer.find(options.titleSelector).first();
					if ($title.length === 0) {
						break;
					}
					if (!options.keepTitleVisible) {
						$title.hide();
					}

					var title = options.titleContentFilter.call($title, $title);
					var content = $title.add($title.nextUntil(options.titleSelector));
					addTabPage(title, content);
				}
			};
			var insert = function ($sourceContainer, index) {
				var inserted = 0;
				while (true) {
					var $title = $sourceContainer.find(options.titleSelector).first();
					if ($title.length === 0) {
						break;
					}
					if (!options.keepTitleVisible) {
						$title.hide();
					}

					var title = options.titleContentFilter.call($title, $title);
					var content = $title.add($title.nextUntil(options.titleSelector));
					insertTabPage(title, content, index + inserted);
					inserted++;
				}
			};
			var remove = function (index) {
				if (index < 0 || index > pageCount) {
					return;
				}

				var $labelItems = getTopBottomLabels(index);
				var $pageItem = getPage(index);

				$labelItems.remove();
				$pageItem.remove();
				pageCount--;

				if (index < currentIndex) {
					currentIndex--;
				}
				else if (index === currentIndex) {
					currentIndex = (index < pageCount ? index : pageCount - 1);
					switchTo(currentIndex);
				}

				return $pageItem;
			};

			add($item);

			//replace original content
			$item.prepend($outerContainer);

			//check if param:fixed height
			var updateFixedHeight = function () {
				if (options.fixedHeight) {
					var maxHeight = 0;

					$pageContainerLeaf.children().each(function () {
						var $pageItem = $(this);
						var pageHeight = $pageItem[0].scrollHeight;
						if (pageHeight > maxHeight) {
							maxHeight = pageHeight;
						}
					}).height(maxHeight);
				}
			};
			updateFixedHeight();

			//utilities
			var $statusFields = $item.find(options.statusFieldSelector);
			if (!$statusFields.length) {
				$statusFields = $(options.statusFieldSelector);
			}
			var saveIndex = function (index) {
				$statusFields.val(index);
				if (options.statusHashTemplate) {
					var hash = location.hash;
					var statusHash = options.statusHashTemplate + index;
					if (hash.indexOf(options.statusHashTemplate) > -1) {
						hash = hash.replace(new RegExp(options.statusHashTemplate + '\\d+'), statusHash);
					}
					else {
						if (hash.length) {
							hash += options.statusHashSeparator;
						}
						hash += options.statusHashTemplate + index;
					}

					location.hash = hash;
				}
			};
			var loadIndex = function () {
				var index = -1;

				$statusFields.each(function () {
					var status = $(this).val();
					if (status.length && isFinite(status)) {
						index = parseInt(status);
						return false;
					}
				});
				if (index === -1 && options.statusHashTemplate) {
					var re = new RegExp(options.statusHashTemplate + '(\\d+)');
					var searchResult = location.hash.match(re);
					if (searchResult && searchResult[1]) {
						index = parseInt(searchResult[1]);
					}
				}
				if (index === -1) {
					index = 0;
				}

				var maxLabelIndex = pageCount - 1;
				if (index > maxLabelIndex) {
					index = maxLabelIndex;
				}

				return index;
			};

			//switch function and switch event handler
			var switchTo = function (newIndex) {
				var oldIndex = currentIndex;

				//before switching callback
				if (typeof(options.beforeSwitch) === 'function') {
					options.beforeSwitch(oldIndex, newIndex);
				}

				//labels & pages
				var $newLabel = getTopBottomLabels(newIndex);
				var $otherLabels = $newLabel.siblings();
				var $newPage = getPage(newIndex);
				var $otherPages = $newPage.siblings();

				$otherLabels.removeClass(options.labelActiveClass).addClass(options.labelInactiveClass);
				$otherPages.removeClass(options.pageActiveClass);
				$newLabel.addClass(options.labelActiveClass).removeClass(options.labelInactiveClass);
				$newPage.addClass(options.pageActiveClass);

				//function to hide pages
				if (typeof options.hidePageItem === 'function') {
					options.hidePageItem($otherPages);
				}

				//function to show page
				if (typeof options.showPageItem === 'function') {
					options.showPageItem($newPage);
				}

				//keep new index for restoring
				saveIndex(newIndex);

				//after switching callback
				if (typeof(options.afterSwitch) === 'function') {
					options.afterSwitch(oldIndex, newIndex);
				}

				//finalize
				currentIndex = newIndex;
			};

			//handle event
			var labelItemClick = function (e) {
				var target = e.currentTarget;
				var targetParent;
				while (true) {
					targetParent = target.parentNode;
					if (targetParent === e.delegateTarget || !targetParent) {
						break;
					}
					else {
						target = targetParent;
					}
				}
				var $activeLabel = $(target);
				var activeLabelIndex = $activeLabel.index();
				if (activeLabelIndex === currentIndex) {
					return;
				}

				switchTo(activeLabelIndex);
			};

			if ($topLabelContainerLeaf) {
				$topLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
			}
			if ($bottomLabelContainerLeaf) {
				$bottomLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
			}

			//init show active page
			switchTo(loadIndex());

			//controller
			var controller = {
				getCount: getCount,
				getCurrentIndex: getCurrentIndex,
				getTopLabel: getTopLabel,
				getBottomLabel: getBottomLabel,
				getTopBottomLabels: getTopBottomLabels,
				getPage: getPage,
				updateFixedHeight: updateFixedHeight,
				switchTo: switchTo,
				addTabPage: addTabPage,
				insertTabPage: insertTabPage,
				add: add,
				insert: insert,
				remove: remove
			};
			$item.data('jquery-tab-controller', controller);
			$outerContainer.data('jquery-tab-controller', controller);
		};

		var self = this;
		if (self.length) {
			self.each(function () {
				var $item = $(this);
				generateStructure($item);
			});
		}

		return self;
	};

	return $;
}));
