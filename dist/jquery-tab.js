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
        tabItemNameAttr: 'tabItemName',
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

      var getCurrentName = function getCurrentName() {
        return context.currentName;
      };

      var getName = function getName(index) {
        if (index >= 0 && index < context.itemCount) {
          return $panelContainerLeaf.children().eq(index).data(tabItemNameAttr);
        }
      };

      var getIndexByName = function getIndexByName(name) {
        var tabItemIndex = -1;
        $panelContainerLeaf.children().each(function (index, panel) {
          var $panel = $(panel);

          if ($panel.data(tabItemNameAttr) === name) {
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
          return getIndexByName(position);
        } else {
          return -1;
        }
      };

      var parsePosition = function parsePosition(position) {
        if (typeof position === 'number') {
          return {
            index: position,
            name: getName(position)
          };
        } else if (isFinite(position)) {
          var index = parseInt(position);
          return {
            index: index,
            name: getName(index)
          };
        } else if (position) {
          return {
            index: getIndexByName(position),
            name: position
          };
        } else {
          return {
            index: -1,
            name: undefined
          };
        }
      };

      var isDisabled = function isDisabled(position) {
        var index = positionToIndex(position);

        if (index >= 0 && index < context.itemCount) {
          return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
        }
      };

      var isEnabled = function isEnabled(position) {
        return !isDisabled(position);
      };

      var isHidden = function isHidden(position) {
        var index = positionToIndex(position);

        if (index >= 0 && index < context.itemCount) {
          return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
        }
      };

      var isVisible = function isVisible(position) {
        return !isHidden(position);
      };

      var getHeaderLabel = function getHeaderLabel(position) {
        if ($headerLabelContainerLeaf) {
          var index = positionToIndex(position);

          if (index >= 0 && index < context.itemCount) {
            return $headerLabelContainerLeaf.children().eq(index);
          }
        }

        return $([]);
      };

      var getFooterLabel = function getFooterLabel(position) {
        if ($footerLabelContainerLeaf) {
          var index = positionToIndex(position);

          if (index >= 0 && index < context.itemCount) {
            return $footerLabelContainerLeaf.children().eq(index);
          }
        }

        return $([]);
      };

      var getHeaderFooterLabels = function getHeaderFooterLabels(position) {
        var index = positionToIndex(position);

        if (index >= 0 && index < context.itemCount) {
          return getHeaderLabel(index).add(getFooterLabel(index));
        }

        return $([]);
      };

      var getPanel = function getPanel(position) {
        var index = positionToIndex(position);

        if (index >= 0 && index < context.itemCount) {
          return $panelContainerLeaf.children().eq(index);
        }

        return $([]);
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
        getCurrentName: getCurrentName,
        getName: getName,
        getIndexByName: getIndexByName,
        positionToIndex: positionToIndex,
        parsePosition: parsePosition,
        isDisabled: isDisabled,
        isEnabled: isEnabled,
        isHidden: isHidden,
        isVisible: isVisible,
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

      var setName = function setName(position, name) {
        fnGetHeaderFooterLabels(position).data(tabItemNameAttr, name);
        fnGetPanel(position).data(tabItemNameAttr, name);
      };

      var setDisabled = function setDisabled(position) {
        var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
        fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
      };

      var setEnabled = function setEnabled(position) {
        var enabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        setDisabled(position, !enabled);
      };

      var setHidden = function setHidden(position) {
        var hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
        fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
      };

      var setVisible = function setVisible(position) {
        var visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        setHidden(position, !visible);
      };

      return {
        setName: setName,
        setDisabled: setDisabled,
        setEnabled: setEnabled,
        setHidden: setHidden,
        setVisible: setVisible
      };
    }

    var HASH_PREFIX = '#';
    var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;

    function isValidPosition(position) {
      return position !== -1 && position !== undefined && position !== null && position !== '';
    }

    function generateSaveLoadIndex(containers, options) {
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
          return searchResult[1];
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

    var SwitchDirection;

    (function (SwitchDirection) {
      SwitchDirection[SwitchDirection["Backward"] = 0] = "Backward";
      SwitchDirection[SwitchDirection["Forward"] = 1] = "Forward";
    })(SwitchDirection || (SwitchDirection = {}));

    function generateSwitch(fnPositionToIndex, fnParsePosition, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, containers, context, options) {
      var switchToWithoutSave = function switchToWithoutSave(newPosition) {
        var _fnParsePosition = fnParsePosition(newPosition),
            newIndex = _fnParsePosition.index,
            newName = _fnParsePosition.name;

        if (newIndex < 0 || newIndex >= context.itemCount || newIndex === context.currentIndex) {
          return;
        }

        var $tabContainer = containers.$tabContainer;
        var oldIndex = context.currentIndex,
            oldName = context.currentName;
        var onBeforeSwitch = options.onBeforeSwitch,
            onAfterSwitch = options.onAfterSwitch; //before switching callback

        if (typeof onBeforeSwitch === 'function') {
          onBeforeSwitch.call($tabContainer, {
            index: oldIndex,
            name: oldName
          }, {
            index: newIndex,
            name: newName
          });
        } //update state


        var $newLabel = fnGetHeaderFooterLabels(newIndex);
        var $newPanel = fnGetPanel(newIndex);
        updateActiveState($newLabel, $newPanel, options); //finalize

        context.currentIndex = newIndex;
        context.currentName = newName; //after switching callback

        if (typeof onAfterSwitch === 'function') {
          onAfterSwitch.call($tabContainer, {
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

        return result;
      };

      var _switchNeighbor = function _switchNeighbor(direction, switchOptions) {
        var opts = switchOptions || {};
        var includeDisabled = opts.includeDisabled,
            includeHidden = opts.includeHidden,
            loop = opts.loop,
            exclude = opts.exclude;
        var excludeIndecies = exclude && exclude.length ? $.map(exclude, function (position) {
          return fnPositionToIndex(position);
        }) : [];
        var $panelContainer = containers.$panelContainer;
        var $panelItems = $panelContainer.children();
        var itemCount = context.itemCount,
            currentIndex = context.currentIndex;
        var disabledPanelItemClass = options.disabledPanelItemClass,
            hiddenPanelItemClass = options.hiddenPanelItemClass;
        var maxIterationCount = -1;

        if (loop) {
          if (currentIndex >= 0 && currentIndex < itemCount) {
            maxIterationCount = itemCount - 1;
          } else {
            maxIterationCount = itemCount;
          }
        } else if (direction === SwitchDirection.Backward) {
          maxIterationCount = currentIndex;
        } else if (direction === SwitchDirection.Forward) {
          maxIterationCount = itemCount - currentIndex - 1;
        }

        var iterationStep = direction === SwitchDirection.Backward ? -1 : 1;

        for (var i = 1; i <= maxIterationCount; i++) {
          var panelIndex = (currentIndex + i * iterationStep + itemCount) % itemCount;

          if ($.inArray(panelIndex, excludeIndecies) >= 0) {
            continue;
          }

          var $panel = $panelItems.eq(panelIndex);
          var panelIsDisabled = $panel.hasClass(disabledPanelItemClass);
          var panelIsHidden = $panel.hasClass(hiddenPanelItemClass);

          if (!panelIsDisabled && !panelIsHidden || includeDisabled && !panelIsHidden || !panelIsDisabled && includeHidden || includeDisabled && includeHidden) {
            return switchTo(panelIndex);
          }
        }
      };

      var switchPrevious = function switchPrevious(switchOptions) {
        return _switchNeighbor(SwitchDirection.Backward, switchOptions);
      };

      var switchNext = function switchNext(switchOptions) {
        return _switchNeighbor(SwitchDirection.Forward, switchOptions);
      };

      return {
        switchToWithoutSave: switchToWithoutSave,
        switchTo: switchTo,
        switchPrevious: switchPrevious,
        switchNext: switchNext
      };
    }

    function createLabelItem(tabItem, options) {
      var $labelItem = $(options.labelItemTemplate).addClass(options.labelItemClass).attr('role', 'tab');
      var $labelItemLeaf = getLeafElement($labelItem);
      $labelItemLeaf.append(tabItem.title);
      return {
        $labelItem: $labelItem,
        $labelItemLeaf: $labelItemLeaf
      };
    }

    function createPanelItem(tabItem, options) {
      var $panelItem = $(options.panelItemTemplate).addClass(options.panelItemClass).attr('role', 'tabpanel');
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
        $labelItem.data(tabItemNameAttr, name);
        $panelItem.data(tabItemNameAttr, name);
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

    function generateAddRemove(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, fnSwitchTo, fnSwitchPrevious, fnSwitchNext, containers, context, options) {
      var _switchIfInitial = function _switchIfInitial() {
        if (context.currentIndex === -1 && context.itemCount) {
          fnSwitchTo(0);
        }
      };

      var insertTabItemWithoutSwitch = function insertTabItemWithoutSwitch(position, tabItem) {
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf,
            $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf,
            $panelContainerLeaf = containers.$panelContainerLeaf;

        var _createTabItem = createTabItem(tabItem, context, options),
            $panelItem = _createTabItem.$panelItem,
            cloneLabelItem = _createTabItem.cloneLabelItem;

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

            if (!context.currentName) {
              fnSavePosition(context.currentIndex);
            }
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

      var insertTabItem = function insertTabItem(position, tabItem) {
        insertTabItemWithoutSwitch(position, tabItem);

        _switchIfInitial();
      };

      var addTabItemWithoutSwitch = function addTabItemWithoutSwitch(tabItem) {
        insertTabItemWithoutSwitch(context.itemCount, tabItem);
      };

      var addTabItem = function addTabItem(tabItem) {
        addTabItemWithoutSwitch(tabItem);

        _switchIfInitial();
      };

      var insertWithoutSwitch = function insertWithoutSwitch(position, sourceRegion) {
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
          insertTabItemWithoutSwitch(index + inserted, tabItem);
          inserted++;
        }
      };

      var insert = function insert(sourceRegion, position) {
        insertWithoutSwitch(position, sourceRegion);

        _switchIfInitial();
      };

      var addWithoutSwitch = function addWithoutSwitch(sourceRegion) {
        insertWithoutSwitch(context.itemCount, sourceRegion);
      };

      var add = function add(sourceRegion) {
        addWithoutSwitch(sourceRegion);

        _switchIfInitial();
      };

      var remove = function remove() {
        if (!arguments.length) {
          return;
        }

        var removeIndecies = [];

        for (var i = 0, len = arguments.length; i < len; i++) {
          var removeIndex = fnPositionToIndex(i < 0 || arguments.length <= i ? undefined : arguments[i]);

          if (removeIndex >= 0 && removeIndex < context.itemCount && $.inArray(removeIndex, removeIndecies) === -1) {
            removeIndecies.push(removeIndex);
          }
        }

        if (!removeIndecies.length) {
          return;
        }

        removeIndecies.sort(function (prev, next) {
          return next - prev;
        });

        if (context.itemCount > 1 && $.inArray(context.currentIndex, removeIndecies) >= 0) {
          fnSwitchNext({
            exclude: removeIndecies
          }) || fnSwitchPrevious({
            exclude: removeIndecies
          }) || fnSwitchNext({
            includeDisabled: true,
            exclude: removeIndecies
          }) || fnSwitchPrevious({
            includeDisabled: true,
            exclude: removeIndecies
          }) || fnSwitchNext({
            includeHidden: true,
            exclude: removeIndecies
          }) || fnSwitchPrevious({
            includeHidden: true,
            exclude: removeIndecies
          }) || fnSwitchNext({
            includeDisabled: true,
            includeHidden: true,
            exclude: removeIndecies
          }) || fnSwitchPrevious({
            includeDisabled: true,
            includeHidden: true,
            exclude: removeIndecies
          });
        }

        var currentIndexChanged = false;

        for (var _i = 0, _len = removeIndecies.length; _i < _len; _i++) {
          var _removeIndex = removeIndecies[_i];
          var $labelItems = fnGetHeaderFooterLabels(_removeIndex);
          var $panelItem = fnGetPanel(_removeIndex);
          $labelItems.remove();
          $panelItem.remove();

          if (_removeIndex < context.currentIndex) {
            context.currentIndex--;
            currentIndexChanged = true;
          }

          context.itemCount--;
        }

        if (context.itemCount === 0) {
          context.currentIndex = -1;
          context.currentName = undefined;
        } else if (currentIndexChanged && !context.currentName) {
          fnSavePosition(context.currentIndex);
        }

        return removeIndecies.length;
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

    function handleHashChangeEvent(fnParseHashPosition, fnSwitchTo, options) {
      if (options.statusHashTemplate && window) {
        $(window).on('hashchange', function () {
          var position = fnParseHashPosition();
          fnSwitchTo(position);
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

        var tabItemName = $label.data(tabItemNameAttr);
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

        var tabItemName = $label.data(tabItemNameAttr);
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
          getCurrentName = _generateGetters.getCurrentName,
          getName = _generateGetters.getName,
          getIndexByName = _generateGetters.getIndexByName,
          positionToIndex = _generateGetters.positionToIndex,
          parsePosition = _generateGetters.parsePosition,
          isDisabled = _generateGetters.isDisabled,
          isEnabled = _generateGetters.isEnabled,
          isHidden = _generateGetters.isHidden,
          isVisible = _generateGetters.isVisible,
          getHeaderLabel = _generateGetters.getHeaderLabel,
          getFooterLabel = _generateGetters.getFooterLabel,
          getHeaderFooterLabels = _generateGetters.getHeaderFooterLabels,
          getPanel = _generateGetters.getPanel,
          getCurrentHeaderLabel = _generateGetters.getCurrentHeaderLabel,
          getCurrentFooterLabel = _generateGetters.getCurrentFooterLabel,
          getCurrentHeaderFooterLabels = _generateGetters.getCurrentHeaderFooterLabels,
          getCurrentPanel = _generateGetters.getCurrentPanel; //tab item setter


      var _generateTabItemSette = generateTabItemSetter(positionToIndex, getHeaderFooterLabels, getPanel, options),
          setName = _generateTabItemSette.setName,
          setDisabled = _generateTabItemSette.setDisabled,
          setEnabled = _generateTabItemSette.setEnabled,
          setHidden = _generateTabItemSette.setHidden,
          setVisible = _generateTabItemSette.setVisible; //save/load


      var _generateSaveLoadInde = generateSaveLoadIndex(containers, options),
          savePosition = _generateSaveLoadInde.savePosition,
          loadPosition = _generateSaveLoadInde.loadPosition,
          parseHashPosition = _generateSaveLoadInde.parseHashPosition; //methods


      var _genetateSwitch = generateSwitch(positionToIndex, parsePosition, getHeaderFooterLabels, getPanel, savePosition, containers, context, options),
          switchToWithoutSave = _genetateSwitch.switchToWithoutSave,
          switchTo = _genetateSwitch.switchTo,
          switchPrevious = _genetateSwitch.switchPrevious,
          switchNext = _genetateSwitch.switchNext;

      var _generateAddRemove = generateAddRemove(positionToIndex, getHeaderFooterLabels, getPanel, savePosition, switchTo, switchPrevious, switchNext, containers, context, options),
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

      if (context.itemCount > 0) {
        switchToWithoutSave(loadPosition());

        if (context.currentIndex === -1) {
          switchToWithoutSave(0);
        }
      }

      handleHashChangeEvent(parseHashPosition, switchTo, options);
      hahdleClickEvent(switchTo, containers, context, options); //controller

      var controller = {
        getCount: getCount,
        getCurrentIndex: getCurrentIndex,
        getCurrentName: getCurrentName,
        getName: getName,
        getIndexByName: getIndexByName,
        isDisabled: isDisabled,
        isEnabled: isEnabled,
        isHidden: isHidden,
        isVisible: isVisible,
        getHeaderLabel: getHeaderLabel,
        getFooterLabel: getFooterLabel,
        getHeaderFooterLabels: getHeaderFooterLabels,
        getPanel: getPanel,
        getCurrentHeaderLabel: getCurrentHeaderLabel,
        getCurrentFooterLabel: getCurrentFooterLabel,
        getCurrentHeaderFooterLabels: getCurrentHeaderFooterLabels,
        getCurrentPanel: getCurrentPanel,
        setName: setName,
        setDisabled: setDisabled,
        setEnabled: setEnabled,
        setHidden: setHidden,
        setVisible: setVisible,
        updateFixedHeight: updateFixedHeight,
        switchTo: switchTo,
        switchPrevious: switchPrevious,
        switchNext: switchNext,
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
