import $ from 'jquery';
import Getter from './getter';

class DomUpdater {
	private readonly getter: Getter;

	private readonly containers: JQueryTab.Containers;
	private readonly context: JQueryTab.Context;
	private readonly options: JQueryTab.ExpandedOptions;

	constructor(
		getter: Getter,
		containers: JQueryTab.Containers,
		context: JQueryTab.Context,
		options: JQueryTab.ExpandedOptions
	) {
		this.getter = getter;

		this.containers = containers;
		this.context = context;
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
		const {options} = this;
		if (!options.fixedHeight) {
			return;
		}

		const {currentIndex} = this.context;
		let maxHeight = 0;

		this.containers.$panelContainerLeaf.children().each(function (index, panelItem) {
			const $panelItem = $(panelItem);
			if (index !== currentIndex) {
				$panelItem.addClass(options.evaluatingPanelItemClass);
			}
			const panelHeight = panelItem.scrollHeight;
			if (panelHeight > maxHeight) {
				maxHeight = panelHeight;
			}
			if (index !== currentIndex) {
				$panelItem.removeClass(options.evaluatingPanelItemClass);
			}
		}).height(maxHeight);
	}
}

export default DomUpdater;
