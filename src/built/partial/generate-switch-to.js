import updateActiveState from "./update-active-state";
function generateSwitchTo(fnTabItemPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, containers, context, options) {
    const switchToWithoutSave = function (newPosition) {
        const newIndex = fnTabItemPositionToIndex(newPosition);
        if (newIndex < 0 || newIndex >= context.itemCount) {
            return;
        }
        const oldIndex = context.currentIndex;
        const { $tabContainer } = containers;
        //before switching callback
        if (typeof (options.onBeforeSwitch) === 'function') {
            options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
        }
        //labels & panels
        const $newLabel = fnGetHeaderFooterLabels(newIndex);
        const $newPanel = fnGetPanel(newIndex);
        const $otherPanels = $newPanel.siblings();
        updateActiveState($newLabel, $newPanel, options);
        //function to hide panels
        if (typeof options.fnHidePanelItem === 'function') {
            options.fnHidePanelItem.call($otherPanels, $otherPanels);
        }
        //function to show panel
        if (typeof options.fnShowPanelItem === 'function') {
            options.fnShowPanelItem.call($newPanel, $newPanel);
        }
        //finalize
        context.currentIndex = newIndex;
        //after switching callback
        if (typeof (options.onAfterSwitch) === 'function') {
            options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
        }
    };
    const switchTo = function (newPosition) {
        switchToWithoutSave(newPosition);
        fnSavePosition(newPosition);
    };
    return { switchToWithoutSave, switchTo };
}
export default generateSwitchTo;
