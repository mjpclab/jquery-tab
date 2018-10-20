declare function createPanelItem($panelContent: JQueryTab.JQueriable, options: JQueryTab.ExpandedOptions): {
    $panelItem: JQuery<HTMLElement>;
    $panelItemLeaf: JQuery<HTMLElement>;
};
export default createPanelItem;
