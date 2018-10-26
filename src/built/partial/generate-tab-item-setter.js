function generateTabItemSetter(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, options) {
    const { tabItemNameAttr, disabledLabelItemClass, disabledPanelItemClass, hiddenLabelItemClass, hiddenPanelItemClass } = options;
    const setName = function (position, name) {
        fnGetHeaderFooterLabels(position).attr(tabItemNameAttr, name);
        fnGetPanel(position).attr(tabItemNameAttr, name);
    };
    const setDisabled = function (position, disabled) {
        fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
        fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
    };
    const setHidden = function (position, hidden) {
        fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
        fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
    };
    return { setName, setDisabled, setHidden };
}
export default generateTabItemSetter;
