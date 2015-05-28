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
 */
jQuery.fn.tab = function (param) {
	'use strict';
	var $ = jQuery;
	var defaultParam = {
		statusFieldSelector: '',
		statusHashTemplate: '',
		fixedHeight: false,
		showTopLabel: true,
		showBottomLabel: false,
		titleSelector: 'h1,h2,h3,h4,h5,h6',
		titleContentFilter: function () {
			return this.text()
		},
		keepTitleVisible: false,
		containerTemplate: '<div class="tab-container"></div>',
		labelContainerTemplate: '<div class="label-container {position}"></div>',
		labelItemTemplate: '<span class="label-item"></span>',
		labelActiveClass: 'label-active',
		labelInactiveClass: 'label-inactive',
		pageContainerTemplate: '<div class="page-container"></div>',
		pageItemTemplate: '<div class="page-item"></div>',
		pageActiveClass: 'page-active'
	};
	var objParam = $.extend(defaultParam, param);

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
		var $container = $(objParam.containerTemplate);

		//top label
		if (objParam.showTopLabel) {
			var $topLabelContainer = $(objParam.labelContainerTemplate.replace('{position}', 'top'));
			$container.append($topLabelContainer);
		}

		//page
		var $pageContainer = $(objParam.pageContainerTemplate);
		$container.append($pageContainer);

		//bottom label
		if (objParam.showBottomLabel) {
			var $bottomLabelContainer = $(objParam.labelContainerTemplate.replace('{position}', 'bottom'));
			$container.append($bottomLabelContainer);
		}

		//add labels & pages
		if (objParam.showTopLabel) {
			var $topLabelContainerLeaf = getLeafElement($topLabelContainer);
		}
		if (objParam.showBottomLabel) {
			var $bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);
		}
		var $pageContainerLeaf = getLeafElement($pageContainer);

		while (true) {
			var $title = $item.find(objParam.titleSelector).first();
			if ($title.size() === 0) {
				break;
			}
			if (objParam.keepTitleVisible) {
				$title.show();
			}
			else {
				$title.hide();
			}

			var $labelItem = $(objParam.labelItemTemplate);
			var $labelItemLeaf = getLeafElement($labelItem);
			$labelItemLeaf.html(objParam.titleContentFilter.call($title, $title));
			if (objParam.showTopLabel) {
				$topLabelContainerLeaf.append($labelItem.clone());
			}
			if (objParam.showBottomLabel) {
				$bottomLabelContainerLeaf.append($labelItem.clone());
			}

			var $pageItem = $(objParam.pageItemTemplate);
			var $pageItemLeaf = getLeafElement($pageItem);
			var $pageContents = $title.nextUntil(objParam.titleSelector).andSelf();
			$pageItemLeaf.append($pageContents);

			$pageContainerLeaf.append($pageItem);
			pageCount++;
		}

		//replace original content
		$item.prepend($container);

		//check if param:fixed height
		if (objParam.fixedHeight) {
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
		var $statusFields = $item.find(objParam.statusFieldSelector);

		function labelItemClick() {
			var $activeLabel = $(this);
			var activeLabelIndex = $activeLabel.index();

			$activeLabel.addClass(objParam.labelActiveClass).removeClass(objParam.labelInactiveClass);
			$activeLabel.siblings().addClass(objParam.labelInactiveClass).removeClass(objParam.labelActiveClass);

			var $activePage = $pageContainerLeaf.children(':eq(' + activeLabelIndex + ')');
			$activePage.siblings().hide().removeClass(objParam.pageActiveClass);
			$activePage.show().addClass(objParam.pageActiveClass);

			$statusFields.val(activeLabelIndex);
			if (objParam.statusHashTemplate) {
				var hash = location.hash;
				hash = hash.replace(new RegExp(objParam.statusHashTemplate + '\\d+'), '');
				hash += objParam.statusHashTemplate + activeLabelIndex.toString();
				if (location.hash !== hash) {
					location.hash = hash;
				}
			}
		}

		var activeLabelIndex;
		$statusFields.each(function(index,statusField){
			var status=$(statusField).val();
			if(status.length && isFinite(status)) {
				activeLabelIndex=parseInt(status);
				return false;
			}
		});
		if (isNaN(activeLabelIndex) && objParam.statusHashTemplate) {
			var re = new RegExp(objParam.statusHashTemplate + '(\\d+)');
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
		if (objParam.showTopLabel) {
			$topLabelContainerLeaf.children().click(labelItemClick);
			$topLabelContainerLeaf.children(':eq(' + activeLabelIndex + ')').click();
		}
		if (objParam.showBottomLabel) {
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