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
			var $container = $(options.containerTemplate);

			//top label
			var $topLabelContainer;
			var $topLabelContainerLeaf;
			if (options.showTopLabel) {
				$topLabelContainer = $(options.labelContainerTemplate.replace('{position}', 'top'));
				$container.append($topLabelContainer);

				$topLabelContainerLeaf = getLeafElement($topLabelContainer);
			}

			//page
			var $pageContainer = $(options.pageContainerTemplate);
			$container.append($pageContainer);

			var $pageContainerLeaf = getLeafElement($pageContainer);

			//bottom label
			var $bottomLabelContainer;
			var $bottomLabelContainerLeaf;
			if (options.showBottomLabel) {
				$bottomLabelContainer = $(options.labelContainerTemplate.replace('{position}', 'bottom'));
				$container.append($bottomLabelContainer);

				$bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);
			}

			//add labels & pages
			while (true) {
				var $title = $item.find(options.titleSelector).first();
				if ($title.length === 0) {
					break;
				}
				if (options.keepTitleVisible) {
					$title.show();
				}
				else {
					$title.hide();
				}

				var $labelItem = $(options.labelItemTemplate);
				var $labelItemLeaf = getLeafElement($labelItem);
				$labelItemLeaf.html(options.titleContentFilter.call($title, $title));

				if ($topLabelContainerLeaf) {
					$topLabelContainerLeaf.append($labelItem.clone());
				}
				if ($bottomLabelContainerLeaf) {
					$bottomLabelContainerLeaf.append($labelItem.clone());
				}

				var $pageContents = $($title).add($title.nextUntil(options.titleSelector));
				var $pageItem = $(options.pageItemTemplate);
				var $pageItemLeaf = getLeafElement($pageItem);
				$pageItemLeaf.append($pageContents);

				$pageContainerLeaf.append($pageItem);
				pageCount++;
			}

			//replace original content
			$item.prepend($container);

			//controller
			var oldIndex = -1;
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
				return getLabel($topLabelContainerLeaf, index);
			};
			var getBottomLabel = function (index) {
				return getLabel($topLabelContainerLeaf, index);
			};
			var getTopBottomLabels = function (index) {
				return $([]).add(getTopLabel(index)).add(getBottomLabel(index));
			};
			var getPage = function (index) {
				if (!isFinite(index)) {
					return;
				}
				return $pageContainerLeaf.children(':eq(' + index + ')');
			};
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
			var switchTo = function (newIndex) {
				if (typeof(options.beforeSwitch) === 'function') {
					options.beforeSwitch(oldIndex, newIndex);
				}

				var $newLabel = getTopBottomLabels(newIndex);
				$newLabel.addClass(options.labelActiveClass).removeClass(options.labelInactiveClass);
				$newLabel.siblings().addClass(options.labelInactiveClass).removeClass(options.labelActiveClass);

				var $newPage = getPage(newIndex);
				$newPage.siblings().hide().removeClass(options.pageActiveClass);
				$newPage.show().addClass(options.pageActiveClass);

				$statusFields.val(newIndex);
				if (options.statusHashTemplate) {
					var hash = location.hash;
					var statusHash = options.statusHashTemplate + newIndex;
					if (hash.indexOf(options.statusHashTemplate) > -1) {
						hash = hash.replace(new RegExp(options.statusHashTemplate + '\\d+'), statusHash);
					}
					else {
						if (hash.length) {
							hash += options.statusHashSeparator;
						}
						hash += options.statusHashTemplate + newIndex;
					}

					location.hash = hash;
				}

				if (typeof(options.afterSwitch) === 'function') {
					options.afterSwitch(oldIndex, newIndex);
				}
				oldIndex = newIndex;
			};
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
			$container.data('jquery-tab-controller', controller);

			//check if param:fixed height
			updateFixedHeight();

			//enable page switching
			var $statusFields = $item.find(options.statusFieldSelector);
			if (!$statusFields.length) {
				$statusFields = $(options.statusFieldSelector);
			}

			function labelItemClick() {
				var $activeLabel = $(this);
				var activeLabelIndex = $activeLabel.index();
				if (activeLabelIndex === oldIndex) {
					return;
				}

				switchTo(activeLabelIndex);
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

			if (options.showTopLabel) {
				$topLabelContainerLeaf.children().click(labelItemClick);
			}
			if (options.showBottomLabel) {
				$bottomLabelContainerLeaf.children().click(labelItemClick);
			}
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
