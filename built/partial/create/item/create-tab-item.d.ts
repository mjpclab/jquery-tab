declare function createTabItem(tabItem: JQueryTab.TabItem, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    $labelItem: JQuery<HTMLElement>;
    $labelItemLeaf: JQuery<HTMLElement>;
    $panelItem: JQuery<HTMLElement>;
    $panelItemLeaf: JQuery<HTMLElement>;
    cloneLabelItem: () => JQuery<HTMLElement>;
};
export default createTabItem;
