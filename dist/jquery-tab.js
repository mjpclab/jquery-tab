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
        mode: "horizontal" /* Horizontal */,
        activePosition: 0,
        createEmptyTab: false,
        onBeforeSwitch: undefined,
        onAfterSwitch: undefined,
        titleSelector: 'h1,h2,h3,h4,h5,h6',
        fnGetTitleContent: function ($title) {
            return $title.contents();
        },
        keepTitleVisible: false,
        fnGetTabItemName: function ($title) {
            return $title.attr('data-tab-item-name');
        },
        fnIsTabItemDisabled: function ($title) {
            var attrDisabled = $title.attr('data-tab-item-disabled');
            return attrDisabled !== undefined && attrDisabled !== 'false';
        },
        fnIsTabItemHidden: function ($title) {
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
        var tabContainerClass = options.tabContainerClass, labelContainerClass = options.labelContainerClass, labelItemClass = options.labelItemClass, panelItemClass = options.panelItemClass;
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
        var $labelContainer = $(options.labelContainerTemplate)
            .addClass(options.labelContainerClass)
            .attr('role', 'tablist');
        if (options.mode === "vertical" /* Vertical */) {
            $labelContainer.attr('aria-orientation', 'vertical');
        }
        var $labelContainerLeaf = getLeafElement($labelContainer);
        return { $labelContainer: $labelContainer, $labelContainerLeaf: $labelContainerLeaf };
    }

    function createHeaderLabelContainer(options) {
        var $headerLabelContainer;
        var $headerLabelContainerLeaf;
        if (options.showHeaderLabelContainer) {
            var _a = createLabelContainer(options), $labelContainer = _a.$labelContainer, $labelContainerLeaf = _a.$labelContainerLeaf;
            $labelContainer.addClass(options.headerLabelContainerClass);
            $headerLabelContainer = $labelContainer;
            $headerLabelContainerLeaf = $labelContainerLeaf;
        }
        return { $headerLabelContainer: $headerLabelContainer, $headerLabelContainerLeaf: $headerLabelContainerLeaf };
    }

    function createPanelContainer(options) {
        var $panelContainer = $(options.panelContainerTemplate).addClass(options.panelContainerClass);
        var $panelContainerLeaf = getLeafElement($panelContainer);
        return { $panelContainer: $panelContainer, $panelContainerLeaf: $panelContainerLeaf };
    }

    function createFooterLabelContainer(options) {
        var $footerLabelContainer;
        var $footerLabelContainerLeaf;
        if (options.showFooterLabelContainer) {
            var _a = createLabelContainer(options), $labelContainer = _a.$labelContainer, $labelContainerLeaf = _a.$labelContainerLeaf;
            $labelContainer.addClass(options.footerLabelContainerClass);
            $footerLabelContainer = $labelContainer;
            $footerLabelContainerLeaf = $labelContainerLeaf;
        }
        return { $footerLabelContainer: $footerLabelContainer, $footerLabelContainerLeaf: $footerLabelContainerLeaf };
    }

    function createTabContainer(options) {
        //container
        var $tabContainer = $(options.tabContainerTemplate).addClass(options.tabContainerClass);
        if (options.mode === "horizontal" /* Horizontal */) {
            $tabContainer.addClass(options.horizontalTabContainerClass);
        }
        else if (options.mode === "vertical" /* Vertical */) {
            $tabContainer.addClass(options.verticalTabContainerClass);
        }
        //header labels
        var _a = createHeaderLabelContainer(options), $headerLabelContainer = _a.$headerLabelContainer, $headerLabelContainerLeaf = _a.$headerLabelContainerLeaf;
        $headerLabelContainer && $tabContainer.append($headerLabelContainer);
        //panel
        var _b = createPanelContainer(options), $panelContainer = _b.$panelContainer, $panelContainerLeaf = _b.$panelContainerLeaf;
        $tabContainer.append($panelContainer);
        //footer labels
        var _c = createFooterLabelContainer(options), $footerLabelContainer = _c.$footerLabelContainer, $footerLabelContainerLeaf = _c.$footerLabelContainerLeaf;
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
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf, $panelContainerLeaf = containers.$panelContainerLeaf;
        var tabItemNameAttr = options.tabItemNameAttr, disabledPanelItemClass = options.disabledPanelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
        var getCount = function () {
            return context.itemCount;
        };
        var getCurrentIndex = function () {
            return context.currentIndex;
        };
        var getCurrentName = function () {
            return context.currentName;
        };
        var getName = function (index) {
            if (index >= 0 && index < context.itemCount) {
                return $panelContainerLeaf.children().eq(index).data(tabItemNameAttr);
            }
        };
        var getIndexByName = function (name) {
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
        var positionToIndex = function (position) {
            if (typeof position === 'number') {
                return position;
            }
            else if (isFinite(position)) {
                return parseInt(position);
            }
            else if (position !== undefined) {
                return getIndexByName(position);
            }
            else {
                return -1;
            }
        };
        var parsePosition = function (position) {
            if (typeof position === 'number') {
                return {
                    index: position,
                    name: getName(position)
                };
            }
            else if (isFinite(position)) {
                var index = parseInt(position);
                return {
                    index: index,
                    name: getName(index)
                };
            }
            else if (position) {
                return {
                    index: getIndexByName(position),
                    name: position
                };
            }
            else {
                return {
                    index: -1,
                    name: undefined
                };
            }
        };
        var isDisabled = function (position) {
            var index = positionToIndex(position);
            if (index >= 0 && index < context.itemCount) {
                return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
            }
        };
        var isEnabled = function (position) {
            return !isDisabled(position);
        };
        var isHidden = function (position) {
            var index = positionToIndex(position);
            if (index >= 0 && index < context.itemCount) {
                return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
            }
        };
        var isVisible = function (position) {
            return !isHidden(position);
        };
        var getHeaderLabel = function (position) {
            if ($headerLabelContainerLeaf) {
                var index = positionToIndex(position);
                if (index >= 0 && index < context.itemCount) {
                    return $headerLabelContainerLeaf.children().eq(index);
                }
            }
            return $([]);
        };
        var getFooterLabel = function (position) {
            if ($footerLabelContainerLeaf) {
                var index = positionToIndex(position);
                if (index >= 0 && index < context.itemCount) {
                    return $footerLabelContainerLeaf.children().eq(index);
                }
            }
            return $([]);
        };
        var getHeaderFooterLabels = function (position) {
            var index = positionToIndex(position);
            if (index >= 0 && index < context.itemCount) {
                return getHeaderLabel(index).add(getFooterLabel(index));
            }
            return $([]);
        };
        var getPanel = function (position) {
            var index = positionToIndex(position);
            if (index >= 0 && index < context.itemCount) {
                return $panelContainerLeaf.children().eq(index);
            }
            return $([]);
        };
        var getCurrentHeaderLabel = function () {
            return getHeaderLabel(context.currentIndex);
        };
        var getCurrentFooterLabel = function () {
            return getFooterLabel(context.currentIndex);
        };
        var getCurrentHeaderFooterLabels = function () {
            return getHeaderFooterLabels(context.currentIndex);
        };
        var getCurrentPanel = function () {
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
            isDisabled: isDisabled, isEnabled: isEnabled, isHidden: isHidden, isVisible: isVisible,
            getHeaderLabel: getHeaderLabel, getFooterLabel: getFooterLabel, getHeaderFooterLabels: getHeaderFooterLabels,
            getPanel: getPanel,
            getCurrentHeaderLabel: getCurrentHeaderLabel, getCurrentFooterLabel: getCurrentFooterLabel, getCurrentHeaderFooterLabels: getCurrentHeaderFooterLabels,
            getCurrentPanel: getCurrentPanel
        };
    }

    function generateTabItemSetter(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, options) {
        var tabItemNameAttr = options.tabItemNameAttr, disabledLabelItemClass = options.disabledLabelItemClass, disabledPanelItemClass = options.disabledPanelItemClass, hiddenLabelItemClass = options.hiddenLabelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
        var setName = function (position, name) {
            fnGetHeaderFooterLabels(position).data(tabItemNameAttr, name);
            fnGetPanel(position).data(tabItemNameAttr, name);
        };
        var setDisabled = function (position, disabled) {
            if (disabled === void 0) { disabled = true; }
            fnGetHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
            fnGetPanel(position).toggleClass(disabledPanelItemClass, disabled);
        };
        var setEnabled = function (position, enabled) {
            if (enabled === void 0) { enabled = true; }
            setDisabled(position, !enabled);
        };
        var setHidden = function (position, hidden) {
            if (hidden === void 0) { hidden = true; }
            fnGetHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
            fnGetPanel(position).toggleClass(hiddenPanelItemClass, hidden);
        };
        var setVisible = function (position, visible) {
            if (visible === void 0) { visible = true; }
            setHidden(position, !visible);
        };
        return { setName: setName, setDisabled: setDisabled, setEnabled: setEnabled, setHidden: setHidden, setVisible: setVisible };
    }

    var HASH_PREFIX = '#';
    var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
    function isValidPosition(position) {
        return position !== -1 && position !== undefined && position !== null && position !== '';
    }
    function generateSaveLoadIndex(containers, options) {
        var $region = containers.$region, $tabContainer = containers.$tabContainer;
        var statusFieldSelector = options.statusFieldSelector, statusHashTemplate = options.statusHashTemplate, statusHashSeparator = options.statusHashSeparator, fnSavePosition = options.fnSavePosition, fnLoadPosition = options.fnLoadPosition, activePosition = options.activePosition;
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
                }
                else {
                    if (hash !== HASH_PREFIX) {
                        if (hash.length) {
                            hash += statusHashSeparator;
                        }
                        else {
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
        var parseHashPosition = function () {
            var searchResult = location.hash.match(RE_STATUS_HASH);
            if (searchResult && searchResult[1]) {
                return searchResult[1];
            }
            return -1;
        };
        var loadPosition = function () {
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
        return { savePosition: savePosition, loadPosition: loadPosition, parseHashPosition: parseHashPosition };
    }

    function updateActiveState($activeLabelItem, $activePanelItem, options) {
        var activeLabelItemClass = options.activeLabelItemClass, inactiveLabelItemClass = options.inactiveLabelItemClass, activePanelItemClass = options.activePanelItemClass, inactivePanelItemClass = options.inactivePanelItemClass;
        //label items
        $activeLabelItem
            .removeClass(inactiveLabelItemClass)
            .addClass(activeLabelItemClass)
            .attr('aria-selected', 'true')
            .attr('aria-expanded', 'true');
        $activeLabelItem.siblings()
            .removeClass(activeLabelItemClass)
            .addClass(inactiveLabelItemClass)
            .attr('aria-selected', 'false')
            .attr('aria-expanded', 'false');
        //panel items
        $activePanelItem
            .removeClass(inactivePanelItemClass)
            .addClass(activePanelItemClass)
            .attr('aria-hidden', 'false');
        $activePanelItem.siblings()
            .removeClass(activePanelItemClass)
            .addClass(inactivePanelItemClass)
            .attr('aria-hidden', 'true');
    }

    var SwitchDirection;
    (function (SwitchDirection) {
        SwitchDirection[SwitchDirection["Backward"] = 0] = "Backward";
        SwitchDirection[SwitchDirection["Forward"] = 1] = "Forward";
    })(SwitchDirection || (SwitchDirection = {}));
    function generateSwitch(fnPositionToIndex, fnParsePosition, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, containers, context, options) {
        var switchToWithoutSave = function (newPosition) {
            var _a = fnParsePosition(newPosition), newIndex = _a.index, newName = _a.name;
            if (newIndex < 0 || newIndex >= context.itemCount || newIndex === context.currentIndex) {
                return;
            }
            var $tabContainer = containers.$tabContainer;
            var oldIndex = context.currentIndex, oldName = context.currentName;
            var onBeforeSwitch = options.onBeforeSwitch, onAfterSwitch = options.onAfterSwitch;
            //before switching callback
            if (typeof (onBeforeSwitch) === 'function') {
                onBeforeSwitch.call($tabContainer, { index: oldIndex, name: oldName }, { index: newIndex, name: newName });
            }
            //update state
            var $newLabel = fnGetHeaderFooterLabels(newIndex);
            var $newPanel = fnGetPanel(newIndex);
            updateActiveState($newLabel, $newPanel, options);
            //finalize
            context.currentIndex = newIndex;
            context.currentName = newName;
            //after switching callback
            if (typeof (onAfterSwitch) === 'function') {
                onAfterSwitch.call($tabContainer, { index: oldIndex, name: oldName }, { index: newIndex, name: newName });
            }
            return { index: newIndex, name: newName };
        };
        var switchTo = function (newPosition) {
            var result = switchToWithoutSave(newPosition);
            if (result) {
                var index = result.index, name_1 = result.name;
                fnSavePosition(name_1 || index);
            }
            return result;
        };
        var _switchNeighbor = function (direction, switchOptions) {
            var opts = switchOptions || {};
            var includeDisabled = opts.includeDisabled, includeHidden = opts.includeHidden, loop = opts.loop, exclude = opts.exclude;
            var excludeIndecies = exclude && exclude.length ? $.map(exclude, function (position) {
                return fnPositionToIndex(position);
            }) : [];
            var $panelContainer = containers.$panelContainer;
            var $panelItems = $panelContainer.children();
            var itemCount = context.itemCount, currentIndex = context.currentIndex;
            var disabledPanelItemClass = options.disabledPanelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
            var maxIterationCount = -1;
            if (loop) {
                if (currentIndex >= 0 && currentIndex < itemCount) {
                    maxIterationCount = itemCount - 1;
                }
                else {
                    maxIterationCount = itemCount;
                }
            }
            else if (direction === SwitchDirection.Backward) {
                maxIterationCount = currentIndex;
            }
            else if (direction === SwitchDirection.Forward) {
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
                if ((!panelIsDisabled && !panelIsHidden) ||
                    (includeDisabled && !panelIsHidden) ||
                    (!panelIsDisabled && includeHidden) ||
                    (includeDisabled && includeHidden)) {
                    return switchTo(panelIndex);
                }
            }
        };
        var switchPrevious = function (switchOptions) {
            return _switchNeighbor(SwitchDirection.Backward, switchOptions);
        };
        var switchNext = function (switchOptions) {
            return _switchNeighbor(SwitchDirection.Forward, switchOptions);
        };
        return { switchToWithoutSave: switchToWithoutSave, switchTo: switchTo, switchPrevious: switchPrevious, switchNext: switchNext };
    }

    function createLabelItem(tabItem, options) {
        var $labelItem = $(options.labelItemTemplate)
            .addClass(options.labelItemClass)
            .attr('role', 'tab');
        var $labelItemLeaf = getLeafElement($labelItem);
        $labelItemLeaf.append(tabItem.title);
        return { $labelItem: $labelItem, $labelItemLeaf: $labelItemLeaf };
    }

    function createPanelItem(tabItem, options) {
        var $panelItem = $(options.panelItemTemplate)
            .addClass(options.panelItemClass)
            .attr('role', 'tabpanel');
        var $panelItemLeaf = getLeafElement($panelItem);
        $panelItemLeaf.append(tabItem.content);
        return { $panelItem: $panelItem, $panelItemLeaf: $panelItemLeaf };
    }

    function createTabItem(tabItem, context, options) {
        var name = tabItem.name, disabled = tabItem.disabled, hidden = tabItem.hidden;
        var tabItemNameAttr = options.tabItemNameAttr, disabledLabelItemClass = options.disabledLabelItemClass, disabledPanelItemClass = options.disabledPanelItemClass, hiddenLabelItemClass = options.hiddenLabelItemClass, hiddenPanelItemClass = options.hiddenPanelItemClass;
        var _a = createLabelItem(tabItem, options), $labelItem = _a.$labelItem, $labelItemLeaf = _a.$labelItemLeaf;
        var _b = createPanelItem(tabItem, options), $panelItem = _b.$panelItem, $panelItemLeaf = _b.$panelItemLeaf;
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
        var containerId = context.containerId, itemId = context.nextItemId;
        context.nextItemId++;
        var nextCloneId = 0;
        var labelItemIdPrefix = "__jquery-tab-label__" + containerId + "__" + itemId;
        var panelItemIdPrefix = "__jquery-tab-panel__" + containerId + "__" + itemId;
        var labelItemId = labelItemIdPrefix + "__" + nextCloneId;
        var panelItemId = panelItemIdPrefix;
        var cloneLabelItem = function () {
            var clonedLabelItemId = labelItemIdPrefix + "__" + nextCloneId++;
            if (clonedLabelItemId === labelItemId) {
                return $labelItem;
            }
            return $labelItem.clone().attr('id', clonedLabelItemId);
        };
        $labelItem.attr('id', labelItemId).attr('aria-controls', panelItemIdPrefix);
        $panelItem.attr('id', panelItemId).attr('aria-labelledby', labelItemId);
        return { $labelItem: $labelItem, $labelItemLeaf: $labelItemLeaf, $panelItem: $panelItem, $panelItemLeaf: $panelItemLeaf, cloneLabelItem: cloneLabelItem };
    }

    function generateAddRemove(fnPositionToIndex, fnGetHeaderFooterLabels, fnGetPanel, fnSavePosition, fnSwitchTo, fnSwitchPrevious, fnSwitchNext, containers, context, options) {
        var _switchIfInitial = function () {
            if (context.currentIndex === -1 && context.itemCount) {
                fnSwitchTo(0);
            }
        };
        var insertTabItemWithoutSwitch = function (position, tabItem) {
            var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf, $panelContainerLeaf = containers.$panelContainerLeaf;
            var _a = createTabItem(tabItem, context, options), $panelItem = _a.$panelItem, cloneLabelItem = _a.cloneLabelItem;
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
            }
            else {
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
        var insertTabItem = function (position, tabItem) {
            insertTabItemWithoutSwitch(position, tabItem);
            _switchIfInitial();
        };
        var addTabItemWithoutSwitch = function (tabItem) {
            insertTabItemWithoutSwitch(context.itemCount, tabItem);
        };
        var addTabItem = function (tabItem) {
            addTabItemWithoutSwitch(tabItem);
            _switchIfInitial();
        };
        var insertWithoutSwitch = function (position, sourceRegion) {
            var titleSelector = options.titleSelector, fnGetTitleContent = options.fnGetTitleContent, keepTitleVisible = options.keepTitleVisible, fnGetTabItemName = options.fnGetTabItemName, fnIsTabItemDisabled = options.fnIsTabItemDisabled, fnIsTabItemHidden = options.fnIsTabItemHidden;
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
        var insert = function (sourceRegion, position) {
            insertWithoutSwitch(position, sourceRegion);
            _switchIfInitial();
        };
        var addWithoutSwitch = function (sourceRegion) {
            insertWithoutSwitch(context.itemCount, sourceRegion);
        };
        var add = function (sourceRegion) {
            addWithoutSwitch(sourceRegion);
            _switchIfInitial();
        };
        var remove = function () {
            var positions = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                positions[_i] = arguments[_i];
            }
            if (!positions.length) {
                return;
            }
            var removeIndecies = [];
            for (var i = 0, len = positions.length; i < len; i++) {
                var removeIndex = fnPositionToIndex(positions[i]);
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
                fnSwitchNext({ exclude: removeIndecies }) ||
                    fnSwitchPrevious({ exclude: removeIndecies }) ||
                    fnSwitchNext({ includeDisabled: true, exclude: removeIndecies }) ||
                    fnSwitchPrevious({ includeDisabled: true, exclude: removeIndecies }) ||
                    fnSwitchNext({ includeHidden: true, exclude: removeIndecies }) ||
                    fnSwitchPrevious({ includeHidden: true, exclude: removeIndecies }) ||
                    fnSwitchNext({ includeDisabled: true, includeHidden: true, exclude: removeIndecies }) ||
                    fnSwitchPrevious({ includeDisabled: true, includeHidden: true, exclude: removeIndecies });
            }
            var currentIndexChanged = false;
            for (var i = 0, len = removeIndecies.length; i < len; i++) {
                var removeIndex = removeIndecies[i];
                var $labelItems = fnGetHeaderFooterLabels(removeIndex);
                var $panelItem = fnGetPanel(removeIndex);
                $labelItems.remove();
                $panelItem.remove();
                if (removeIndex < context.currentIndex) {
                    context.currentIndex--;
                    currentIndexChanged = true;
                }
                context.itemCount--;
            }
            if (context.itemCount === 0) {
                context.currentIndex = -1;
                context.currentName = undefined;
            }
            else if (currentIndexChanged && !context.currentName) {
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
        var triggerEvents = options.triggerEvents, delayTriggerEvents = options.delayTriggerEvents, delayTriggerCancelEvents = options.delayTriggerCancelEvents, delayTriggerLatency = options.delayTriggerLatency, disabledLabelItemClass = options.disabledLabelItemClass, hiddenLabelItemClass = options.hiddenLabelItemClass;
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf;
        //handle delay trigger event
        var delayTriggerTimeoutHandler;
        var startDelayTrigger = function (position) {
            delayTriggerTimeoutHandler = setTimeout(function () {
                fnSwitchTo(position);
                delayTriggerTimeoutHandler = undefined;
            }, delayTriggerLatency);
        };
        var cancelDelayTrigger = function () {
            if (delayTriggerTimeoutHandler) {
                clearTimeout(delayTriggerTimeoutHandler);
                delayTriggerTimeoutHandler = undefined;
            }
        };
        var labelItemDelayClick = function (e) {
            if (e.currentTarget.parentNode !== e.delegateTarget) {
                return;
            }
            cancelDelayTrigger();
            var $label = $(e.currentTarget);
            var labelIndex = $label.index();
            if (labelIndex === context.currentIndex ||
                $label.hasClass(disabledLabelItemClass) ||
                $label.hasClass(hiddenLabelItemClass)) {
                return;
            }
            startDelayTrigger(labelIndex);
        };
        var labelItemCancelDelayClick = function (e) {
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
        }
        //handle trigger event
        var labelItemClick = function (e) {
            if (e.currentTarget.parentNode !== e.delegateTarget) {
                return;
            }
            cancelDelayTrigger();
            var $label = $(e.currentTarget);
            var labelIndex = $label.index();
            if (labelIndex === context.currentIndex ||
                $label.hasClass(disabledLabelItemClass) ||
                $label.hasClass(hiddenLabelItemClass)) {
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
        var containers = $.extend({ $region: $region }, createTabContainer(options));
        var $tabContainer = containers.$tabContainer;
        //getters
        var _a = generateGetters(containers, context, options), getCount = _a.getCount, getCurrentIndex = _a.getCurrentIndex, getCurrentName = _a.getCurrentName, getName = _a.getName, getIndexByName = _a.getIndexByName, positionToIndex = _a.positionToIndex, parsePosition = _a.parsePosition, isDisabled = _a.isDisabled, isEnabled = _a.isEnabled, isHidden = _a.isHidden, isVisible = _a.isVisible, getHeaderLabel = _a.getHeaderLabel, getFooterLabel = _a.getFooterLabel, getHeaderFooterLabels = _a.getHeaderFooterLabels, getPanel = _a.getPanel, getCurrentHeaderLabel = _a.getCurrentHeaderLabel, getCurrentFooterLabel = _a.getCurrentFooterLabel, getCurrentHeaderFooterLabels = _a.getCurrentHeaderFooterLabels, getCurrentPanel = _a.getCurrentPanel;
        //tab item setter
        var _b = generateTabItemSetter(positionToIndex, getHeaderFooterLabels, getPanel, options), setName = _b.setName, setDisabled = _b.setDisabled, setEnabled = _b.setEnabled, setHidden = _b.setHidden, setVisible = _b.setVisible;
        //save/load
        var _c = generateSaveLoadIndex(containers, options), savePosition = _c.savePosition, loadPosition = _c.loadPosition, parseHashPosition = _c.parseHashPosition;
        //methods
        var _d = generateSwitch(positionToIndex, parsePosition, getHeaderFooterLabels, getPanel, savePosition, containers, context, options), switchToWithoutSave = _d.switchToWithoutSave, switchTo = _d.switchTo, switchPrevious = _d.switchPrevious, switchNext = _d.switchNext;
        var _e = generateAddRemove(positionToIndex, getHeaderFooterLabels, getPanel, savePosition, switchTo, switchPrevious, switchNext, containers, context, options), addTabItem = _e.addTabItem, insertTabItem = _e.insertTabItem, add = _e.add, addWithoutSwitch = _e.addWithoutSwitch, insert = _e.insert, remove = _e.remove;
        addWithoutSwitch($region);
        //replace original content
        if (!context.itemCount && !options.createEmptyTab) {
            return;
        }
        $region.append($tabContainer);
        //check if param:fixed height
        var updateFixedHeight = generateUpdateFixedHeight(containers, options);
        updateFixedHeight();
        //show active panel
        if (context.itemCount > 0) {
            switchToWithoutSave(loadPosition());
            if (context.currentIndex === -1) {
                switchToWithoutSave(0);
            }
        }
        handleHashChangeEvent(parseHashPosition, switchTo, options);
        hahdleClickEvent(switchTo, containers, context, options);
        //controller
        var controller = {
            getCount: getCount,
            getCurrentIndex: getCurrentIndex,
            getCurrentName: getCurrentName,
            getName: getName,
            getIndexByName: getIndexByName,
            isDisabled: isDisabled, isEnabled: isEnabled, isHidden: isHidden, isVisible: isVisible,
            getHeaderLabel: getHeaderLabel, getFooterLabel: getFooterLabel, getHeaderFooterLabels: getHeaderFooterLabels,
            getPanel: getPanel,
            getCurrentHeaderLabel: getCurrentHeaderLabel, getCurrentFooterLabel: getCurrentFooterLabel, getCurrentHeaderFooterLabels: getCurrentHeaderFooterLabels,
            getCurrentPanel: getCurrentPanel,
            setName: setName, setDisabled: setDisabled, setEnabled: setEnabled, setHidden: setHidden, setVisible: setVisible,
            updateFixedHeight: updateFixedHeight,
            switchTo: switchTo, switchPrevious: switchPrevious, switchNext: switchNext,
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
