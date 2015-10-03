/* available params
 statusFieldSelector: a jQuery selector to find a form (normally hidden) field to store active tab index, thus after form postback and keep the field value on server to the browser, the jquery-tab will automatically restore active tab
 statusHashTemplate: a key-value pair template to store active tab index in URL hash, ex: "tab="
 fixedHeight : tab height will be fixed to fit the longest page and will not change when tab is switched
 showTopLabel : show switch label on top of the tab
 showBottomLabel : show switch label on bottom of the tab
 titleSelector : a jQuery selector to pick up "title" element to be label switches
 titleContentFilter: a callback to have an opportunity to change the html structure of title
 keepTitleVisible : show page title again in the page. Since page title will be shown in tab label, normall it's not necessary to show in page again.
 containerTemplate : whole wrapper container template
 labelContainerTemplate : labels container template
 labelItemTemplate : single label template
 labelActiveClass : CSS class for active label
 labelInactiveClass : CSS class for inactive label
 pageContainerTemplate : pages container template
 pageItemTemplate : single page template
 pageActiveClass : CSS class for active page
 beforeSwitch(oldIndex, newIndex) : a callback before switching the tab
 afterSwitch(oldIndex, newIndex) : a callback after switching the tab
 */
jQuery.fn.tab = function (customOption) {
	'use strict';
	var $ = jQuery;
	var defaultOption = {
		statusFieldSelector: '',
		statusHashTemplate: '',
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
				hash = hash.replace(new RegExp(option.statusHashTemplate + '\\d+'), '');
				hash += option.statusHashTemplate + activeLabelIndex.toString();
				if (location.hash !== hash) {
					location.hash = hash;
				}
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