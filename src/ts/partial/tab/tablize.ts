import $ from "jquery";
import defaultOptions from "../../utility/default-options";
import expandedOptions from '../../utility/expanded-options';
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

let nextContainerId = 0;

function tablize($region: JQuery, customOptions?: JQueryTab.Options) {
	const dataOptions = $region.data();
	const options = expandedOptions(defaultOptions, dataOptions, customOptions);

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

	if (context.itemCount > 0) {
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
	}

	handleHashChangeEvent(saveLoad, switcher, options);
	handleClickEvent(switcher, containers, context, options);

	$region.data('tab-controller', controller);
	$tabContainer.data('tab-controller', controller);

	context.tabState = JQueryTab.TabState.Ready;
}

export default tablize;
