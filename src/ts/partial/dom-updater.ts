import Getter from "./getter";

class DomUpdater {
	private readonly getter: Getter;

	private readonly containers: JQueryTab.Containers;
	private readonly options: JQueryTab.ExpandedOptions;

	constructor(
		getter: Getter,
		containers: JQueryTab.Containers,
		options: JQueryTab.ExpandedOptions
	) {
		this.getter = getter;

		this.containers = containers;
		this.options = options;
	}

	updateActiveState(activeIndex: number) {
		const {getter} = this;
		const {activeLabelItemClass, inactiveLabelItemClass, activePanelItemClass, inactivePanelItemClass} = this.options;

		const $activeLabelItem = getter.getHeaderFooterLabels(activeIndex);
		const $activePanelItem = getter.getPanel(activeIndex);

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
	}

	updateFixedHeight() {
		if (!this.options.fixedHeight) {
			return;
		}

		let maxHeight = 0;

		this.containers.$panelContainerLeaf.children().each(function (index, panelItem) {
			const panelHeight = panelItem.scrollHeight;
			if (panelHeight > maxHeight) {
				maxHeight = panelHeight;
			}
		}).height(maxHeight);
	}
}

export default DomUpdater;
