declare function createTabContainer(options: JQueryTab.NecessaryOptions): {
    $tabContainer: JQuery<HTMLElement>;
    $headerLabelContainer: JQuery<HTMLElement> | undefined;
    $headerLabelContainerLeaf: JQuery<HTMLElement> | undefined;
    $pageContainer: JQuery<HTMLElement>;
    $pageContainerLeaf: JQuery<HTMLElement>;
    $footerLabelContainer: JQuery<HTMLElement> | undefined;
    $footerLabelContainerLeaf: JQuery<HTMLElement> | undefined;
};
export default createTabContainer;
