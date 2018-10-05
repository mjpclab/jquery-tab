function updateActiveState($activeLabelItem, $activePageItem, options) {
    const { labelItemActiveClass, labelItemInactiveClass, pageItemActiveClass, pageItemInactiveClass } = options;
    //label items
    $activeLabelItem
        .addClass(labelItemActiveClass)
        .removeClass(labelItemInactiveClass)
        .attr('aria-selected', 'true')
        .attr('aria-expanded', 'true');
    $activeLabelItem.siblings()
        .removeClass(labelItemActiveClass)
        .addClass(labelItemInactiveClass)
        .attr('aria-selected', 'false')
        .attr('aria-expanded', 'false');
    //page items
    $activePageItem
        .addClass(pageItemActiveClass)
        .removeClass(pageItemInactiveClass)
        .attr('aria-hidden', 'false');
    $activePageItem.siblings()
        .removeClass(pageItemActiveClass)
        .addClass(pageItemInactiveClass)
        .attr('aria-hidden', 'true');
}
export default updateActiveState;
