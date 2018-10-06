function updateActiveState($activeLabelItem, $activePanelItem, options) {
    const { activeLabelItemClass, inactiveLabelItemClass, activePanelItemClass, inactivePanelItemClass } = options;
    //label items
    $activeLabelItem
        .removeClass(inactiveLabelItemClass)
        .addClass(activeLabelItemClass)
        .attr('aria-selected', 'true')
        .attr('aria-expanded', 'true');
    $activeLabelItem.siblings()
        .removeClass(activeLabelItemClass)
        .addClass(inactiveLabelItemClass)
        .attr('aria-selected', 'false')
        .attr('aria-expanded', 'false');
    //panel items
    $activePanelItem
        .removeClass(inactivePanelItemClass)
        .addClass(activePanelItemClass)
        .attr('aria-hidden', 'false');
    $activePanelItem.siblings()
        .removeClass(activePanelItemClass)
        .addClass(inactivePanelItemClass)
        .attr('aria-hidden', 'true');
}
export default updateActiveState;
