import $ from 'jquery';
import defaultOptions from '../utility/default-options';
import expandedOptions from '../utility/expanded-options';
import getNextTabContainerId from '../utility/get-next-tab-container-id';

import createTabContainer from '../create/container/create-tab-container';
import Getter from '../feature/getter';
import DomUpdater from '../feature/dom-updater';
import TabItemSetter from '../feature/tab-item-setter';
import SaveLoad from '../feature/save-load';
import Switcher from '../feature/switcher';
import Adder from '../feature/adder';
import Remover from '../feature/remover';
import generateController from '../feature/generate-controller';

import handleHashChangeEvent from '../event-handler/handle-hash-change-event';
import handleClickEvent from '../event-handler/handle-click-event';
import handleKeydownEvent from '../event-handler/handle-keydown-event';

function tablize($region: JQuery, customOptions?: JQueryTab.Options) {
	const dataOptions = $region.data();
	const options = expandedOptions(defaultOptions, dataOptions, customOptions);

	const context: JQueryTab.Context = {
		tabState: JQueryTab.TabState.Initializing,
		switched: false,
		containerId: getNextTabContainerId(),
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

	//adder
	const adder = new Adder(getter, saveLoad, switcher, containers, context, options);

	//remover
	const remover = new Remover(getter, saveLoad, switcher, context);

	//controller
	const controller = generateController(getter, domUpdater, tabItemSetter, switcher, adder, remover);

	//init
	adder.addWithoutSwitch($region);

	if (!context.itemCount && !options.createEmptyTab) {
		return;
	}
	$region.append($tabContainer);

	if (context.itemCount > 0) {
		const loadedPosition = saveLoad.loadPosition();
		if (typeof loadedPosition === 'object') {
			loadedPosition.then && loadedPosition.then(function (asyncLoadedPosition) {
				if (!context.switched) {
					switcher.switchToWithoutSave(asyncLoadedPosition);
				}
			});
		} else {
			switcher.switchToWithoutSave(loadedPosition);
		}

		if (context.currentIndex === -1 && options.activePosition !== 0) {
			switcher.switchToWithoutSave(options.activePosition);
		}
		if (context.currentIndex === -1) {
			switcher.switchToWithoutSave(0);
		}
		context.switched = false;   //reset to false after initial switch

		domUpdater.updateFixedHeight();
	}

	handleHashChangeEvent(saveLoad, switcher, options);
	handleClickEvent(switcher, containers, context, options);
	handleKeydownEvent(tabItemSetter, switcher, containers, context, options);

	$region.data('tab-controller', controller);
	$tabContainer.data('tab-controller', controller);

	context.tabState = JQueryTab.TabState.Ready;
}

export default tablize;
