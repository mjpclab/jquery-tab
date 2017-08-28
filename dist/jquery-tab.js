(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["jquery-tab"] = factory(require("jquery"));
	else
		root["jquery-tab"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
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
            var $labelItem = $(options.labelItemTemplate);
            var $labelItemLeaf = getLeafElement($labelItem);
            $labelItemLeaf.empty().append(title);
            return $labelItem;
        };
        var newPageItem = function (content) {
            var $pageItem = $(options.pageItemTemplate);
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
                var maxHeight = 0;
                $pageContainerLeaf.children().each(function () {
                    var $pageItem = $(this);
                    var pageHeight = $pageItem[0].scrollHeight;
                    if (pageHeight > maxHeight) {
                        maxHeight = pageHeight;
                    }
                }).height(maxHeight);
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
        //switch function and switch event handler
        var switchTo = function (newIndex) {
            var oldIndex = currentIndex;
            //before switching callback
            if (typeof (options.beforeSwitch) === 'function') {
                options.beforeSwitch(oldIndex, newIndex);
            }
            //labels & pages
            var $newLabel = getTopBottomLabels(newIndex);
            var $otherLabels = $newLabel.siblings();
            var $newPage = getPage(newIndex);
            var $otherPages = $newPage.siblings();
            $otherLabels.removeClass(options.labelActiveClass).addClass(options.labelInactiveClass);
            $otherPages.removeClass(options.pageActiveClass);
            $newLabel.addClass(options.labelActiveClass).removeClass(options.labelInactiveClass);
            $newPage.addClass(options.pageActiveClass);
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
    var self = this;
    if (self.length) {
        self.each(function () {
            var $item = $(this);
            generateStructure($item);
        });
    }
    return self;
};
module.exports = 'jquery';


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=jquery-tab.js.map