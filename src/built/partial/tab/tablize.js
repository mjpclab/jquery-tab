import $ from "jquery";
import defaultOptions from "../utility/default-options";
import expandedOptions from '../utility/expanded-options';
import createTabContainer from '../create/container/create-tab-container';
import Getter from '../feature/getter';
import DomUpdater from '../feature/dom-updater';
import TabItemSetter from '../feature/tab-item-setter';
import SaveLoad from '../feature/save-load';
import Switcher from '../feature/switcher';
import AddRemove from '../feature/add-remove';
import generateController from '../feature/generate-controller';
import handleHashChangeEvent from '../event-handler/handle-hash-change-event';
import handleClickEvent from '../event-handler/handle-click-event';
import handleKeypressEvent from '../event-handler/handle-keypress-event';
var nextContainerId = 0;
function tablize($region, customOptions) {
    var dataOptions = $region.data();
    var options = expandedOptions(defaultOptions, dataOptions, customOptions);
    var context = {
        tabState: 0 /* Initializing */,
        switched: false,
        containerId: nextContainerId++,
        nextItemId: 0,
        itemCount: 0,
        currentIndex: -1
    };
    var containers = $.extend({ $region: $region }, createTabContainer(options));
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
    //add remove
    var addRemove = new AddRemove(getter, saveLoad, switcher, containers, context, options);
    //controller
    var controller = generateController(getter, domUpdater, tabItemSetter, switcher, addRemove);
    //init
    addRemove.addWithoutSwitch($region);
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
    handleKeypressEvent(switcher, containers, context);
    $region.data('tab-controller', controller);
    $tabContainer.data('tab-controller', controller);
    context.tabState = 1 /* Ready */;
}
export default tablize;
