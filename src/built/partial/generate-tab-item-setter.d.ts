declare function generateTabItemSetter(fnPositionToIndex: JQueryTab.fnPositionToIndex, fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, options: JQueryTab.ExpandedOptions): {
    setName: (position: string | number, name: string) => void;
    setDisabled: (position: string | number, disabled?: boolean) => void;
    setEnabled: (position: string | number, enabled?: boolean) => void;
    setHidden: (position: string | number, hidden?: boolean) => void;
    setVisible: (position: string | number, visible?: boolean) => void;
};
export default generateTabItemSetter;
