declare function generateSwitchTo(fnParsePosition: JQueryTab.fnParsePosition, fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, fnSavePosition: JQueryTab.fnSavePosition, containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    switchToWithoutSave: (newPosition: string | number) => {
        index: number;
        name: string | undefined;
    } | undefined;
    switchTo: (newPosition: string | number) => void;
};
export default generateSwitchTo;
