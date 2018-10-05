import $ from "jquery";
import defaultOptions from "../utility/default-options";
import createTabContainer from './create-tab-container';
import createLabelItem from './create-label-item';
import createPageItem from './create-page-item';
import updateActiveClass from './update-active-class';
const RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
function generateTab($region, customOptions) {
    const dataOptions = $region.data();
    const options = { ...defaultOptions, ...dataOptions, ...customOptions };
    let pageCount = 0;
    let currentIndex = -1;
    const { $tabContainer, $headerLabelContainerLeaf, $pageContainerLeaf, $footerLabelContainerLeaf } = createTabContainer(options);
    //getters
    const getCount = function () {
        return pageCount;
    };
    const getCurrentIndex = function () {
        return currentIndex;
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
    const getPage = function (index) {
        if (!isFinite(index)) {
            throw new Error('invalid index');
        }
        return $pageContainerLeaf.children(':eq(' + index + ')');
    };
    //utilities
    let $statusFields = $region.find(options.statusFieldSelector);
    if (!$statusFields.length) {
        $statusFields = $(options.statusFieldSelector);
    }
    let RE_STATUS_HASH;
    let RE_STATUS_HASH_DIGITS;
    if (options.statusHashTemplate) {
        RE_STATUS_HASH = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '-?\\d+');
        RE_STATUS_HASH_DIGITS = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '(-?\\d+)');
    }
    const saveIndex = function saveIndex(index) {
        $statusFields.val(index);
        if (options.statusHashTemplate) {
            let hash = location.hash;
            const statusHash = options.statusHashTemplate + index;
            if (hash.indexOf(options.statusHashTemplate) > -1) {
                hash = hash.replace(RE_STATUS_HASH, statusHash);
            }
            else {
                if (hash.length) {
                    hash += options.statusHashSeparator;
                }
                hash += statusHash;
            }
            location.hash = hash;
        }
        if (options.fnSaveIndex) {
            options.fnSaveIndex.call($tabContainer, index);
        }
    };
    const loadIndex = function () {
        let index = -1;
        if (pageCount === 0) {
            return index;
        }
        $statusFields.each(function () {
            const status = $(this).val();
            if (typeof status === 'number') {
                index = status;
                return false;
            }
            else if (status.length) {
                const intStatus = parseInt(status);
                if (isFinite(intStatus) && !isNaN(intStatus)) {
                    index = parseInt(status);
                    return false;
                }
            }
        });
        if ((index === -1 || isNaN(index)) && options.statusHashTemplate) {
            const searchResult = location.hash.match(RE_STATUS_HASH_DIGITS);
            if (searchResult && searchResult[1]) {
                index = parseInt(searchResult[1]);
            }
        }
        if ((index === -1 || isNaN(index)) && options.fnLoadIndex) {
            index = parseInt(options.fnLoadIndex.call($tabContainer));
        }
        if (index === -1 || isNaN(index)) {
            index = Number(options.activeIndex) || 0;
        }
        if (index < 0) {
            index = 0;
        }
        else if (index >= pageCount) {
            index = pageCount - 1;
        }
        return index;
    };
    //methods
    const switchTo = function (newIndex, shouldSaveIndex = true) {
        const oldIndex = currentIndex;
        //before switching callback
        if (typeof (options.onBeforeSwitch) === 'function') {
            options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
        }
        //labels & pages
        const $newLabel = getHeaderFooterLabels(newIndex);
        const $newPage = getPage(newIndex);
        const $otherPages = $newPage.siblings();
        updateActiveClass($newLabel, $newPage, options);
        //function to hide pages
        if (typeof options.fnHidePageItem === 'function') {
            options.fnHidePageItem.call($otherPages, $otherPages);
        }
        //function to show page
        if (typeof options.fnShowPageItem === 'function') {
            options.fnShowPageItem.call($newPage, $newPage);
        }
        //keep new index for restoring
        shouldSaveIndex && saveIndex(newIndex);
        //finalize
        currentIndex = newIndex;
        //after switching callback
        if (typeof (options.onAfterSwitch) === 'function') {
            options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
        }
    };
    const _insertTabItem = function (title, content, index) {
        const { $labelItem } = createLabelItem(title, options);
        const { $pageItem } = createPageItem(content, options);
        if (currentIndex > -1 && typeof options.fnHidePageItem === 'function') {
            options.fnHidePageItem.call($pageItem, $pageItem);
        }
        if (index < 0) {
            index = 0;
        }
        if (pageCount > 0 && index < pageCount) {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
            }
            $pageContainerLeaf.children(':eq(' + index + ')').before($pageItem);
            if (index <= currentIndex) {
                saveIndex(++currentIndex);
            }
        }
        else {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.append($labelItem.clone());
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.append($labelItem.clone());
            }
            $pageContainerLeaf.append($pageItem);
        }
        pageCount++;
    };
    const insertTabItem = function (title, content, index) {
        _insertTabItem(title, content, index);
        if (currentIndex === -1 && pageCount) {
            switchTo(0);
        }
    };
    const addTabItem = function (title, content) {
        _insertTabItem(title, content, pageCount);
        if (currentIndex === -1 && pageCount) {
            switchTo(0);
        }
    };
    const _insert = function (sourceRegion, index) {
        const $sourceRegion = $(sourceRegion);
        let inserted = 0;
        while (true) {
            const $title = $sourceRegion.find(options.titleSelector).first();
            if ($title.length === 0) {
                break;
            }
            if (!options.keepTitleVisible) {
                $title.hide();
            }
            const title = options.fnGetTitleContent.call($title, $title);
            const content = $title.add($title.nextUntil(options.titleSelector));
            _insertTabItem(title, content, index + inserted);
            inserted++;
        }
    };
    const insert = function (sourceRegion, index) {
        _insert(sourceRegion, index);
        if (currentIndex === -1 && pageCount) {
            switchTo(0);
        }
    };
    const _add = function (sourceRegion) {
        _insert(sourceRegion, pageCount);
    };
    const add = function (sourceRegion) {
        _add(sourceRegion);
        if (currentIndex === -1 && pageCount) {
            switchTo(0);
        }
    };
    const remove = function (index) {
        if (index === undefined || !isFinite(index) || index < 0 || index >= pageCount) {
            return;
        }
        const $labelItems = getHeaderFooterLabels(index);
        const $pageItem = getPage(index);
        $labelItems.remove();
        $pageItem.remove();
        pageCount--;
        if (index < currentIndex) {
            saveIndex(--currentIndex);
        }
        else if (index === currentIndex) {
            if (currentIndex === pageCount) {
                switchTo(currentIndex - 1);
            }
            else {
                switchTo(currentIndex);
            }
        }
        return $pageItem;
    };
    _add($region);
    //replace original content
    if (!pageCount && !options.createEmptyTab) {
        return;
    }
    $region.append($tabContainer);
    //check if param:fixed height
    const updateFixedHeight = function () {
        if (options.fixedHeight) {
            let maxHeight = 0;
            $pageContainerLeaf.children().each(function () {
                const $pageItem = $(this);
                const pageHeight = $pageItem[0].scrollHeight;
                if (pageHeight > maxHeight) {
                    maxHeight = pageHeight;
                }
            }).height(maxHeight);
        }
    };
    updateFixedHeight();
    //init show active page
    switchTo(loadIndex(), false);
    //handle delay trigger event
    let delayTriggerHandler;
    const startDelayTrigger = function (labelIndex) {
        delayTriggerHandler = setTimeout(function () {
            switchTo(labelIndex);
        }, options.delayTriggerLatency);
    };
    const cancelDelayTrigger = function () {
        if (delayTriggerHandler) {
            clearTimeout(delayTriggerHandler);
            delayTriggerHandler = 0;
        }
    };
    const labelItemDelayClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        cancelDelayTrigger();
        const $activeLabel = $(e.currentTarget);
        const activeLabelIndex = $activeLabel.index();
        if (activeLabelIndex === currentIndex) {
            return;
        }
        startDelayTrigger(activeLabelIndex);
    };
    const labelItemCancelDelayClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        const $activeLabel = $(e.currentTarget);
        const activeLabelIndex = $activeLabel.index();
        if (activeLabelIndex === currentIndex) {
            return;
        }
        cancelDelayTrigger();
    };
    if (options.delayTriggerEvents) {
        if ($headerLabelContainerLeaf) {
            $headerLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
        }
        if ($footerLabelContainerLeaf) {
            $footerLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
        }
        if (options.delayTriggerCancelEvents) {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
            }
        }
    }
    //handle trigger event
    const labelItemClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        cancelDelayTrigger();
        const $activeLabel = $(e.currentTarget);
        const activeLabelIndex = $activeLabel.index();
        if (activeLabelIndex === currentIndex) {
            return;
        }
        switchTo(activeLabelIndex);
    };
    if (options.triggerEvents) {
        if ($headerLabelContainerLeaf) {
            $headerLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
        }
        if ($footerLabelContainerLeaf) {
            $footerLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
        }
    }
    //controller
    const controller = {
        getCount,
        getCurrentIndex,
        getHeaderLabel,
        getFooterLabel,
        getHeaderFooterLabels,
        getPage,
        updateFixedHeight,
        switchTo,
        addTabItem,
        insertTabItem,
        add,
        insert,
        remove
    };
    $region.data('tab-controller', controller);
    $tabContainer.data('tab-controller', controller);
}
export default generateTab;
