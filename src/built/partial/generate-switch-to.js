import updateActiveState from "./update-active-state";
function generateSwitchTo(fnGetHeaderFooterLabels, fnGetPanel, fnSaveIndex, containers, context, options) {
    const switchToWithoutSave = function (newIndex) {
        const { $tabContainer } = containers;
        const oldIndex = context.currentIndex;
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
    const switchTo = function (newIndex) {
        switchToWithoutSave(newIndex);
        fnSaveIndex(newIndex);
    };
    return { switchToWithoutSave, switchTo };
}
export default generateSwitchTo;
