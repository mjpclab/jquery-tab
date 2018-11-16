var TabItemSetter = /** @class */ (function () {
    function TabItemSetter(getter, options) {
        this.getter = getter;
        this.options = options;
    }
    TabItemSetter.prototype.setName = function (position, name) {
        var getter = this.getter;
        var tabItemNameAttr = this.options.tabItemNameAttr;
        getter.getHeaderFooterLabels(position).data(tabItemNameAttr, name);
        getter.getPanel(position).data(tabItemNameAttr, name);
    };
    TabItemSetter.prototype.setDisabled = function (position, disabled) {
        var getter = this.getter;
        var _a = this.options, disabledLabelItemClass = _a.disabledLabelItemClass, disabledPanelItemClass = _a.disabledPanelItemClass;
        getter.getHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
        getter.getPanel(position).toggleClass(disabledPanelItemClass, disabled);
    };
    TabItemSetter.prototype.setEnabled = function (position, enabled) {
        this.setDisabled(position, !enabled);
    };
    TabItemSetter.prototype.setHidden = function (position, hidden) {
        var getter = this.getter;
        var _a = this.options, hiddenLabelItemClass = _a.hiddenLabelItemClass, hiddenPanelItemClass = _a.hiddenPanelItemClass;
        getter.getHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
        getter.getPanel(position).toggleClass(hiddenPanelItemClass, hidden);
    };
    TabItemSetter.prototype.setVisible = function (position, visible) {
        this.setHidden(position, !visible);
    };
    return TabItemSetter;
}());
export default TabItemSetter;
