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

	const setName = function (position: JQueryTab.TabItemPosition, name: string) {
		fnGetHeaderFooterLabels(position).attr(tabItemNameAttr, name);
		fnGetPanel(position).attr(tabItemNameAttr, name);
	};

	const setDisabled = function (position: JQueryTab.TabItemPosition, disabled: boolean) {
		fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
		fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
	};

	const setHidden = function (position: JQueryTab.TabItemPosition, hidden: boolean) {
		fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
		fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
	};

	return {setName, setDisabled, setHidden};
}

export default generateTabItemSetter;