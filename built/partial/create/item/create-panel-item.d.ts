declare function createPanelItem(tabItem: JQueryTab.TabItem, options: JQueryTab.ExpandedOptions): {
    $panelItem: JQuery<HTMLElement>;
    $panelItemLeaf: JQuery<HTMLElement>;
};
export default createPanelItem;
