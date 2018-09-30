(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["jquery-tab"] = factory(require("jquery"));
	else
		root["jquery-tab"] = factory(root["jQuery"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_jquery__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ./src/ts/jquery-tab */ \"./src/ts/jquery-tab.js\");\nmodule.exports = $;\n\n\n//# sourceURL=webpack://%5Bname%5D/./index.js?");

/***/ }),

/***/ "./src/ts/jquery-tab.js":
/*!******************************!*\
  !*** ./src/ts/jquery-tab.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/// <reference path='main.d.ts' />\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\nfunction getLeafElement($node) {\n    var $result = $node;\n    var $deeper;\n    while ($deeper = $result.children(), $deeper.length) {\n        $result = $deeper;\n    }\n    return $result.eq(0);\n}\n$.fn.tab = function (customOptions) {\n    var defaultOptions = {\n        triggerEvents: 'click',\n        delayTriggerEvents: '',\n        delayTriggerCancelEvents: '',\n        delayTriggerLatency: 200,\n        statusFieldSelector: '',\n        statusHashTemplate: '',\n        statusHashSeparator: '&',\n        fixedHeight: false,\n        activeIndex: 0,\n        createEmptyTab: false,\n        fnShowPageItem: function ($pageItem) {\n            return $pageItem && $pageItem.show && $pageItem.show();\n        },\n        fnHidePageItem: function ($pageItem) {\n            return $pageItem && $pageItem.hide && $pageItem.hide();\n        },\n        onBeforeSwitch: undefined,\n        onAfterSwitch: undefined,\n        titleSelector: 'h1,h2,h3,h4,h5,h6',\n        fnGetTitleContent: function ($title) {\n            return $title.contents();\n        },\n        keepTitleVisible: false,\n        tabContainerTemplate: '<div></div>',\n        tabContainerClass: 'tab-container',\n        labelContainerTemplate: '<div></div>',\n        labelContainerClass: 'label-container',\n        showHeaderLabelContainer: true,\n        showFooterLabelContainer: false,\n        headerLabelContainerClass: 'header-container',\n        footerLabelContainerClass: 'footer-container',\n        labelItemTemplate: '<span></span>',\n        labelItemClass: 'label-item',\n        labelItemActiveClass: 'label-active',\n        labelItemInactiveClass: 'label-inactive',\n        pageContainerTemplate: '<div></div>',\n        pageContainerClass: 'page-container',\n        pageItemTemplate: '<div></div>',\n        pageItemClass: 'page-item',\n        pageItemActiveClass: 'page-active',\n        pageItemInactiveClass: 'page-inactive'\n    };\n    var generateStructure = function ($item) {\n        var dataOptions = $item.data();\n        var options = $.extend({}, defaultOptions, dataOptions, customOptions);\n        var pageCount = 0;\n        var currentIndex = -1;\n        //container\n        var $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);\n        //top label\n        var $topLabelContainer;\n        var $topLabelContainerLeaf;\n        if (options.showHeaderLabelContainer) {\n            $topLabelContainer = $(options.labelContainerTemplate).addClass(options.labelContainerClass).addClass(options.headerLabelContainerClass);\n            $tabContainer.append($topLabelContainer);\n            $topLabelContainerLeaf = getLeafElement($topLabelContainer);\n        }\n        //page\n        var $pageContainer = $(options.pageContainerTemplate).addClass(options.pageContainerClass);\n        $tabContainer.append($pageContainer);\n        var $pageContainerLeaf = getLeafElement($pageContainer);\n        //bottom label\n        var $bottomLabelContainer;\n        var $bottomLabelContainerLeaf;\n        if (options.showFooterLabelContainer) {\n            $bottomLabelContainer = $(options.labelContainerTemplate).addClass(options.labelContainerClass).addClass(options.footerLabelContainerClass);\n            $tabContainer.append($bottomLabelContainer);\n            $bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);\n        }\n        //getters\n        var getCount = function () {\n            return pageCount;\n        };\n        var getCurrentIndex = function () {\n            return currentIndex;\n        };\n        var getLabel = function ($container, index) {\n            if (!isFinite(index)) {\n                throw new Error('invalid index');\n            }\n            return $container.children(':eq(' + index + ')');\n        };\n        var getHeaderLabel = function (index) {\n            if ($topLabelContainerLeaf) {\n                return getLabel($topLabelContainerLeaf, index);\n            }\n            return $([]);\n        };\n        var getFooterLabel = function (index) {\n            if ($bottomLabelContainerLeaf) {\n                return getLabel($bottomLabelContainerLeaf, index);\n            }\n            return $([]);\n        };\n        var getHeaderFooterLabels = function (index) {\n            return getHeaderLabel(index).add(getFooterLabel(index));\n        };\n        var getPage = function (index) {\n            if (!isFinite(index)) {\n                throw new Error('invalid index');\n            }\n            return $pageContainerLeaf.children(':eq(' + index + ')');\n        };\n        //add labels & pages\n        var newLabelItem = function (title) {\n            var $labelItem = $(options.labelItemTemplate).addClass(options.labelItemClass).addClass(options.labelItemInactiveClass);\n            var $labelItemLeaf = getLeafElement($labelItem);\n            $labelItemLeaf.empty().append(title);\n            return $labelItem;\n        };\n        var newPageItem = function (content) {\n            var $pageItem = $(options.pageItemTemplate).addClass(options.pageItemClass).addClass(options.pageItemInactiveClass);\n            var $pageItemLeaf = getLeafElement($pageItem);\n            $pageItemLeaf.append(content);\n            return $pageItem;\n        };\n        //utilities\n        var $statusFields = $item.find(options.statusFieldSelector);\n        if (!$statusFields.length) {\n            $statusFields = $(options.statusFieldSelector);\n        }\n        var RE_STATUS_HASH;\n        var RE_STATUS_HASH_DIGITS;\n        if (options.statusHashTemplate) {\n            var RE_ESCAPE_CHARS = /[.?*+\\\\\\(\\)\\[\\]\\{\\}]/g;\n            RE_STATUS_HASH = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\\\$&') + '-?\\\\d+');\n            RE_STATUS_HASH_DIGITS = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\\\$&') + '(-?\\\\d+)');\n        }\n        var saveIndex = function (index) {\n            $statusFields.val(index);\n            if (options.statusHashTemplate) {\n                var hash = location.hash;\n                var statusHash = options.statusHashTemplate + index;\n                if (hash.indexOf(options.statusHashTemplate) > -1) {\n                    hash = hash.replace(RE_STATUS_HASH, statusHash);\n                }\n                else {\n                    if (hash.length) {\n                        hash += options.statusHashSeparator;\n                    }\n                    hash += statusHash;\n                }\n                location.hash = hash;\n            }\n            if (options.fnSaveIndex) {\n                options.fnSaveIndex.call($tabContainer, index);\n            }\n        };\n        var loadIndex = function () {\n            var index = -1;\n            if (pageCount === 0) {\n                return index;\n            }\n            $statusFields.each(function () {\n                var status = $(this).val();\n                if (typeof status === 'number') {\n                    index = status;\n                    return false;\n                }\n                else if (status.length) {\n                    var intStatus = parseInt(status);\n                    if (isFinite(intStatus) && !isNaN(intStatus)) {\n                        index = parseInt(status);\n                        return false;\n                    }\n                }\n            });\n            if ((index === -1 || isNaN(index)) && options.statusHashTemplate) {\n                var searchResult = location.hash.match(RE_STATUS_HASH_DIGITS);\n                if (searchResult && searchResult[1]) {\n                    index = parseInt(searchResult[1]);\n                }\n            }\n            if ((index === -1 || isNaN(index)) && options.fnLoadIndex) {\n                index = parseInt(options.fnLoadIndex.call($tabContainer));\n            }\n            if (index === -1 || isNaN(index)) {\n                index = Number(options.activeIndex) || 0;\n            }\n            if (index < 0) {\n                index = 0;\n            }\n            else if (index >= pageCount) {\n                index = pageCount - 1;\n            }\n            return index;\n        };\n        //methods\n        var _updateClass = function ($activeLabelItem, $activePageItem) {\n            $activeLabelItem.addClass(options.labelItemActiveClass).removeClass(options.labelItemInactiveClass);\n            $activeLabelItem.siblings().removeClass(options.labelItemActiveClass).addClass(options.labelItemInactiveClass);\n            $activePageItem.addClass(options.pageItemActiveClass).removeClass(options.pageItemInactiveClass);\n            $activePageItem.siblings().removeClass(options.pageItemActiveClass).addClass(options.pageItemInactiveClass);\n        };\n        var switchTo = function (newIndex, shouldSaveIndex) {\n            if (shouldSaveIndex === void 0) { shouldSaveIndex = true; }\n            var oldIndex = currentIndex;\n            //before switching callback\n            if (typeof (options.onBeforeSwitch) === 'function') {\n                options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);\n            }\n            //labels & pages\n            var $newLabel = getHeaderFooterLabels(newIndex);\n            var $newPage = getPage(newIndex);\n            var $otherPages = $newPage.siblings();\n            _updateClass($newLabel, $newPage);\n            //function to hide pages\n            if (typeof options.fnHidePageItem === 'function') {\n                options.fnHidePageItem.call($otherPages, $otherPages);\n            }\n            //function to show page\n            if (typeof options.fnShowPageItem === 'function') {\n                options.fnShowPageItem.call($newPage, $newPage);\n            }\n            //keep new index for restoring\n            shouldSaveIndex && saveIndex(newIndex);\n            //finalize\n            currentIndex = newIndex;\n            //after switching callback\n            if (typeof (options.onAfterSwitch) === 'function') {\n                options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);\n            }\n        };\n        var _insertTabPage = function (title, content, index) {\n            var $labelItem = newLabelItem(title);\n            var $pageItem = newPageItem(content);\n            if (currentIndex > -1 && typeof options.fnHidePageItem === 'function') {\n                options.fnHidePageItem.call($pageItem, $pageItem);\n            }\n            if (index < 0) {\n                index = 0;\n            }\n            if (pageCount > 0 && index < pageCount) {\n                if ($topLabelContainerLeaf) {\n                    $topLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());\n                }\n                if ($bottomLabelContainerLeaf) {\n                    $bottomLabelContainerLeaf.children(':eq(' + index + ')').before($labelItem.clone());\n                }\n                $pageContainerLeaf.children(':eq(' + index + ')').before($pageItem);\n                if (index <= currentIndex) {\n                    saveIndex(++currentIndex);\n                }\n            }\n            else {\n                if ($topLabelContainerLeaf) {\n                    $topLabelContainerLeaf.append($labelItem.clone());\n                }\n                if ($bottomLabelContainerLeaf) {\n                    $bottomLabelContainerLeaf.append($labelItem.clone());\n                }\n                $pageContainerLeaf.append($pageItem);\n            }\n            pageCount++;\n        };\n        var insertTabPage = function (title, content, index) {\n            _insertTabPage(title, content, index);\n            if (currentIndex === -1 && pageCount) {\n                switchTo(0);\n            }\n        };\n        var addTabPage = function (title, content) {\n            _insertTabPage(title, content, pageCount);\n            if (currentIndex === -1 && pageCount) {\n                switchTo(0);\n            }\n        };\n        var _insert = function (sourceRegion, index) {\n            var $sourceRegion = $(sourceRegion);\n            var inserted = 0;\n            while (true) {\n                var $title = $sourceRegion.find(options.titleSelector).first();\n                if ($title.length === 0) {\n                    break;\n                }\n                if (!options.keepTitleVisible) {\n                    $title.hide();\n                }\n                var title = options.fnGetTitleContent.call($title, $title);\n                var content = $title.add($title.nextUntil(options.titleSelector));\n                _insertTabPage(title, content, index + inserted);\n                inserted++;\n            }\n        };\n        var insert = function (sourceRegion, index) {\n            _insert(sourceRegion, index);\n            if (currentIndex === -1 && pageCount) {\n                switchTo(0);\n            }\n        };\n        var _add = function (sourceRegion) {\n            _insert(sourceRegion, pageCount);\n        };\n        var add = function (sourceRegion) {\n            _add(sourceRegion);\n            if (currentIndex === -1 && pageCount) {\n                switchTo(0);\n            }\n        };\n        var remove = function (index) {\n            if (index === undefined || !isFinite(index) || index < 0 || index >= pageCount) {\n                return;\n            }\n            var $labelItems = getHeaderFooterLabels(index);\n            var $pageItem = getPage(index);\n            $labelItems.remove();\n            $pageItem.remove();\n            pageCount--;\n            if (index < currentIndex) {\n                saveIndex(--currentIndex);\n            }\n            else if (index === currentIndex) {\n                if (currentIndex === pageCount) {\n                    switchTo(currentIndex - 1);\n                }\n                else {\n                    switchTo(currentIndex);\n                }\n            }\n            return $pageItem;\n        };\n        _add($item);\n        //replace original content\n        if (!pageCount && !options.createEmptyTab) {\n            return;\n        }\n        $item.append($tabContainer);\n        //check if param:fixed height\n        var updateFixedHeight = function () {\n            if (options.fixedHeight) {\n                var maxHeight_1 = 0;\n                $pageContainerLeaf.children().each(function () {\n                    var $pageItem = $(this);\n                    var pageHeight = $pageItem[0].scrollHeight;\n                    if (pageHeight > maxHeight_1) {\n                        maxHeight_1 = pageHeight;\n                    }\n                }).height(maxHeight_1);\n            }\n        };\n        updateFixedHeight();\n        //init show active page\n        switchTo(loadIndex(), false);\n        //handle delay trigger event\n        var delayTriggerHandler;\n        var startDelayTrigger = function (labelIndex) {\n            delayTriggerHandler = setTimeout(function () {\n                switchTo(labelIndex);\n            }, options.delayTriggerLatency);\n        };\n        var cancelDelayTrigger = function () {\n            if (delayTriggerHandler) {\n                clearTimeout(delayTriggerHandler);\n                delayTriggerHandler = 0;\n            }\n        };\n        var labelItemDelayClick = function (e) {\n            if (e.currentTarget.parentNode !== e.delegateTarget) {\n                return;\n            }\n            cancelDelayTrigger();\n            var $activeLabel = $(e.currentTarget);\n            var activeLabelIndex = $activeLabel.index();\n            if (activeLabelIndex === currentIndex) {\n                return;\n            }\n            startDelayTrigger(activeLabelIndex);\n        };\n        var labelItemCancelDelayClick = function (e) {\n            if (e.currentTarget.parentNode !== e.delegateTarget) {\n                return;\n            }\n            var $activeLabel = $(e.currentTarget);\n            var activeLabelIndex = $activeLabel.index();\n            if (activeLabelIndex === currentIndex) {\n                return;\n            }\n            cancelDelayTrigger();\n        };\n        if (options.delayTriggerEvents) {\n            if ($topLabelContainerLeaf) {\n                $topLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);\n            }\n            if ($bottomLabelContainerLeaf) {\n                $bottomLabelContainerLeaf.on(options.delayTriggerEvents, '*', labelItemDelayClick);\n            }\n            if (options.delayTriggerCancelEvents) {\n                if ($topLabelContainerLeaf) {\n                    $topLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);\n                }\n                if ($bottomLabelContainerLeaf) {\n                    $bottomLabelContainerLeaf.on(options.delayTriggerCancelEvents, '*', labelItemCancelDelayClick);\n                }\n            }\n        }\n        //handle trigger event\n        var labelItemClick = function (e) {\n            if (e.currentTarget.parentNode !== e.delegateTarget) {\n                return;\n            }\n            cancelDelayTrigger();\n            var $activeLabel = $(e.currentTarget);\n            var activeLabelIndex = $activeLabel.index();\n            if (activeLabelIndex === currentIndex) {\n                return;\n            }\n            switchTo(activeLabelIndex);\n        };\n        if (options.triggerEvents) {\n            if ($topLabelContainerLeaf) {\n                $topLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);\n            }\n            if ($bottomLabelContainerLeaf) {\n                $bottomLabelContainerLeaf.on(options.triggerEvents, '*', labelItemClick);\n            }\n        }\n        //controller\n        var controller = {\n            getCount: getCount,\n            getCurrentIndex: getCurrentIndex,\n            getHeaderLabel: getHeaderLabel,\n            getFooterLabel: getFooterLabel,\n            getHeaderFooterLabels: getHeaderFooterLabels,\n            getPage: getPage,\n            updateFixedHeight: updateFixedHeight,\n            switchTo: switchTo,\n            addTabPage: addTabPage,\n            insertTabPage: insertTabPage,\n            add: add,\n            insert: insert,\n            remove: remove\n        };\n        $item.data('tab-controller', controller);\n        $tabContainer.data('tab-controller', controller);\n    };\n    if (this.length) {\n        this.each(function () {\n            var $item = $(this);\n            generateStructure($item);\n        });\n    }\n    return this;\n};\n$('.tab-region').tab();\nmodule.exports = $;\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/ts/jquery-tab.js?");

/***/ }),

/***/ "jquery":
/*!******************************************************************************************!*\
  !*** external {"commonjs":"jquery","commonjs2":"jquery","amd":"jquery","root":"jQuery"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;\n\n//# sourceURL=webpack://%5Bname%5D/external_%7B%22commonjs%22:%22jquery%22,%22commonjs2%22:%22jquery%22,%22amd%22:%22jquery%22,%22root%22:%22jQuery%22%7D?");

/***/ })

/******/ });
});