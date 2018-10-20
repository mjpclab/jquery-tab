import $ from "jquery";

function generateGetters(
	containers: JQueryTab.Containers,
	context: JQueryTab.Context
) {
	const {$headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainer, $panelContainerLeaf} = containers;

	const getCount = function () {
		return context.itemCount;
	};
	const getCurrentIndex = function () {
		return context.currentIndex;
	};
	const getIndexByName = function (name: string) {
		let tabItemIndex = -1;

		$panelContainer.children().each(function (index, panel) {
			const $panel = $(panel);
			if ($panel.attr('data-tab-item-name') === name) {
				tabItemIndex = $panel.index();
				return false;
			}
		});

		return tabItemIndex;
	};
	const PositionToIndex = function (position: JQueryTab.TabItemPosition): number {
		if (typeof position === 'number') {
			return position;
		} else if (isFinite(position)) {
			return parseInt(position)
		}
		else if (position) {
			return getIndexByName(position);
		}
		else {
			return -1;
		}
	};
	const getHeaderLabel = function (position: JQueryTab.TabItemPosition) {
		if ($headerLabelContainerLeaf) {
			const index = PositionToIndex(position);
			return $headerLabelContainerLeaf.children(':eq(' + index + ')');
		}
		return $([]);
	};
	const getFooterLabel = function (position: JQueryTab.TabItemPosition) {
		if ($footerLabelContainerLeaf) {
			const index = PositionToIndex(position);
			return $footerLabelContainerLeaf.children(':eq(' + index + ')');
		}
		return $([]);
	};
	const getHeaderFooterLabels = function (position: JQueryTab.TabItemPosition) {
		const index = PositionToIndex(position);
		return getHeaderLabel(index).add(getFooterLabel(index));
	};
	const getPanel = function (position: JQueryTab.TabItemPosition) {
		const index = PositionToIndex(position);
		return $panelContainerLeaf.children(':eq(' + index + ')');
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

	const getName = function (index: number) {
		return getPanel(index).attr('data-tab-item-name');
	};


	return {
		getCount,
		getCurrentIndex,
		getIndexByName,
		PositionToIndex,
		getHeaderLabel,
		getFooterLabel,
		getHeaderFooterLabels,
		getPanel,
		getCurrentHeaderLabel,
		getCurrentFooterLabel,
		getCurrentHeaderFooterLabels,
		getCurrentPanel,
		getName
	};
}

export default generateGetters;