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
		getCurrentName,
		getName,
		getIndexByName,
		positionToIndex,
		parsePosition,
		isDisabled, isEnabled, isHidden, isVisible,
		getHeaderLabel, getFooterLabel, getHeaderFooterLabels,
		getPanel,
		getCurrentHeaderLabel, getCurrentFooterLabel, getCurrentHeaderFooterLabels,
		getCurrentPanel
	} = generateGetters(containers, context, options);

	//tab item setter
	const {setName, setDisabled, setEnabled, setHidden, setVisible} = generateTabItemSetter(positionToIndex, getHeaderFooterLabels, getPanel, options);

	//save/load
	const {savePosition, loadPosition, parseHashPosition} = generateSaveLoadIndex(containers, options);

	//methods
	const {switchToWithoutSave, switchTo, switchPrevious, switchNext} = genetateSwitch(positionToIndex, parsePosition, getHeaderFooterLabels, getPanel, savePosition, containers, context, options);

	const {
		addTabItem,
		insertTabItem,
		add,
		addWithoutSwitch,
		insert,
		remove,
	} = generateAddRemove(positionToIndex, getHeaderFooterLabels, getPanel, savePosition, switchTo, switchPrevious, switchNext, containers, context, options);

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
	if (context.itemCount > 0) {
		switchToWithoutSave(loadPosition());
		if (context.currentIndex === -1) {
			switchToWithoutSave(0);
		}
	}
	handleHashChangeEvent(parseHashPosition, switchTo, options);
	handleClickEvent(switchTo, containers, context, options);

	//controller
	const controller = {
		getCount,
		getCurrentIndex,
		getCurrentName,
		getName,
		getIndexByName,
		isDisabled, isEnabled, isHidden, isVisible,
		getHeaderLabel, getFooterLabel, getHeaderFooterLabels,
		getPanel,
		getCurrentHeaderLabel, getCurrentFooterLabel, getCurrentHeaderFooterLabels,
		getCurrentPanel,
		setName, setDisabled, setEnabled, setHidden, setVisible,
		updateFixedHeight,
		switchTo, switchPrevious, switchNext,
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
