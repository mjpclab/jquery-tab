import Getter from "./getter";
import DomUpdater from './dom-updater';
import TabItemSetter from './tab-item-setter';
import Switcher from "./switcher";
import AddRemove from './add-remove';

function generateController(
	getter: Getter,
	domUpdater: DomUpdater,
	tabItemSetter: TabItemSetter,
	switcher: Switcher,
	addRemove: AddRemove
) {
	//getter

	const getCount = function () {
		return getter.getCount();
	};

	const getCurrentIndex = function () {
		return getter.getCurrentIndex();
	};

	const getCurrentName = function () {
		return getter.getCurrentName();
	};

	const getName = function (index: number) {
		return getter.getName(index);
	};

	const getIndexByName = function (name: string) {
		return getter.getIndexByName(name);
	};

	const isDisabled = function (position: JQueryTab.TabItemPosition) {
		return getter.isDisabled(position);
	};

	const isEnabled = function (position: JQueryTab.TabItemPosition) {
		return getter.isEnabled(position);
	};

	const isHidden = function (position: JQueryTab.TabItemPosition) {
		return getter.isHidden(position);
	};

	const isVisible = function (position: JQueryTab.TabItemPosition) {
		return getter.isVisible(position);
	};

	const getHeaderLabel = function (position: JQueryTab.TabItemPosition) {
		return getter.getHeaderLabel(position);
	};

	const getFooterLabel = function (position: JQueryTab.TabItemPosition) {
		return getter.getFooterLabel(position);
	};

	const getHeaderFooterLabels = function (position: JQueryTab.TabItemPosition) {
		return getter.getHeaderFooterLabels(position);
	};

	const getPanel = function (position: JQueryTab.TabItemPosition) {
		return getter.getPanel(position);
	};

	const getCurrentHeaderLabel = function () {
		return getter.getCurrentHeaderLabel();
	};

	const getCurrentFooterLabel = function () {
		return getter.getCurrentFooterLabel();
	};

	const getCurrentHeaderFooterLabels = function () {
		return getter.getCurrentHeaderFooterLabels();
	};

	const getCurrentPanel = function () {
		return getter.getCurrentPanel();
	};

	const setName = function (position: JQueryTab.TabItemPosition, name: string) {
		return tabItemSetter.setName(position, name);
	};

	const setDisabled = function (position: JQueryTab.TabItemPosition, disabled = true) {
		return tabItemSetter.setDisabled(position, disabled);
	};

	const setEnabled = function (position: JQueryTab.TabItemPosition, enabled = true) {
		return tabItemSetter.setEnabled(position, enabled);
	};

	const setHidden = function (position: JQueryTab.TabItemPosition, hidden = true) {
		return tabItemSetter.setHidden(position, hidden);
	};

	const setVisible = function (position: JQueryTab.TabItemPosition, visible = true) {
		return tabItemSetter.setVisible(position, visible);
	};

	//dom updater

	const updateFixedHeight = function () {
		return domUpdater.updateFixedHeight();
	};

	//switcher

	const switchTo = function (newPosition: JQueryTab.TabItemPosition) {
		return switcher.switchTo(newPosition);
	};

	const switchPrevious = function (switchOptions?: JQueryTab.SwitchOptions) {
		return switcher.switchPrevious(switchOptions);
	};

	const switchNext = function (switchOptions?: JQueryTab.SwitchOptions) {
		return switcher.switchNext(switchOptions);
	};

	//add remove

	const insertTabItem = function (position: JQueryTab.TabItemPosition, tabItem: JQueryTab.TabItem) {
		return addRemove.insertTabItem(position, tabItem);
	};

	const addTabItem = function (tabItem: JQueryTab.TabItem) {
		return addRemove.addTabItem(tabItem);
	};

	const insert = function (position: JQueryTab.TabItemPosition, sourceRegion: JQueryTab.JQueriable) {
		return addRemove.insert(position, sourceRegion);
	};

	const add = function (sourceRegion: JQueryTab.JQueriable) {
		return addRemove.add(sourceRegion);
	};

	const remove = function (...positions: JQueryTab.TabItemPosition[]) {
		return addRemove.remove(positions);
	};

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

	return controller;
}

export default generateController;
