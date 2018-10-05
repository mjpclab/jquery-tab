import createLabelItem from "./create-label-item";
import createPageItem from "./create-page-item";
function createTabItem(title, content, context, options) {
    const { $labelItem, $labelItemLeaf } = createLabelItem(title, options);
    const { $pageItem, $pageItemLeaf } = createPageItem(content, options);
    const { containerId, nextItemId: itemId } = context;
    context.nextItemId++;
    let nextCloneId = 0;
    const labelItemIdPrefix = `__jquery-tab-label__${containerId}__${itemId}`;
    const pageItemIdPrefix = `__jquery-tab-page__${containerId}__${itemId}`;
    const labelItemId = `${labelItemIdPrefix}__${nextCloneId}`;
    const pageItemId = pageItemIdPrefix;
    const cloneLabelItem = function () {
        const clonedLabelItemId = `${labelItemIdPrefix}__${nextCloneId++}`;
        if (clonedLabelItemId === labelItemId) {
            return $labelItem;
        }
        return $labelItem.clone().attr('id', clonedLabelItemId);
    };
    $labelItem.attr('id', labelItemId).attr('aria-controls', pageItemIdPrefix);
    $pageItem.attr('id', pageItemId).attr('aria-labelledby', labelItemId);
    return { $labelItem, $labelItemLeaf, $pageItem, $pageItemLeaf, cloneLabelItem };
}
export default createTabItem;
