declare function generateTabItemSetter(fnPositionToIndex: JQueryTab.fnPositionToIndex, fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, options: JQueryTab.ExpandedOptions): {
    setTabItemName: (name: string, position: string | number) => void;
    setTabItemDisabled: (disabled: boolean, position: string | number) => void;
    setTabItemHidden: (hidden: boolean, position: string | number) => void;
};
export default generateTabItemSetter;
