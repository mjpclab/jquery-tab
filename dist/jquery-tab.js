(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    (global['jquery-tab'] = factory(global.jQuery));
}(this, (function ($) { 'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

    var defaultOptions = {
      triggerEvents: 'click',
      delayTriggerEvents: '',
      delayTriggerCancelEvents: '',
      delayTriggerLatency: 200,
      statusFieldSelector: '',
      statusHashTemplate: '',
      statusHashSeparator: '&',
      fixedHeight: false,
      mode: "horizontal"
      /* Horizontal */
      ,
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
      labelItemTemplate: '<label></label>',
      labelItemClass: 'label-item',
      panelContainerTemplate: '<div></div>',
      panelContainerClass: 'panel-container',
      panelItemTemplate: '<div></div>',
      panelItemClass: 'panel-item'
    };

    function getExpandedOptions(defaultOptions, dataOptions, customOptions) {
      var options = $.extend({}, defaultOptions, dataOptions, customOptions);
      var tabContainerClass = options.tabContainerClass,
          labelContainerClass = options.labelContainerClass,
          labelItemClass = options.labelItemClass,
          panelItemClass = options.panelItemClass;
      var expandedOptions = $.extend(options, {
        horizontalTabContainerClass: tabContainerClass + '-horizontal',
        verticalTabContainerClass: tabContainerClass + '-vertical',
        headerLabelContainerClass: labelContainerClass + '-header',
        footerLabelContainerClass: labelContainerClass + '-footer',
        activeLabelItemClass: labelItemClass + '-active',
        inactiveLabelItemClass: labelItemClass + '-inactive',
        activePanelItemClass: panelItemClass + '-active',
        inactivePanelItemClass: panelItemClass + '-inactive'
      });
      return expandedOptions;
    }

    function getLeafElement($node) {
      var $result = $node;
      var $deeper;

      while ($deeper = $result.children(), $deeper.length) {
        $result = $deeper;
      }

      return $result.eq(0);
    }

    function createLabelContainer(options) {
      var $labelContainer = $(options.labelContainerTemplate).addClass(options.labelContainerClass).attr('role', 'tablist');

      if (options.mode === "vertical"
      /* Vertical */
      ) {
          $labelContainer.attr('aria-orientation', 'vertical');
        }

      var $labelContainerLeaf = getLeafElement($labelContainer);
      return {
        $labelContainer: $labelContainer,
        $labelContainerLeaf: $labelContainerLeaf
      };
    }

    function createHeaderLabelContainer(options) {
      var $headerLabelContainer;
      var $headerLabelContainerLeaf;

      if (options.showHeaderLabelContainer) {
        var _createLabelContainer = createLabelContainer(options),
            $labelContainer = _createLabelContainer.$labelContainer,
            $labelContainerLeaf = _createLabelContainer.$labelContainerLeaf;

        $labelContainer.addClass(options.headerLabelContainerClass);
        $headerLabelContainer = $labelContainer;
        $headerLabelContainerLeaf = $labelContainerLeaf;
      }

      return {
        $headerLabelContainer: $headerLabelContainer,
        $headerLabelContainerLeaf: $headerLabelContainerLeaf
      };
    }

    function createPanelContainer(options) {
      var $panelContainer = $(options.panelContainerTemplate).addClass(options.panelContainerClass);
      var $panelContainerLeaf = getLeafElement($panelContainer);
      return {
        $panelContainer: $panelContainer,
        $panelContainerLeaf: $panelContainerLeaf
      };
    }

    function createFooterLabelContainer(options) {
      var $footerLabelContainer;
      var $footerLabelContainerLeaf;

      if (options.showFooterLabelContainer) {
        var _createLabelContainer = createLabelContainer(options),
            $labelContainer = _createLabelContainer.$labelContainer,
            $labelContainerLeaf = _createLabelContainer.$labelContainerLeaf;

        $labelContainer.addClass(options.footerLabelContainerClass);
        $footerLabelContainer = $labelContainer;
        $footerLabelContainerLeaf = $labelContainerLeaf;
      }

      return {
        $footerLabelContainer: $footerLabelContainer,
        $footerLabelContainerLeaf: $footerLabelContainerLeaf
      };
    }

    function createTabContainer(options) {
      //container
      var $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);

      if (options.mode === "horizontal"
      /* Horizontal */
      ) {
          $tabContainer.addClass(options.horizontalTabContainerClass);
        } else if (options.mode === "vertical"
      /* Vertical */
      ) {
          $tabContainer.addClass(options.verticalTabContainerClass);
        } //header labels


      var _createHeaderLabelCon = createHeaderLabelContainer(options),
          $headerLabelContainer = _createHeaderLabelCon.$headerLabelContainer,
          $headerLabelContainerLeaf = _createHeaderLabelCon.$headerLabelContainerLeaf;

      $headerLabelContainer && $tabContainer.append($headerLabelContainer); //panel

      var _createPanelContainer = createPanelContainer(options),
          $panelContainer = _createPanelContainer.$panelContainer,
          $panelContainerLeaf = _createPanelContainer.$panelContainerLeaf;

      $tabContainer.append($panelContainer); //footer labels

      var _createFooterLabelCon = createFooterLabelContainer(options),
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

    function createLabelItem(title, options) {
      var $labelItem = $(options.labelItemTemplate).addClass(options.labelItemClass).addClass(options.inactiveLabelItemClass).attr('role', 'tab');
      var $labelItemLeaf = getLeafElement($labelItem);
      $labelItemLeaf.empty().append(title);
      return {
        $labelItem: $labelItem,
        $labelItemLeaf: $labelItemLeaf
      };
    }

    function createPanelItem(content, options) {
      var $panelItem = $(options.panelItemTemplate).addClass(options.panelItemClass).addClass(options.inactivePanelItemClass).attr('role', 'tabpanel');
      var $panelItemLeaf = getLeafElement($panelItem);
      $panelItemLeaf.append(content);
      return {
        $panelItem: $panelItem,
        $panelItemLeaf: $panelItemLeaf
      };
    }

    function createTabItem(title, content, context, options) {
      var _createLabelItem = createLabelItem(title, options),
          $labelItem = _createLabelItem.$labelItem,
          $labelItemLeaf = _createLabelItem.$labelItemLeaf;

      var _createPanelItem = createPanelItem(content, options),
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

    function generateGetters(containers, context) {
      var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
          $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf,
          $panelContainerLeaf = containers.$panelContainerLeaf;

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

        return $([]);
      };

      var getFooterLabel = function getFooterLabel(index) {
        if ($footerLabelContainerLeaf) {
          return getLabel($footerLabelContainerLeaf, index);
        }

        return $([]);
      };

      var getHeaderFooterLabels = function getHeaderFooterLabels(index) {
        return getHeaderLabel(index).add(getFooterLabel(index));
      };

      var getPanel = function getPanel(index) {
        if (!isFinite(index)) {
          throw new Error('invalid index');
        }

        return $panelContainerLeaf.children(':eq(' + index + ')');
      };

      return {
        getCount: getCount,
        getCurrentIndex: getCurrentIndex,
        getLabel: getLabel,
        getHeaderLabel: getHeaderLabel,
        getFooterLabel: getFooterLabel,
        getHeaderFooterLabels: getHeaderFooterLabels,
        getPanel: getPanel
      };
    }

    var HASH_PREFIX = '#';
    var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;

    function generateSaveLoadIndex(containers, context, options) {
      var $region = containers.$region,
          $tabContainer = containers.$tabContainer;
      var statusFieldSelector = options.statusFieldSelector,
          statusHashTemplate = options.statusHashTemplate,
          statusHashSeparator = options.statusHashSeparator,
          fnSaveIndex = options.fnSaveIndex,
          fnLoadIndex = options.fnLoadIndex,
          activeIndex = options.activeIndex;
      var $statusFields = $region.find(statusFieldSelector);

      if (!$statusFields.length) {
        $statusFields = $(statusFieldSelector);
      }

      var RE_STATUS_HASH;
      var RE_STATUS_HASH_DIGITS;

      if (statusHashTemplate) {
        RE_STATUS_HASH = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '-?\\d+');
        RE_STATUS_HASH_DIGITS = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '(-?\\d+)');
      }

      var saveIndex = function saveIndex(index) {
        $statusFields.val(index);

        if (statusHashTemplate) {
          var hash = location.hash;
          var statusHash = statusHashTemplate + index;

          if (hash.indexOf(statusHashTemplate) > -1) {
            hash = hash.replace(RE_STATUS_HASH, statusHash);
          } else {
            if (hash !== HASH_PREFIX) {
              if (hash.length) {
                hash += statusHashSeparator;
              } else {
                hash = HASH_PREFIX;
              }
            }

            hash += statusHash;
          }

          location.replace(hash);
        }

        if (fnSaveIndex) {
          fnSaveIndex.call($tabContainer, index);
        }
      };

      var parseHashIndex = function parseHashIndex() {
        var searchResult = location.hash.match(RE_STATUS_HASH_DIGITS);

        if (searchResult && searchResult[1]) {
          return parseInt(searchResult[1]);
        }

        return -1;
      };

      var loadIndex = function loadIndex() {
        var itemCount = context.itemCount;
        var index = -1;

        if (itemCount === 0) {
          return index;
        }

        $statusFields.each(function () {
          var status = $(this).val();

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

        if ((index === -1 || isNaN(index)) && statusHashTemplate) {
          index = parseHashIndex();
        }

        if ((index === -1 || isNaN(index)) && fnLoadIndex) {
          index = parseInt(fnLoadIndex.call($tabContainer));
        }

        if (index === -1 || isNaN(index)) {
          index = Number(activeIndex) || 0;
        }

        if (index < 0) {
          index = 0;
        } else if (index >= itemCount) {
          index = itemCount - 1;
        }

        return index;
      };

      return {
        saveIndex: saveIndex,
        loadIndex: loadIndex,
        parseHashIndex: parseHashIndex
      };
    }

    function updateActiveState($activeLabelItem, $activePanelItem, options) {
      var activeLabelItemClass = options.activeLabelItemClass,
          inactiveLabelItemClass = options.inactiveLabelItemClass,
          activePanelItemClass = options.activePanelItemClass,
          inactivePanelItemClass = options.inactivePanelItemClass; //label items

      $activeLabelItem.removeClass(inactiveLabelItemClass).addClass(activeLabelItemClass).attr('aria-selected', 'true').attr('aria-expanded', 'true');
      $activeLabelItem.siblings().removeClass(activeLabelItemClass).addClass(inactiveLabelItemClass).attr('aria-selected', 'false').attr('aria-expanded', 'false'); //panel items

      $activePanelItem.removeClass(inactivePanelItemClass).addClass(activePanelItemClass).attr('aria-hidden', 'false');
      $activePanelItem.siblings().removeClass(activePanelItemClass).addClass(inactivePanelItemClass).attr('aria-hidden', 'true');
    }

    var nextContainerId = 0;

    function tablize($region, customOptions) {
      var dataOptions = $region.data();
      var options = getExpandedOptions(defaultOptions, dataOptions, customOptions);
      var context = {
        containerId: nextContainerId++,
        nextItemId: 0,
        itemCount: 0,
        currentIndex: -1
      };
      var containers = $.extend({
        $region: $region
      }, createTabContainer(options));
      var $tabContainer = containers.$tabContainer,
          $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
          $panelContainerLeaf = containers.$panelContainerLeaf,
          $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf; //getters

      var _generateGetters = generateGetters(containers, context),
          getCount = _generateGetters.getCount,
          getCurrentIndex = _generateGetters.getCurrentIndex,
          getLabel = _generateGetters.getLabel,
          getHeaderLabel = _generateGetters.getHeaderLabel,
          getFooterLabel = _generateGetters.getFooterLabel,
          getHeaderFooterLabels = _generateGetters.getHeaderFooterLabels,
          getPanel = _generateGetters.getPanel; //save/load


      var _generateSaveLoadInde = generateSaveLoadIndex(containers, context, options),
          saveIndex = _generateSaveLoadInde.saveIndex,
          loadIndex = _generateSaveLoadInde.loadIndex,
          parseHashIndex = _generateSaveLoadInde.parseHashIndex; //methods


      var _switchTo = function _switchTo(newIndex) {
        var oldIndex = context.currentIndex; //before switching callback

        if (typeof options.onBeforeSwitch === 'function') {
          options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
        } //labels & panels


        var $newLabel = getHeaderFooterLabels(newIndex);
        var $newPanel = getPanel(newIndex);
        var $otherPanels = $newPanel.siblings();
        updateActiveState($newLabel, $newPanel, options); //function to hide panels

        if (typeof options.fnHidePanelItem === 'function') {
          options.fnHidePanelItem.call($otherPanels, $otherPanels);
        } //function to show panel


        if (typeof options.fnShowPanelItem === 'function') {
          options.fnShowPanelItem.call($newPanel, $newPanel);
        } //finalize


        context.currentIndex = newIndex; //after switching callback

        if (typeof options.onAfterSwitch === 'function') {
          options.onAfterSwitch.call($tabContainer, oldIndex, newIndex);
        }
      };

      var switchTo = function switchTo(newIndex) {
        _switchTo(newIndex);

        saveIndex(newIndex);
      };

      var _insertTabItem = function _insertTabItem(title, content, index) {
        var _createTabItem = createTabItem(title, content, context, options),
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
        var $sourceRegion = $(sourceRegion);
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
            var $panelItem = $(this);
            var panelHeight = $panelItem[0].scrollHeight;

            if (panelHeight > maxHeight) {
              maxHeight = panelHeight;
            }
          }).height(maxHeight);
        }
      };

      updateFixedHeight(); //show active panel

      _switchTo(loadIndex());

      if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
          var hashIndex = parseHashIndex();

          if (hashIndex > -1) {
            switchTo(hashIndex);
          }
        });
      } //handle delay trigger event


      var delayTriggerHandler;

      var startDelayTrigger = function startDelayTrigger(labelIndex) {
        delayTriggerHandler = setTimeout(function () {
          switchTo(labelIndex);
        }, options.delayTriggerLatency);
      };

      var cancelDelayTrigger = function cancelDelayTrigger() {
        if (delayTriggerHandler) {
          clearTimeout(delayTriggerHandler);
          delayTriggerHandler = undefined;
        }
      };

      var labelItemDelayClick = function labelItemDelayClick(e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
          return;
        }

        cancelDelayTrigger();
        var $activeLabel = $(e.currentTarget);
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

        var $activeLabel = $(e.currentTarget);
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
        var $activeLabel = $(e.currentTarget);
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

    function autoEnableTabs() {
      $('.tab-region').tab();
    }

    /// <reference path='public.d.ts' />

    $.fn.tab = function (customOptions) {
      this.each(function (index, region) {
        var $region = $(region);
        tablize($region, customOptions);
      });
      return this;
    };

    autoEnableTabs();

    return $;

})));
