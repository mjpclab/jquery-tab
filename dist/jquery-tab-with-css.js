(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["jquery-tab-with-css"] = factory(require("jquery"));
	else
		root["jquery-tab-with-css"] = factory(root["jQuery"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
        pageInactiveClass: 'page-inactive',
        activeIndex: 0,
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
            if (index === -1 && options.statusHashTemplate) {
                var re = new RegExp(options.statusHashTemplate + '(\\d+)');
                var searchResult = location.hash.match(re);
                if (searchResult && searchResult[1]) {
                    index = parseInt(searchResult[1]);
                }
            }
            if (index === -1) {
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
        var initialActiveIndex = loadIndex();
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(5);
__webpack_require__(8);
var $ = __webpack_require__(0);
module.exports = $;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!./layout.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!./layout.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".tab-container {\n\tmargin-bottom: 2em;\n}\n\n.tab-container .label-container {\n\tposition: relative;\n}\n\n.tab-container .label-container.top {\n\tbottom: -1px;\n}\n\n.tab-container .label-container.bottom {\n\ttop: -1px;\n}\n\n.tab-container .label-container .label-item {\n\tdisplay: inline-block;\n\tmargin-right: 1em;\n\tborder: 1px solid;\n\n\tpadding: 0.5em 1em;\n\tcursor: pointer;\n}\n\n.tab-container .page-container {\n\tborder: 1px solid;\n}\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!./skin-gray.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!./skin-gray.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".tab-container .page-container {\n\tborder-color: #ccc;\n\tpadding: 1em;\n\tbackground: #fff;\n}\n\n.tab-container .label-container .label-item {\n\tborder-color: #ccc;\n\tbackground: #fff;\n}\n\n.tab-container .label-container .label-active {\n\tcolor: #000;\n}\n\n.tab-container .label-container.top .label-active {\n\tborder-bottom-color: #fff;\n}\n\n.tab-container .label-container.bottom .label-active {\n\tborder-top-color: #fff;\n}\n\n.tab-container .label-container .label-inactive {\n\tcolor:#aaa;\n}", ""]);

// exports


/***/ })
/******/ ]);
});
//# sourceMappingURL=jquery-tab-with-css.js.map