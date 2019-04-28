declare function createTabContainer(options: JQueryTab.ExpandedOptions): {
    $tabContainer: JQuery<HTMLElement>;
    $tabContainerLeaf: JQuery<HTMLElement>;
    $headerLabelContainer: JQuery<HTMLElement> | undefined;
    $headerLabelContainerLeaf: JQuery<HTMLElement> | undefined;
    $panelContainer: JQuery<HTMLElement>;
    $panelContainerLeaf: JQuery<HTMLElement>;
    $footerLabelContainer: JQuery<HTMLElement> | undefined;
    $footerLabelContainerLeaf: JQuery<HTMLElement> | undefined;
};
export default createTabContainer;
