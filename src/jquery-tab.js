(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory;
	}
	else if (root.jQuery) {
		factory(root.jQuery);
	}
}(this, function ($) {
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
			var addTabPage = function (title, content) {
				//title
				var $labelItem = newLabelItem(title);

				if ($topLabelContainerLeaf) {
					$topLabelContainerLeaf.append($labelItem.clone());
				}
				if ($bottomLabelContainerLeaf) {
					$bottomLabelContainerLeaf.append($labelItem.clone());
				}

				//content
				var $pageItem = newPageItem(content);
				$pageContainerLeaf.append($pageItem);

				//finalize
				pageCount++;
			};

			while (true) {
				var $title = $item.find(options.titleSelector).first();
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

			//getters
			var getCount = function () {
				return pageCount;
			};
			var getCurrentIndex = function () {
				return oldIndex;
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

			//utilities
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

			//switch function and switch event handler
			var oldIndex = -1;
			var switchTo = function (newIndex) {
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

				//callback for hidden page items
				if (typeof options.hidePageItem === 'function') {
					options.hidePageItem($otherPages);
				}

				//callback for shown page item
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
				oldIndex = newIndex;
			};

			//handle event
			var labelItemClick = function () {
				var $activeLabel = $(this);
				var activeLabelIndex = $activeLabel.index();
				if (activeLabelIndex === oldIndex) {
					return;
				}

				switchTo(activeLabelIndex);
			};

			if ($topLabelContainerLeaf) {
				$topLabelContainerLeaf.children().on(options.triggerEvents, labelItemClick);
			}
			if ($bottomLabelContainerLeaf) {
				$bottomLabelContainerLeaf.children().on(options.triggerEvents, labelItemClick);
			}

			//init show active page
			var $statusFields = $item.find(options.statusFieldSelector);
			if (!$statusFields.length) {
				$statusFields = $(options.statusFieldSelector);
			}

			var initialLabelIndex = NaN;
			$statusFields.each(function () {
				var status = $(this).val();
				if (status.length && isFinite(status)) {
					initialLabelIndex = parseInt(status);
					return false;
				}
			});
			if (isNaN(initialLabelIndex) && options.statusHashTemplate) {
				var re = new RegExp(options.statusHashTemplate + '(\\d+)');
				var searchResult = location.hash.match(re);
				if (searchResult && searchResult[1]) {
					initialLabelIndex = parseInt(searchResult[1]);
				}
			}
			if (isNaN(initialLabelIndex)) {
				initialLabelIndex = 0;
			}
			var maxLabelIndex = pageCount - 1;
			if (initialLabelIndex > maxLabelIndex) {
				initialLabelIndex = maxLabelIndex;
			}
			switchTo(initialLabelIndex);

			//controller
			var controller = {
				getCount: getCount,
				getCurrentIndex: getCurrentIndex,
				getTopLabel: getTopLabel,
				getBottomLabel: getBottomLabel,
				getTopBottomLabels: getTopBottomLabels,
				getPage: getPage,
				updateFixedHeight: updateFixedHeight,
				switchTo: switchTo
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
