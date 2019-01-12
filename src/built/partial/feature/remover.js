import $ from 'jquery';
var Remover = /** @class */ (function () {
    function Remover(getter, saveLoad, switcher, context) {
        this.getter = getter;
        this.saveLoad = saveLoad;
        this.switcher = switcher;
        this.context = context;
    }
    Remover.prototype.remove = function (positions) {
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
    return Remover;
}());
export default Remover;
