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
/* harmony import */ var _partial_generate_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _partial_auto_enable_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/// <reference path='public.d.ts' />




jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.tab = function (customOptions) {
  this.each(function (index, region) {
    var $region = jquery__WEBPACK_IMPORTED_MODULE_0___default()(region);
    Object(_partial_generate_tab__WEBPACK_IMPORTED_MODULE_1__["default"])($region, customOptions);
  });
  return this;
};

Object(_partial_auto_enable_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])();
/* harmony default export */ __webpack_exports__["default"] = (jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_default_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _create_tab_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _create_tab_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _update_active_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
var nextContainerId = 0;

function generateTab($region, customOptions) {
  var dataOptions = $region.data();

  var options = _objectSpread({}, _utility_default_options__WEBPACK_IMPORTED_MODULE_1__["default"], dataOptions, customOptions);

  var context = {
    containerId: nextContainerId++,
    nextItemId: 0,
    itemCount: 0,
    currentIndex: -1
  };

  var containers = _objectSpread({
    $region: $region
  }, Object(_create_tab_container__WEBPACK_IMPORTED_MODULE_2__["default"])(options));

  var $tabContainer = containers.$tabContainer,
      $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
      $panelContainerLeaf = containers.$panelContainerLeaf,
      $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf; //getters

  var getCount = function getCount() {
    return context.itemCount;
  };

  var getCurrentIndex = function getCurrentIndex() {
    return context.currentIndex;
  };

  var getLabel = function getLabel($container, index) {
    if (!isFinite(index)) {
      throw new Error('invalid index');
    }

    return $container.children(':eq(' + index + ')');
  };

  var getHeaderLabel = function getHeaderLabel(index) {
    if ($headerLabelContainerLeaf) {
      return getLabel($headerLabelContainerLeaf, index);
    }

    return jquery__WEBPACK_IMPORTED_MODULE_0___default()([]);
  };

  var getFooterLabel = function getFooterLabel(index) {
    if ($footerLabelContainerLeaf) {
      return getLabel($footerLabelContainerLeaf, index);
    }

    return jquery__WEBPACK_IMPORTED_MODULE_0___default()([]);
  };

  var getHeaderFooterLabels = function getHeaderFooterLabels(index) {
    return getHeaderLabel(index).add(getFooterLabel(index));
  };

  var getPanel = function getPanel(index) {
    if (!isFinite(index)) {
      throw new Error('invalid index');
    }

    return $panelContainerLeaf.children(':eq(' + index + ')');
  }; //utilities


  var $statusFields = $region.find(options.statusFieldSelector);

  if (!$statusFields.length) {
    $statusFields = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.statusFieldSelector);
  }

  var RE_STATUS_HASH;
  var RE_STATUS_HASH_DIGITS;

  if (options.statusHashTemplate) {
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

    if (context.itemCount === 0) {
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
    } else if (index >= context.itemCount) {
      index = context.itemCount - 1;
    }

    return index;
  }; //methods


  var switchTo = function switchTo(newIndex) {
    var shouldSaveIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var oldIndex = context.currentIndex; //before switching callback

    if (typeof options.onBeforeSwitch === 'function') {
      options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
    } //labels & panels


    var $newLabel = getHeaderFooterLabels(newIndex);
    var $newPanel = getPanel(newIndex);
    var $otherPanels = $newPanel.siblings();
    Object(_update_active_state__WEBPACK_IMPORTED_MODULE_4__["default"])($newLabel, $newPanel, options); //function to hide panels

    if (typeof options.fnHidePanelItem === 'function') {
      options.fnHidePanelItem.call($otherPanels, $otherPanels);
    } //function to show panel


    if (typeof options.fnShowPanelItem === 'function') {
      options.fnShowPanelItem.call($newPanel, $newPanel);
    } //keep new index for restoring


    shouldSaveIndex && saveIndex(newIndex); //finalize

    context.currentIndex = newIndex; //after switching callback

    if (typeof options.onAfterSwitch === 'function') {
      options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
    }
  };

  var _insertTabItem = function _insertTabItem(title, content, index) {
    var _createTabItem = Object(_create_tab_item__WEBPACK_IMPORTED_MODULE_3__["default"])(title, content, context, options),
        $panelItem = _createTabItem.$panelItem,
        cloneLabelItem = _createTabItem.cloneLabelItem;

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
        saveIndex(++context.currentIndex);
      }
    } else {
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

  var insertTabItem = function insertTabItem(title, content, index) {
    _insertTabItem(title, content, index);

    if (context.currentIndex === -1 && context.itemCount) {
      switchTo(0);
    }
  };

  var addTabItem = function addTabItem(title, content) {
    _insertTabItem(title, content, context.itemCount);

    if (context.currentIndex === -1 && context.itemCount) {
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

      _insertTabItem(title, content, index + inserted);

      inserted++;
    }
  };

  var insert = function insert(sourceRegion, index) {
    _insert(sourceRegion, index);

    if (context.currentIndex === -1 && context.itemCount) {
      switchTo(0);
    }
  };

  var _add = function _add(sourceRegion) {
    _insert(sourceRegion, context.itemCount);
  };

  var add = function add(sourceRegion) {
    _add(sourceRegion);

    if (context.currentIndex === -1 && context.itemCount) {
      switchTo(0);
    }
  };

  var remove = function remove(index) {
    if (index === undefined || !isFinite(index) || index < 0 || index >= context.itemCount) {
      return;
    }

    var $labelItems = getHeaderFooterLabels(index);
    var $panelItem = getPanel(index);
    $labelItems.remove();
    $panelItem.remove();
    context.itemCount--;

    if (index < context.currentIndex) {
      saveIndex(--context.currentIndex);
    } else if (index === context.currentIndex) {
      if (context.currentIndex === context.itemCount) {
        switchTo(context.currentIndex - 1);
      } else {
        switchTo(context.currentIndex);
      }
    }

    return $panelItem;
  };

  _add($region); //replace original content


  if (!context.itemCount && !options.createEmptyTab) {
    return;
  }

  $region.append($tabContainer); //check if param:fixed height

  var updateFixedHeight = function updateFixedHeight() {
    if (options.fixedHeight) {
      var maxHeight = 0;
      $panelContainerLeaf.children().each(function () {
        var $panelItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
        var panelHeight = $panelItem[0].scrollHeight;

        if (panelHeight > maxHeight) {
          maxHeight = panelHeight;
        }
      }).height(maxHeight);
    }
  };

  updateFixedHeight(); //init show active panel

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

    if (activeLabelIndex === context.currentIndex) {
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

    if (activeLabelIndex === context.currentIndex) {
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
  } //handle trigger event


  var labelItemClick = function labelItemClick(e) {
    if (e.currentTarget.parentNode !== e.delegateTarget) {
      return;
    }

    cancelDelayTrigger();
    var $activeLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
    var activeLabelIndex = $activeLabel.index();

    if (activeLabelIndex === context.currentIndex) {
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
  } //controller


  var controller = {
    getCount: getCount,
    getCurrentIndex: getCurrentIndex,
    getHeaderLabel: getHeaderLabel,
    getFooterLabel: getFooterLabel,
    getHeaderFooterLabels: getHeaderFooterLabels,
    getPanel: getPanel,
    updateFixedHeight: updateFixedHeight,
    switchTo: switchTo,
    addTabItem: addTabItem,
    insertTabItem: insertTabItem,
    add: add,
    insert: insert,
    remove: remove
  };
  $region.data('tab-controller', controller);
  $tabContainer.data('tab-controller', controller);
}

/* harmony default export */ __webpack_exports__["default"] = (generateTab);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  fnShowPanelItem: function fnShowPanelItem($panelItem) {
    return $panelItem && $panelItem.show && $panelItem.show();
  },
  fnHidePanelItem: function fnHidePanelItem($panelItem) {
    return $panelItem && $panelItem.hide && $panelItem.hide();
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
  labelItemTemplate: '<label></label>',
  labelItemClass: 'label-item',
  labelItemActiveClass: 'label-active',
  labelItemInactiveClass: 'label-inactive',
  panelContainerTemplate: '<div></div>',
  panelContainerClass: 'panel-container',
  panelItemTemplate: '<div></div>',
  panelItemClass: 'panel-item',
  panelItemActiveClass: 'panel-active',
  panelItemInactiveClass: 'panel-inactive'
};
/* harmony default export */ __webpack_exports__["default"] = (defaultOptions);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_header_label_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _create_panel_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _create_footer_label_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);





function createTabContainer(options) {
  //container
  var $tabContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.tabContainerTemplate).addClass(options.tabContainerClass); //header labels

  var _createHeaderLabelCon = Object(_create_header_label_container__WEBPACK_IMPORTED_MODULE_1__["default"])(options),
      $headerLabelContainer = _createHeaderLabelCon.$headerLabelContainer,
      $headerLabelContainerLeaf = _createHeaderLabelCon.$headerLabelContainerLeaf;

  $headerLabelContainer && $tabContainer.append($headerLabelContainer); //panel

  var _createPanelContainer = Object(_create_panel_container__WEBPACK_IMPORTED_MODULE_2__["default"])(options),
      $panelContainer = _createPanelContainer.$panelContainer,
      $panelContainerLeaf = _createPanelContainer.$panelContainerLeaf;

  $tabContainer.append($panelContainer); //footer labels

  var _createFooterLabelCon = Object(_create_footer_label_container__WEBPACK_IMPORTED_MODULE_3__["default"])(options),
      $footerLabelContainer = _createFooterLabelCon.$footerLabelContainer,
      $footerLabelContainerLeaf = _createFooterLabelCon.$footerLabelContainerLeaf;

  $footerLabelContainer && $tabContainer.append($footerLabelContainer);
  return {
    $tabContainer: $tabContainer,
    $headerLabelContainer: $headerLabelContainer,
    $headerLabelContainerLeaf: $headerLabelContainerLeaf,
    $panelContainer: $panelContainer,
    $panelContainerLeaf: $panelContainerLeaf,
    $footerLabelContainer: $footerLabelContainer,
    $footerLabelContainerLeaf: $footerLabelContainerLeaf
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createTabContainer);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_label_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function createHeaderLabelContainer(options) {
  var $headerLabelContainer;
  var $headerLabelContainerLeaf;

  if (options.showHeaderLabelContainer) {
    var _createLabelContainer = Object(_create_label_container__WEBPACK_IMPORTED_MODULE_0__["default"])(options),
        $labelContainer = _createLabelContainer.$labelContainer,
        $labelContainerLeaf = _createLabelContainer.$labelContainerLeaf;

    $labelContainerLeaf.addClass(options.headerLabelContainerClass);
    $headerLabelContainer = $labelContainer;
    $headerLabelContainerLeaf = $labelContainerLeaf;
  }

  return {
    $headerLabelContainer: $headerLabelContainer,
    $headerLabelContainerLeaf: $headerLabelContainerLeaf
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createHeaderLabelContainer);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



function createLabelContainer(options) {
  var $labelContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.labelContainerTemplate).addClass(options.labelContainerClass).attr('role', 'tablist');

  if (options.tabContainerClass.toLocaleLowerCase().indexOf('vert') >= 0) {
    $labelContainer.attr('aria-orientation', 'vertical');
  }

  var $labelContainerLeaf = Object(_utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__["default"])($labelContainer);
  return {
    $labelContainer: $labelContainer,
    $labelContainerLeaf: $labelContainerLeaf
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createLabelContainer);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function getLeafElement($node) {
  var $result = $node;
  var $deeper;

  while ($deeper = $result.children(), $deeper.length) {
    $result = $deeper;
  }

  return $result.eq(0);
}

/* harmony default export */ __webpack_exports__["default"] = (getLeafElement);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



function createPanelContainer(options) {
  var $panelContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.panelContainerTemplate).addClass(options.panelContainerClass);
  var $panelContainerLeaf = Object(_utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__["default"])($panelContainer);
  return {
    $panelContainer: $panelContainer,
    $panelContainerLeaf: $panelContainerLeaf
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createPanelContainer);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_label_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function createFooterLabelContainer(options) {
  var $footerLabelContainer;
  var $footerLabelContainerLeaf;

  if (options.showFooterLabelContainer) {
    var _createLabelContainer = Object(_create_label_container__WEBPACK_IMPORTED_MODULE_0__["default"])(options),
        $labelContainer = _createLabelContainer.$labelContainer,
        $labelContainerLeaf = _createLabelContainer.$labelContainerLeaf;

    $labelContainerLeaf.addClass(options.footerLabelContainerClass);
    $footerLabelContainer = $labelContainer;
    $footerLabelContainerLeaf = $labelContainerLeaf;
  }

  return {
    $footerLabelContainer: $footerLabelContainer,
    $footerLabelContainerLeaf: $footerLabelContainerLeaf
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createFooterLabelContainer);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_label_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _create_panel_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);



function createTabItem(title, content, context, options) {
  var _createLabelItem = Object(_create_label_item__WEBPACK_IMPORTED_MODULE_0__["default"])(title, options),
      $labelItem = _createLabelItem.$labelItem,
      $labelItemLeaf = _createLabelItem.$labelItemLeaf;

  var _createPanelItem = Object(_create_panel_item__WEBPACK_IMPORTED_MODULE_1__["default"])(content, options),
      $panelItem = _createPanelItem.$panelItem,
      $panelItemLeaf = _createPanelItem.$panelItemLeaf;

  var containerId = context.containerId,
      itemId = context.nextItemId;
  context.nextItemId++;
  var nextCloneId = 0;
  var labelItemIdPrefix = "__jquery-tab-label__".concat(containerId, "__").concat(itemId);
  var panelItemIdPrefix = "__jquery-tab-panel__".concat(containerId, "__").concat(itemId);
  var labelItemId = "".concat(labelItemIdPrefix, "__").concat(nextCloneId);
  var panelItemId = panelItemIdPrefix;

  var cloneLabelItem = function cloneLabelItem() {
    var clonedLabelItemId = "".concat(labelItemIdPrefix, "__").concat(nextCloneId++);

    if (clonedLabelItemId === labelItemId) {
      return $labelItem;
    }

    return $labelItem.clone().attr('id', clonedLabelItemId);
  };

  $labelItem.attr('id', labelItemId).attr('aria-controls', panelItemIdPrefix);
  $panelItem.attr('id', panelItemId).attr('aria-labelledby', labelItemId);
  return {
    $labelItem: $labelItem,
    $labelItemLeaf: $labelItemLeaf,
    $panelItem: $panelItem,
    $panelItemLeaf: $panelItemLeaf,
    cloneLabelItem: cloneLabelItem
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createTabItem);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



function createLabelItem(title, options) {
  var $labelItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.labelItemTemplate).addClass(options.labelItemClass).addClass(options.labelItemInactiveClass).attr('role', 'tab');
  var $labelItemLeaf = Object(_utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__["default"])($labelItem);
  $labelItemLeaf.empty().append(title);
  return {
    $labelItem: $labelItem,
    $labelItemLeaf: $labelItemLeaf
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createLabelItem);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



function createPanelItem(content, options) {
  var $panelItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(options.panelItemTemplate).addClass(options.panelItemClass).addClass(options.panelItemInactiveClass).attr('role', 'tabpanel');
  var $panelItemLeaf = Object(_utility_get_leaf_element__WEBPACK_IMPORTED_MODULE_1__["default"])($panelItem);
  $panelItemLeaf.append(content);
  return {
    $panelItem: $panelItem,
    $panelItemLeaf: $panelItemLeaf
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createPanelItem);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function updateActiveState($activeLabelItem, $activePanelItem, options) {
  var labelItemActiveClass = options.labelItemActiveClass,
      labelItemInactiveClass = options.labelItemInactiveClass,
      panelItemActiveClass = options.panelItemActiveClass,
      panelItemInactiveClass = options.panelItemInactiveClass; //label items

  $activeLabelItem.addClass(labelItemActiveClass).removeClass(labelItemInactiveClass).attr('aria-selected', 'true').attr('aria-expanded', 'true');
  $activeLabelItem.siblings().removeClass(labelItemActiveClass).addClass(labelItemInactiveClass).attr('aria-selected', 'false').attr('aria-expanded', 'false'); //panel items

  $activePanelItem.addClass(panelItemActiveClass).removeClass(panelItemInactiveClass).attr('aria-hidden', 'false');
  $activePanelItem.siblings().removeClass(panelItemActiveClass).addClass(panelItemInactiveClass).attr('aria-hidden', 'true');
}

/* harmony default export */ __webpack_exports__["default"] = (updateActiveState);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


function autoEnableTabs() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab-region').tab();
}

/* harmony default export */ __webpack_exports__["default"] = (autoEnableTabs);

/***/ })
/******/ ])["default"];
});