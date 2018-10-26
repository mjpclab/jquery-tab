import createLabelItem from "./create-label-item";
import createPanelItem from "./create-panel-item";

function createTabItem(
	tabItem: JQueryTab.TabItem,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const {name, disabled, hidden} = tabItem;

	const {$labelItem, $labelItemLeaf} = createLabelItem(tabItem, options);
	const {$panelItem, $panelItemLeaf} = createPanelItem(tabItem, options);
	if (name) {
		$labelItem.attr('data-tab-item-name', name);
		$panelItem.attr('data-tab-item-name', name);
	}
	if (disabled) {
		$labelItem.addClass(options.disabledLabelItemClass);
		$panelItem.addClass(options.disabledPanelItemClass);
	}
	if (hidden) {
		$labelItem.addClass(options.hiddenLabelItemClass);
		$panelItem.addClass(options.hiddenPanelItemClass);
	}

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