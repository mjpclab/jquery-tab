import $ from "jquery";

class Getter {
	private readonly containers: JQueryTab.Containers;
	private readonly context: JQueryTab.Context;
	private readonly options: JQueryTab.ExpandedOptions;

	constructor(
		containers: JQueryTab.Containers,
		context: JQueryTab.Context,
		options: JQueryTab.ExpandedOptions
	) {
		this.containers = containers;
		this.context = context;
		this.options = options;
	}

	getCount() {
		return this.context.itemCount;
	}

	getCurrentIndex() {
		return this.context.currentIndex;
	}

	getCurrentName() {
		return this.context.currentName;
	}

	getName(index: number) {
		const {itemCount} = this.context;
		if (index >= 0 && index < itemCount) {
			const {$panelContainerLeaf} = this.containers;
			const {tabItemNameAttr} = this.options;
			return $panelContainerLeaf.children().eq(index).data(tabItemNameAttr);
		}
	}

	getIndexByName(name: string) {
		let tabItemIndex = -1;

		const {$panelContainerLeaf} = this.containers;
		const {tabItemNameAttr} = this.options;

		$panelContainerLeaf.children().each(function (index, panel) {
			const $panel = $(panel);
			if ($panel.data(tabItemNameAttr) === name) {
				tabItemIndex = index;
				return false;
			}
		});

		return tabItemIndex;
	}

	positionToIndex(position: JQueryTab.TabItemPosition): number {
		if (typeof position === 'number') {
			return position;
		} else if (isFinite(position)) {
			return parseInt(position)
		}
		else if (position !== undefined) {
			return this.getIndexByName(position);
		}
		else {
			return -1;
		}
	}

	normalizePosition(position: JQueryTab.TabItemPosition): JQueryTab.NormalizedTabItemPosition {
		if (typeof position === 'number') {
			return {
				index: position,
				name: this.getName(position)
			};
		} else if (isFinite(position)) {
			const index = parseInt(position);
			return {
				index,
				name: this.getName(index)
			}
		}
		else if (position) {
			return {
				index: this.getIndexByName(position),
				name: position
			}
		}
		else {
			return {
				index: -1,
				name: undefined
			};
		}
	}


	isDisabled(position: JQueryTab.TabItemPosition) {
		const {itemCount} = this.context;
		const index = this.positionToIndex(position);

		if (index >= 0 && index < itemCount) {
			const {$panelContainerLeaf} = this.containers;
			const {disabledPanelItemClass} = this.options;
			return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
		}
	}

	isEnabled(position: JQueryTab.TabItemPosition) {
		return !this.isDisabled(position);
	}

	isHidden(position: JQueryTab.TabItemPosition) {
		const {itemCount} = this.context;
		const index = this.positionToIndex(position);

		if (index >= 0 && index < itemCount) {
			const {$panelContainerLeaf} = this.containers;
			const {hiddenPanelItemClass} = this.options;
			return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
		}
	}

	isVisible(position: JQueryTab.TabItemPosition) {
		return !this.isHidden(position);
	}

	getHeaderLabel(position: JQueryTab.TabItemPosition) {
		const {$headerLabelContainerLeaf} = this.containers;
		if ($headerLabelContainerLeaf) {
			const {itemCount} = this.context;
			const index = this.positionToIndex(position);
			if (index >= 0 && index < itemCount) {
				return $headerLabelContainerLeaf.children().eq(index);
			}
		}
		return $([]);
	}

	getFooterLabel(position: JQueryTab.TabItemPosition) {
		const {$footerLabelContainerLeaf} = this.containers;
		if ($footerLabelContainerLeaf) {
			const {itemCount} = this.context;
			const index = this.positionToIndex(position);
			if (index >= 0 && index < itemCount) {
				return $footerLabelContainerLeaf.children().eq(index);
			}
		}
		return $([]);
	}

	getHeaderFooterLabels(position: JQueryTab.TabItemPosition) {
		const {itemCount} = this.context;
		const index = this.positionToIndex(position);
		if (index >= 0 && index < itemCount) {
			return this.getHeaderLabel(index).add(this.getFooterLabel(index));
		}
		return $([]);
	}

	getPanel(position: JQueryTab.TabItemPosition) {
		const {itemCount} = this.context;
		const index = this.positionToIndex(position);
		if (index >= 0 && index < itemCount) {
			const {$panelContainerLeaf} = this.containers;
			return $panelContainerLeaf.children().eq(index);
		}
		return $([]);
	}

	getCurrentHeaderLabel() {
		return this.getHeaderLabel(this.context.currentIndex);
	}

	getCurrentFooterLabel() {
		return this.getFooterLabel(this.context.currentIndex);
	}

	getCurrentHeaderFooterLabels() {
		return this.getHeaderFooterLabels(this.context.currentIndex);
	}

	getCurrentPanel() {
		return this.getPanel(this.context.currentIndex);
	}

}

export default Getter;
