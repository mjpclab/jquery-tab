function generateTabItemSetter(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, options) {
    const { tabItemNameAttr, disabledLabelItemClass, disabledPanelItemClass, hiddenLabelItemClass, hiddenPanelItemClass } = options;
    const setTabItemName = function (name, position) {
        fnGetHeaderFooterLabels(position).attr(tabItemNameAttr, name);
        fnGetPanel(position).attr(tabItemNameAttr, name);
    };
    const setTabItemDisabled = function (disabled, position) {
        fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
        fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
    };
    const setTabItemHidden = function (hidden, position) {
        fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
        fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
    };
    return { setTabItemName, setTabItemDisabled, setTabItemHidden };
}
export default generateTabItemSetter;
