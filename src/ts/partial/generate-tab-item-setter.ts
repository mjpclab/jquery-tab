function generateTabItemSetter(
	fnPositionToIndex: JQueryTab.fnPositionToIndex,
	fnGetHeaderFooterLabels: JQueryTab.fnGetLabel,
	fnGetPanel: JQueryTab.fnGetPanel,
	options: JQueryTab.ExpandedOptions
) {
	const {
		tabItemNameAttr,
		disabledLabelItemClass,
		disabledPanelItemClass,
		hiddenLabelItemClass,
		hiddenPanelItemClass
	} = options;

	const setTabItemName = function (name: string, position: JQueryTab.TabItemPosition) {
		fnGetHeaderFooterLabels(position).attr(tabItemNameAttr, name);
		fnGetPanel(position).attr(tabItemNameAttr, name);
	};

	const setTabItemDisabled = function (disabled: boolean, position: JQueryTab.TabItemPosition) {
		fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
		fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
	};

	const setTabItemHidden = function (hidden: boolean, position: JQueryTab.TabItemPosition) {
		fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
		fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
	};

	return {setTabItemName, setTabItemDisabled, setTabItemHidden};
}

export default generateTabItemSetter;