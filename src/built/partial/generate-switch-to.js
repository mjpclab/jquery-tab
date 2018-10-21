import updateActiveState from "./update-active-state";
function generateSwitchTo(fnParsePosition, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, containers, context, options) {
    const switchToWithoutSave = function (newPosition) {
        const { index: newIndex, name: newName } = fnParsePosition(newPosition);
        if (newIndex < 0 || newIndex >= context.itemCount) {
            return;
        }
        const { currentIndex: oldIndex, currentName: oldName } = context;
        const { $tabContainer } = containers;
        //before switching callback
        if (typeof (options.onBeforeSwitch) === 'function') {
            options.onBeforeSwitch.call($tabContainer, { index: oldIndex, name: oldName }, { index: newIndex, name: newName });
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
        context.currentName = newName;
        //after switching callback
        if (typeof (options.onAfterSwitch) === 'function') {
            options.onAfterSwitch.call($tabContainer, { index: oldIndex, name: oldName }, { index: newIndex, name: newName });
        }
        return { index: newIndex, name: newName };
    };
    const switchTo = function (newPosition) {
        const result = switchToWithoutSave(newPosition);
        if (result) {
            const { index, name } = result;
            fnSavePosition(name || index);
        }
    };
    return { switchToWithoutSave, switchTo };
}
export default generateSwitchTo;
