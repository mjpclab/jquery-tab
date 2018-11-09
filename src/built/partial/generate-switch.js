import $ from 'jquery';
import updateActiveState from "./update-active-state";
var SwitchDirection;
(function (SwitchDirection) {
    SwitchDirection[SwitchDirection["Backward"] = 0] = "Backward";
    SwitchDirection[SwitchDirection["Forward"] = 1] = "Forward";
})(SwitchDirection || (SwitchDirection = {}));
function generateSwitch(fnPositionToIndex, fnParsePosition, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, containers, context, options) {
    var switchToWithoutSave = function (newPosition) {
        var _a = fnParsePosition(newPosition), newIndex = _a.index, newName = _a.name;
        if (newIndex < 0 || newIndex >= context.itemCount || newIndex === context.currentIndex) {
            return;
        }
        var $tabContainer = containers.$tabContainer;
        var oldIndex = context.currentIndex, oldName = context.currentName;
        var onBeforeSwitch = options.onBeforeSwitch, onAfterSwitch = options.onAfterSwitch;
        //before switching callback
        if (typeof (onBeforeSwitch) === 'function') {
            onBeforeSwitch.call($tabContainer, { index: oldIndex, name: oldName }, { index: newIndex, name: newName });
        }
        //update state
        var $newLabel = fnGetHeaderFooterLabels(newIndex);
        var $newPanel = fnGetPanel(newIndex);
        updateActiveState($newLabel, $newPanel, options);
        //finalize
        context.currentIndex = newIndex;
        context.currentName = newName;
        //after switching callback
        if (typeof (onAfterSwitch) === 'function') {
            onAfterSwitch.call($tabContainer, { index: oldIndex, name: oldName }, { index: newIndex, name: newName });
        }
        return { index: newIndex, name: newName };
    };
    var switchTo = function (newPosition) {
        var result = switchToWithoutSave(newPosition);
        if (result) {
            var index = result.index, name_1 = result.name;
            fnSavePosition(name_1 || index);
        }
        return result;
    };
    var _switchNeighbor = function (direction, switchOptions) {
        var opts = switchOptions || {};
        var includeDisabled = opts.includeDisabled, includeHidden = opts.includeHidden, loop = opts.loop, exclude = opts.exclude;
        var excludeIndecies = exclude && exclude.length ? $.map(exclude, function (position) {
            return fnPositionToIndex(position);
        }) : [];
        var $panelContainer = containers.$panelContainer;
        var $panelItems = $panelContainer.children();
        var itemCount = context.itemCount, currentIndex = context.currentIndex;
        var disabledPanelItemClass = options.disabledPanelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
        var maxIterationCount = -1;
        if (loop) {
            if (currentIndex >= 0 && currentIndex < itemCount) {
                maxIterationCount = itemCount - 1;
            }
            else {
                maxIterationCount = itemCount;
            }
        }
        else if (direction === SwitchDirection.Backward) {
            maxIterationCount = currentIndex;
        }
        else if (direction === SwitchDirection.Forward) {
            maxIterationCount = itemCount - currentIndex - 1;
        }
        var iterationStep = direction === SwitchDirection.Backward ? -1 : 1;
        for (var i = 1; i <= maxIterationCount; i++) {
            var panelIndex = (currentIndex + i * iterationStep + itemCount) % itemCount;
            if ($.inArray(panelIndex, excludeIndecies) >= 0) {
                continue;
            }
            var $panel = $panelItems.eq(panelIndex);
            var panelIsDisabled = $panel.hasClass(disabledPanelItemClass);
            var panelIsHidden = $panel.hasClass(hiddenPanelItemClass);
            if ((!panelIsDisabled && !panelIsHidden) ||
                (includeDisabled && !panelIsHidden) ||
                (!panelIsDisabled && includeHidden) ||
                (includeDisabled && includeHidden)) {
                return switchTo(panelIndex);
            }
        }
    };
    var switchPrevious = function (switchOptions) {
        return _switchNeighbor(SwitchDirection.Backward, switchOptions);
    };
    var switchNext = function (switchOptions) {
        return _switchNeighbor(SwitchDirection.Forward, switchOptions);
    };
    return { switchToWithoutSave: switchToWithoutSave, switchTo: switchTo, switchPrevious: switchPrevious, switchNext: switchNext };
}
export default generateSwitch;
