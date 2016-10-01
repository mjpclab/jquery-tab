jQuery.fn.tab = function (customOption) {
	'use strict';
	var $ = jQuery;
	var defaultOption = {
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
	var option = $.extend(defaultOption, customOption);

	function getLeafElement($node) {
		var result = $node[0];
		while (result.hasChildNodes()) {
			result = result.firstChild;
		}

		return $(result);
	}

	function generateStructure($item) {
		var pageCount = 0;

		//container
		var $container = $(option.containerTemplate);

		//top label
		if (option.showTopLabel) {
			var $topLabelContainer = $(option.labelContainerTemplate.replace('{position}', 'top'));
			$container.append($topLabelContainer);
		}

		//page
		var $pageContainer = $(option.pageContainerTemplate);
		$container.append($pageContainer);

		//bottom label
		if (option.showBottomLabel) {
			var $bottomLabelContainer = $(option.labelContainerTemplate.replace('{position}', 'bottom'));
			$container.append($bottomLabelContainer);
		}

		//add labels & pages
		if (option.showTopLabel) {
			var $topLabelContainerLeaf = getLeafElement($topLabelContainer);
		}
		if (option.showBottomLabel) {
			var $bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);
		}
		var $pageContainerLeaf = getLeafElement($pageContainer);

		while (true) {
			var $title = $item.find(option.titleSelector).first();
			if ($title.size() === 0) {
				break;
			}
			if (option.keepTitleVisible) {
				$title.show();
			}
			else {
				$title.hide();
			}

			var $labelItem = $(option.labelItemTemplate);
			var $labelItemLeaf = getLeafElement($labelItem);
			$labelItemLeaf.html(option.titleContentFilter.call($title, $title));
			if (option.showTopLabel) {
				$topLabelContainerLeaf.append($labelItem.clone());
			}
			if (option.showBottomLabel) {
				$bottomLabelContainerLeaf.append($labelItem.clone());
			}

			var $pageItem = $(option.pageItemTemplate);
			var $pageItemLeaf = getLeafElement($pageItem);
			var $pageContents = $title.nextUntil(option.titleSelector).andSelf();
			$pageItemLeaf.append($pageContents);

			$pageContainerLeaf.append($pageItem);
			pageCount++;
		}

		//replace original content
		$item.prepend($container);

		//check if param:fixed height
		if (option.fixedHeight) {
			var maxHeight = 0;

			$pageContainerLeaf.children().each(function () {
				var $pageItem = jQuery(this);
				var pageHeight = $pageItem.height();
				if (pageHeight > maxHeight) {
					maxHeight = pageHeight;
				}
			}).height(maxHeight);

		}

		//enable page switching
		var $statusFields = $item.find(option.statusFieldSelector);
		var oldIndex = -1;

		function labelItemClick() {
			var $activeLabel = $(this);
			var activeLabelIndex = $activeLabel.index();
			if(activeLabelIndex===oldIndex) {
				return;
			}

			if (typeof(option.beforeSwitch) === 'function') {
				option.beforeSwitch(oldIndex, activeLabelIndex);
			}

			$activeLabel.addClass(option.labelActiveClass).removeClass(option.labelInactiveClass);
			$activeLabel.siblings().addClass(option.labelInactiveClass).removeClass(option.labelActiveClass);

			var $activePage = $pageContainerLeaf.children(':eq(' + activeLabelIndex + ')');
			$activePage.siblings().hide().removeClass(option.pageActiveClass);
			$activePage.show().addClass(option.pageActiveClass);

			$statusFields.val(activeLabelIndex);
			if (option.statusHashTemplate) {
				var hash = location.hash;
				var statusHash = option.statusHashTemplate + activeLabelIndex;
				if (hash.indexOf(option.statusHashTemplate) > -1) {
					hash = hash.replace(new RegExp(option.statusHashTemplate + '\\d+'), statusHash);
				}
				else {
					if (hash.length) {
						hash += option.statusHashSeparator;
					}
					hash += option.statusHashTemplate + activeLabelIndex;
				}

				location.hash = hash;
			}

			if (typeof(option.afterSwitch) === 'function') {
				option.afterSwitch(oldIndex, activeLabelIndex);
			}
			oldIndex = activeLabelIndex;
		}

		var activeLabelIndex;
		$statusFields.each(function (index, statusField) {
			var status = $(statusField).val();
			if (status.length && isFinite(status)) {
				activeLabelIndex = parseInt(status);
				return false;
			}
		});
		if (isNaN(activeLabelIndex) && option.statusHashTemplate) {
			var re = new RegExp(option.statusHashTemplate + '(\\d+)');
			var searchResult = location.hash.match(re);
			if (searchResult && searchResult[1]) {
				activeLabelIndex = parseInt(searchResult[1]);
			}
		}
		if (isNaN(activeLabelIndex)) {
			activeLabelIndex = 0;
		}
		if (activeLabelIndex > pageCount - 1) {
			activeLabelIndex = pageCount - 1;
		}
		if (option.showTopLabel) {
			$topLabelContainerLeaf.children().click(labelItemClick);
			$topLabelContainerLeaf.children(':eq(' + activeLabelIndex + ')').click();
		}
		if (option.showBottomLabel) {
			$bottomLabelContainerLeaf.children().click(labelItemClick);
			$bottomLabelContainerLeaf.children(':eq(' + activeLabelIndex + ')').click();
		}
	}


	if (this.size() > 0) {
		this.each(function () {
			var $item = $(this);
			generateStructure($item);
		});
	}

	return this;
};