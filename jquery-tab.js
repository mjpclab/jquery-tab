/* available params
	statusFieldSelector: a jQuery selector to find a form (normally hidden) field to store active tab index, thus after form postback and keep the field value on server to the browser, the jquery-tab will automatically restore active tab
	statusHashTemp: a key-value pair temp to store active tab index in URL hash, ex tab=
	fixedHeight : tab height will fixed to fit the longest page and will not change when tab is switched
	showTopLabel : show switch label on top of the tab
	showBottomLabel : show switch label on bottom of the tab
	titleSelector : a jQuery selector to pick up "title" element to be label switches
	keepTitleVisible : show page title again in the page
	containerTemplate : whole wrapper container template
	labelContainerTemplate : labels container template
	labelItemTemplate : single label template
	labelActiveClass : CSS class for active label
	pageContainerTemplate : pages container template
	pageItemTemplate : single page template
	pageActiveClass : CSS class for active page
*/
jQuery.fn.tab=function(param) {
	var $=jQuery;
	var objParam = typeof(param)==='object' ? param : {};



	function checkParam(name,defaultValue) {
		if(typeof(objParam[name])=='undefined') objParam[name]=defaultValue;
	}

	function fixParams() {
		if(typeof(objParam)=='undefined') objParam={};
		
		checkParam('statusFieldSelector','');
		checkParam('statusHashTemplate','');
		checkParam('fixedHeight',false);
		checkParam('showTopLabel',true);
		checkParam('showBottomLabel',false);
		checkParam('titleSelector','h1,h2,h3,h4,h5,h6');
		checkParam('keepTitleVisible',false);
		checkParam('containerTemplate','<div class="tab-container"></div>');
		checkParam('labelContainerTemplate','<div class="label-container {position}"></div>');
		checkParam('labelItemTemplate','<span class="label-item"></span>');
		checkParam('labelActiveClass','label-active');
		checkParam('pageContainerTemplate','<div class="page-container"></div>');
		checkParam('pageItemTemplate','<div class="page-item"></div>');
		checkParam('pageActiveClass','page-active');

		objParam.statusFieldSelector=$.trim(objParam.statusFieldSelector);
		objParam.statusHashTemplate=$.trim(objParam.statusHashTemplate);

		if(objParam.showTopLabel==false && objParam.showBottomLabel==false) {
			objParam.showTopLabel=true;
		}
	}



	function getLeafElement($node) {
		var result=$node[0];
		while(result.hasChildNodes()) {
			result=result.firstChild;
		}

		return $(result);
	}

	function generateStructure($item) {
		//container
		var $container=$(objParam.containerTemplate);

		//top label
		if(objParam.showTopLabel) {
			var $topLabelContainer=$(objParam.labelContainerTemplate.replace('{position}','top'));
			$container.append($topLabelContainer);
		}

		//page
		var $pageContainer=$(objParam.pageContainerTemplate);
		$container.append($pageContainer);

		//bottom label
		if(objParam.showBottomLabel) {
			var $bottomLabelContainer=$(objParam.labelContainerTemplate.replace('{position}','bottom'));
			$container.append($bottomLabelContainer);
		}

		//add labels & pages
		if(objParam.showTopLabel) {
			var $topLabelContainerLeaf=getLeafElement($topLabelContainer);
		}
		if(objParam.showBottomLabel) {
			var $bottomLabelContainerLeaf=getLeafElement($bottomLabelContainer);
		}
		var $pageContainerLeaf=getLeafElement($pageContainer);

		while(true) {
			var $title=$item.find(objParam.titleSelector).first();
			if($title.size()==0) break;
			if(objParam.keepTitleVisible) {
				$title.show();
			}
			else {
				$title.hide();
			}

			var $labelItem=$(objParam.labelItemTemplate);
			var $labelItemLeaf=getLeafElement($labelItem);
			$labelItemLeaf.text($title.text());
			if(objParam.showTopLabel) $topLabelContainerLeaf.append($labelItem.clone());
			if(objParam.showBottomLabel) $bottomLabelContainerLeaf.append($labelItem.clone());

			var $pageItem=$(objParam.pageItemTemplate);
			var $pageItemLeaf=getLeafElement($pageItem);
			var $pageContents=$title.nextUntil(objParam.titleSelector).andSelf();
			$pageItemLeaf.append($pageContents);
			
			$pageContainerLeaf.append($pageItem);
		}

		//replace original content
		$item.prepend($container);

		//check if param:fixed height
		if(objParam.fixedHeight)
		{
			var maxHeight=0;

			$pageContainerLeaf.children().each(function(){
				var $pageItem=jQuery(this);
				var pageHeight=$pageItem.height();
				if(pageHeight>maxHeight) maxHeight=pageHeight;
			})
			.height(maxHeight);

		}

		//enable page switching
		var $statusField=$item.find(objParam.statusFieldSelector);
		function labelItemClick() {
			var $activeLabel=$(this);
			var activeLabelIndex=$activeLabel.index();

			$activeLabel.siblings().removeClass(objParam.labelActiveClass);
			$activeLabel.addClass(objParam.labelActiveClass);

			var $activePage=$pageContainerLeaf.children(':eq(' + activeLabelIndex + ')');
			$activePage.siblings().hide().removeClass(objParam.pageActiveClass);
			$activePage.show().addClass(objParam.pageActiveClass);

			$statusField.val(activeLabelIndex);
			if(objParam.statusHashTemplate) {
				var hash=location.hash;
				hash=hash.replace(new RegExp(objParam.statusHashTemplate + '\\d+'), '');
				hash+=objParam.statusHashTemplate + activeLabelIndex.toString();
				if(location.hash!=hash) location.hash=hash;
			}
		}

		var activeLabelIndex=parseInt($statusField.val());
		if(isNaN(activeLabelIndex) && objParam.statusHashTemplate) {
			var re=new RegExp(objParam.statusHashTemplate + '(\\d+)');
			re.ignoreCase=true;
			var searchResult=location.hash.match(re);
			if(searchResult && searchResult[1]) activeLabelIndex=parseInt(searchResult[1]);
		}
		if(isNaN(activeLabelIndex)) { activeLabelIndex=0; }
		if(objParam.showTopLabel) {
			$topLabelContainerLeaf.children().click(labelItemClick);
			$topLabelContainerLeaf.children(':eq(' +activeLabelIndex+ ')').click();
		}
		if(objParam.showBottomLabel) {
			$bottomLabelContainerLeaf.children().click(labelItemClick);
			$bottomLabelContainerLeaf.children(':eq(' +activeLabelIndex+ ')').click();
		}
	}




	if(this.size()>0)
	{
		fixParams();
		
		this.each(function(){
			var $item=$(this);
			generateStructure($item);
		});
	}
}