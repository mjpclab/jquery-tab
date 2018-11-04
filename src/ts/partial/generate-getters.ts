import $ from "jquery";

function generateGetters(
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const {
		$headerLabelContainerLeaf,
		$footerLabelContainerLeaf,
		$panelContainerLeaf
	} = containers;

	const {tabItemNameAttr, disabledPanelItemClass, hiddenPanelItemClass} = options;

	const getCount = function () {
		return context.itemCount;
	};
	const getCurrentIndex = function () {
		return context.currentIndex;
	};
	const getCurrentName = function () {
		return context.currentName;
	};

	const getName = function (index: number) {
		if (index >= 0 && index < context.itemCount) {
			return $panelContainerLeaf.children().eq(index).attr(tabItemNameAttr);
		}
	};
	const getIndexByName = function (name: string) {
		let tabItemIndex = -1;

		$panelContainerLeaf.children().each(function (index, panel) {
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
			return getIndexByName(position);
		}
		else {
			return -1;
		}
	};
	const parsePosition = function (position: JQueryTab.TabItemPosition) {
		if (typeof position === 'number') {
			return {
				index: position,
				name: getName(position)
			};
		} else if (isFinite(position)) {
			const index = parseInt(position);
			return {
				index,
				name: getName(index)
			}
		}
		else if (position) {
			return {
				index: getIndexByName(position),
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
	const isDisabled = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		if (index >= 0 && index < context.itemCount) {
			return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
		}
	};
	const isEnabled = function (position: JQueryTab.TabItemPosition) {
		return !isDisabled(position);
	};
	const isHidden = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		if (index >= 0 && index < context.itemCount) {
			return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
		}
	};
	const isVisible = function (position: JQueryTab.TabItemPosition) {
		return !isHidden(position);
	};
	const getHeaderLabel = function (position: JQueryTab.TabItemPosition) {
		if ($headerLabelContainerLeaf) {
			const index = positionToIndex(position);
			if (index >= 0 && index < context.itemCount) {
				return $headerLabelContainerLeaf.children().eq(index);
			}
		}
		return $([]);
	};
	const getFooterLabel = function (position: JQueryTab.TabItemPosition) {
		if ($footerLabelContainerLeaf) {
			const index = positionToIndex(position);
			if (index >= 0 && index < context.itemCount) {
				return $footerLabelContainerLeaf.children().eq(index);
			}
		}
		return $([]);
	};
	const getHeaderFooterLabels = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		if (index >= 0 && index < context.itemCount) {
			return getHeaderLabel(index).add(getFooterLabel(index));
		}
		return $([]);
	};
	const getPanel = function (position: JQueryTab.TabItemPosition) {
		const index = positionToIndex(position);
		if (index >= 0 && index < context.itemCount) {
			return $panelContainerLeaf.children().eq(index);
		}
		return $([]);
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
		getCurrentName,
		getName,
		getIndexByName,
		positionToIndex,
		parsePosition,
		isDisabled, isEnabled, isHidden, isVisible,
		getHeaderLabel, getFooterLabel, getHeaderFooterLabels,
		getPanel,
		getCurrentHeaderLabel, getCurrentFooterLabel, getCurrentHeaderFooterLabels,
		getCurrentPanel
	};
}

export default generateGetters;
