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
      activePosition: 0,
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
      fnGetTabItemName: function fnGetTabItemName($title) {
        return $title.attr('data-tab-item-name');
      },
      fnIsTabItemDisabled: function fnIsTabItemDisabled($title) {
        var attrDisabled = $title.attr('data-tab-item-disabled');
        return attrDisabled !== undefined && attrDisabled !== 'false';
      },
      fnIsTabItemHidden: function fnIsTabItemHidden($title) {
        var attrHidden = $title.attr('data-tab-item-hidden');
        return attrHidden !== undefined && attrHidden !== 'false';
      },
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
        tabItemNameAttr: 'data-tab-item-name',
        activeLabelItemClass: labelItemClass + '-active',
        inactiveLabelItemClass: labelItemClass + '-inactive',
        disabledLabelItemClass: labelItemClass + '-disabled',
        hiddenLabelItemClass: labelItemClass + '-hidden',
        activePanelItemClass: panelItemClass + '-active',
        inactivePanelItemClass: panelItemClass + '-inactive',
        disabledPanelItemClass: panelItemClass + '-disabled',
        hiddenPanelItemClass: panelItemClass + '-hidden'
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

    function generateGetters(containers, context, options) {
      var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
          $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf,
          $panelContainer = containers.$panelContainer,
          $panelContainerLeaf = containers.$panelContainerLeaf;
      var tabItemNameAttr = options.tabItemNameAttr,
          disabledPanelItemClass = options.disabledPanelItemClass,
          hiddenPanelItemClass = options.hiddenPanelItemClass;

      var getCount = function getCount() {
        return context.itemCount;
      };

      var getCurrentIndex = function getCurrentIndex() {
        return context.currentIndex;
      };

      var getTabItemName = function getTabItemName(index) {
        return $panelContainerLeaf.children().eq(index).attr(tabItemNameAttr);
      };

      var getTabItemIndexByName = function getTabItemIndexByName(name) {
        var tabItemIndex = -1;
        $panelContainer.children().each(function (index, panel) {
          var $panel = $(panel);

          if ($panel.attr(tabItemNameAttr) === name) {
            tabItemIndex = $panel.index();
            return false;
          }
        });
        return tabItemIndex;
      };

      var positionToIndex = function positionToIndex(position) {
        if (typeof position === 'number') {
          return position;
        } else if (isFinite(position)) {
          return parseInt(position);
        } else if (position !== undefined) {
          return getTabItemIndexByName(position);
        } else {
          return -1;
        }
      };

      var parsePosition = function parsePosition(position) {
        if (typeof position === 'number') {
          return {
            index: position,
            name: getTabItemName(position)
          };
        } else if (isFinite(position)) {
          var index = parseInt(position);
          return {
            index: index,
            name: getTabItemName(index)
          };
        } else if (position) {
          return {
            index: getTabItemIndexByName(position),
            name: position
          };
        } else {
          return {
            index: -1,
            name: undefined
          };
        }
      };

      var isTabItemDisabled = function isTabItemDisabled(position) {
        var index = positionToIndex(position);

        if (index > -1) {
          return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
        }
      };

      var isTabItemHidden = function isTabItemHidden(position) {
        var index = positionToIndex(position);

        if (index > -1) {
          return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
        }
      };

      var getHeaderLabel = function getHeaderLabel(position) {
        if ($headerLabelContainerLeaf) {
          var index = positionToIndex(position);
          return $headerLabelContainerLeaf.children().eq(index);
        }

        return $([]);
      };

      var getFooterLabel = function getFooterLabel(position) {
        if ($footerLabelContainerLeaf) {
          var index = positionToIndex(position);
          return $footerLabelContainerLeaf.children().eq(index);
        }

        return $([]);
      };

      var getHeaderFooterLabels = function getHeaderFooterLabels(position) {
        var index = positionToIndex(position);
        return getHeaderLabel(index).add(getFooterLabel(index));
      };

      var getPanel = function getPanel(position) {
        var index = positionToIndex(position);
        return $panelContainerLeaf.children().eq(index);
      };

      var getCurrentHeaderLabel = function getCurrentHeaderLabel() {
        return getHeaderLabel(context.currentIndex);
      };

      var getCurrentFooterLabel = function getCurrentFooterLabel() {
        return getFooterLabel(context.currentIndex);
      };

      var getCurrentHeaderFooterLabels = function getCurrentHeaderFooterLabels() {
        return getHeaderFooterLabels(context.currentIndex);
      };

      var getCurrentPanel = function getCurrentPanel() {
        return getPanel(context.currentIndex);
      };

      return {
        getCount: getCount,
        getCurrentIndex: getCurrentIndex,
        getTabItemName: getTabItemName,
        getTabItemIndexByName: getTabItemIndexByName,
        positionToIndex: positionToIndex,
        parsePosition: parsePosition,
        isTabItemDisabled: isTabItemDisabled,
        isTabItemHidden: isTabItemHidden,
        getHeaderLabel: getHeaderLabel,
        getFooterLabel: getFooterLabel,
        getHeaderFooterLabels: getHeaderFooterLabels,
        getPanel: getPanel,
        getCurrentHeaderLabel: getCurrentHeaderLabel,
        getCurrentFooterLabel: getCurrentFooterLabel,
        getCurrentHeaderFooterLabels: getCurrentHeaderFooterLabels,
        getCurrentPanel: getCurrentPanel
      };
    }

    function generateTabItemSetter(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, options) {
      var tabItemNameAttr = options.tabItemNameAttr,
          disabledLabelItemClass = options.disabledLabelItemClass,
          disabledPanelItemClass = options.disabledPanelItemClass,
          hiddenLabelItemClass = options.hiddenLabelItemClass,
          hiddenPanelItemClass = options.hiddenPanelItemClass;

      var setTabItemName = function setTabItemName(name, position) {
        fnGetHeaderFooterLabels(position).attr(tabItemNameAttr, name);
        fnGetPanel(position).attr(tabItemNameAttr, name);
      };

      var setTabItemDisabled = function setTabItemDisabled(disabled, position) {
        fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
        fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
      };

      var setTabItemHidden = function setTabItemHidden(hidden, position) {
        fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
        fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
      };

      return {
        setTabItemName: setTabItemName,
        setTabItemDisabled: setTabItemDisabled,
        setTabItemHidden: setTabItemHidden
      };
    }

    var HASH_PREFIX = '#';
    var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;

    function isValidPosition(position) {
      return position !== -1 && position !== undefined && position !== null && position !== '';
    }

    function generateSaveLoadIndex(containers, context, options) {
      var $region = containers.$region,
          $tabContainer = containers.$tabContainer;
      var statusFieldSelector = options.statusFieldSelector,
          statusHashTemplate = options.statusHashTemplate,
          statusHashSeparator = options.statusHashSeparator,
          fnSavePosition = options.fnSavePosition,
          fnLoadPosition = options.fnLoadPosition,
          activePosition = options.activePosition;
      var $statusFields = $region.find(statusFieldSelector);

      if (!$statusFields.length) {
        $statusFields = $(statusFieldSelector);
      }

      var RE_STATUS_HASH;

      if (statusHashTemplate) {
        RE_STATUS_HASH = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '([-\\w]+)');
      }

      var savePosition = function saveIndex(position) {
        $statusFields.val(position);

        if (statusHashTemplate) {
          var hash = location.hash;
          var statusHash = statusHashTemplate + position;

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

        if (fnSavePosition) {
          fnSavePosition.call($tabContainer, position);
        }
      };

      var parseHashPosition = function parseHashPosition() {
        var searchResult = location.hash.match(RE_STATUS_HASH);

        if (searchResult && searchResult[1]) {
          return parseInt(searchResult[1]);
        }

        return -1;
      };

      var loadPosition = function loadPosition() {
        var position = -1;
        $statusFields.each(function () {
          var status = $(this).val();

          if (typeof status === 'number' || status.length) {
            position = status;
            return false;
          }
        });

        if (isValidPosition(position)) {
          return position;
        }

        if (statusHashTemplate) {
          position = parseHashPosition();

          if (isValidPosition(position)) {
            return position;
          }
        }

        if (fnLoadPosition) {
          position = fnLoadPosition.call($tabContainer);

          if (isValidPosition(position)) {
            return position;
          }
        }

        if (isValidPosition(activePosition)) {
          return activePosition;
        }

        return 0;
      };

      return {
        savePosition: savePosition,
        loadPosition: loadPosition,
        parseHashPosition: parseHashPosition
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

    function generateSwitchTo(fnParsePosition, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, containers, context, options) {
      var switchToWithoutSave = function switchToWithoutSave(newPosition) {
        var _fnParsePosition = fnParsePosition(newPosition),
            newIndex = _fnParsePosition.index,
            newName = _fnParsePosition.name;

        if (newIndex < 0 || newIndex >= context.itemCount) {
          return;
        }

        var oldIndex = context.currentIndex,
            oldName = context.currentName;
        var $tabContainer = containers.$tabContainer; //before switching callback

        if (typeof options.onBeforeSwitch === 'function') {
          options.onBeforeSwitch.call($tabContainer, {
            index: oldIndex,
            name: oldName
          }, {
            index: newIndex,
            name: newName
          });
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


        context.currentIndex = newIndex;
        context.currentName = newName; //after switching callback

        if (typeof options.onAfterSwitch === 'function') {
          options.onAfterSwitch.call($tabContainer, {
            index: oldIndex,
            name: oldName
          }, {
            index: newIndex,
            name: newName
          });
        }

        return {
          index: newIndex,
          name: newName
        };
      };

      var switchTo = function switchTo(newPosition) {
        var result = switchToWithoutSave(newPosition);

        if (result) {
          var index = result.index,
              name = result.name;
          fnSavePosition(name || index);
        }
      };

      return {
        switchToWithoutSave: switchToWithoutSave,
        switchTo: switchTo
      };
    }

    function createLabelItem(tabItem, options) {
      var $labelItem = $(options.labelItemTemplate).addClass(options.labelItemClass).addClass(options.inactiveLabelItemClass).attr('role', 'tab');
      var $labelItemLeaf = getLeafElement($labelItem);
      $labelItemLeaf.append(tabItem.title);
      return {
        $labelItem: $labelItem,
        $labelItemLeaf: $labelItemLeaf
      };
    }

    function createPanelItem(tabItem, options) {
      var $panelItem = $(options.panelItemTemplate).addClass(options.panelItemClass).addClass(options.inactivePanelItemClass).attr('role', 'tabpanel');
      var $panelItemLeaf = getLeafElement($panelItem);
      $panelItemLeaf.append(tabItem.content);
      return {
        $panelItem: $panelItem,
        $panelItemLeaf: $panelItemLeaf
      };
    }

    function createTabItem(tabItem, context, options) {
      var name = tabItem.name,
          disabled = tabItem.disabled,
          hidden = tabItem.hidden;
      var tabItemNameAttr = options.tabItemNameAttr,
          disabledLabelItemClass = options.disabledLabelItemClass,
          disabledPanelItemClass = options.disabledPanelItemClass,
          hiddenLabelItemClass = options.hiddenLabelItemClass,
          hiddenPanelItemClass = options.hiddenPanelItemClass;

      var _createLabelItem = createLabelItem(tabItem, options),
          $labelItem = _createLabelItem.$labelItem,
          $labelItemLeaf = _createLabelItem.$labelItemLeaf;

      var _createPanelItem = createPanelItem(tabItem, options),
          $panelItem = _createPanelItem.$panelItem,
          $panelItemLeaf = _createPanelItem.$panelItemLeaf;

      if (name) {
        $labelItem.attr(tabItemNameAttr, name);
        $panelItem.attr(tabItemNameAttr, name);
      }

      if (disabled) {
        $labelItem.addClass(disabledLabelItemClass);
        $panelItem.addClass(disabledPanelItemClass);
      }

      if (hidden) {
        $labelItem.addClass(hiddenLabelItemClass);
        $panelItem.addClass(hiddenPanelItemClass);
      }

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

    function generateAddRemove(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, fnSwitchTo, containers, context, options) {
      var insertTabItemWithoutSwitch = function insertTabItemWithoutSwitch(tabItem, position) {
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
            $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf,
            $panelContainerLeaf = containers.$panelContainerLeaf;

        var _createTabItem = createTabItem(tabItem, context, options),
            $panelItem = _createTabItem.$panelItem,
            cloneLabelItem = _createTabItem.cloneLabelItem;

        if (context.currentIndex > -1 && typeof options.fnHidePanelItem === 'function') {
          options.fnHidePanelItem.call($panelItem, $panelItem);
        }

        var index = fnPositionToIndex(position);

        if (index < 0) {
          index = 0;
        }

        if (context.itemCount > 0 && index < context.itemCount) {
          if ($headerLabelContainerLeaf) {
            $headerLabelContainerLeaf.children().eq(index).before(cloneLabelItem());
          }

          if ($footerLabelContainerLeaf) {
            $footerLabelContainerLeaf.children().eq(index).before(cloneLabelItem());
          }

          $panelContainerLeaf.children().eq(index).before($panelItem);

          if (index <= context.currentIndex) {
            context.currentIndex++;
            fnSavePosition(tabItem.name || context.currentIndex);
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

      var insertTabItem = function insertTabItem(tabItem, position) {
        insertTabItemWithoutSwitch(tabItem, position);

        if (context.currentIndex === -1 && context.itemCount) {
          fnSwitchTo(0);
        }
      };

      var addTabItemWithoutSwitch = function addTabItemWithoutSwitch(tabItem) {
        insertTabItemWithoutSwitch(tabItem, context.itemCount);
      };

      var addTabItem = function addTabItem(tabItem) {
        addTabItemWithoutSwitch(tabItem);

        if (context.currentIndex === -1 && context.itemCount) {
          fnSwitchTo(0);
        }
      };

      var insertWithoutSwitch = function insertWithoutSwitch(sourceRegion, position) {
        var titleSelector = options.titleSelector,
            fnGetTitleContent = options.fnGetTitleContent,
            keepTitleVisible = options.keepTitleVisible,
            fnGetTabItemName = options.fnGetTabItemName,
            fnIsTabItemDisabled = options.fnIsTabItemDisabled,
            fnIsTabItemHidden = options.fnIsTabItemHidden;
        var $sourceRegion = $(sourceRegion);
        var inserted = 0;
        var index = fnPositionToIndex(position);

        while (true) {
          var $title = $sourceRegion.find(titleSelector).first();

          if ($title.length === 0) {
            break;
          }

          if (!keepTitleVisible) {
            $title.hide();
          }

          var $rest = $title.nextUntil(titleSelector);
          var tabItem = {
            title: fnGetTitleContent.call($sourceRegion, $title, $rest),
            content: $([]).add($title).add($rest),
            name: fnGetTabItemName.call($sourceRegion, $title, $rest),
            disabled: fnIsTabItemDisabled.call($sourceRegion, $title, $rest),
            hidden: fnIsTabItemHidden.call($sourceRegion, $title, $rest)
          };
          insertTabItemWithoutSwitch(tabItem, index + inserted);
          inserted++;
        }
      };

      var insert = function insert(sourceRegion, position) {
        insertWithoutSwitch(sourceRegion, position);

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

      var remove = function remove(position) {
        var index = fnPositionToIndex(position);

        if (index < 0 || index >= context.itemCount) {
          return;
        }

        var $labelItems = fnGetHeaderFooterLabels(index);
        var $panelItem = fnGetPanel(index);
        $labelItems.remove();
        $panelItem.remove();
        context.itemCount--;

        if (context.itemCount === 0) {
          context.currentIndex = -1;
          context.currentName = undefined;
        } else if (index < context.currentIndex) {
          fnSwitchTo(context.currentIndex - 1);
        } else if (index === context.currentIndex) {
          if (index === context.itemCount) {
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

    function handleHashChangeEvent(fnParseHashPosition, fnSwitchTo, context, options) {
      if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
          var hashIndex = fnParseHashPosition();

          if (hashIndex > -1 && hashIndex !== context.currentIndex) {
            fnSwitchTo(hashIndex);
          }
        });
      }
    }

    function hahdleClickEvent(fnSwitchTo, containers, context, options) {
      var tabItemNameAttr = options.tabItemNameAttr,
          triggerEvents = options.triggerEvents,
          delayTriggerEvents = options.delayTriggerEvents,
          delayTriggerCancelEvents = options.delayTriggerCancelEvents,
          delayTriggerLatency = options.delayTriggerLatency,
          disabledLabelItemClass = options.disabledLabelItemClass,
          hiddenLabelItemClass = options.hiddenLabelItemClass;
      var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
          $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf; //handle delay trigger event

      var delayTriggerTimeoutHandler;

      var startDelayTrigger = function startDelayTrigger(position) {
        delayTriggerTimeoutHandler = setTimeout(function () {
          fnSwitchTo(position);
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

        if (labelIndex === context.currentIndex || $label.hasClass(disabledLabelItemClass) || $label.hasClass(hiddenLabelItemClass)) {
          return;
        }

        var tabItemName = $label.attr(tabItemNameAttr);
        startDelayTrigger(tabItemName || labelIndex);
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

        if (labelIndex === context.currentIndex || $label.hasClass(disabledLabelItemClass) || $label.hasClass(hiddenLabelItemClass)) {
          return;
        }

        var tabItemName = $label.attr(tabItemNameAttr);
        fnSwitchTo(tabItemName || labelIndex);
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

      var _generateGetters = generateGetters(containers, context, options),
          getCount = _generateGetters.getCount,
          getCurrentIndex = _generateGetters.getCurrentIndex,
          getTabItemName = _generateGetters.getTabItemName,
          getTabItemIndexByName = _generateGetters.getTabItemIndexByName,
          positionToIndex = _generateGetters.positionToIndex,
          parsePosition = _generateGetters.parsePosition,
          isTabItemDisabled = _generateGetters.isTabItemDisabled,
          isTabItemHidden = _generateGetters.isTabItemHidden,
          getHeaderLabel = _generateGetters.getHeaderLabel,
          getFooterLabel = _generateGetters.getFooterLabel,
          getHeaderFooterLabels = _generateGetters.getHeaderFooterLabels,
          getPanel = _generateGetters.getPanel,
          getCurrentHeaderLabel = _generateGetters.getCurrentHeaderLabel,
          getCurrentFooterLabel = _generateGetters.getCurrentFooterLabel,
          getCurrentHeaderFooterLabels = _generateGetters.getCurrentHeaderFooterLabels,
          getCurrentPanel = _generateGetters.getCurrentPanel; //tab item setter


      var _generateTabItemSette = generateTabItemSetter(positionToIndex, getHeaderFooterLabels, getPanel, options),
          setTabItemName = _generateTabItemSette.setTabItemName,
          setTabItemDisabled = _generateTabItemSette.setTabItemDisabled,
          setTabItemHidden = _generateTabItemSette.setTabItemHidden; //save/load


      var _generateSaveLoadInde = generateSaveLoadIndex(containers, context, options),
          savePosition = _generateSaveLoadInde.savePosition,
          loadPosition = _generateSaveLoadInde.loadPosition,
          parseHashPosition = _generateSaveLoadInde.parseHashPosition; //methods


      var _genrateSwitchTo = generateSwitchTo(parsePosition, getHeaderFooterLabels, getPanel, savePosition, containers, context, options),
          switchToWithoutSave = _genrateSwitchTo.switchToWithoutSave,
          switchTo = _genrateSwitchTo.switchTo;

      var _generateAddRemove = generateAddRemove(positionToIndex, getHeaderFooterLabels, getPanel, savePosition, switchTo, containers, context, options),
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

      switchToWithoutSave(loadPosition());
      handleHashChangeEvent(parseHashPosition, switchTo, context, options);
      hahdleClickEvent(switchTo, containers, context, options); //controller

      var controller = {
        getCount: getCount,
        getCurrentIndex: getCurrentIndex,
        getTabItemName: getTabItemName,
        getTabItemIndexByName: getTabItemIndexByName,
        isTabItemDisabled: isTabItemDisabled,
        isTabItemHidden: isTabItemHidden,
        getHeaderLabel: getHeaderLabel,
        getFooterLabel: getFooterLabel,
        getHeaderFooterLabels: getHeaderFooterLabels,
        getPanel: getPanel,
        getCurrentHeaderLabel: getCurrentHeaderLabel,
        getCurrentFooterLabel: getCurrentFooterLabel,
        getCurrentHeaderFooterLabels: getCurrentHeaderFooterLabels,
        getCurrentPanel: getCurrentPanel,
        setTabItemName: setTabItemName,
        setTabItemDisabled: setTabItemDisabled,
        setTabItemHidden: setTabItemHidden,
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
