function _extractElement($container, fromIndex, toIndex) {
    var $children = $container.children();
    var $from = $children.eq(fromIndex);
    var $to = $children.eq(toIndex);
    return { $from: $from, $to: $to };
}
function moveElementBefore($container, fromIndex, toIndex) {
    var _a = _extractElement($container, fromIndex, toIndex), $from = _a.$from, $to = _a.$to;
    $from.insertBefore($to);
}
function moveElementAfter($container, fromIndex, toIndex) {
    var _a = _extractElement($container, fromIndex, toIndex), $from = _a.$from, $to = _a.$to;
    $from.insertAfter($to);
}
function exchangeElement($container, fromIndex, toIndex) {
    var _a = _extractElement($container, fromIndex, toIndex), $from = _a.$from, $to = _a.$to;
    $from.insertAfter($to);
    //use .children() again to get the latest order
    $to.insertBefore($container.children().eq(fromIndex));
}
var Mover = /** @class */ (function () {
    function Mover(getter, containers, context) {
        this.getter = getter;
        this.containers = containers;
        this.context = context;
    }
    Mover.prototype._parseFromToPositions = function (fromPosition, toPosition) {
        var _a = this, getter = _a.getter, context = _a.context;
        var itemCount = context.itemCount;
        var fromIndex = getter.positionToIndex(fromPosition);
        var toIndex = getter.positionToIndex(toPosition);
        if (fromIndex < 0 || fromIndex >= itemCount || toIndex < 0 || toIndex >= itemCount || fromIndex === toIndex) {
            return;
        }
        return { fromIndex: fromIndex, toIndex: toIndex };
    };
    Mover.prototype._reorderElement = function (fnMoveElement, fromIndex, toIndex) {
        var _a = this.containers, $headerLabelContainer = _a.$headerLabelContainer, $panelContainer = _a.$panelContainer, $footerLabelContainer = _a.$footerLabelContainer;
        $headerLabelContainer && fnMoveElement($headerLabelContainer, fromIndex, toIndex);
        $footerLabelContainer && fnMoveElement($footerLabelContainer, fromIndex, toIndex);
        fnMoveElement($panelContainer, fromIndex, toIndex);
    };
    Mover.prototype.moveTabItemBefore = function (fromPosition, toPosition) {
        var indexes = this._parseFromToPositions(fromPosition, toPosition);
        if (!indexes) {
            return;
        }
        var fromIndex = indexes.fromIndex, toIndex = indexes.toIndex;
        var context = this.context;
        if (fromIndex === toIndex - 1) {
            return;
        }
        this._reorderElement(moveElementBefore, fromIndex, toIndex);
        if (fromIndex === context.currentIndex) {
            context.currentIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
        }
        else if (fromIndex < context.currentIndex && toIndex > context.currentIndex) {
            context.currentIndex--;
        }
        else if (fromIndex > context.currentIndex && toIndex <= context.currentIndex) {
            context.currentIndex++;
        }
    };
    Mover.prototype.moveTabItemAfter = function (fromPosition, toPosition) {
        var indexes = this._parseFromToPositions(fromPosition, toPosition);
        if (!indexes) {
            return;
        }
        var fromIndex = indexes.fromIndex, toIndex = indexes.toIndex;
        var context = this.context;
        if (fromIndex === toIndex + 1) {
            return;
        }
        this._reorderElement(moveElementAfter, fromIndex, toIndex);
        if (fromIndex === context.currentIndex) {
            context.currentIndex = fromIndex < toIndex ? toIndex : toIndex + 1;
        }
        else if (fromIndex < context.currentIndex && toIndex >= context.currentIndex) {
            context.currentIndex--;
        }
        else if (fromIndex > context.currentIndex && toIndex < context.currentIndex) {
            context.currentIndex++;
        }
    };
    Mover.prototype.moveTabItemFirst = function (fromPosition) {
        this.moveTabItemBefore(fromPosition, 0);
    };
    Mover.prototype.moveTabItemLast = function (fromPosition) {
        this.moveTabItemAfter(fromPosition, this.context.itemCount - 1);
    };
    Mover.prototype.exchangeTabItem = function (fromPosition, toPosition) {
        var indexes = this._parseFromToPositions(fromPosition, toPosition);
        if (!indexes) {
            return;
        }
        var fromIndex = indexes.fromIndex, toIndex = indexes.toIndex;
        var context = this.context;
        if (fromIndex > toIndex) {
            var tmpIndex = fromIndex;
            fromIndex = toIndex;
            toIndex = tmpIndex;
        }
        if (fromIndex + 1 === toIndex) {
            this._reorderElement(moveElementAfter, fromIndex, toIndex);
        }
        else {
            this._reorderElement(exchangeElement, fromIndex, toIndex);
        }
        if (fromIndex === context.currentIndex) {
            context.currentIndex = toIndex;
        }
        else if (toIndex === context.currentIndex) {
            context.currentIndex = fromIndex;
        }
    };
    return Mover;
}());
export default Mover;
