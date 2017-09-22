"use strict";
/// <reference path='main.d.ts' />
var $ = require("jquery");
function getLeafElement($node) {
    var $result = $node;
    var $deeper;
    while ($deeper = $result.children(), $deeper.length) {
        $result = $deeper;
    }
    return $result.eq(0);
}
$.fn.tab = function (customOptions) {
    var defaultOptions = {
        triggerEvents: 'click',
        delayTriggerEvents: '',
        delayTriggerCancelEvents: '',
        delayTriggerLatency: 200,
        statusFieldSelector: '',
        statusHashTemplate: '',
        statusHashSeparator: '&',
        fixedHeight: false,
        activeIndex: 0,
        fnShowPageItem: function ($pageItem) {
            return $pageItem && $pageItem.show && $pageItem.show();
        },
        fnHidePageItem: function ($pageItem) {
            return $pageItem && $pageItem.hide && $pageItem.hide();
        },
        onBeforeSwitch: undefined,
        onAfterSwitch: undefined,
        titleSelector: 'h1,h2,h3,h4,h5,h6',
        titleContentFilter: function ($title) {
            return $title.text();
        },
        keepTitleVisible: false,
        tabContainerTemplate: '<div></div>',
        tabContainerClass: 'tab-container',
        labelContainerTemplate: '<div></div>',
        labelContainerClass: 'label-container',
        showHeaderLabelContainer: true,
        showFooterLabelContainer: false,
        headerLabelContainerClass: 'header-container',
        footerLabelContainerClass: 'footer-container',
        labelItemTemplate: '<span></span>',
        labelItemClass: 'label-item',
        labelItemActiveClass: 'label-active',
        labelItemInactiveClass: 'label-inactive',
        pageContainerTemplate: '<div></div>',
        pageContainerClass: 'page-container',
        pageItemTemplate: '<div></div>',
        pageItemClass: 'page-item',
        pageItemActiveClass: 'page-active',
        pageItemInactiveClass: 'page-inactive'
    };
    var generateStructure = function ($item) {
        var dataOptions = $item.data();
        var options = $.extend({}, defaultOptions, dataOptions, customOptions);
        var pageCount = 0;
        var currentIndex = -1;
        //container
        var $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);
        //top label
        var $topLabelContainer;
        var $topLabelContainerLeaf;
        if (options.showHeaderLabelContainer) {
            $topLabelContainer = $(options.labelContainerTemplate).addClass(options.labelContainerClass).addClass(options.headerLabelContainerClass);
            $tabContainer.append($topLabelContainer);
            $topLabelContainerLeaf = getLeafElement($topLabelContainer);
        }
        //page
        var $pageContainer = $(options.pageContainerTemplate).addClass(options.pageContainerClass);
        $tabContainer.append($pageContainer);
        var $pageContainerLeaf = getLeafElement($pageContainer);
        //bottom label
        var $bottomLabelContainer;
        var $bottomLabelContainerLeaf;
        if (options.showFooterLabelContainer) {
            $bottomLabelContainer = $(options.labelContainerTemplate).addClass(options.labelContainerClass).addClass(options.footerLabelContainerClass);
            $tabContainer.append($bottomLabelContainer);
            $bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);
        }
        //getters
        var getCount = function () {
            return pageCount;
        };
        var getCurrentIndex = function () {
            return currentIndex;
        };
        var getLabel = function ($container, index) {
            if (!isFinite(index)) {
                throw new Error('invalid index');
            }
            return $container.children(':eq(' + index + ')');
        };
        var getTopLabel = function (index) {
            if ($topLabelContainerLeaf) {
                return getLabel($topLabelContainerLeaf, index);
            }
            return $([]);
        };
        var getBottomLabel = function (index) {
            if ($bottomLabelContainerLeaf) {
                return getLabel($bottomLabelContainerLeaf, index);
            }
            return $([]);
        };
        var getTopBottomLabels = function (index) {
            return getTopLabel(index).add(getBottomLabel(index));
        };
        var getPage = function (index) {
            if (!isFinite(index)) {
                throw new Error('invalid index');
            }
            return $pageContainerLeaf.children(':eq(' + index + ')');
        };
        //add labels & pages
        var newLabelItem = function (title) {
            var $labelItem = $(options.labelItemTemplate).addClass(options.labelItemClass).addClass(options.labelItemInactiveClass);
            var $labelItemLeaf = getLeafElement($labelItem);
            $labelItemLeaf.empty().append(title);
            return $labelItem;
        };
        var newPageItem = function (content) {
            var $pageItem = $(options.pageItemTemplate).addClass(options.pageItemClass).addClass(options.pageItemInactiveClass);
            var $pageItemLeaf = getLeafElement($pageItem);
            $pageItemLeaf.append(content);
            return $pageItem;
        };
        //utilities
        var $statusFields = $item.find(options.statusFieldSelector);
        if (!$statusFields.length) {
            $statusFields = $(options.statusFieldSelector);
        }
        var RE_STATUS_HASH;
        var RE_STATUS_HASH_DIGITS;
        if (options.statusHashTemplate) {
            var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
            RE_STATUS_HASH = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '-?\\d+');
            RE_STATUS_HASH_DIGITS = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '(-?\\d+)');
        }
        var saveIndex = function (index) {
            $statusFields.val(index);
            if (options.statusHashTemplate) {
                var hash = location.hash;
                var statusHash = options.statusHashTemplate + index;
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
        };
        var loadIndex = function () {
            var index = -1;
            if (pageCount === 0) {
                return index;
            }
            $statusFields.each(function () {
                var status = $(this).val();
                if (typeof status === 'number') {
                    index = status;
                    return false;
                }
                else if (status.length) {
                    var intStatus = parseInt(status);
                    if (isFinite(intStatus) && !isNaN(intStatus)) {
                        index = parseInt(status);
                        return false;
                    }
                }
            });
            if ((index === -1 || isNaN(index)) && options.statusHashTemplate) {
                var searchResult = location.hash.match(RE_STATUS_HASH_DIGITS);
                if (searchResult && searchResult[1]) {
                    index = parseInt(searchResult[1]);
                }
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
        var _updateClass = function ($activeLabelItem, $activePageItem) {
            $activeLabelItem.addClass(options.labelItemActiveClass).removeClass(options.labelItemInactiveClass);
            $activeLabelItem.siblings().removeClass(options.labelItemActiveClass).addClass(options.labelItemInactiveClass);
            $activePageItem.addClass(options.pageItemActiveClass).removeClass(options.pageItemInactiveClass);
            $activePageItem.siblings().removeClass(options.pageItemActiveClass).addClass(options.pageItemInactiveClass);
        };
        var switchTo = function (newIndex) {
            var oldIndex = currentIndex;
            //before switching callback
            if (typeof (options.onBeforeSwitch) === 'function') {
                options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
            }
            //labels & pages
            var $newLabel = getTopBottomLabels(newIndex);
            var $newPage = getPage(newIndex);
            var $otherPages = $newPage.siblings();
            _updateClass($newLabel, $newPage);
            //function to hide pages
            if (typeof options.fnHidePageItem === 'function') {
                options.fnHidePageItem.call($otherPages, $otherPages);
            }
            //function to show page
            if (typeof options.fnShowPageItem === 'function') {
                options.fnShowPageItem.call($newPage, $newPage);
            }
            //keep new index for restoring
            saveIndex(newIndex);
            //finalize
            currentIndex = newIndex;
            //after switching callback
            if (typeof (options.onAfterSwitch) === 'function') {
                options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
            }
        };
        var _insertTabPage = function (title, content, index) {
            var $labelItem = newLabelItem(title);
            var $pageItem = newPageItem(content);
            if (currentIndex > -1 && typeof options.fnHidePageItem === 'function') {
                options.fnHidePageItem.call($pageItem, $pageItem);
            }
            if (index < 0) {
                index = 0;
            }
            if (pageCount > 0 && index < pageCount) {
                if ($topLabelContainerLeaf) {
                    $topLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
                }
                if ($bottomLabelContainerLeaf) {
                    $bottomLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());
                }
                $pageContainerLeaf.children(':eq(' + index + ')').before($pageItem);
                if (index <= currentIndex) {
                    saveIndex(++currentIndex);
                }
            }
            else {
                if ($topLabelContainerLeaf) {
                    $topLabelContainerLeaf.append($labelItem.clone());
                }
                if ($bottomLabelContainerLeaf) {
                    $bottomLabelContainerLeaf.append($labelItem.clone());
                }
                $pageContainerLeaf.append($pageItem);
            }
            pageCount++;
        };
        var insertTabPage = function (title, content, index) {
            _insertTabPage(title, content, index);
            if (currentIndex === -1 && pageCount) {
                switchTo(0);
            }
        };
        var addTabPage = function (title, content) {
            _insertTabPage(title, content, pageCount);
            if (currentIndex === -1 && pageCount) {
                switchTo(0);
            }
        };
        var _insert = function (sourceContainer, index) {
            var $sourceContainer = $(sourceContainer);
            var inserted = 0;
            while (true) {
                var $title = $sourceContainer.find(options.titleSelector).first();
                if ($title.length === 0) {
                    break;
                }
                if (!options.keepTitleVisible) {
                    $title.hide();
                }
                var title = options.titleContentFilter.call($title, $title);
                var content = $title.add($title.nextUntil(options.titleSelector));
                _insertTabPage(title, content, index + inserted);
                inserted++;
            }
        };
        var insert = function (sourceContainer, index) {
            _insert(sourceContainer, index);
            if (currentIndex === -1 && pageCount) {
                switchTo(0);
            }
        };
        var _add = function (sourceContainer) {
            _insert(sourceContainer, pageCount);
        };
        var add = function (sourceContainer) {
            _add(sourceContainer);
            if (currentIndex === -1 && pageCount) {
                switchTo(0);
            }
        };
        var remove = function (index) {
            if (index === undefined || !isFinite(index) || index < 0 || index >= pageCount) {
                return;
            }
            var $labelItems = getTopBottomLabels(index);
            var $pageItem = getPage(index);
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
        _add($item);
        //replace original content
        $item.prepend($tabContainer);
        //check if param:fixed height
        var updateFixedHeight = function () {
            if (options.fixedHeight) {
                var maxHeight_1 = 0;
                $pageContainerLeaf.children().each(function () {
                    var $pageItem = $(this);
                    var pageHeight = $pageItem[0].scrollHeight;
                    if (pageHeight > maxHeight_1) {
                        maxHeight_1 = pageHeight;
                    }
                }).height(maxHeight_1);
            }
        };
        updateFixedHeight();
        //init show active page
        switchTo(loadIndex());
        //handle delay trigger event
        var delayTriggerHandler;
        var startDelayTrigger = function (labelIndex) {
            delayTriggerHandler = setTimeout(function () {
                switchTo(labelIndex);
            }, options.delayTriggerLatency);
        };
        var cancelDelayTrigger = function () {
            if (delayTriggerHandler) {
                clearTimeout(delayTriggerHandler);
                delayTriggerHandler = 0;
            }
        };
        var labelItemDelayClick = function (e) {
            if (e.currentTarget.parentNode !== e.delegateTarget) {
                return;
            }
            cancelDelayTrigger();
            var $activeLabel = $(e.currentTarget);
            var activeLabelIndex = $activeLabel.index();
            if (activeLabelIndex === currentIndex) {
                return;
            }
            startDelayTrigger(activeLabelIndex);
        };
        var labelItemCancelDelayClick = function (e) {
            if (e.currentTarget.parentNode !== e.delegateTarget) {
                return;
            }
            var $activeLabel = $(e.currentTarget);
            var activeLabelIndex = $activeLabel.index();
            if (activeLabelIndex === currentIndex) {
                return;
            }
            cancelDelayTrigger();
        };
        if (options.delayTriggerEvents) {
            if ($topLabelContainerLeaf) {
                $topLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
            }
            if ($bottomLabelContainerLeaf) {
                $bottomLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);
            }
            if (options.delayTriggerCancelEvents) {
                if ($topLabelContainerLeaf) {
                    $topLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
                }
                if ($bottomLabelContainerLeaf) {
                    $bottomLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
                }
            }
        }
        //handle trigger event
        var labelItemClick = function (e) {
            if (e.currentTarget.parentNode !== e.delegateTarget) {
                return;
            }
            cancelDelayTrigger();
            var $activeLabel = $(e.currentTarget);
            var activeLabelIndex = $activeLabel.index();
            if (activeLabelIndex === currentIndex) {
                return;
            }
            switchTo(activeLabelIndex);
        };
        if (options.triggerEvents) {
            if ($topLabelContainerLeaf) {
                $topLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
            }
            if ($bottomLabelContainerLeaf) {
                $bottomLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);
            }
        }
        //controller
        var controller = {
            getCount: getCount,
            getCurrentIndex: getCurrentIndex,
            getTopLabel: getTopLabel,
            getBottomLabel: getBottomLabel,
            getTopBottomLabels: getTopBottomLabels,
            getPage: getPage,
            updateFixedHeight: updateFixedHeight,
            switchTo: switchTo,
            addTabPage: addTabPage,
            insertTabPage: insertTabPage,
            add: add,
            insert: insert,
            remove: remove
        };
        $item.data('tab-controller', controller);
        $tabContainer.data('tab-controller', controller);
    };
    if (this.length) {
        this.each(function () {
            var $item = $(this);
            generateStructure($item);
        });
    }
    return this;
};
module.exports = $;
