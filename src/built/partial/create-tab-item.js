import createLabelItem from "./create-label-item";
import createPanelItem from "./create-panel-item";
function createTabItem(tabItem, context, options) {
    var name = tabItem.name, disabled = tabItem.disabled, hidden = tabItem.hidden;
    var tabItemNameAttr = options.tabItemNameAttr, disabledLabelItemClass = options.disabledLabelItemClass, disabledPanelItemClass = options.disabledPanelItemClass, hiddenLabelItemClass = options.hiddenLabelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
    var _a = createLabelItem(tabItem, options), $labelItem = _a.$labelItem, $labelItemLeaf = _a.$labelItemLeaf;
    var _b = createPanelItem(tabItem, options), $panelItem = _b.$panelItem, $panelItemLeaf = _b.$panelItemLeaf;
    if (name) {
        $labelItem.data(tabItemNameAttr, name);
        $panelItem.data(tabItemNameAttr, name);
    }
    if (disabled) {
        $labelItem.addClass(disabledLabelItemClass);
        $panelItem.addClass(disabledPanelItemClass);
    }
    if (hidden) {
        $labelItem.addClass(hiddenLabelItemClass);
        $panelItem.addClass(hiddenPanelItemClass);
    }
    var containerId = context.containerId, itemId = context.nextItemId;
    context.nextItemId++;
    var nextCloneId = 0;
    var labelItemIdPrefix = "__jquery-tab-label__" + containerId + "__" + itemId;
    var panelItemIdPrefix = "__jquery-tab-panel__" + containerId + "__" + itemId;
    var labelItemId = labelItemIdPrefix + "__" + nextCloneId;
    var panelItemId = panelItemIdPrefix;
    var cloneLabelItem = function () {
        var clonedLabelItemId = labelItemIdPrefix + "__" + nextCloneId++;
        if (clonedLabelItemId === labelItemId) {
            return $labelItem;
        }
        return $labelItem.clone().attr('id', clonedLabelItemId);
    };
    $labelItem.attr('id', labelItemId).attr('aria-controls', panelItemIdPrefix);
    $panelItem.attr('id', panelItemId).attr('aria-labelledby', labelItemId);
    return { $labelItem: $labelItem, $labelItemLeaf: $labelItemLeaf, $panelItem: $panelItem, $panelItemLeaf: $panelItemLeaf, cloneLabelItem: cloneLabelItem };
}
export default createTabItem;
