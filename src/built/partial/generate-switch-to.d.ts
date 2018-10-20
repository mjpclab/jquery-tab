declare function generateSwitchTo(fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, fnSaveIndex: JQueryTab.fnSaveIndex, containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    switchToWithoutSave: (newIndex: number) => void;
    switchTo: (newIndex: number) => void;
};
export default generateSwitchTo;
