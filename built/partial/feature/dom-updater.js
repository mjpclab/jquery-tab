import $ from 'jquery';
var DomUpdater = /** @class */ (function () {
    function DomUpdater(getter, containers, context, options) {
        this.getter = getter;
        this.containers = containers;
        this.context = context;
        this.options = options;
    }
    DomUpdater.prototype.updateActiveState = function (activeIndex) {
        var getter = this.getter;
        var _a = this.options, activeLabelItemClass = _a.activeLabelItemClass, inactiveLabelItemClass = _a.inactiveLabelItemClass, activePanelItemClass = _a.activePanelItemClass, inactivePanelItemClass = _a.inactivePanelItemClass;
        var $activeLabelItem = getter.getHeaderFooterLabels(activeIndex);
        var $activePanelItem = getter.getPanel(activeIndex);
        //label items
        $activeLabelItem
            .removeClass(inactiveLabelItemClass)
            .addClass(activeLabelItemClass)
            .attr('aria-selected', 'true')
            .attr('aria-expanded', 'true');
        $activeLabelItem.siblings()
            .removeClass(activeLabelItemClass)
            .addClass(inactiveLabelItemClass)
            .attr('aria-selected', 'false')
            .attr('aria-expanded', 'false');
        //panel items
        $activePanelItem
            .removeClass(inactivePanelItemClass)
            .addClass(activePanelItemClass)
            .attr('aria-hidden', 'false');
        $activePanelItem.siblings()
            .removeClass(activePanelItemClass)
            .addClass(inactivePanelItemClass)
            .attr('aria-hidden', 'true');
    };
    DomUpdater.prototype.updateFixedHeight = function () {
        var _a = this.options, fixedHeight = _a.fixedHeight, fixedHeightProp = _a.fixedHeightProp, evaluatingPanelItemClass = _a.evaluatingPanelItemClass;
        if (!fixedHeight || !fixedHeightProp) {
            return;
        }
        var currentIndex = this.context.currentIndex;
        var panelMaxHeight = 0;
        this.containers.$panelContainerLeaf.children().each(function (index, panelItem) {
            var $panelItem = $(panelItem);
            if (index !== currentIndex) {
                $panelItem.addClass(evaluatingPanelItemClass);
            }
            var panelHeight = panelItem.scrollHeight;
            if (panelHeight > panelMaxHeight) {
                panelMaxHeight = panelHeight;
            }
            if (index !== currentIndex) {
                $panelItem.removeClass(evaluatingPanelItemClass);
            }
        }).css(fixedHeightProp, panelMaxHeight + 'px');
    };
    return DomUpdater;
}());
export default DomUpdater;
