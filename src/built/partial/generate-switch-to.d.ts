declare function generateSwitchTo(fnTabItemPositionToIndex: JQueryTab.fnPositionToIndex, fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, fnSavePosition: JQueryTab.fnSavePosition, containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    switchToWithoutSave: (newPosition: string | number) => void;
    switchTo: (newPosition: string | number) => void;
};
export default generateSwitchTo;
