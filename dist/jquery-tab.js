(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["jquery-tab"] = factory(require("jquery"));
	else
		root["jquery-tab"] = factory(root["jQuery"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/// <reference path='index.d.ts' />


function getLeafElement($node) {
  var $result = $node;
  var $deeper;

  while ($deeper = $result.children(), $deeper.length) {
    $result = $deeper;
  }

  return $result.eq(0);
}

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.tab = function (customOptions) {
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
    createEmptyTab: false,
    fnShowPageItem: function fnShowPageItem($pageItem) {
      return $pageItem && $pageItem.show && $pageItem.show();
    },
    fnHidePageItem: function fnHidePageItem($pageItem) {
      return $pageItem && $pageItem.hide && $pageItem.hide();
    },
    onBeforeSwitch: undefined,
    onAfterSwitch: undefined,
    titleSelector: 'h1,h2,h3,h4,h5,h6',
    fnGetTitleContent: function fnGetTitleContent($title) {
      return $title.contents();
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

  var generateStructure = function generateStructure($item) {
    var dataOptions = $item.data();

    var options = _objectSpread({}, defaultOptions, dataOptions, customOptions);

    var pageCount = 0;
    var currentIndex = -1; //container

    var $tabContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.tabContainerTemplate).addClass(options.tabContainerClass); //top label

    var $topLabelContainer;
    var $topLabelContainerLeaf;

    if (options.showHeaderLabelContainer) {
      $topLabelContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.labelContainerTemplate).addClass(options.labelContainerClass).addClass(options.headerLabelContainerClass);
      $tabContainer.append($topLabelContainer);
      $topLabelContainerLeaf = getLeafElement($topLabelContainer);
    } //page


    var $pageContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.pageContainerTemplate).addClass(options.pageContainerClass);
    $tabContainer.append($pageContainer);
    var $pageContainerLeaf = getLeafElement($pageContainer); //bottom label

    var $bottomLabelContainer;
    var $bottomLabelContainerLeaf;

    if (options.showFooterLabelContainer) {
      $bottomLabelContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.labelContainerTemplate).addClass(options.labelContainerClass).addClass(options.footerLabelContainerClass);
      $tabContainer.append($bottomLabelContainer);
      $bottomLabelContainerLeaf = getLeafElement($bottomLabelContainer);
    } //getters


    var getCount = function getCount() {
      return pageCount;
    };

    var getCurrentIndex = function getCurrentIndex() {
      return currentIndex;
    };

    var getLabel = function getLabel($container, index) {
      if (!isFinite(index)) {
        throw new Error('invalid index');
      }

      return $container.children(':eq(' + index + ')');
    };

    var getHeaderLabel = function getHeaderLabel(index) {
      if ($topLabelContainerLeaf) {
        return getLabel($topLabelContainerLeaf, index);
      }

      return jquery__WEBPACK_IMPORTED_MODULE_0___default()([]);
    };

    var getFooterLabel = function getFooterLabel(index) {
      if ($bottomLabelContainerLeaf) {
        return getLabel($bottomLabelContainerLeaf, index);
      }

      return jquery__WEBPACK_IMPORTED_MODULE_0___default()([]);
    };

    var getHeaderFooterLabels = function getHeaderFooterLabels(index) {
      return getHeaderLabel(index).add(getFooterLabel(index));
    };

    var getPage = function getPage(index) {
      if (!isFinite(index)) {
        throw new Error('invalid index');
      }

      return $pageContainerLeaf.children(':eq(' + index + ')');
    }; //add labels & pages


    var newLabelItem = function newLabelItem(title) {
      var $labelItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.labelItemTemplate).addClass(options.labelItemClass).addClass(options.labelItemInactiveClass);
      var $labelItemLeaf = getLeafElement($labelItem);
      $labelItemLeaf.empty().append(title);
      return $labelItem;
    };

    var newPageItem = function newPageItem(content) {
      var $pageItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.pageItemTemplate).addClass(options.pageItemClass).addClass(options.pageItemInactiveClass);
      var $pageItemLeaf = getLeafElement($pageItem);
      $pageItemLeaf.append(content);
      return $pageItem;
    }; //utilities


    var $statusFields = $item.find(options.statusFieldSelector);

    if (!$statusFields.length) {
      $statusFields = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.statusFieldSelector);
    }

    var RE_STATUS_HASH;
    var RE_STATUS_HASH_DIGITS;

    if (options.statusHashTemplate) {
      var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
      RE_STATUS_HASH = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '-?\\d+');
      RE_STATUS_HASH_DIGITS = new RegExp(options.statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '(-?\\d+)');
    }

    var saveIndex = function saveIndex(index) {
      $statusFields.val(index);

      if (options.statusHashTemplate) {
        var hash = location.hash;
        var statusHash = options.statusHashTemplate + index;

        if (hash.indexOf(options.statusHashTemplate) > -1) {
          hash = hash.replace(RE_STATUS_HASH, statusHash);
        } else {
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

    var loadIndex = function loadIndex() {
      var index = -1;

      if (pageCount === 0) {
        return index;
      }

      $statusFields.each(function () {
        var status = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();

        if (typeof status === 'number') {
          index = status;
          return false;
        } else if (status.length) {
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

      if ((index === -1 || isNaN(index)) && options.fnLoadIndex) {
        index = parseInt(options.fnLoadIndex.call($tabContainer));
      }

      if (index === -1 || isNaN(index)) {
        index = Number(options.activeIndex) || 0;
      }

      if (index < 0) {
        index = 0;
      } else if (index >= pageCount) {
        index = pageCount - 1;
      }

      return index;
    }; //methods


    var _updateClass = function _updateClass($activeLabelItem, $activePageItem) {
      $activeLabelItem.addClass(options.labelItemActiveClass).removeClass(options.labelItemInactiveClass);
      $activeLabelItem.siblings().removeClass(options.labelItemActiveClass).addClass(options.labelItemInactiveClass);
      $activePageItem.addClass(options.pageItemActiveClass).removeClass(options.pageItemInactiveClass);
      $activePageItem.siblings().removeClass(options.pageItemActiveClass).addClass(options.pageItemInactiveClass);
    };

    var switchTo = function switchTo(newIndex) {
      var shouldSaveIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var oldIndex = currentIndex; //before switching callback

      if (typeof options.onBeforeSwitch === 'function') {
        options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
      } //labels & pages


      var $newLabel = getHeaderFooterLabels(newIndex);
      var $newPage = getPage(newIndex);
      var $otherPages = $newPage.siblings();

      _updateClass($newLabel, $newPage); //function to hide pages


      if (typeof options.fnHidePageItem === 'function') {
        options.fnHidePageItem.call($otherPages, $otherPages);
      } //function to show page


      if (typeof options.fnShowPageItem === 'function') {
        options.fnShowPageItem.call($newPage, $newPage);
      } //keep new index for restoring


      shouldSaveIndex && saveIndex(newIndex); //finalize

      currentIndex = newIndex; //after switching callback

      if (typeof options.onAfterSwitch === 'function') {
        options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
      }
    };

    var _insertTabPage = function _insertTabPage(title, content, index) {
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
      } else {
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

    var insertTabPage = function insertTabPage(title, content, index) {
      _insertTabPage(title, content, index);

      if (currentIndex === -1 && pageCount) {
        switchTo(0);
      }
    };

    var addTabPage = function addTabPage(title, content) {
      _insertTabPage(title, content, pageCount);

      if (currentIndex === -1 && pageCount) {
        switchTo(0);
      }
    };

    var _insert = function _insert(sourceRegion, index) {
      var $sourceRegion = jquery__WEBPACK_IMPORTED_MODULE_0___default()(sourceRegion);
      var inserted = 0;

      while (true) {
        var $title = $sourceRegion.find(options.titleSelector).first();

        if ($title.length === 0) {
          break;
        }

        if (!options.keepTitleVisible) {
          $title.hide();
        }

        var title = options.fnGetTitleContent.call($title, $title);
        var content = $title.add($title.nextUntil(options.titleSelector));

        _insertTabPage(title, content, index + inserted);

        inserted++;
      }
    };

    var insert = function insert(sourceRegion, index) {
      _insert(sourceRegion, index);

      if (currentIndex === -1 && pageCount) {
        switchTo(0);
      }
    };

    var _add = function _add(sourceRegion) {
      _insert(sourceRegion, pageCount);
    };

    var add = function add(sourceRegion) {
      _add(sourceRegion);

      if (currentIndex === -1 && pageCount) {
        switchTo(0);
      }
    };

    var remove = function remove(index) {
      if (index === undefined || !isFinite(index) || index < 0 || index >= pageCount) {
        return;
      }

      var $labelItems = getHeaderFooterLabels(index);
      var $pageItem = getPage(index);
      $labelItems.remove();
      $pageItem.remove();
      pageCount--;

      if (index < currentIndex) {
        saveIndex(--currentIndex);
      } else if (index === currentIndex) {
        if (currentIndex === pageCount) {
          switchTo(currentIndex - 1);
        } else {
          switchTo(currentIndex);
        }
      }

      return $pageItem;
    };

    _add($item); //replace original content


    if (!pageCount && !options.createEmptyTab) {
      return;
    }

    $item.append($tabContainer); //check if param:fixed height

    var updateFixedHeight = function updateFixedHeight() {
      if (options.fixedHeight) {
        var maxHeight = 0;
        $pageContainerLeaf.children().each(function () {
          var $pageItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
          var pageHeight = $pageItem[0].scrollHeight;

          if (pageHeight > maxHeight) {
            maxHeight = pageHeight;
          }
        }).height(maxHeight);
      }
    };

    updateFixedHeight(); //init show active page

    switchTo(loadIndex(), false); //handle delay trigger event

    var delayTriggerHandler;

    var startDelayTrigger = function startDelayTrigger(labelIndex) {
      delayTriggerHandler = setTimeout(function () {
        switchTo(labelIndex);
      }, options.delayTriggerLatency);
    };

    var cancelDelayTrigger = function cancelDelayTrigger() {
      if (delayTriggerHandler) {
        clearTimeout(delayTriggerHandler);
        delayTriggerHandler = 0;
      }
    };

    var labelItemDelayClick = function labelItemDelayClick(e) {
      if (e.currentTarget.parentNode !== e.delegateTarget) {
        return;
      }

      cancelDelayTrigger();
      var $activeLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
      var activeLabelIndex = $activeLabel.index();

      if (activeLabelIndex === currentIndex) {
        return;
      }

      startDelayTrigger(activeLabelIndex);
    };

    var labelItemCancelDelayClick = function labelItemCancelDelayClick(e) {
      if (e.currentTarget.parentNode !== e.delegateTarget) {
        return;
      }

      var $activeLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
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
    } //handle trigger event


    var labelItemClick = function labelItemClick(e) {
      if (e.currentTarget.parentNode !== e.delegateTarget) {
        return;
      }

      cancelDelayTrigger();
      var $activeLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
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
    } //controller


    var controller = {
      getCount: getCount,
      getCurrentIndex: getCurrentIndex,
      getHeaderLabel: getHeaderLabel,
      getFooterLabel: getFooterLabel,
      getHeaderFooterLabels: getHeaderFooterLabels,
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
      var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      generateStructure($item);
    });
  }

  return this;
};

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab-region').tab();
/* harmony default export */ __webpack_exports__["default"] = (jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ })
/******/ ])["default"];
});