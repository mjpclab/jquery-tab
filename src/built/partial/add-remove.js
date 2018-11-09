import $ from "jquery";
import createTabItem from "./create-tab-item";
var AddRemove = /** @class */ (function () {
    function AddRemove(getter, saveLoad, switcher, containers, context, options) {
        this.getter = getter;
        this.saveLoad = saveLoad;
        this.switcher = switcher;
        this.containers = containers;
        this.context = context;
        this.options = options;
    }
    AddRemove.prototype._switchIfInitial = function () {
        var _a = this, switcher = _a.switcher, context = _a.context;
        if (context.currentIndex === -1 && context.itemCount) {
            switcher.switchTo(0);
        }
    };
    ;
    AddRemove.prototype.insertTabItemWithoutSwitch = function (position, tabItem) {
        var _a = this, getter = _a.getter, saveLoad = _a.saveLoad, containers = _a.containers, context = _a.context, options = _a.options;
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf, $panelContainerLeaf = containers.$panelContainerLeaf;
        var _b = createTabItem(tabItem, context, options), $panelItem = _b.$panelItem, cloneLabelItem = _b.cloneLabelItem;
        var index = getter.positionToIndex(position);
        if (index < 0) {
            index = 0;
        }
        if (context.itemCount > 0 && index < context.itemCount) {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.children().eq(index).before(cloneLabelItem());
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.children().eq(index).before(cloneLabelItem());
            }
            $panelContainerLeaf.children().eq(index).before($panelItem);
            if (index <= context.currentIndex) {
                context.currentIndex++;
                if (!context.currentName) {
                    saveLoad.savePosition(context.currentIndex);
                }
            }
        }
        else {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.append(cloneLabelItem());
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.append(cloneLabelItem());
            }
            $panelContainerLeaf.append($panelItem);
        }
        context.itemCount++;
    };
    ;
    AddRemove.prototype.insertTabItem = function (position, tabItem) {
        this.insertTabItemWithoutSwitch(position, tabItem);
        this._switchIfInitial();
    };
    ;
    AddRemove.prototype.addTabItemWithoutSwitch = function (tabItem) {
        this.insertTabItemWithoutSwitch(this.context.itemCount, tabItem);
    };
    ;
    AddRemove.prototype.addTabItem = function (tabItem) {
        this.addTabItemWithoutSwitch(tabItem);
        this._switchIfInitial();
    };
    ;
    AddRemove.prototype.insertWithoutSwitch = function (position, sourceRegion) {
        var getter = this.getter;
        var _a = this.options, titleSelector = _a.titleSelector, fnGetTitleContent = _a.fnGetTitleContent, keepTitleVisible = _a.keepTitleVisible, fnGetTabItemName = _a.fnGetTabItemName, fnIsTabItemDisabled = _a.fnIsTabItemDisabled, fnIsTabItemHidden = _a.fnIsTabItemHidden;
        var $sourceRegion = $(sourceRegion);
        var inserted = 0;
        var index = getter.positionToIndex(position);
        while (true) {
            var $title = $sourceRegion.find(titleSelector).first();
            if ($title.length === 0) {
                break;
            }
            if (!keepTitleVisible) {
                $title.hide();
            }
            var $rest = $title.nextUntil(titleSelector);
            var tabItem = {
                title: fnGetTitleContent.call($sourceRegion, $title, $rest),
                content: $([]).add($title).add($rest),
                name: fnGetTabItemName.call($sourceRegion, $title, $rest),
                disabled: fnIsTabItemDisabled.call($sourceRegion, $title, $rest),
                hidden: fnIsTabItemHidden.call($sourceRegion, $title, $rest)
            };
            this.insertTabItemWithoutSwitch(index + inserted, tabItem);
            inserted++;
        }
    };
    ;
    AddRemove.prototype.insert = function (sourceRegion, position) {
        this.insertWithoutSwitch(position, sourceRegion);
        this._switchIfInitial();
    };
    ;
    AddRemove.prototype.addWithoutSwitch = function (sourceRegion) {
        this.insertWithoutSwitch(this.context.itemCount, sourceRegion);
    };
    ;
    AddRemove.prototype.add = function (sourceRegion) {
        this.addWithoutSwitch(sourceRegion);
        this._switchIfInitial();
    };
    ;
    AddRemove.prototype.remove = function (positions) {
        if (!positions.length) {
            return;
        }
        var _a = this, getter = _a.getter, saveLoad = _a.saveLoad, switcher = _a.switcher, context = _a.context;
        var removeIndecies = [];
        for (var i = 0, len = positions.length; i < len; i++) {
            var removeIndex = getter.positionToIndex(positions[i]);
            if (removeIndex >= 0 && removeIndex < context.itemCount && $.inArray(removeIndex, removeIndecies) === -1) {
                removeIndecies.push(removeIndex);
            }
        }
        if (!removeIndecies.length) {
            return;
        }
        removeIndecies.sort(function (prev, next) {
            return next - prev;
        });
        if (context.itemCount > 1 && $.inArray(context.currentIndex, removeIndecies) >= 0) {
            switcher.switchNext({ exclude: removeIndecies }) ||
                switcher.switchPrevious({ exclude: removeIndecies }) ||
                switcher.switchNext({ includeDisabled: true, exclude: removeIndecies }) ||
                switcher.switchPrevious({ includeDisabled: true, exclude: removeIndecies }) ||
                switcher.switchNext({ includeHidden: true, exclude: removeIndecies }) ||
                switcher.switchPrevious({ includeHidden: true, exclude: removeIndecies }) ||
                switcher.switchNext({ includeDisabled: true, includeHidden: true, exclude: removeIndecies }) ||
                switcher.switchPrevious({ includeDisabled: true, includeHidden: true, exclude: removeIndecies });
        }
        var currentIndexChanged = false;
        for (var i = 0, len = removeIndecies.length; i < len; i++) {
            var removeIndex = removeIndecies[i];
            var $labelItems = getter.getHeaderFooterLabels(removeIndex);
            var $panelItem = getter.getPanel(removeIndex);
            $labelItems.remove();
            $panelItem.remove();
            if (removeIndex < context.currentIndex) {
                context.currentIndex--;
                currentIndexChanged = true;
            }
            context.itemCount--;
        }
        if (context.itemCount === 0) {
            context.currentIndex = -1;
            context.currentName = undefined;
        }
        else if (currentIndexChanged && !context.currentName) {
            saveLoad.savePosition(context.currentIndex);
        }
        return removeIndecies.length;
    };
    ;
    return AddRemove;
}());
export default AddRemove;
