import $ from "jquery";
import defaultOptions from "../utility/default-options";
import getExpandedOptions from '../utility/get-expanded-options';
import createTabContainer from './create-tab-container';
import Getter from './getter';
import DomUpdater from './dom-updater';
import TabItemSetter from './tab-item-setter';
import SaveLoad from './save-load';
import Switcher from './switcher';
import AddRemove from './add-remove';
import generateController from './generate-controller';
import handleHashChangeEvent from './handle-hash-change-event';
import handleClickEvent from './handle-click-event';

let nextContainerId = 0;

function tablize($region: JQuery, customOptions?: JQueryTab.Options) {
	const dataOptions = $region.data();
	const options = getExpandedOptions(defaultOptions, dataOptions, customOptions);

	const context: JQueryTab.Context = {
		tabState: JQueryTab.TabState.Initializing,
		containerId: nextContainerId++,
		nextItemId: 0,
		itemCount: 0,
		currentIndex: -1
	};

	const containers: JQueryTab.Containers = $.extend({$region}, createTabContainer(options));
	const {$tabContainer} = containers;

	//getters
	const getter = new Getter(containers, context, options);

	//dom updater
	const domUpdater = new DomUpdater(getter, containers, context, options);

	//tab item setter
	const tabItemSetter = new TabItemSetter(getter, options);

	//save/load
	const saveLoad = new SaveLoad(containers, options);

	//switcher
	const switcher = new Switcher(getter, domUpdater, saveLoad, containers, context, options);

	//add remove
	const addRemove = new AddRemove(getter, saveLoad, switcher, containers, context, options);

	//controller
	const controller = generateController(getter, domUpdater, tabItemSetter, switcher, addRemove);

	//init
	addRemove.addWithoutSwitch($region);

	if (!context.itemCount && !options.createEmptyTab) {
		return;
	}
	$region.append($tabContainer);

	const loadedPosition = saveLoad.loadPosition();
	if (typeof loadedPosition === 'object') {
		loadedPosition.then && loadedPosition.then(function (asyncLoadedPosition) {
			if (context.currentIndex === 0) {  // not switched by outside
				switcher.switchToWithoutSave(asyncLoadedPosition);
			}
		});
	}
	else {
		switcher.switchToWithoutSave(loadedPosition);
	}
	if (context.currentIndex === -1) {
		switcher.switchToWithoutSave(0);
	}

	domUpdater.updateFixedHeight();

	handleHashChangeEvent(saveLoad, switcher, options);
	handleClickEvent(switcher, containers, context, options);

	$region.data('tab-controller', controller);
	$tabContainer.data('tab-controller', controller);

	context.tabState = JQueryTab.TabState.Ready;
}

export default tablize;
