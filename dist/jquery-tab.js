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

    function generateSwitchTo(fnGetHeaderFooterLabels, fnGetPanel, fnSaveIndex, containers, context, options) {
      var switchToWithoutSave = function switchToWithoutSave(newIndex) {
        var $tabContainer = containers.$tabContainer;
        var oldIndex = context.currentIndex; //before switching callback

        if (typeof options.onBeforeSwitch === 'function') {
          options.onBeforeSwitch.call($tabContainer, oldIndex, newIndex);
        } //labels & panels


        var $newLabel = fnGetHeaderFooterLabels(newIndex);
        var $newPanel = fnGetPanel(newIndex);
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
        switchToWithoutSave(newIndex);
        fnSaveIndex(newIndex);
      };

      return {
        switchToWithoutSave: switchToWithoutSave,
        switchTo: switchTo
      };
    }

    function createLabelItem($labelContent, options) {
      var $labelItem = $(options.labelItemTemplate).addClass(options.labelItemClass).addClass(options.inactiveLabelItemClass).attr('role', 'tab');
      var $labelItemLeaf = getLeafElement($labelItem);
      $labelItemLeaf.empty().append($labelContent);
      return {
        $labelItem: $labelItem,
        $labelItemLeaf: $labelItemLeaf
      };
    }

    function createPanelItem($panelContent, options) {
      var $panelItem = $(options.panelItemTemplate).addClass(options.panelItemClass).addClass(options.inactivePanelItemClass).attr('role', 'tabpanel');
      var $panelItemLeaf = getLeafElement($panelItem);
      $panelItemLeaf.append($panelContent);
      return {
        $panelItem: $panelItem,
        $panelItemLeaf: $panelItemLeaf
      };
    }

    function createTabItem($labelContent, $panelContent, context, options) {
      var _createLabelItem = createLabelItem($labelContent, options),
          $labelItem = _createLabelItem.$labelItem,
          $labelItemLeaf = _createLabelItem.$labelItemLeaf;

      var _createPanelItem = createPanelItem($panelContent, options),
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

    function generateAddRemove(fnGetHeaderFooterLabels, fnGetPanel, fnSaveIndex, fnSwitchTo, containers, context, options) {
      var insertTabItemWithoutSwitch = function insertTabItemWithoutSwitch($labelContent, $panelContent, index) {
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
            $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf,
            $panelContainerLeaf = containers.$panelContainerLeaf;

        var _createTabItem = createTabItem($labelContent, $panelContent, context, options),
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
            fnSaveIndex(++context.currentIndex);
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
        insertTabItemWithoutSwitch(title, content, index);

        if (context.currentIndex === -1 && context.itemCount) {
          fnSwitchTo(0);
        }
      };

      var addTabItemWithoutSwitch = function addTabItemWithoutSwitch(title, content) {
        insertTabItemWithoutSwitch(title, content, context.itemCount);
      };

      var addTabItem = function addTabItem(title, content) {
        addTabItemWithoutSwitch(title, content);

        if (context.currentIndex === -1 && context.itemCount) {
          fnSwitchTo(0);
        }
      };

      var insertWithoutSwitch = function insertWithoutSwitch(sourceRegion, index) {
        var titleSelector = options.titleSelector,
            fnGetTitleContent = options.fnGetTitleContent,
            keepTitleVisible = options.keepTitleVisible;
        var $sourceRegion = $(sourceRegion);
        var inserted = 0;

        while (true) {
          var $title = $sourceRegion.find(titleSelector).first();

          if ($title.length === 0) {
            break;
          }

          if (!keepTitleVisible) {
            $title.hide();
          }

          var $rest = $title.nextUntil(titleSelector);
          var $labelContent = fnGetTitleContent.call($title, $title);
          var $panelContent = $([]).add($title).add($rest);
          insertTabItemWithoutSwitch($labelContent, $panelContent, index + inserted);
          inserted++;
        }
      };

      var insert = function insert(sourceRegion, index) {
        insertWithoutSwitch(sourceRegion, index);

        if (context.currentIndex === -1 && context.itemCount) {
          fnSwitchTo(0);
        }
      };

      var addWithoutSwitch = function addWithoutSwitch(sourceRegion) {
        insertWithoutSwitch(sourceRegion, context.itemCount);
      };

      var add = function add(sourceRegion) {
        addWithoutSwitch(sourceRegion);

        if (context.currentIndex === -1 && context.itemCount) {
          fnSwitchTo(0);
        }
      };

      var remove = function remove(index) {
        if (index === undefined || !isFinite(index) || index < 0 || index >= context.itemCount) {
          return;
        }

        var $labelItems = fnGetHeaderFooterLabels(index);
        var $panelItem = fnGetPanel(index);
        $labelItems.remove();
        $panelItem.remove();
        context.itemCount--;

        if (index < context.currentIndex) {
          fnSaveIndex(--context.currentIndex);
        } else if (index === context.currentIndex) {
          if (context.currentIndex === context.itemCount) {
            fnSwitchTo(context.currentIndex - 1);
          } else {
            fnSwitchTo(context.currentIndex);
          }
        }

        return $panelItem;
      };

      return {
        insertTabItemWithoutSwitch: insertTabItemWithoutSwitch,
        insertTabItem: insertTabItem,
        addTabItemWithoutSwitch: addTabItemWithoutSwitch,
        addTabItem: addTabItem,
        insert: insert,
        insertWithoutSwitch: insertWithoutSwitch,
        add: add,
        addWithoutSwitch: addWithoutSwitch,
        remove: remove
      };
    }

    function generateUpdateFixedHeight(containers, options) {
      return function updateFixedHeader() {
        if (!options.fixedHeight) {
          return;
        }

        var maxHeight = 0;
        containers.$panelContainerLeaf.children().each(function (index, panelItem) {
          var panelHeight = panelItem.scrollHeight;

          if (panelHeight > maxHeight) {
            maxHeight = panelHeight;
          }
        }).height(maxHeight);
      };
    }

    function handleHashChangeEvent(fnParseHashIndex, fnSwitchTo, context, options) {
      if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
          var hashIndex = fnParseHashIndex();

          if (hashIndex > -1 && hashIndex !== context.currentIndex) {
            fnSwitchTo(hashIndex);
          }
        });
      }
    }

    function hahdleClickEvent(fnSwitchTo, containers, context, options) {
      var triggerEvents = options.triggerEvents,
          delayTriggerEvents = options.delayTriggerEvents,
          delayTriggerCancelEvents = options.delayTriggerCancelEvents,
          delayTriggerLatency = options.delayTriggerLatency;
      var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
          $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf; //handle delay trigger event

      var delayTriggerTimeoutHandler;

      var startDelayTrigger = function startDelayTrigger(labelIndex) {
        delayTriggerTimeoutHandler = setTimeout(function () {
          fnSwitchTo(labelIndex);
          delayTriggerTimeoutHandler = undefined;
        }, delayTriggerLatency);
      };

      var cancelDelayTrigger = function cancelDelayTrigger() {
        if (delayTriggerTimeoutHandler) {
          clearTimeout(delayTriggerTimeoutHandler);
          delayTriggerTimeoutHandler = undefined;
        }
      };

      var labelItemDelayClick = function labelItemDelayClick(e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
          return;
        }

        cancelDelayTrigger();
        var $label = $(e.currentTarget);
        var labelIndex = $label.index();

        if (labelIndex === context.currentIndex) {
          return;
        }

        startDelayTrigger(labelIndex);
      };

      var labelItemCancelDelayClick = function labelItemCancelDelayClick(e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
          return;
        }

        var $label = $(e.currentTarget);
        var labelIndex = $label.index();

        if (labelIndex === context.currentIndex) {
          return;
        }

        cancelDelayTrigger();
      };

      if (delayTriggerEvents) {
        if ($headerLabelContainerLeaf) {
          $headerLabelContainerLeaf.on(delayTriggerEvents, '*', labelItemDelayClick);
        }

        if ($footerLabelContainerLeaf) {
          $footerLabelContainerLeaf.on(delayTriggerEvents, '*', labelItemDelayClick);
        }

        if (delayTriggerCancelEvents) {
          if ($headerLabelContainerLeaf) {
            $headerLabelContainerLeaf.on(delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
          }

          if ($footerLabelContainerLeaf) {
            $footerLabelContainerLeaf.on(delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
          }
        }
      } //handle trigger event


      var labelItemClick = function labelItemClick(e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
          return;
        }

        cancelDelayTrigger();
        var $label = $(e.currentTarget);
        var labelIndex = $label.index();

        if (labelIndex === context.currentIndex) {
          return;
        }

        fnSwitchTo(labelIndex);
      };

      if (triggerEvents) {
        if ($headerLabelContainerLeaf) {
          $headerLabelContainerLeaf.on(triggerEvents, '*', labelItemClick);
        }

        if ($footerLabelContainerLeaf) {
          $footerLabelContainerLeaf.on(triggerEvents, '*', labelItemClick);
        }
      }
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
      var $tabContainer = containers.$tabContainer; //getters

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


      var _genrateSwitchTo = generateSwitchTo(getHeaderFooterLabels, getPanel, saveIndex, containers, context, options),
          switchToWithoutSave = _genrateSwitchTo.switchToWithoutSave,
          switchTo = _genrateSwitchTo.switchTo;

      var _generateAddRemove = generateAddRemove(getHeaderFooterLabels, getPanel, saveIndex, switchTo, containers, context, options),
          addTabItem = _generateAddRemove.addTabItem,
          insertTabItem = _generateAddRemove.insertTabItem,
          add = _generateAddRemove.add,
          addWithoutSwitch = _generateAddRemove.addWithoutSwitch,
          insert = _generateAddRemove.insert,
          remove = _generateAddRemove.remove;

      addWithoutSwitch($region); //replace original content

      if (!context.itemCount && !options.createEmptyTab) {
        return;
      }

      $region.append($tabContainer); //check if param:fixed height

      var updateFixedHeight = generateUpdateFixedHeight(containers, options);
      updateFixedHeight(); //show active panel

      switchToWithoutSave(loadIndex());
      handleHashChangeEvent(parseHashIndex, switchTo, context, options);
      hahdleClickEvent(switchTo, containers, context, options); //controller

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
