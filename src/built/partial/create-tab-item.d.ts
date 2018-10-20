declare function createTabItem($labelContent: JQueryTab.JQueriable, $panelContent: JQueryTab.JQueriable, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    $labelItem: JQuery<HTMLElement>;
    $labelItemLeaf: JQuery<HTMLElement>;
    $panelItem: JQuery<HTMLElement>;
    $panelItemLeaf: JQuery<HTMLElement>;
    cloneLabelItem: () => JQuery<HTMLElement>;
};
export default createTabItem;
