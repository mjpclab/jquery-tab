import $ from "jquery";
function generateGetters(containers, context) {
    const { $headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainer, $panelContainerLeaf } = containers;
    const getCount = function () {
        return context.itemCount;
    };
    const getCurrentIndex = function () {
        return context.currentIndex;
    };
    const getName = function (index) {
        return $panelContainerLeaf.children().eq(index).attr('data-tab-item-name');
    };
    const getIndexByName = function (name) {
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
    const positionToIndex = function (position) {
        if (typeof position === 'number') {
            return position;
        }
        else if (isFinite(position)) {
            return parseInt(position);
        }
        else if (position !== undefined) {
            return getIndexByName(position);
        }
        else {
            return -1;
        }
    };
    const parsePosition = function (position) {
        if (typeof position === 'number') {
            return {
                index: position,
                name: getName(position)
            };
        }
        else if (isFinite(position)) {
            const index = parseInt(position);
            return {
                index,
                name: getName(index)
            };
        }
        else if (position) {
            return {
                index: getIndexByName(position),
                name: position
            };
        }
        else {
            return {
                index: -1,
                name: undefined
            };
        }
    };
    const getHeaderLabel = function (position) {
        if ($headerLabelContainerLeaf) {
            const index = positionToIndex(position);
            return $headerLabelContainerLeaf.children().eq(index);
        }
        return $([]);
    };
    const getFooterLabel = function (position) {
        if ($footerLabelContainerLeaf) {
            const index = positionToIndex(position);
            return $footerLabelContainerLeaf.children().eq(index);
        }
        return $([]);
    };
    const getHeaderFooterLabels = function (position) {
        const index = positionToIndex(position);
        return getHeaderLabel(index).add(getFooterLabel(index));
    };
    const getPanel = function (position) {
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
        getIndexByName,
        positionToIndex,
        parsePosition,
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
