import $ from 'jquery';
var SwitchDirection;
(function (SwitchDirection) {
    SwitchDirection[SwitchDirection["Backward"] = 0] = "Backward";
    SwitchDirection[SwitchDirection["Forward"] = 1] = "Forward";
})(SwitchDirection || (SwitchDirection = {}));
var Switcher = /** @class */ (function () {
    function Switcher(getter, domUpdater, saveLoad, containers, context, options) {
        this.getter = getter;
        this.domUpdater = domUpdater;
        this.saveLoad = saveLoad;
        this.containers = containers;
        this.context = context;
        this.options = options;
    }
    Switcher.prototype.switchToWithoutSave = function (newPosition) {
        var _a = this, context = _a.context, getter = _a.getter;
        var newNormalizedPos = getter.normalizePosition(newPosition);
        var newIndex = newNormalizedPos.index, newName = newNormalizedPos.name;
        if (newIndex < 0 || newIndex >= context.itemCount || newIndex === context.currentIndex) {
            return;
        }
        var oldIndex = context.currentIndex, oldName = context.currentName, tabState = context.tabState;
        var oldNormalizedPos = { index: oldIndex, name: oldName };
        var $tabContainer = this.containers.$tabContainer;
        var _b = this.options, onBeforeSwitch = _b.onBeforeSwitch, onAfterSwitch = _b.onAfterSwitch;
        //before switching callback
        if (typeof (onBeforeSwitch) === 'function') {
            var callBackResult = onBeforeSwitch.call($tabContainer, oldNormalizedPos, newNormalizedPos, tabState);
            if (callBackResult === false) {
                return false;
            }
        }
        //update state
        this.domUpdater.updateActiveState(newIndex);
        //finalize
        context.switched = true;
        context.currentIndex = newIndex;
        context.currentName = newName;
        //after switching callback
        if (typeof (onAfterSwitch) === 'function') {
            onAfterSwitch.call($tabContainer, oldNormalizedPos, newNormalizedPos, tabState);
        }
        return newNormalizedPos;
    };
    Switcher.prototype.switchTo = function (newPosition) {
        var result = this.switchToWithoutSave(newPosition);
        if (result) {
            var saveLoad = this.saveLoad;
            var index = result.index, name_1 = result.name;
            saveLoad.savePosition(name_1 || index);
        }
        return result;
    };
    Switcher.prototype._switchNeighbor = function (direction, switchOptions) {
        var getter = this.getter;
        var opts = switchOptions || {};
        var includeDisabled = opts.includeDisabled, includeHidden = opts.includeHidden, loop = opts.loop, exclude = opts.exclude;
        var excludeIndecies = exclude && exclude.length ? $.map(exclude, function (position) {
            return getter.positionToIndex(position);
        }) : [];
        var $panelContainer = this.containers.$panelContainer;
        var $panelItems = $panelContainer.children();
        var _a = this.context, itemCount = _a.itemCount, currentIndex = _a.currentIndex;
        var _b = this.options, disabledPanelItemClass = _b.disabledPanelItemClass, hiddenPanelItemClass = _b.hiddenPanelItemClass;
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
                return this.switchTo(panelIndex);
            }
        }
    };
    Switcher.prototype.switchPrevious = function (switchOptions) {
        return this._switchNeighbor(SwitchDirection.Backward, switchOptions);
    };
    Switcher.prototype.switchNext = function (switchOptions) {
        return this._switchNeighbor(SwitchDirection.Forward, switchOptions);
    };
    return Switcher;
}());
export default Switcher;
