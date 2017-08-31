"use strict";
var $ = require("jquery");
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
        showTopLabel: true,
        showBottomLabel: false,
        titleSelector: 'h1,h2,h3,h4,h5,h6',
        titleContentFilter: function () {
            return this.text();
        },
        keepTitleVisible: false,
        containerTemplate: '<div class="tab-container"></div>',
        labelContainerTemplate: '<div class="label-container {position}"></div>',
        labelItemTemplate: '<span class="label-item"></span>',
        labelActiveClass: 'label-active',
        labelInactiveClass: 'label-inactive',
        pageContainerTemplate: '<div class="page-container"></div>',
        pageItemTemplate: '<div class="page-item"></div>',
        pageActiveClass: 'page-active',
        pageInactiveClass: '',
        showPageItem: function ($pageItem) {
            return $pageItem && $pageItem.show && $pageItem.show();
        },
        hidePageItem: function ($pageItem) {
            return $pageItem && $pageItem.hide && $pageItem.hide();
        },
        beforeSwitch: undefined,
        afterSwitch: undefined
    };
    var options = $.extend({}, defaultOptions, customOptions);
    var getLeafElement = function ($node) {
        var $result = $node;
        var $deeper;
        while ($deeper = $result.children(), $deeper.length) {
            $result = $deeper;
        }
        return $result;
    };
    var generateStructure = function ($item) {
        var pageCount = 0;
        var currentIndex = -1;
        //container
        var $outerContainer = $(options.containerTemplate);
        //top label
        var $topLabelContainer;
        var $topLabelContainerLeaf;
        if (options.showTopLabel) {
            $topLabelContainer = $(options.labelContainerTemplate.replace('{position}', 'top'));
            $outerContainer.append($topLabelContainer);
            $topLabelContainerLeaf = getLeafElement($topLabelContainer);
        }
        //page
        var $pageContainer = $(options.pageContainerTemplate);
        $outerContainer.append($pageContainer);
        var $pageContainerLeaf = getLeafElement($pageContainer);
        //bottom label
        var $bottomLabelContainer;
        var $bottomLabelContainerLeaf;
        if (options.showBottomLabel) {
            $bottomLabelContainer = $(options.labelContainerTemplate.replace('{position}', 'bottom'));
            $outerContainer.append($bottomLabelContainer);
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
            var $labelItem = $(options.labelItemTemplate).addClass(options.labelInactiveClass);
            var $labelItemLeaf = getLeafElement($labelItem);
            $labelItemLeaf.empty().append(title);
            return $labelItem;
        };
        var newPageItem = function (content) {
            var $pageItem = $(options.pageItemTemplate).addClass(options.pageInactiveClass);
            var $pageItemLeaf = getLeafElement($pageItem);
            $pageItemLeaf.append(content);
            return $pageItem;
        };
        var insertTabPage = function (title, content, index) {
            if (index === void 0) { index = Infinity; }
            var $labelItem = newLabelItem(title);
            var $pageItem = newPageItem(content);
            if (currentIndex > -1 && typeof options.hidePageItem === 'function') {
                options.hidePageItem($pageItem);
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
                    currentIndex++;
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
        var addTabPage = function (title, content) {
            insertTabPage(title, content);
        };
        var add = function (sourceContainer) {
            var $sourceContainer = $(sourceContainer);
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
                addTabPage(title, content);
            }
        };
        var insert = function (sourceContainer, index) {
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
                insertTabPage(title, content, index + inserted);
                inserted++;
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
                currentIndex--;
            }
            else if (index === currentIndex) {
                if (index >= pageCount) {
                    currentIndex = pageCount - 1;
                }
                switchTo(currentIndex);
            }
            return $pageItem;
        };
        add($item);
        //replace original content
        $item.prepend($outerContainer);
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
        //utilities
        var $statusFields = $item.find(options.statusFieldSelector);
        if (!$statusFields.length) {
            $statusFields = $(options.statusFieldSelector);
        }
        var saveIndex = function (index) {
            $statusFields.val(index);
            if (options.statusHashTemplate) {
                var hash = location.hash;
                var statusHash = options.statusHashTemplate + index;
                if (hash.indexOf(options.statusHashTemplate) > -1) {
                    hash = hash.replace(new RegExp(options.statusHashTemplate + '\\d+'), statusHash);
                }
                else {
                    if (hash.length) {
                        hash += options.statusHashSeparator;
                    }
                    hash += options.statusHashTemplate + index;
                }
                location.hash = hash;
            }
        };
        var loadIndex = function () {
            var index = -1;
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
            if (index === -1 && options.statusHashTemplate) {
                var re = new RegExp(options.statusHashTemplate + '(\\d+)');
                var searchResult = location.hash.match(re);
                if (searchResult && searchResult[1]) {
                    index = parseInt(searchResult[1]);
                }
            }
            if (index === -1) {
                index = 0;
            }
            var maxLabelIndex = pageCount - 1;
            if (index > maxLabelIndex) {
                index = maxLabelIndex;
            }
            return index;
        };
        var updateClass = function ($activeLabelItem, $activePageItem) {
            $activeLabelItem.addClass(options.labelActiveClass).removeClass(options.labelInactiveClass);
            $activeLabelItem.siblings().removeClass(options.labelActiveClass).addClass(options.labelInactiveClass);
            $activePageItem.addClass(options.pageActiveClass).removeClass(options.pageInactiveClass);
            $activePageItem.siblings().removeClass(options.pageActiveClass).addClass(options.pageInactiveClass);
        };
        //switch function and switch event handler
        var switchTo = function (newIndex) {
            var oldIndex = currentIndex;
            //before switching callback
            if (typeof (options.beforeSwitch) === 'function') {
                options.beforeSwitch(oldIndex, newIndex);
            }
            //labels & pages
            var $newLabel = getTopBottomLabels(newIndex);
            var $newPage = getPage(newIndex);
            var $otherPages = $newPage.siblings();
            updateClass($newLabel, $newPage);
            //function to hide pages
            if (typeof options.hidePageItem === 'function') {
                options.hidePageItem($otherPages);
            }
            //function to show page
            if (typeof options.showPageItem === 'function') {
                options.showPageItem($newPage);
            }
            //keep new index for restoring
            saveIndex(newIndex);
            //after switching callback
            if (typeof (options.afterSwitch) === 'function') {
                options.afterSwitch(oldIndex, newIndex);
            }
            //finalize
            currentIndex = newIndex;
        };
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
        $item.data('jquery-tab-controller', controller);
        $outerContainer.data('jquery-tab-controller', controller);
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
