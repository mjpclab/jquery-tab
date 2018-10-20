import $ from "jquery";
import defaultOptions from "../utility/default-options";
import getExpandedOptions from '../utility/get-expanded-options';
import createTabContainer from './create-tab-container';
import generateGetters from './generate-getters';
import generateSaveLoadIndex from './generate-save-load-index';
import genrateSwitchTo from './generate-switch-to';
import generateAddRemove from './generate-add-remove';
import generateUpdateFixedHeight from './update-fixed-height';
import handleHashChangeEvent from './handle-hash-change-event';
import handleClickEvent from './handle-click-event';

let nextContainerId = 0;

function tablize($region: JQuery, customOptions?: JQueryTab.Options) {
	const dataOptions = $region.data();
	const options = getExpandedOptions(defaultOptions, dataOptions, customOptions);

	const context: JQueryTab.Context = {
		containerId: nextContainerId++,
		nextItemId: 0,
		itemCount: 0,
		currentIndex: -1
	};

	const containers: JQueryTab.Containers = $.extend({$region}, createTabContainer(options));
	const {$tabContainer} = containers;

	//getters
	const {
		getCount,
		getCurrentIndex,
		getLabel,
		getHeaderLabel,
		getFooterLabel,
		getHeaderFooterLabels,
		getPanel
	} = generateGetters(containers, context);

	//save/load
	const {saveIndex, loadIndex, parseHashIndex} = generateSaveLoadIndex(containers, context, options);

	//methods
	const {switchToWithoutSave, switchTo} = genrateSwitchTo(getHeaderFooterLabels, getPanel, saveIndex, containers, context, options);

	const {
		addTabItem,
		insertTabItem,
		add,
		addWithoutSwitch,
		insert,
		remove,
	} = generateAddRemove(getHeaderFooterLabels, getPanel, saveIndex, switchTo, containers, context, options);

	addWithoutSwitch($region);

	//replace original content
	if (!context.itemCount && !options.createEmptyTab) {
		return;
	}
	$region.append($tabContainer);

	//check if param:fixed height
	const updateFixedHeight = generateUpdateFixedHeight(containers, options);
	updateFixedHeight();

	//show active panel
	switchToWithoutSave(loadIndex());
	handleHashChangeEvent(parseHashIndex, switchTo, context, options);
	handleClickEvent(switchTo, containers, context, options);

	//controller
	const controller = {
		getCount,
		getCurrentIndex,
		getHeaderLabel,
		getFooterLabel,
		getHeaderFooterLabels,
		getPanel,
		updateFixedHeight,
		switchTo,
		addTabItem,
		insertTabItem,
		add,
		insert,
		remove
	};
	$region.data('tab-controller', controller);
	$tabContainer.data('tab-controller', controller);
}

export default tablize;