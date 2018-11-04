declare function generateSwitch(fnPositionToIndex: JQueryTab.fnPositionToIndex, fnParsePosition: JQueryTab.fnParsePosition, fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, fnSavePosition: JQueryTab.fnSavePosition, containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    switchToWithoutSave: (newPosition: string | number) => {
        index: number;
        name: string | undefined;
    } | undefined;
    switchTo: (newPosition: string | number) => {
        index: number;
        name: string | undefined;
    } | undefined;
    switchPrevious: (switchOptions?: JQueryTab.SwitchOptions | undefined) => {
        index: number;
        name: string | undefined;
    } | undefined;
    switchNext: (switchOptions?: JQueryTab.SwitchOptions | undefined) => {
        index: number;
        name: string | undefined;
    } | undefined;
};
export default generateSwitch;
