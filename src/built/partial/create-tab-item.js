import createLabelItem from "./create-label-item";
import createPanelItem from "./create-panel-item";
function createTabItem($labelContent, $panelContent, tabItemName, context, options) {
    const { $labelItem, $labelItemLeaf } = createLabelItem($labelContent, options);
    const { $panelItem, $panelItemLeaf } = createPanelItem($panelContent, options);
    if (tabItemName) {
        $labelItem.attr('data-tab-item-name', tabItemName);
        $panelItem.attr('data-tab-item-name', tabItemName);
    }
    const { containerId, nextItemId: itemId } = context;
    context.nextItemId++;
    let nextCloneId = 0;
    const labelItemIdPrefix = `__jquery-tab-label__${containerId}__${itemId}`;
    const panelItemIdPrefix = `__jquery-tab-panel__${containerId}__${itemId}`;
    const labelItemId = `${labelItemIdPrefix}__${nextCloneId}`;
    const panelItemId = panelItemIdPrefix;
    const cloneLabelItem = function () {
        const clonedLabelItemId = `${labelItemIdPrefix}__${nextCloneId++}`;
        if (clonedLabelItemId === labelItemId) {
            return $labelItem;
        }
        return $labelItem.clone().attr('id', clonedLabelItemId);
    };
    $labelItem.attr('id', labelItemId).attr('aria-controls', panelItemIdPrefix);
    $panelItem.attr('id', panelItemId).attr('aria-labelledby', labelItemId);
    return { $labelItem, $labelItemLeaf, $panelItem: $panelItem, $panelItemLeaf: $panelItemLeaf, cloneLabelItem };
}
export default createTabItem;
