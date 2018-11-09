import $ from "jquery";
import defaultOptions from "../utility/default-options";
import getExpandedOptions from '../utility/get-expanded-options';
import createTabContainer from './create-tab-container';
import generateGetters from './generate-getters';
import generateTabItemSetter from './generate-tab-item-setter';
import generateSaveLoadIndex from './generate-save-load-index';
import genetateSwitch from './generate-switch';
import generateAddRemove from './generate-add-remove';
import generateUpdateFixedHeight from './update-fixed-height';
import handleHashChangeEvent from './handle-hash-change-event';
import handleClickEvent from './handle-click-event';
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
    var _d = genetateSwitch(positionToIndex, parsePosition, getHeaderFooterLabels, getPanel, savePosition, containers, context, options), switchToWithoutSave = _d.switchToWithoutSave, switchTo = _d.switchTo, switchPrevious = _d.switchPrevious, switchNext = _d.switchNext;
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
    handleClickEvent(switchTo, containers, context, options);
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
export default tablize;
