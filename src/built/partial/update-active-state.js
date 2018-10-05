function updateActiveState($activeLabelItem, $activePanelItem, options) {
    const { labelItemActiveClass, labelItemInactiveClass, panelItemActiveClass, panelItemInactiveClass } = options;
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
    //panel items
    $activePanelItem
        .addClass(panelItemActiveClass)
        .removeClass(panelItemInactiveClass)
        .attr('aria-hidden', 'false');
    $activePanelItem.siblings()
        .removeClass(panelItemActiveClass)
        .addClass(panelItemInactiveClass)
        .attr('aria-hidden', 'true');
}
export default updateActiveState;
