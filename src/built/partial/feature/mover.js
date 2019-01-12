function exchangeElement($container, fromIndex, toIndex) {
    var $children = $container.children();
    var $from = $children.eq(fromIndex);
    var $to = $children.eq(toIndex);
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
    Mover.prototype.exchangeTabItem = function (fromPosition, toPosition) {
        var _a = this, getter = _a.getter, context = _a.context;
        var itemCount = context.itemCount;
        var _b = this.containers, $headerLabelContainer = _b.$headerLabelContainer, $panelContainer = _b.$panelContainer, $footerLabelContainer = _b.$footerLabelContainer;
        var fromIndex = getter.positionToIndex(fromPosition);
        var toIndex = getter.positionToIndex(toPosition);
        if (fromIndex < 0 || fromIndex >= itemCount || toIndex < 0 || toIndex >= itemCount || fromIndex === toIndex) {
            return;
        }
        if (fromIndex > toIndex) {
            var tmpIndex = fromIndex;
            fromIndex = toIndex;
            toIndex = tmpIndex;
        }
        $headerLabelContainer && exchangeElement($headerLabelContainer, fromIndex, toIndex);
        $footerLabelContainer && exchangeElement($footerLabelContainer, fromIndex, toIndex);
        exchangeElement($panelContainer, fromIndex, toIndex);
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
