declare function createPanelItem(content: JQueryTab.JQueriable, options: JQueryTab.NecessaryOptions): {
    $panelItem: JQuery<HTMLElement>;
    $panelItemLeaf: JQuery<HTMLElement>;
};
export default createPanelItem;
