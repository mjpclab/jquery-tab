function generateTabItemSetter(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, options) {
    var tabItemNameAttr = options.tabItemNameAttr, disabledLabelItemClass = options.disabledLabelItemClass, disabledPanelItemClass = options.disabledPanelItemClass, hiddenLabelItemClass = options.hiddenLabelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
    var setName = function (position, name) {
        fnGetHeaderFooterLabels(position).data(tabItemNameAttr, name);
        fnGetPanel(position).data(tabItemNameAttr, name);
    };
    var setDisabled = function (position, disabled) {
        if (disabled === void 0) { disabled = true; }
        fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
        fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
    };
    var setEnabled = function (position, enabled) {
        if (enabled === void 0) { enabled = true; }
        setDisabled(position, !enabled);
    };
    var setHidden = function (position, hidden) {
        if (hidden === void 0) { hidden = true; }
        fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
        fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
    };
    var setVisible = function (position, visible) {
        if (visible === void 0) { visible = true; }
        setHidden(position, !visible);
    };
    return { setName: setName, setDisabled: setDisabled, setEnabled: setEnabled, setHidden: setHidden, setVisible: setVisible };
}
export default generateTabItemSetter;
