declare function generateTabItemSetter(fnPositionToIndex: JQueryTab.fnPositionToIndex, fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, options: JQueryTab.ExpandedOptions): {
    setName: (position: string | number, name: string) => void;
    setDisabled: (position: string | number, disabled: boolean) => void;
    setHidden: (position: string | number, hidden: boolean) => void;
};
export default generateTabItemSetter;
