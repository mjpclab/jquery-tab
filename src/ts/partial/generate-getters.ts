import $ from "jquery";

function generateGetters(
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const {
		$headerLabelContainerLeaf,
		$footerLabelContainerLeaf,
		$panelContainer,
		$panelContainerLeaf
	} = containers;

	const {tabItemNameAttr, disabledPanelItemClass, hiddenPanelItemClass} = options;

	const getCount = function () {
		return context.itemCount;
	};
	const getCurrentIndex = function () {
		return context.currentIndex;
	};

	const getTabItemName = function (index: number) {
		return $panelContainerLeaf.children().eq(index).attr(tabItemNameAttr);
	};
	const getTabItemIndexByName = function (name: string) {
		let tabItemIndex = -1;

		$panelContainer.children().each(function (index, panel) {
			const $panel = $(panel);
			if ($panel.attr(tabItemNameAttr) === name) {
				tabItemIndex = $panel.index();
				return false;
			}
		});

		return tabItemIndex;
	};
	const positionToIndex = function (position: JQueryTab.TabItemPosition): number {
		if (typeof position === 'number') {
			return position;
		} else if (isFinite(position)) {
			return parseInt(position)
		}
		else if (position !== undefined) {
			return getTabItemIndexByName(position);
		}
		else {
			return -1;
		}
	};
	const parsePosition = function (position: JQueryTab.TabItemPosition) {
		if (typeof position === 'number') {
			return {
				index: position,
				name: getTabItemName(position)
			};
		} else if (isFinite(position)) {
			const index = parseInt(position);
			return {
				index,
				name: getTabItemName(index)
			}
		}
		else if (position) {
			return {
				index: getTabItemIndexByName(position),
				name: position
			}
		}
		else {
			return {
				index: -1,
				name: undefined
			};
		}
	};
	const isTabItemDisabled = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		if (index > -1) {
			return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
		}
	};
	const isTabItemHidden = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		if (index > -1) {
			return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
		}
	};
	const getHeaderLabel = function (position: JQueryTab.TabItemPosition) {
		if ($headerLabelContainerLeaf) {
			const index = positionToIndex(position);
			return $headerLabelContainerLeaf.children().eq(index);
		}
		return $([]);
	};
	const getFooterLabel = function (position: JQueryTab.TabItemPosition) {
		if ($footerLabelContainerLeaf) {
			const index = positionToIndex(position);
			return $footerLabelContainerLeaf.children().eq(index);
		}
		return $([]);
	};
	const getHeaderFooterLabels = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		return getHeaderLabel(index).add(getFooterLabel(index));
	};
	const getPanel = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		return $panelContainerLeaf.children().eq(index);
	};

	const getCurrentHeaderLabel = function () {
		return getHeaderLabel(context.currentIndex);
	};

	const getCurrentFooterLabel = function () {
		return getFooterLabel(context.currentIndex);
	};

	const getCurrentHeaderFooterLabels = function () {
		return getHeaderFooterLabels(context.currentIndex);
	};

	const getCurrentPanel = function () {
		return getPanel(context.currentIndex);
	};

	return {
		getCount,
		getCurrentIndex,
		getTabItemName,
		getTabItemIndexByName,
		positionToIndex,
		parsePosition,
		isTabItemDisabled,
		isTabItemHidden,
		getHeaderLabel,
		getFooterLabel,
		getHeaderFooterLabels,
		getPanel,
		getCurrentHeaderLabel,
		getCurrentFooterLabel,
		getCurrentHeaderFooterLabels,
		getCurrentPanel
	};
}

export default generateGetters;