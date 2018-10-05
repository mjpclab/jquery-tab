declare function createPageItem(content: JQueryTab.JQueriable, options: JQueryTab.NecessaryOptions): {
    $pageItem: JQuery<HTMLElement>;
    $pageItemLeaf: JQuery<HTMLElement>;
};
export default createPageItem;
