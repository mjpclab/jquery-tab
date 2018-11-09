import $ from "jquery";
function generateGetters(containers, context, options) {
    var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf, $panelContainerLeaf = containers.$panelContainerLeaf;
    var tabItemNameAttr = options.tabItemNameAttr, disabledPanelItemClass = options.disabledPanelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
    var getCount = function () {
        return context.itemCount;
    };
    var getCurrentIndex = function () {
        return context.currentIndex;
    };
    var getCurrentName = function () {
        return context.currentName;
    };
    var getName = function (index) {
        if (index >= 0 && index < context.itemCount) {
            return $panelContainerLeaf.children().eq(index).data(tabItemNameAttr);
        }
    };
    var getIndexByName = function (name) {
        var tabItemIndex = -1;
        $panelContainerLeaf.children().each(function (index, panel) {
            var $panel = $(panel);
            if ($panel.data(tabItemNameAttr) === name) {
                tabItemIndex = $panel.index();
                return false;
            }
        });
        return tabItemIndex;
    };
    var positionToIndex = function (position) {
        if (typeof position === 'number') {
            return position;
        }
        else if (isFinite(position)) {
            return parseInt(position);
        }
        else if (position !== undefined) {
            return getIndexByName(position);
        }
        else {
            return -1;
        }
    };
    var parsePosition = function (position) {
        if (typeof position === 'number') {
            return {
                index: position,
                name: getName(position)
            };
        }
        else if (isFinite(position)) {
            var index = parseInt(position);
            return {
                index: index,
                name: getName(index)
            };
        }
        else if (position) {
            return {
                index: getIndexByName(position),
                name: position
            };
        }
        else {
            return {
                index: -1,
                name: undefined
            };
        }
    };
    var isDisabled = function (position) {
        var index = positionToIndex(position);
        if (index >= 0 && index < context.itemCount) {
            return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
        }
    };
    var isEnabled = function (position) {
        return !isDisabled(position);
    };
    var isHidden = function (position) {
        var index = positionToIndex(position);
        if (index >= 0 && index < context.itemCount) {
            return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
        }
    };
    var isVisible = function (position) {
        return !isHidden(position);
    };
    var getHeaderLabel = function (position) {
        if ($headerLabelContainerLeaf) {
            var index = positionToIndex(position);
            if (index >= 0 && index < context.itemCount) {
                return $headerLabelContainerLeaf.children().eq(index);
            }
        }
        return $([]);
    };
    var getFooterLabel = function (position) {
        if ($footerLabelContainerLeaf) {
            var index = positionToIndex(position);
            if (index >= 0 && index < context.itemCount) {
                return $footerLabelContainerLeaf.children().eq(index);
            }
        }
        return $([]);
    };
    var getHeaderFooterLabels = function (position) {
        var index = positionToIndex(position);
        if (index >= 0 && index < context.itemCount) {
            return getHeaderLabel(index).add(getFooterLabel(index));
        }
        return $([]);
    };
    var getPanel = function (position) {
        var index = positionToIndex(position);
        if (index >= 0 && index < context.itemCount) {
            return $panelContainerLeaf.children().eq(index);
        }
        return $([]);
    };
    var getCurrentHeaderLabel = function () {
        return getHeaderLabel(context.currentIndex);
    };
    var getCurrentFooterLabel = function () {
        return getFooterLabel(context.currentIndex);
    };
    var getCurrentHeaderFooterLabels = function () {
        return getHeaderFooterLabels(context.currentIndex);
    };
    var getCurrentPanel = function () {
        return getPanel(context.currentIndex);
    };
    return {
        getCount: getCount,
        getCurrentIndex: getCurrentIndex,
        getCurrentName: getCurrentName,
        getName: getName,
        getIndexByName: getIndexByName,
        positionToIndex: positionToIndex,
        parsePosition: parsePosition,
        isDisabled: isDisabled, isEnabled: isEnabled, isHidden: isHidden, isVisible: isVisible,
        getHeaderLabel: getHeaderLabel, getFooterLabel: getFooterLabel, getHeaderFooterLabels: getHeaderFooterLabels,
        getPanel: getPanel,
        getCurrentHeaderLabel: getCurrentHeaderLabel, getCurrentFooterLabel: getCurrentFooterLabel, getCurrentHeaderFooterLabels: getCurrentHeaderFooterLabels,
        getCurrentPanel: getCurrentPanel
    };
}
export default generateGetters;
