import $ from "jquery";
function generateGetters(containers, context) {
    const { $headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainerLeaf } = containers;
    const getCount = function () {
        return context.itemCount;
    };
    const getCurrentIndex = function () {
        return context.currentIndex;
    };
    const getLabel = function ($container, index) {
        if (!isFinite(index)) {
            throw new Error('invalid index');
        }
        return $container.children(':eq(' + index + ')');
    };
    const getHeaderLabel = function (index) {
        if ($headerLabelContainerLeaf) {
            return getLabel($headerLabelContainerLeaf, index);
        }
        return $([]);
    };
    const getFooterLabel = function (index) {
        if ($footerLabelContainerLeaf) {
            return getLabel($footerLabelContainerLeaf, index);
        }
        return $([]);
    };
    const getHeaderFooterLabels = function (index) {
        return getHeaderLabel(index).add(getFooterLabel(index));
    };
    const getPanel = function (index) {
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
