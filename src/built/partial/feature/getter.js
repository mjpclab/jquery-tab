import $ from "jquery";
var Getter = /** @class */ (function () {
    function Getter(containers, context, options) {
        this.containers = containers;
        this.context = context;
        this.options = options;
    }
    Getter.prototype.getCount = function () {
        return this.context.itemCount;
    };
    Getter.prototype.getCurrentIndex = function () {
        return this.context.currentIndex;
    };
    Getter.prototype.getCurrentName = function () {
        return this.context.currentName;
    };
    Getter.prototype.getName = function (index) {
        var itemCount = this.context.itemCount;
        if (index >= 0 && index < itemCount) {
            var $panelContainerLeaf = this.containers.$panelContainerLeaf;
            var tabItemNameAttr = this.options.tabItemNameAttr;
            return $panelContainerLeaf.children().eq(index).data(tabItemNameAttr);
        }
    };
    Getter.prototype.getIndexByName = function (name) {
        var tabItemIndex = -1;
        var $panelContainerLeaf = this.containers.$panelContainerLeaf;
        var tabItemNameAttr = this.options.tabItemNameAttr;
        $panelContainerLeaf.children().each(function (index, panel) {
            var $panel = $(panel);
            if ($panel.data(tabItemNameAttr) === name) {
                tabItemIndex = index;
                return false;
            }
        });
        return tabItemIndex;
    };
    Getter.prototype.positionToIndex = function (position) {
        if (typeof position === 'number') {
            return position;
        }
        else if (isFinite(position)) {
            return parseInt(position);
        }
        else if (position !== undefined) {
            return this.getIndexByName(position);
        }
        else {
            return -1;
        }
    };
    Getter.prototype.normalizePosition = function (position) {
        if (typeof position === 'number') {
            return {
                index: position,
                name: this.getName(position)
            };
        }
        else if (isFinite(position)) {
            var index = parseInt(position);
            return {
                index: index,
                name: this.getName(index)
            };
        }
        else if (position) {
            return {
                index: this.getIndexByName(position),
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
    Getter.prototype.isDisabled = function (position) {
        var itemCount = this.context.itemCount;
        var index = this.positionToIndex(position);
        if (index >= 0 && index < itemCount) {
            var $panelContainerLeaf = this.containers.$panelContainerLeaf;
            var disabledPanelItemClass = this.options.disabledPanelItemClass;
            return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
        }
    };
    Getter.prototype.isEnabled = function (position) {
        return !this.isDisabled(position);
    };
    Getter.prototype.isHidden = function (position) {
        var itemCount = this.context.itemCount;
        var index = this.positionToIndex(position);
        if (index >= 0 && index < itemCount) {
            var $panelContainerLeaf = this.containers.$panelContainerLeaf;
            var hiddenPanelItemClass = this.options.hiddenPanelItemClass;
            return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
        }
    };
    Getter.prototype.isVisible = function (position) {
        return !this.isHidden(position);
    };
    Getter.prototype.getHeaderLabel = function (position) {
        var $headerLabelContainerLeaf = this.containers.$headerLabelContainerLeaf;
        if ($headerLabelContainerLeaf) {
            var itemCount = this.context.itemCount;
            var index = this.positionToIndex(position);
            if (index >= 0 && index < itemCount) {
                return $headerLabelContainerLeaf.children().eq(index);
            }
        }
        return $([]);
    };
    Getter.prototype.getFooterLabel = function (position) {
        var $footerLabelContainerLeaf = this.containers.$footerLabelContainerLeaf;
        if ($footerLabelContainerLeaf) {
            var itemCount = this.context.itemCount;
            var index = this.positionToIndex(position);
            if (index >= 0 && index < itemCount) {
                return $footerLabelContainerLeaf.children().eq(index);
            }
        }
        return $([]);
    };
    Getter.prototype.getHeaderFooterLabels = function (position) {
        var itemCount = this.context.itemCount;
        var index = this.positionToIndex(position);
        if (index >= 0 && index < itemCount) {
            return this.getHeaderLabel(index).add(this.getFooterLabel(index));
        }
        return $([]);
    };
    Getter.prototype.getPanel = function (position) {
        var itemCount = this.context.itemCount;
        var index = this.positionToIndex(position);
        if (index >= 0 && index < itemCount) {
            var $panelContainerLeaf = this.containers.$panelContainerLeaf;
            return $panelContainerLeaf.children().eq(index);
        }
        return $([]);
    };
    Getter.prototype.getCurrentHeaderLabel = function () {
        return this.getHeaderLabel(this.context.currentIndex);
    };
    Getter.prototype.getCurrentFooterLabel = function () {
        return this.getFooterLabel(this.context.currentIndex);
    };
    Getter.prototype.getCurrentHeaderFooterLabels = function () {
        return this.getHeaderFooterLabels(this.context.currentIndex);
    };
    Getter.prototype.getCurrentPanel = function () {
        return this.getPanel(this.context.currentIndex);
    };
    return Getter;
}());
export default Getter;
