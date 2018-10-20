import createLabelItem from "./create-label-item";
import createPanelItem from "./create-panel-item";

function createTabItem(
	$labelContent: JQueryTab.JQueriable,
	$panelContent: JQueryTab.JQueriable,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const {$labelItem, $labelItemLeaf} = createLabelItem($labelContent, options);
	const {$panelItem, $panelItemLeaf} = createPanelItem($panelContent, options);

	const {containerId, nextItemId: itemId} = context;
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


	return {$labelItem, $labelItemLeaf, $panelItem: $panelItem, $panelItemLeaf: $panelItemLeaf, cloneLabelItem};
}

export default createTabItem;