import $ from "jquery";
import createTabItem from "./create-tab-item";
function generateAddRemove(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, fnSwitchTo, fnSwitchPrevious, fnSwitchNext, containers, context, options) {
    var _switchIfInitial = function () {
        if (context.currentIndex === -1 && context.itemCount) {
            fnSwitchTo(0);
        }
    };
    var insertTabItemWithoutSwitch = function (position, tabItem) {
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf, $panelContainerLeaf = containers.$panelContainerLeaf;
        var _a = createTabItem(tabItem, context, options), $panelItem = _a.$panelItem, cloneLabelItem = _a.cloneLabelItem;
        var index = fnPositionToIndex(position);
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
                    fnSavePosition(context.currentIndex);
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
    var insertTabItem = function (position, tabItem) {
        insertTabItemWithoutSwitch(position, tabItem);
        _switchIfInitial();
    };
    var addTabItemWithoutSwitch = function (tabItem) {
        insertTabItemWithoutSwitch(context.itemCount, tabItem);
    };
    var addTabItem = function (tabItem) {
        addTabItemWithoutSwitch(tabItem);
        _switchIfInitial();
    };
    var insertWithoutSwitch = function (position, sourceRegion) {
        var titleSelector = options.titleSelector, fnGetTitleContent = options.fnGetTitleContent, keepTitleVisible = options.keepTitleVisible, fnGetTabItemName = options.fnGetTabItemName, fnIsTabItemDisabled = options.fnIsTabItemDisabled, fnIsTabItemHidden = options.fnIsTabItemHidden;
        var $sourceRegion = $(sourceRegion);
        var inserted = 0;
        var index = fnPositionToIndex(position);
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
            insertTabItemWithoutSwitch(index + inserted, tabItem);
            inserted++;
        }
    };
    var insert = function (sourceRegion, position) {
        insertWithoutSwitch(position, sourceRegion);
        _switchIfInitial();
    };
    var addWithoutSwitch = function (sourceRegion) {
        insertWithoutSwitch(context.itemCount, sourceRegion);
    };
    var add = function (sourceRegion) {
        addWithoutSwitch(sourceRegion);
        _switchIfInitial();
    };
    var remove = function () {
        var positions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            positions[_i] = arguments[_i];
        }
        if (!positions.length) {
            return;
        }
        var removeIndecies = [];
        for (var i = 0, len = positions.length; i < len; i++) {
            var removeIndex = fnPositionToIndex(positions[i]);
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
            fnSwitchNext({ exclude: removeIndecies }) ||
                fnSwitchPrevious({ exclude: removeIndecies }) ||
                fnSwitchNext({ includeDisabled: true, exclude: removeIndecies }) ||
                fnSwitchPrevious({ includeDisabled: true, exclude: removeIndecies }) ||
                fnSwitchNext({ includeHidden: true, exclude: removeIndecies }) ||
                fnSwitchPrevious({ includeHidden: true, exclude: removeIndecies }) ||
                fnSwitchNext({ includeDisabled: true, includeHidden: true, exclude: removeIndecies }) ||
                fnSwitchPrevious({ includeDisabled: true, includeHidden: true, exclude: removeIndecies });
        }
        var currentIndexChanged = false;
        for (var i = 0, len = removeIndecies.length; i < len; i++) {
            var removeIndex = removeIndecies[i];
            var $labelItems = fnGetHeaderFooterLabels(removeIndex);
            var $panelItem = fnGetPanel(removeIndex);
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
            fnSavePosition(context.currentIndex);
        }
        return removeIndecies.length;
    };
    return {
        insertTabItemWithoutSwitch: insertTabItemWithoutSwitch,
        insertTabItem: insertTabItem,
        addTabItemWithoutSwitch: addTabItemWithoutSwitch,
        addTabItem: addTabItem,
        insert: insert,
        insertWithoutSwitch: insertWithoutSwitch,
        add: add,
        addWithoutSwitch: addWithoutSwitch,
        remove: remove
    };
}
export default generateAddRemove;
