function generateTabItemSetter(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, options) {
    const { tabItemNameAttr, disabledLabelItemClass, disabledPanelItemClass, hiddenLabelItemClass, hiddenPanelItemClass } = options;
    const setName = function (position, name) {
        fnGetHeaderFooterLabels(position).attr(tabItemNameAttr, name);
        fnGetPanel(position).attr(tabItemNameAttr, name);
    };
    const setDisabled = function (position, disabled = true) {
        fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
        fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
    };
    const setEnabled = function (position, enabled = true) {
        setDisabled(position, !enabled);
    };
    const setHidden = function (position, hidden = true) {
        fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
        fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
    };
    const setVisible = function (position, visible = true) {
        setHidden(position, !visible);
    };
    return { setName, setDisabled, setEnabled, setHidden, setVisible };
}
export default generateTabItemSetter;
