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

	const setDisabled = function (position: JQueryTab.TabItemPosition, disabled = true) {
		fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
		fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
	};

	const setEnabled = function (position: JQueryTab.TabItemPosition, enabled = true) {
		setDisabled(position, !enabled);
	};

	const setHidden = function (position: JQueryTab.TabItemPosition, hidden = true) {
		fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
		fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
	};

	const setVisible = function (position: JQueryTab.TabItemPosition, visible = true) {
		setHidden(position, !visible);
	};

	return {setName, setDisabled, setEnabled, setHidden, setVisible};
}

export default generateTabItemSetter;
