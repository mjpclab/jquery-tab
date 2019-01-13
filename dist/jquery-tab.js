(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    (global = global || self, global['jquery-tab'] = factory(global.jQuery));
}(this, function ($$1) { 'use strict';

    $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

    function normalizeOptions(options) {
        if (!options) {
            return;
        }
        var normalizedOptions = $$1.extend({}, options);
        var mode = normalizedOptions.mode;
        if (mode) {
            if (mode !== "horizontal" /* Horizontal */ && mode !== "vertical" /* Vertical */) {
                normalizedOptions.mode = "horizontal" /* Horizontal */;
            }
        }
        return normalizedOptions;
    }

    var defaultOptions = {
        triggerEvents: 'click',
        delayTriggerEvents: '',
        delayTriggerCancelEvents: '',
        delayTriggerLatency: 200,
        keyboardSwitch: true,
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

    function expandedOptions(defaultOptions, dataOptions, customOptions) {
        var options = $$1.extend({}, defaultOptions, dataOptions, customOptions);
        var mode = options.mode, tabContainerClass = options.tabContainerClass, labelContainerClass = options.labelContainerClass, labelItemClass = options.labelItemClass, panelContainerClass = options.panelContainerClass, panelItemClass = options.panelItemClass;
        var expandedOptions = $$1.extend(options, {
            modeTabContainerClass: tabContainerClass + '-' + mode,
            modeLabelContainerClass: labelContainerClass + '-' + mode,
            headerLabelContainerClass: labelContainerClass + '-header',
            modeHeaderLabelContainerClass: labelContainerClass + '-header' + '-' + mode,
            footerLabelContainerClass: labelContainerClass + '-footer',
            modeFooterLabelContainerClass: labelContainerClass + '-footer' + '-' + mode,
            tabItemNameAttr: 'tabItemName',
            activeLabelItemClass: labelItemClass + '-active',
            inactiveLabelItemClass: labelItemClass + '-inactive',
            disabledLabelItemClass: labelItemClass + '-disabled',
            hiddenLabelItemClass: labelItemClass + '-hidden',
            modePanelContainerClass: panelContainerClass + '-' + mode,
            activePanelItemClass: panelItemClass + '-active',
            inactivePanelItemClass: panelItemClass + '-inactive',
            disabledPanelItemClass: panelItemClass + '-disabled',
            hiddenPanelItemClass: panelItemClass + '-hidden',
            evaluatingPanelItemClass: panelItemClass + '-evaluating'
        });
        return expandedOptions;
    }

    var NUMBER_MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var currentTabberContainerId = -1;
    function getNextTabContainerId() {
        currentTabberContainerId = (currentTabberContainerId + 1) % NUMBER_MAX_SAFE_INTEGER;
        return currentTabberContainerId;
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
        var $labelContainer = $$1(options.labelContainerTemplate)
            .addClass(options.labelContainerClass)
            .addClass(options.modeLabelContainerClass)
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
            $labelContainer
                .addClass(options.headerLabelContainerClass)
                .addClass(options.modeHeaderLabelContainerClass);
            $headerLabelContainer = $labelContainer;
            $headerLabelContainerLeaf = $labelContainerLeaf;
        }
        return { $headerLabelContainer: $headerLabelContainer, $headerLabelContainerLeaf: $headerLabelContainerLeaf };
    }

    function createPanelContainer(options) {
        var $panelContainer = $$1(options.panelContainerTemplate)
            .addClass(options.panelContainerClass)
            .addClass(options.modePanelContainerClass);
        var $panelContainerLeaf = getLeafElement($panelContainer);
        return { $panelContainer: $panelContainer, $panelContainerLeaf: $panelContainerLeaf };
    }

    function createFooterLabelContainer(options) {
        var $footerLabelContainer;
        var $footerLabelContainerLeaf;
        if (options.showFooterLabelContainer) {
            var _a = createLabelContainer(options), $labelContainer = _a.$labelContainer, $labelContainerLeaf = _a.$labelContainerLeaf;
            $labelContainer
                .addClass(options.footerLabelContainerClass)
                .addClass(options.modeFooterLabelContainerClass);
            $footerLabelContainer = $labelContainer;
            $footerLabelContainerLeaf = $labelContainerLeaf;
        }
        return { $footerLabelContainer: $footerLabelContainer, $footerLabelContainerLeaf: $footerLabelContainerLeaf };
    }

    function createTabContainer(options) {
        //container
        var $tabContainer = $$1(options.tabContainerTemplate)
            .addClass(options.tabContainerClass)
            .addClass(options.modeTabContainerClass);
        var $tabContainerLeaf = getLeafElement($tabContainer);
        //header labels
        var _a = createHeaderLabelContainer(options), $headerLabelContainer = _a.$headerLabelContainer, $headerLabelContainerLeaf = _a.$headerLabelContainerLeaf;
        $headerLabelContainer && $tabContainerLeaf.append($headerLabelContainer);
        //panel
        var _b = createPanelContainer(options), $panelContainer = _b.$panelContainer, $panelContainerLeaf = _b.$panelContainerLeaf;
        $tabContainerLeaf.append($panelContainer);
        //footer labels
        var _c = createFooterLabelContainer(options), $footerLabelContainer = _c.$footerLabelContainer, $footerLabelContainerLeaf = _c.$footerLabelContainerLeaf;
        $footerLabelContainer && $tabContainerLeaf.append($footerLabelContainer);
        return {
            $tabContainer: $tabContainer,
            $tabContainerLeaf: $tabContainerLeaf,
            $headerLabelContainer: $headerLabelContainer,
            $headerLabelContainerLeaf: $headerLabelContainerLeaf,
            $panelContainer: $panelContainer,
            $panelContainerLeaf: $panelContainerLeaf,
            $footerLabelContainer: $footerLabelContainer,
            $footerLabelContainerLeaf: $footerLabelContainerLeaf
        };
    }

    var Getter = /** @class */ (function () {
        function Getter(containers, context, options) {
            this.containers = containers;
            this.context = context;
            this.options = options;
        }
        Getter.prototype.getCount = function () {
            return this.context.itemCount;
        };
        Getter.prototype.getCurrentIndex = function () {
            return this.context.currentIndex;
        };
        Getter.prototype.getCurrentName = function () {
            return this.context.currentName;
        };
        Getter.prototype.getName = function (index) {
            var itemCount = this.context.itemCount;
            if (index >= 0 && index < itemCount) {
                var $panelContainerLeaf = this.containers.$panelContainerLeaf;
                var tabItemNameAttr = this.options.tabItemNameAttr;
                return $panelContainerLeaf.children().eq(index).data(tabItemNameAttr);
            }
        };
        Getter.prototype.getIndexByName = function (name) {
            var tabItemIndex = -1;
            var $panelContainerLeaf = this.containers.$panelContainerLeaf;
            var tabItemNameAttr = this.options.tabItemNameAttr;
            $panelContainerLeaf.children().each(function (index, panel) {
                var $panel = $$1(panel);
                if ($panel.data(tabItemNameAttr) === name) {
                    tabItemIndex = index;
                    return false;
                }
            });
            return tabItemIndex;
        };
        Getter.prototype.positionToIndex = function (position) {
            if (typeof position === 'number') {
                return position;
            }
            else if (isFinite(position)) {
                return parseInt(position);
            }
            else if (position !== undefined) {
                return this.getIndexByName(position);
            }
            else {
                return -1;
            }
        };
        Getter.prototype.normalizePosition = function (position) {
            if (typeof position === 'number') {
                return {
                    index: position,
                    name: this.getName(position)
                };
            }
            else if (isFinite(position)) {
                var index = parseInt(position);
                return {
                    index: index,
                    name: this.getName(index)
                };
            }
            else if (position) {
                return {
                    index: this.getIndexByName(position),
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
        Getter.prototype.isDisabled = function (position) {
            var itemCount = this.context.itemCount;
            var index = this.positionToIndex(position);
            if (index >= 0 && index < itemCount) {
                var $panelContainerLeaf = this.containers.$panelContainerLeaf;
                var disabledPanelItemClass = this.options.disabledPanelItemClass;
                return $panelContainerLeaf.children().eq(index).hasClass(disabledPanelItemClass);
            }
        };
        Getter.prototype.isEnabled = function (position) {
            return !this.isDisabled(position);
        };
        Getter.prototype.isHidden = function (position) {
            var itemCount = this.context.itemCount;
            var index = this.positionToIndex(position);
            if (index >= 0 && index < itemCount) {
                var $panelContainerLeaf = this.containers.$panelContainerLeaf;
                var hiddenPanelItemClass = this.options.hiddenPanelItemClass;
                return $panelContainerLeaf.children().eq(index).hasClass(hiddenPanelItemClass);
            }
        };
        Getter.prototype.isVisible = function (position) {
            return !this.isHidden(position);
        };
        Getter.prototype.getLabel = function (position, $labelContainerLeaf) {
            if ($labelContainerLeaf) {
                var itemCount = this.context.itemCount;
                var index = this.positionToIndex(position);
                if (index >= 0 && index < itemCount) {
                    return $labelContainerLeaf.children().eq(index);
                }
            }
            return $$1([]);
        };
        Getter.prototype.getHeaderLabel = function (position) {
            var $headerLabelContainerLeaf = this.containers.$headerLabelContainerLeaf;
            return this.getLabel(position, $headerLabelContainerLeaf);
        };
        Getter.prototype.getFooterLabel = function (position) {
            var $footerLabelContainerLeaf = this.containers.$footerLabelContainerLeaf;
            return this.getLabel(position, $footerLabelContainerLeaf);
        };
        Getter.prototype.getHeaderFooterLabels = function (position) {
            var itemCount = this.context.itemCount;
            var index = this.positionToIndex(position);
            if (index >= 0 && index < itemCount) {
                return this.getHeaderLabel(index).add(this.getFooterLabel(index));
            }
            return $$1([]);
        };
        Getter.prototype.getPanel = function (position) {
            var itemCount = this.context.itemCount;
            var index = this.positionToIndex(position);
            if (index >= 0 && index < itemCount) {
                var $panelContainerLeaf = this.containers.$panelContainerLeaf;
                return $panelContainerLeaf.children().eq(index);
            }
            return $$1([]);
        };
        Getter.prototype.getCurrentHeaderLabel = function () {
            return this.getHeaderLabel(this.context.currentIndex);
        };
        Getter.prototype.getCurrentFooterLabel = function () {
            return this.getFooterLabel(this.context.currentIndex);
        };
        Getter.prototype.getCurrentHeaderFooterLabels = function () {
            return this.getHeaderFooterLabels(this.context.currentIndex);
        };
        Getter.prototype.getCurrentPanel = function () {
            return this.getPanel(this.context.currentIndex);
        };
        return Getter;
    }());

    var DomUpdater = /** @class */ (function () {
        function DomUpdater(getter, containers, context, options) {
            this.getter = getter;
            this.containers = containers;
            this.context = context;
            this.options = options;
        }
        DomUpdater.prototype.updateActiveState = function (activeIndex) {
            var getter = this.getter;
            var _a = this.options, activeLabelItemClass = _a.activeLabelItemClass, inactiveLabelItemClass = _a.inactiveLabelItemClass, activePanelItemClass = _a.activePanelItemClass, inactivePanelItemClass = _a.inactivePanelItemClass;
            var $activeLabelItem = getter.getHeaderFooterLabels(activeIndex);
            var $activePanelItem = getter.getPanel(activeIndex);
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
        };
        DomUpdater.prototype.updateFixedHeight = function () {
            var options = this.options;
            if (!options.fixedHeight) {
                return;
            }
            var currentIndex = this.context.currentIndex;
            var maxHeight = 0;
            this.containers.$panelContainerLeaf.children().each(function (index, panelItem) {
                var $panelItem = $$1(panelItem);
                if (index !== currentIndex) {
                    $panelItem.addClass(options.evaluatingPanelItemClass);
                }
                var panelHeight = panelItem.scrollHeight;
                if (panelHeight > maxHeight) {
                    maxHeight = panelHeight;
                }
                if (index !== currentIndex) {
                    $panelItem.removeClass(options.evaluatingPanelItemClass);
                }
            }).height(maxHeight);
        };
        return DomUpdater;
    }());

    var TabItemSetter = /** @class */ (function () {
        function TabItemSetter(getter, options) {
            this.getter = getter;
            this.options = options;
        }
        TabItemSetter.prototype.setName = function (position, name) {
            var getter = this.getter;
            var tabItemNameAttr = this.options.tabItemNameAttr;
            getter.getHeaderFooterLabels(position).data(tabItemNameAttr, name);
            getter.getPanel(position).data(tabItemNameAttr, name);
        };
        TabItemSetter.prototype.setDisabled = function (position, disabled) {
            var getter = this.getter;
            var _a = this.options, disabledLabelItemClass = _a.disabledLabelItemClass, disabledPanelItemClass = _a.disabledPanelItemClass;
            getter.getHeaderFooterLabels(position).toggleClass(disabledLabelItemClass, disabled);
            getter.getPanel(position).toggleClass(disabledPanelItemClass, disabled);
        };
        TabItemSetter.prototype.setEnabled = function (position, enabled) {
            this.setDisabled(position, !enabled);
        };
        TabItemSetter.prototype.setHidden = function (position, hidden) {
            var getter = this.getter;
            var _a = this.options, hiddenLabelItemClass = _a.hiddenLabelItemClass, hiddenPanelItemClass = _a.hiddenPanelItemClass;
            getter.getHeaderFooterLabels(position).toggleClass(hiddenLabelItemClass, hidden);
            getter.getPanel(position).toggleClass(hiddenPanelItemClass, hidden);
        };
        TabItemSetter.prototype.setVisible = function (position, visible) {
            this.setHidden(position, !visible);
        };
        TabItemSetter.prototype.setFocus = function (position, $labelContainerLeaf) {
            var getter = this.getter;
            getter.getLabel(position, $($labelContainerLeaf)).focus();
        };
        return TabItemSetter;
    }());

    var HASH_PREFIX = '#';
    var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
    function isValidPosition(position) {
        return position !== -1 && position !== undefined && position !== null && position !== '';
    }
    var SaveLoad = /** @class */ (function () {
        function SaveLoad(containers, options) {
            this.containers = containers;
            this.options = options;
            var $region = containers.$region;
            var statusFieldSelector = options.statusFieldSelector, statusHashTemplate = options.statusHashTemplate;
            var $statusFields = $region.find(statusFieldSelector);
            if (!$statusFields.length) {
                $statusFields = $$1(statusFieldSelector);
            }
            this.$statusFields = $statusFields;
            if (statusHashTemplate) {
                this.reStatusHash = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '([-\\w]+)');
            }
        }
        SaveLoad.prototype.savePosition = function (position) {
            var reStatusHash = this.reStatusHash;
            var $tabContainer = this.containers.$tabContainer;
            var _a = this.options, statusHashTemplate = _a.statusHashTemplate, statusHashSeparator = _a.statusHashSeparator, fnSavePosition = _a.fnSavePosition;
            this.$statusFields.val(position);
            if (statusHashTemplate) {
                var hash = location.hash;
                var statusHash = statusHashTemplate + position;
                if (hash.indexOf(statusHashTemplate) >= 0 && reStatusHash) {
                    hash = hash.replace(reStatusHash, statusHash);
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
        SaveLoad.prototype.parseHashPosition = function () {
            var reStatusHash = this.reStatusHash;
            if (reStatusHash) {
                var searchResult = location.hash.match(reStatusHash);
                if (searchResult && searchResult[1]) {
                    return searchResult[1];
                }
            }
            return -1;
        };
        SaveLoad.prototype.loadPosition = function () {
            var $statusFields = this.$statusFields;
            var $tabContainer = this.containers.$tabContainer;
            var _a = this.options, statusHashTemplate = _a.statusHashTemplate, fnLoadPosition = _a.fnLoadPosition, activePosition = _a.activePosition;
            var position = -1;
            $statusFields.each(function (i, statusField) {
                var status = $$1(statusField).val();
                if (typeof status === 'number' || status.length) {
                    position = status;
                    return false;
                }
            });
            if (isValidPosition(position)) {
                return position;
            }
            if (statusHashTemplate) {
                position = this.parseHashPosition();
                if (isValidPosition(position)) {
                    return position;
                }
            }
            if (fnLoadPosition) {
                position = fnLoadPosition.call($tabContainer);
                if (isValidPosition(position)) {
                    if (typeof position === 'object') {
                        if (position.then) {
                            return position;
                        }
                    }
                    else {
                        return position;
                    }
                }
            }
            if (isValidPosition(activePosition)) {
                return activePosition;
            }
            return 0;
        };
        return SaveLoad;
    }());

    var SwitchDirection;
    (function (SwitchDirection) {
        SwitchDirection[SwitchDirection["Backward"] = 0] = "Backward";
        SwitchDirection[SwitchDirection["Forward"] = 1] = "Forward";
    })(SwitchDirection || (SwitchDirection = {}));
    var Switcher = /** @class */ (function () {
        function Switcher(getter, domUpdater, saveLoad, containers, context, options) {
            this.getter = getter;
            this.domUpdater = domUpdater;
            this.saveLoad = saveLoad;
            this.containers = containers;
            this.context = context;
            this.options = options;
        }
        Switcher.prototype.switchToWithoutSave = function (newPosition) {
            var _a = this, context = _a.context, getter = _a.getter;
            var newNormalizedPos = getter.normalizePosition(newPosition);
            var newIndex = newNormalizedPos.index, newName = newNormalizedPos.name;
            if (newIndex < 0 || newIndex >= context.itemCount || newIndex === context.currentIndex) {
                return;
            }
            var oldIndex = context.currentIndex, oldName = context.currentName, tabState = context.tabState;
            var oldNormalizedPos = { index: oldIndex, name: oldName };
            var $tabContainer = this.containers.$tabContainer;
            var _b = this.options, onBeforeSwitch = _b.onBeforeSwitch, onAfterSwitch = _b.onAfterSwitch;
            //before switching callback
            if (typeof (onBeforeSwitch) === 'function') {
                var callBackResult = onBeforeSwitch.call($tabContainer, oldNormalizedPos, newNormalizedPos, tabState);
                if (callBackResult === false) {
                    return false;
                }
            }
            //update state
            this.domUpdater.updateActiveState(newIndex);
            //finalize
            context.switched = true;
            context.currentIndex = newIndex;
            context.currentName = newName;
            //after switching callback
            if (typeof (onAfterSwitch) === 'function') {
                onAfterSwitch.call($tabContainer, oldNormalizedPos, newNormalizedPos, tabState);
            }
            return newNormalizedPos;
        };
        Switcher.prototype.switchTo = function (newPosition) {
            var result = this.switchToWithoutSave(newPosition);
            if (result) {
                var saveLoad = this.saveLoad;
                var index = result.index, name_1 = result.name;
                saveLoad.savePosition(name_1 || index);
            }
            return result;
        };
        Switcher.prototype._switchNeighbor = function (fromIndex, direction, switchOptions) {
            var getter = this.getter;
            var opts = switchOptions || {};
            var includeDisabled = opts.includeDisabled, includeHidden = opts.includeHidden, loop = opts.loop, exclude = opts.exclude;
            var excludeIndecies = exclude && exclude.length ? $$1.map(exclude, function (position) {
                return getter.positionToIndex(position);
            }) : [];
            var $panelContainer = this.containers.$panelContainer;
            var $panelItems = $panelContainer.children();
            var itemCount = this.context.itemCount;
            var _a = this.options, disabledPanelItemClass = _a.disabledPanelItemClass, hiddenPanelItemClass = _a.hiddenPanelItemClass;
            var maxIterationCount = -1;
            if (loop) {
                if (fromIndex >= 0 && fromIndex < itemCount) {
                    maxIterationCount = itemCount - 1;
                }
                else {
                    maxIterationCount = itemCount;
                }
            }
            else if (direction === SwitchDirection.Backward) {
                maxIterationCount = fromIndex;
            }
            else if (direction === SwitchDirection.Forward) {
                maxIterationCount = itemCount - fromIndex - 1;
            }
            var iterationStep = direction === SwitchDirection.Backward ? -1 : 1;
            for (var i = 1; i <= maxIterationCount; i++) {
                var panelIndex = (fromIndex + i * iterationStep + itemCount) % itemCount;
                if ($$1.inArray(panelIndex, excludeIndecies) >= 0) {
                    continue;
                }
                var $panel = $panelItems.eq(panelIndex);
                var panelIsDisabled = $panel.hasClass(disabledPanelItemClass);
                var panelIsHidden = $panel.hasClass(hiddenPanelItemClass);
                if ((!panelIsDisabled && !panelIsHidden) ||
                    (includeDisabled && !panelIsHidden) ||
                    (!panelIsDisabled && includeHidden) ||
                    (includeDisabled && includeHidden)) {
                    return this.switchTo(panelIndex);
                }
            }
        };
        Switcher.prototype.switchPrevious = function (switchOptions) {
            return this._switchNeighbor(this.context.currentIndex, SwitchDirection.Backward, switchOptions);
        };
        Switcher.prototype.switchNext = function (switchOptions) {
            return this._switchNeighbor(this.context.currentIndex, SwitchDirection.Forward, switchOptions);
        };
        Switcher.prototype.switchFirst = function (switchOptions) {
            return this._switchNeighbor(-1, SwitchDirection.Forward, switchOptions);
        };
        Switcher.prototype.switchLast = function (switchOptions) {
            return this._switchNeighbor(this.context.itemCount, SwitchDirection.Backward, switchOptions);
        };
        return Switcher;
    }());

    function createLabelItem(tabItem, options) {
        var $labelItem = $$1(options.labelItemTemplate)
            .addClass(options.labelItemClass)
            .addClass(options.inactiveLabelItemClass)
            .attr('tabindex', '0')
            .attr('role', 'tab');
        var $labelItemLeaf = getLeafElement($labelItem);
        $labelItemLeaf.append(tabItem.title);
        return { $labelItem: $labelItem, $labelItemLeaf: $labelItemLeaf };
    }

    function createPanelItem(tabItem, options) {
        var $panelItem = $$1(options.panelItemTemplate)
            .addClass(options.panelItemClass)
            .addClass(options.inactivePanelItemClass)
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

    var Adder = /** @class */ (function () {
        function Adder(getter, saveLoad, switcher, containers, context, options) {
            this.getter = getter;
            this.saveLoad = saveLoad;
            this.switcher = switcher;
            this.containers = containers;
            this.context = context;
            this.options = options;
        }
        Adder.prototype._switchIfInitial = function () {
            var _a = this, switcher = _a.switcher, context = _a.context;
            if (context.currentIndex === -1 && context.itemCount) {
                switcher.switchTo(0);
            }
        };
        Adder.prototype.insertTabItemWithoutSwitch = function (position, tabItem) {
            var _a = this, getter = _a.getter, saveLoad = _a.saveLoad, containers = _a.containers, context = _a.context, options = _a.options;
            var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf, $panelContainerLeaf = containers.$panelContainerLeaf;
            var _b = createTabItem(tabItem, context, options), $panelItem = _b.$panelItem, cloneLabelItem = _b.cloneLabelItem;
            var index = getter.positionToIndex(position);
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
                        saveLoad.savePosition(context.currentIndex);
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
        Adder.prototype.insertTabItem = function (position, tabItem) {
            this.insertTabItemWithoutSwitch(position, tabItem);
            this._switchIfInitial();
        };
        Adder.prototype.addTabItemWithoutSwitch = function (tabItem) {
            this.insertTabItemWithoutSwitch(this.context.itemCount, tabItem);
        };
        Adder.prototype.addTabItem = function (tabItem) {
            this.addTabItemWithoutSwitch(tabItem);
            this._switchIfInitial();
        };
        Adder.prototype.insertWithoutSwitch = function (position, sourceRegion) {
            var getter = this.getter;
            var _a = this.options, titleSelector = _a.titleSelector, fnGetTitleContent = _a.fnGetTitleContent, keepTitleVisible = _a.keepTitleVisible, fnGetTabItemName = _a.fnGetTabItemName, fnIsTabItemDisabled = _a.fnIsTabItemDisabled, fnIsTabItemHidden = _a.fnIsTabItemHidden;
            var $sourceRegion = $$1(sourceRegion);
            var inserted = 0;
            var index = getter.positionToIndex(position);
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
                    content: $$1([]).add($title).add($rest),
                    name: fnGetTabItemName.call($sourceRegion, $title, $rest),
                    disabled: fnIsTabItemDisabled.call($sourceRegion, $title, $rest),
                    hidden: fnIsTabItemHidden.call($sourceRegion, $title, $rest)
                };
                this.insertTabItemWithoutSwitch(index + inserted, tabItem);
                inserted++;
            }
        };
        Adder.prototype.insert = function (position, sourceRegion) {
            this.insertWithoutSwitch(position, sourceRegion);
            this._switchIfInitial();
        };
        Adder.prototype.addWithoutSwitch = function (sourceRegion) {
            this.insertWithoutSwitch(this.context.itemCount, sourceRegion);
        };
        Adder.prototype.add = function (sourceRegion) {
            this.addWithoutSwitch(sourceRegion);
            this._switchIfInitial();
        };
        return Adder;
    }());

    var Remover = /** @class */ (function () {
        function Remover(getter, saveLoad, switcher, context) {
            this.getter = getter;
            this.saveLoad = saveLoad;
            this.switcher = switcher;
            this.context = context;
        }
        Remover.prototype.remove = function (positions) {
            if (!positions.length) {
                return;
            }
            var _a = this, getter = _a.getter, saveLoad = _a.saveLoad, switcher = _a.switcher, context = _a.context;
            var removeIndecies = [];
            for (var i = 0, len = positions.length; i < len; i++) {
                var removeIndex = getter.positionToIndex(positions[i]);
                if (removeIndex >= 0 && removeIndex < context.itemCount && $$1.inArray(removeIndex, removeIndecies) === -1) {
                    removeIndecies.push(removeIndex);
                }
            }
            if (!removeIndecies.length) {
                return;
            }
            removeIndecies.sort(function (prev, next) {
                return next - prev;
            });
            if (context.itemCount > 1 && $$1.inArray(context.currentIndex, removeIndecies) >= 0) {
                switcher.switchNext({ exclude: removeIndecies }) ||
                    switcher.switchPrevious({ exclude: removeIndecies }) ||
                    switcher.switchNext({ includeDisabled: true, exclude: removeIndecies }) ||
                    switcher.switchPrevious({ includeDisabled: true, exclude: removeIndecies }) ||
                    switcher.switchNext({ includeHidden: true, exclude: removeIndecies }) ||
                    switcher.switchPrevious({ includeHidden: true, exclude: removeIndecies }) ||
                    switcher.switchNext({ includeDisabled: true, includeHidden: true, exclude: removeIndecies }) ||
                    switcher.switchPrevious({ includeDisabled: true, includeHidden: true, exclude: removeIndecies });
            }
            var currentIndexChanged = false;
            for (var i = 0, len = removeIndecies.length; i < len; i++) {
                var removeIndex = removeIndecies[i];
                var $labelItems = getter.getHeaderFooterLabels(removeIndex);
                var $panelItem = getter.getPanel(removeIndex);
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
                saveLoad.savePosition(context.currentIndex);
            }
            return removeIndecies.length;
        };
        return Remover;
    }());

    function _extractElement($container, fromIndex, toIndex) {
        var $children = $container.children();
        var $from = $children.eq(fromIndex);
        var $to = $children.eq(toIndex);
        return { $from: $from, $to: $to };
    }
    function moveElementBefore($container, fromIndex, toIndex) {
        var _a = _extractElement($container, fromIndex, toIndex), $from = _a.$from, $to = _a.$to;
        $from.insertBefore($to);
    }
    function moveElementAfter($container, fromIndex, toIndex) {
        var _a = _extractElement($container, fromIndex, toIndex), $from = _a.$from, $to = _a.$to;
        $from.insertAfter($to);
    }
    function exchangeElement($container, fromIndex, toIndex) {
        var _a = _extractElement($container, fromIndex, toIndex), $from = _a.$from, $to = _a.$to;
        $from.insertAfter($to);
        //use .children() again to get the latest order
        $to.insertBefore($container.children().eq(fromIndex));
    }
    var Mover = /** @class */ (function () {
        function Mover(getter, containers, context) {
            this.getter = getter;
            this.containers = containers;
            this.context = context;
        }
        Mover.prototype._parseFromToPositions = function (fromPosition, toPosition) {
            var _a = this, getter = _a.getter, context = _a.context;
            var itemCount = context.itemCount;
            var fromIndex = getter.positionToIndex(fromPosition);
            var toIndex = getter.positionToIndex(toPosition);
            if (fromIndex < 0 || fromIndex >= itemCount || toIndex < 0 || toIndex >= itemCount || fromIndex === toIndex) {
                return;
            }
            return { fromIndex: fromIndex, toIndex: toIndex };
        };
        Mover.prototype._reorderElement = function (fnMoveElement, fromIndex, toIndex) {
            var _a = this.containers, $headerLabelContainer = _a.$headerLabelContainer, $panelContainer = _a.$panelContainer, $footerLabelContainer = _a.$footerLabelContainer;
            $headerLabelContainer && fnMoveElement($headerLabelContainer, fromIndex, toIndex);
            $footerLabelContainer && fnMoveElement($footerLabelContainer, fromIndex, toIndex);
            fnMoveElement($panelContainer, fromIndex, toIndex);
        };
        Mover.prototype.moveTabItemBefore = function (fromPosition, toPosition) {
            var indexes = this._parseFromToPositions(fromPosition, toPosition);
            if (!indexes) {
                return;
            }
            var fromIndex = indexes.fromIndex, toIndex = indexes.toIndex;
            var context = this.context;
            if (fromIndex === toIndex - 1) {
                return;
            }
            this._reorderElement(moveElementBefore, fromIndex, toIndex);
            if (fromIndex === context.currentIndex) {
                context.currentIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
            }
            else if (fromIndex < context.currentIndex && toIndex > context.currentIndex) {
                context.currentIndex--;
            }
            else if (fromIndex > context.currentIndex && toIndex <= context.currentIndex) {
                context.currentIndex++;
            }
        };
        Mover.prototype.moveTabItemAfter = function (fromPosition, toPosition) {
            var indexes = this._parseFromToPositions(fromPosition, toPosition);
            if (!indexes) {
                return;
            }
            var fromIndex = indexes.fromIndex, toIndex = indexes.toIndex;
            var context = this.context;
            if (fromIndex === toIndex + 1) {
                return;
            }
            this._reorderElement(moveElementAfter, fromIndex, toIndex);
            if (fromIndex === context.currentIndex) {
                context.currentIndex = fromIndex < toIndex ? toIndex : toIndex + 1;
            }
            else if (fromIndex < context.currentIndex && toIndex >= context.currentIndex) {
                context.currentIndex--;
            }
            else if (fromIndex > context.currentIndex && toIndex < context.currentIndex) {
                context.currentIndex++;
            }
        };
        Mover.prototype.moveTabItemFirst = function (fromPosition) {
            this.moveTabItemBefore(fromPosition, 0);
        };
        Mover.prototype.moveTabItemLast = function (fromPosition) {
            this.moveTabItemAfter(fromPosition, this.context.itemCount - 1);
        };
        Mover.prototype.moveTabItemPrevious = function (fromPosition) {
            var fromIndex = this.getter.positionToIndex(fromPosition);
            if (fromIndex <= 0 || fromIndex >= this.context.itemCount) {
                return;
            }
            this.moveTabItemBefore(fromIndex, fromIndex - 1);
        };
        Mover.prototype.moveTabItemNext = function (fromPosition) {
            var fromIndex = this.getter.positionToIndex(fromPosition);
            if (fromIndex < 0 || fromIndex >= this.context.itemCount - 1) {
                return;
            }
            this.moveTabItemAfter(fromIndex, fromIndex + 1);
        };
        Mover.prototype.exchangeTabItem = function (fromPosition, toPosition) {
            var indexes = this._parseFromToPositions(fromPosition, toPosition);
            if (!indexes) {
                return;
            }
            var fromIndex = indexes.fromIndex, toIndex = indexes.toIndex;
            var context = this.context;
            if (fromIndex > toIndex) {
                var tmpIndex = fromIndex;
                fromIndex = toIndex;
                toIndex = tmpIndex;
            }
            if (fromIndex + 1 === toIndex) {
                this._reorderElement(moveElementAfter, fromIndex, toIndex);
            }
            else {
                this._reorderElement(exchangeElement, fromIndex, toIndex);
            }
            if (fromIndex === context.currentIndex) {
                context.currentIndex = toIndex;
            }
            else if (toIndex === context.currentIndex) {
                context.currentIndex = fromIndex;
            }
        };
        return Mover;
    }());

    function generateController(getter, domUpdater, tabItemSetter, switcher, adder, remover, mover) {
        //getter
        var getCount = function () {
            return getter.getCount();
        };
        var getCurrentIndex = function () {
            return getter.getCurrentIndex();
        };
        var getCurrentName = function () {
            return getter.getCurrentName();
        };
        var getName = function (index) {
            return getter.getName(index);
        };
        var getIndexByName = function (name) {
            return getter.getIndexByName(name);
        };
        var isDisabled = function (position) {
            return getter.isDisabled(position);
        };
        var isEnabled = function (position) {
            return getter.isEnabled(position);
        };
        var isHidden = function (position) {
            return getter.isHidden(position);
        };
        var isVisible = function (position) {
            return getter.isVisible(position);
        };
        var getHeaderLabel = function (position) {
            return getter.getHeaderLabel(position);
        };
        var getFooterLabel = function (position) {
            return getter.getFooterLabel(position);
        };
        var getHeaderFooterLabels = function (position) {
            return getter.getHeaderFooterLabels(position);
        };
        var getPanel = function (position) {
            return getter.getPanel(position);
        };
        var getCurrentHeaderLabel = function () {
            return getter.getCurrentHeaderLabel();
        };
        var getCurrentFooterLabel = function () {
            return getter.getCurrentFooterLabel();
        };
        var getCurrentHeaderFooterLabels = function () {
            return getter.getCurrentHeaderFooterLabels();
        };
        var getCurrentPanel = function () {
            return getter.getCurrentPanel();
        };
        var setName = function (position, name) {
            return tabItemSetter.setName(position, name);
        };
        var setDisabled = function (position, disabled) {
            if (disabled === void 0) { disabled = true; }
            return tabItemSetter.setDisabled(position, disabled);
        };
        var setEnabled = function (position, enabled) {
            if (enabled === void 0) { enabled = true; }
            return tabItemSetter.setEnabled(position, enabled);
        };
        var setHidden = function (position, hidden) {
            if (hidden === void 0) { hidden = true; }
            return tabItemSetter.setHidden(position, hidden);
        };
        var setVisible = function (position, visible) {
            if (visible === void 0) { visible = true; }
            return tabItemSetter.setVisible(position, visible);
        };
        //dom updater
        var updateFixedHeight = function () {
            return domUpdater.updateFixedHeight();
        };
        //switcher
        var switchTo = function (newPosition) {
            return switcher.switchTo(newPosition);
        };
        var switchPrevious = function (switchOptions) {
            return switcher.switchPrevious(switchOptions);
        };
        var switchNext = function (switchOptions) {
            return switcher.switchNext(switchOptions);
        };
        var switchFirst = function (switchOptions) {
            return switcher.switchFirst(switchOptions);
        };
        var switchLast = function (switchOptions) {
            return switcher.switchLast(switchOptions);
        };
        //add
        var insertTabItem = function (position, tabItem) {
            return adder.insertTabItem(position, tabItem);
        };
        var addTabItem = function (tabItem) {
            return adder.addTabItem(tabItem);
        };
        var insert = function (position, sourceRegion) {
            return adder.insert(position, sourceRegion);
        };
        var add = function (sourceRegion) {
            return adder.add(sourceRegion);
        };
        //remove
        var remove = function () {
            var positions = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                positions[_i] = arguments[_i];
            }
            return remover.remove(positions);
        };
        //move
        var exchangeTabItem = function (fromPosition, toPosition) {
            mover.exchangeTabItem(fromPosition, toPosition);
        };
        var moveTabItemBefore = function (fromPosition, toPosition) {
            mover.moveTabItemBefore(fromPosition, toPosition);
        };
        var moveTabItemAfter = function (fromPosition, toPosition) {
            mover.moveTabItemAfter(fromPosition, toPosition);
        };
        var moveTabItemFirst = function (fromPosition) {
            mover.moveTabItemFirst(fromPosition);
        };
        var moveTabItemLast = function (fromPosition) {
            mover.moveTabItemLast(fromPosition);
        };
        var moveTabItemPrevious = function (fromPosition) {
            mover.moveTabItemPrevious(fromPosition);
        };
        var moveTabItemNext = function (fromPosition) {
            mover.moveTabItemNext(fromPosition);
        };
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
            switchTo: switchTo, switchPrevious: switchPrevious, switchNext: switchNext, switchFirst: switchFirst, switchLast: switchLast,
            addTabItem: addTabItem, insertTabItem: insertTabItem, add: add, insert: insert, remove: remove,
            exchangeTabItem: exchangeTabItem, moveTabItemBefore: moveTabItemBefore, moveTabItemAfter: moveTabItemAfter,
            moveTabItemFirst: moveTabItemFirst, moveTabItemLast: moveTabItemLast, moveTabItemPrevious: moveTabItemPrevious, moveTabItemNext: moveTabItemNext
        };
        return controller;
    }

    var EVENT_HASH_CHANGE = 'hashchange';
    function handleHashChangeEvent(saveLoad, switcher, options) {
        if (options.statusHashTemplate && window) {
            $$1(window).on(EVENT_HASH_CHANGE, function () {
                var position = saveLoad.parseHashPosition();
                switcher.switchTo(position);
            });
        }
    }

    function handleClickEvent(switcher, containers, context, options) {
        var triggerEvents = options.triggerEvents, delayTriggerEvents = options.delayTriggerEvents, delayTriggerCancelEvents = options.delayTriggerCancelEvents, delayTriggerLatency = options.delayTriggerLatency, disabledLabelItemClass = options.disabledLabelItemClass, hiddenLabelItemClass = options.hiddenLabelItemClass;
        var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf;
        //handle delay trigger event
        var delayTriggerTimeoutHandler;
        var startDelayTrigger = function (position) {
            delayTriggerTimeoutHandler = setTimeout(function () {
                switcher.switchTo(position);
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
            var $label = $$1(e.currentTarget);
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
            var $label = $$1(e.currentTarget);
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
            var $label = $$1(e.currentTarget);
            var labelIndex = $label.index();
            if (labelIndex === context.currentIndex ||
                $label.hasClass(disabledLabelItemClass) ||
                $label.hasClass(hiddenLabelItemClass)) {
                return;
            }
            switcher.switchTo(labelIndex);
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

    var UP = 'Up';
    var DOWN = 'Down';
    var LEFT = 'Left';
    var RIGHT = 'Right';
    var ARROW_UP = 'ArrowUp';
    var ARROW_DOWN = 'ArrowDown';
    var ARROW_LEFT = 'ArrowLeft';
    var ARROW_RIGHT = 'ArrowRight';
    var TAB = 'Tab';
    var HOME = 'Home';
    var END = 'End';
    var SPACE = ' ';
    var ENTER = 'Enter';
    var ARROW_UP_CODE = 38;
    var ARROW_DOWN_CODE = 40;
    var ARROW_LEFT_CODE = 37;
    var ARROW_RIGHT_CODE = 39;
    var TAB_CODE = 9;
    var HOME_CODE = 36;
    var END_CODE = 35;
    var SPACE_CODE = 32;
    var ENTER_CODE = 13;
    function handleKeydownEvent(tabItemSetter, switcher, containers, context, options) {
        if (!options.keyboardSwitch) {
            return;
        }
        var $labelContainers = $$1([]);
        var $headerLabelContainer = containers.$headerLabelContainer, $footerLabelContainer = containers.$footerLabelContainer;
        if ($headerLabelContainer) {
            $labelContainers = $labelContainers.add($headerLabelContainer);
        }
        if ($footerLabelContainer) {
            $labelContainers = $labelContainers.add($footerLabelContainer);
        }
        $labelContainers.keydown(function (e) {
            var switchResult;
            if (e.key) {
                switch (e.key) {
                    case UP:
                    case LEFT:
                    case ARROW_UP:
                    case ARROW_LEFT:
                        switchResult = switcher.switchPrevious();
                        break;
                    case DOWN:
                    case RIGHT:
                    case ARROW_DOWN:
                    case ARROW_RIGHT:
                        switchResult = switcher.switchNext();
                        break;
                    case TAB:
                        switchResult = e.shiftKey ? switcher.switchPrevious() : switcher.switchNext();
                        break;
                    case HOME:
                        switchResult = switcher.switchFirst();
                        break;
                    case END:
                        switchResult = switcher.switchLast();
                        break;
                    case SPACE:
                    case ENTER:
                        switchResult = switcher.switchTo($$1(e.target).index());
                        break;
                }
            }
            else if (e.keyCode) {
                switch (e.keyCode) {
                    case ARROW_UP_CODE:
                    case ARROW_LEFT_CODE:
                        switchResult = switcher.switchPrevious();
                        break;
                    case ARROW_DOWN_CODE:
                    case ARROW_RIGHT_CODE:
                        switchResult = switcher.switchNext();
                        break;
                    case TAB_CODE:
                        switchResult = e.shiftKey ? switcher.switchPrevious() : switcher.switchNext();
                        break;
                    case HOME_CODE:
                        switchResult = switcher.switchFirst();
                        break;
                    case END_CODE:
                        switchResult = switcher.switchLast();
                        break;
                    case SPACE_CODE:
                    case ENTER_CODE:
                        switchResult = switcher.switchTo($$1(e.target).index());
                        break;
                }
            }
            if (switchResult) {
                tabItemSetter.setFocus(context.currentIndex, this);
                e.preventDefault();
            }
        });
    }

    function tablize($region, customOptions) {
        var dataOptions = $region.data();
        var options = expandedOptions(defaultOptions, dataOptions, customOptions);
        var context = {
            tabState: 0 /* Initializing */,
            switched: false,
            containerId: getNextTabContainerId(),
            nextItemId: 0,
            itemCount: 0,
            currentIndex: -1
        };
        var containers = $$1.extend({ $region: $region }, createTabContainer(options));
        var $tabContainer = containers.$tabContainer;
        //getters
        var getter = new Getter(containers, context, options);
        //dom updater
        var domUpdater = new DomUpdater(getter, containers, context, options);
        //tab item setter
        var tabItemSetter = new TabItemSetter(getter, options);
        //save/load
        var saveLoad = new SaveLoad(containers, options);
        //switcher
        var switcher = new Switcher(getter, domUpdater, saveLoad, containers, context, options);
        //adder
        var adder = new Adder(getter, saveLoad, switcher, containers, context, options);
        //remover
        var remover = new Remover(getter, saveLoad, switcher, context);
        //mover
        var mover = new Mover(getter, containers, context);
        //controller
        var controller = generateController(getter, domUpdater, tabItemSetter, switcher, adder, remover, mover);
        //init
        adder.addWithoutSwitch($region);
        if (!context.itemCount && !options.createEmptyTab) {
            return;
        }
        $region.append($tabContainer);
        if (context.itemCount > 0) {
            var loadedPosition = saveLoad.loadPosition();
            if (typeof loadedPosition === 'object') {
                loadedPosition.then && loadedPosition.then(function (asyncLoadedPosition) {
                    if (!context.switched) {
                        switcher.switchToWithoutSave(asyncLoadedPosition);
                    }
                });
            }
            else {
                switcher.switchToWithoutSave(loadedPosition);
            }
            if (context.currentIndex === -1 && options.activePosition !== 0) {
                switcher.switchToWithoutSave(options.activePosition);
            }
            if (context.currentIndex === -1) {
                switcher.switchToWithoutSave(0);
            }
            context.switched = false; //reset to false after initial switch
            domUpdater.updateFixedHeight();
        }
        handleHashChangeEvent(saveLoad, switcher, options);
        handleClickEvent(switcher, containers, context, options);
        handleKeydownEvent(tabItemSetter, switcher, containers, context, options);
        $region.data('tab-controller', controller);
        $tabContainer.data('tab-controller', controller);
        context.tabState = 1 /* Ready */;
    }

    function tabPlugin(options) {
        var normalizedOptions = normalizeOptions(options);
        this.each(function (index, region) {
            tablize($$1(region), normalizedOptions);
        });
        return this;
    }

    function applyDefaultRegion() {
        var $regions = $$1('.tab-region');
        tabPlugin.call($regions);
    }

    function registerPlugin(pluginName) {
        $$1.fn[pluginName] = tabPlugin;
    }

    var enabled = false;
    function enablePlugin(pluginName) {
        registerPlugin(pluginName);
        if (!enabled) {
            enabled = true;
            applyDefaultRegion();
        }
    }

    /// <reference path='./type/public.d.ts' />
    enablePlugin('tab');

    return $$1;

}));
