import $ from 'jquery';
import createTabItem from '../create/item/create-tab-item';
var Adder = /** @class */ (function () {
    function Adder(getter, saveLoad, switcher, containers, context, options) {
        this.getter = getter;
        this.saveLoad = saveLoad;
        this.switcher = switcher;
        this.containers = containers;
        this.context = context;
        this.options = options;
    }
    Adder.prototype._switchIfInitial = function () {
        var _a = this, switcher = _a.switcher, context = _a.context;
        if (context.currentIndex === -1 && context.itemCount) {
            switcher.switchTo(0);
        }
    };
    Adder.prototype.insertTabItemWithoutSwitch = function (position, tabItem) {
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
    Adder.prototype.insertTabItem = function (position, tabItem) {
        this.insertTabItemWithoutSwitch(position, tabItem);
        this._switchIfInitial();
    };
    Adder.prototype.addTabItemWithoutSwitch = function (tabItem) {
        this.insertTabItemWithoutSwitch(this.context.itemCount, tabItem);
    };
    Adder.prototype.addTabItem = function (tabItem) {
        this.addTabItemWithoutSwitch(tabItem);
        this._switchIfInitial();
    };
    Adder.prototype.insertWithoutSwitch = function (position, sourceRegion) {
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
    Adder.prototype.insert = function (position, sourceRegion) {
        this.insertWithoutSwitch(position, sourceRegion);
        this._switchIfInitial();
    };
    Adder.prototype.addWithoutSwitch = function (sourceRegion) {
        this.insertWithoutSwitch(this.context.itemCount, sourceRegion);
    };
    Adder.prototype.add = function (sourceRegion) {
        this.addWithoutSwitch(sourceRegion);
        this._switchIfInitial();
    };
    return Adder;
}());
export default Adder;
