import $ from "jquery";

function generateGetters(
	containers: JQueryTab.Containers,
	context: JQueryTab.Context
) {
	const {$headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainerLeaf} = containers;

	const getCount = function () {
		return context.itemCount;
	};
	const getCurrentIndex = function () {
		return context.currentIndex;
	};
	const getLabel = function ($container: JQuery, index: number) {
		if (!isFinite(index)) {
			throw new Error('invalid index');
		}
		return $container.children(':eq(' + index + ')');
	};
	const getHeaderLabel = function (index: number) {
		if ($headerLabelContainerLeaf) {
			return getLabel($headerLabelContainerLeaf, index);
		}
		return $([]);
	};
	const getFooterLabel = function (index: number) {
		if ($footerLabelContainerLeaf) {
			return getLabel($footerLabelContainerLeaf, index);
		}
		return $([]);
	};
	const getHeaderFooterLabels = function (index: number) {
		return getHeaderLabel(index).add(getFooterLabel(index));
	};
	const getPanel = function (index: number) {
		if (!isFinite(index)) {
			throw new Error('invalid index');
		}
		return $panelContainerLeaf.children(':eq(' + index + ')');
	};

	return {
		getCount,
		getCurrentIndex,
		getLabel,
		getHeaderLabel,
		getFooterLabel,
		getHeaderFooterLabels,
		getPanel
	};
}

export default generateGetters;