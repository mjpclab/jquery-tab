declare function createTabItem(title: JQueryTab.JQueriable, content: JQueryTab.JQueriable, context: JQueryTab.Context, options: JQueryTab.NecessaryOptions): {
    $labelItem: JQuery<HTMLElement>;
    $labelItemLeaf: JQuery<HTMLElement>;
    $pageItem: JQuery<HTMLElement>;
    $pageItemLeaf: JQuery<HTMLElement>;
    cloneLabelItem: () => JQuery<HTMLElement>;
};
export default createTabItem;
