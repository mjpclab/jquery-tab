function updateActiveClass($activeLabelItem: JQuery, $activePageItem: JQuery, options: JQueryTab.NecessaryOptions) {
	const {labelItemActiveClass, labelItemInactiveClass, pageItemActiveClass, pageItemInactiveClass} = options;

	$activeLabelItem.addClass(labelItemActiveClass).removeClass(labelItemInactiveClass);
	$activeLabelItem.siblings().removeClass(labelItemActiveClass).addClass(labelItemInactiveClass);

	$activePageItem.addClass(pageItemActiveClass).removeClass(pageItemInactiveClass);
	$activePageItem.siblings().removeClass(pageItemActiveClass).addClass(pageItemInactiveClass);
}

export default updateActiveClass;