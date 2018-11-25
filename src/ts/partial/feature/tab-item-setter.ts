import Getter from './getter';

class TabItemSetter {
	private readonly getter: Getter;
	private readonly options: JQueryTab.ExpandedOptions;

	constructor(
		getter: Getter,
		options: JQueryTab.ExpandedOptions
	) {
		this.getter = getter;
		this.options = options;
	}

	setName(position: JQueryTab.TabItemPosition, name: string) {
		const {getter} = this;
		const {tabItemNameAttr} = this.options;

		getter.getHeaderFooterLabels(position).data(tabItemNameAttr, name);
		getter.getPanel(position).data(tabItemNameAttr, name);
	}

	setDisabled(position: JQueryTab.TabItemPosition, disabled: boolean) {
		const {getter} = this;
		const {disabledLabelItemClass, disabledPanelItemClass} = this.options;

		getter.getHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
		getter.getPanel(position).toggleClass(disabledPanelItemClass, disabled);
	}

	setEnabled(position: JQueryTab.TabItemPosition, enabled: boolean) {
		this.setDisabled(position, !enabled);
	}

	setHidden(position: JQueryTab.TabItemPosition, hidden: boolean) {
		const {getter} = this;
		const {hiddenLabelItemClass, hiddenPanelItemClass} = this.options;

		getter.getHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
		getter.getPanel(position).toggleClass(hiddenPanelItemClass, hidden);
	}

	setVisible(position: JQueryTab.TabItemPosition, visible: boolean) {
		this.setHidden(position, !visible);
	}

	setFocus(position: JQueryTab.TabItemPosition, $labelContainerLeaf: HTMLElement | JQuery<HTMLElement>) {
		const {getter} = this;
		getter.getLabel(position, $($labelContainerLeaf)).focus();
	}
}

export default TabItemSetter;
