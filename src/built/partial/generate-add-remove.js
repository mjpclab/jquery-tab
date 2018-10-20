import createTabItem from "./create-tab-item";
import $ from "jquery";
function generateAddRemove(fnGetHeaderFooterLabels, fnGetPanel, fnSaveIndex, fnSwitchTo, containers, context, options) {
    const insertTabItemWithoutSwitch = function ($labelContent, $panelContent, index) {
        const { $headerLabelContainerLeaf, $footerLabelContainerLeaf, $panelContainerLeaf } = containers;
        const { $panelItem, cloneLabelItem } = createTabItem($labelContent, $panelContent, context, options);
        if (context.currentIndex > -1 && typeof options.fnHidePanelItem === 'function') {
            options.fnHidePanelItem.call($panelItem, $panelItem);
        }
        if (index < 0) {
            index = 0;
        }
        if (context.itemCount > 0 && index < context.itemCount) {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.children(':eq(' + index + ')').before(cloneLabelItem());
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.children(':eq(' + index + ')').before(cloneLabelItem());
            }
            $panelContainerLeaf.children(':eq(' + index + ')').before($panelItem);
            if (index <= context.currentIndex) {
                fnSaveIndex(++context.currentIndex);
            }
        }
        else {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.append(cloneLabelItem());
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.append(cloneLabelItem());
            }
            $panelContainerLeaf.append($panelItem);
        }
        context.itemCount++;
    };
    const insertTabItem = function (title, content, index) {
        insertTabItemWithoutSwitch(title, content, index);
        if (context.currentIndex === -1 && context.itemCount) {
            fnSwitchTo(0);
        }
    };
    const addTabItemWithoutSwitch = function (title, content) {
        insertTabItemWithoutSwitch(title, content, context.itemCount);
    };
    const addTabItem = function (title, content) {
        addTabItemWithoutSwitch(title, content);
        if (context.currentIndex === -1 && context.itemCount) {
            fnSwitchTo(0);
        }
    };
    const insertWithoutSwitch = function (sourceRegion, index) {
        const { titleSelector, fnGetTitleContent, keepTitleVisible } = options;
        const $sourceRegion = $(sourceRegion);
        let inserted = 0;
        while (true) {
            const $title = $sourceRegion.find(titleSelector).first();
            if ($title.length === 0) {
                break;
            }
            if (!keepTitleVisible) {
                $title.hide();
            }
            const $rest = $title.nextUntil(titleSelector);
            const $labelContent = fnGetTitleContent.call($title, $title);
            const $panelContent = $([]).add($title).add($rest);
            insertTabItemWithoutSwitch($labelContent, $panelContent, index + inserted);
            inserted++;
        }
    };
    const insert = function (sourceRegion, index) {
        insertWithoutSwitch(sourceRegion, index);
        if (context.currentIndex === -1 && context.itemCount) {
            fnSwitchTo(0);
        }
    };
    const addWithoutSwitch = function (sourceRegion) {
        insertWithoutSwitch(sourceRegion, context.itemCount);
    };
    const add = function (sourceRegion) {
        addWithoutSwitch(sourceRegion);
        if (context.currentIndex === -1 && context.itemCount) {
            fnSwitchTo(0);
        }
    };
    const remove = function (index) {
        if (index === undefined || !isFinite(index) || index < 0 || index >= context.itemCount) {
            return;
        }
        const $labelItems = fnGetHeaderFooterLabels(index);
        const $panelItem = fnGetPanel(index);
        $labelItems.remove();
        $panelItem.remove();
        context.itemCount--;
        if (index < context.currentIndex) {
            fnSaveIndex(--context.currentIndex);
        }
        else if (index === context.currentIndex) {
            if (context.currentIndex === context.itemCount) {
                fnSwitchTo(context.currentIndex - 1);
            }
            else {
                fnSwitchTo(context.currentIndex);
            }
        }
        return $panelItem;
    };
    return {
        insertTabItemWithoutSwitch,
        insertTabItem,
        addTabItemWithoutSwitch,
        addTabItem,
        insert,
        insertWithoutSwitch,
        add,
        addWithoutSwitch,
        remove
    };
}
export default generateAddRemove;
