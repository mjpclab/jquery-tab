function generateController(getter, domUpdater, tabItemSetter, switcher, addRemove) {
    //getter
    var getCount = function () {
        return getter.getCount();
    };
    var getCurrentIndex = function () {
        return getter.getCurrentIndex();
    };
    var getCurrentName = function () {
        return getter.getCurrentName();
    };
    var getName = function (index) {
        return getter.getName(index);
    };
    var getIndexByName = function (name) {
        return getter.getIndexByName(name);
    };
    var isDisabled = function (position) {
        return getter.isDisabled(position);
    };
    var isEnabled = function (position) {
        return getter.isEnabled(position);
    };
    var isHidden = function (position) {
        return getter.isHidden(position);
    };
    var isVisible = function (position) {
        return getter.isVisible(position);
    };
    var getHeaderLabel = function (position) {
        return getter.getHeaderLabel(position);
    };
    var getFooterLabel = function (position) {
        return getter.getFooterLabel(position);
    };
    var getHeaderFooterLabels = function (position) {
        return getter.getHeaderFooterLabels(position);
    };
    var getPanel = function (position) {
        return getter.getPanel(position);
    };
    var getCurrentHeaderLabel = function () {
        return getter.getCurrentHeaderLabel();
    };
    var getCurrentFooterLabel = function () {
        return getter.getCurrentFooterLabel();
    };
    var getCurrentHeaderFooterLabels = function () {
        return getter.getCurrentHeaderFooterLabels();
    };
    var getCurrentPanel = function () {
        return getter.getCurrentPanel();
    };
    var setName = function (position, name) {
        return tabItemSetter.setName(position, name);
    };
    var setDisabled = function (position, disabled) {
        if (disabled === void 0) { disabled = true; }
        return tabItemSetter.setDisabled(position, disabled);
    };
    var setEnabled = function (position, enabled) {
        if (enabled === void 0) { enabled = true; }
        return tabItemSetter.setEnabled(position, enabled);
    };
    var setHidden = function (position, hidden) {
        if (hidden === void 0) { hidden = true; }
        return tabItemSetter.setHidden(position, hidden);
    };
    var setVisible = function (position, visible) {
        if (visible === void 0) { visible = true; }
        return tabItemSetter.setVisible(position, visible);
    };
    //dom updater
    var updateFixedHeight = function () {
        return domUpdater.updateFixedHeight();
    };
    //switcher
    var switchTo = function (newPosition) {
        return switcher.switchTo(newPosition);
    };
    var switchPrevious = function (switchOptions) {
        return switcher.switchPrevious(switchOptions);
    };
    var switchNext = function (switchOptions) {
        return switcher.switchNext(switchOptions);
    };
    //add remove
    var insertTabItem = function (position, tabItem) {
        return addRemove.insertTabItem(position, tabItem);
    };
    var addTabItem = function (tabItem) {
        return addRemove.addTabItem(tabItem);
    };
    var insert = function (sourceRegion, position) {
        return addRemove.insert(sourceRegion, position);
    };
    var add = function (sourceRegion) {
        return addRemove.add(sourceRegion);
    };
    var remove = function () {
        var positions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            positions[_i] = arguments[_i];
        }
        return addRemove.remove(positions);
    };
    var controller = {
        getCount: getCount,
        getCurrentIndex: getCurrentIndex,
        getCurrentName: getCurrentName,
        getName: getName,
        getIndexByName: getIndexByName,
        isDisabled: isDisabled, isEnabled: isEnabled, isHidden: isHidden, isVisible: isVisible,
        getHeaderLabel: getHeaderLabel, getFooterLabel: getFooterLabel, getHeaderFooterLabels: getHeaderFooterLabels,
        getPanel: getPanel,
        getCurrentHeaderLabel: getCurrentHeaderLabel, getCurrentFooterLabel: getCurrentFooterLabel, getCurrentHeaderFooterLabels: getCurrentHeaderFooterLabels,
        getCurrentPanel: getCurrentPanel,
        setName: setName, setDisabled: setDisabled, setEnabled: setEnabled, setHidden: setHidden, setVisible: setVisible,
        updateFixedHeight: updateFixedHeight,
        switchTo: switchTo, switchPrevious: switchPrevious, switchNext: switchNext,
        addTabItem: addTabItem,
        insertTabItem: insertTabItem,
        add: add,
        insert: insert,
        remove: remove
    };
    return controller;
}
export default generateController;
