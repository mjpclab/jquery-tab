import Getter from './getter';
import DomUpdater from './dom-updater';
import TabItemSetter from './tab-item-setter';
import Switcher from './switcher';
import Adder from './adder';
import Remover from './remover';
import Mover from './mover';

function generateController(
	getter: Getter,
	domUpdater: DomUpdater,
	tabItemSetter: TabItemSetter,
	switcher: Switcher,
	adder: Adder,
	remover: Remover,
	mover: Mover
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

	const switchFirst = function (switchOptions?: JQueryTab.SwitchOptions) {
		return switcher.switchFirst(switchOptions);
	};

	const switchLast = function (switchOptions?: JQueryTab.SwitchOptions) {
		return switcher.switchLast(switchOptions);
	};

	//add

	const insertTabItem = function (position: JQueryTab.TabItemPosition, tabItem: JQueryTab.TabItem) {
		return adder.insertTabItem(position, tabItem);
	};

	const addTabItem = function (tabItem: JQueryTab.TabItem) {
		return adder.addTabItem(tabItem);
	};

	const insert = function (position: JQueryTab.TabItemPosition, sourceRegion: JQueryTab.JQueriable) {
		return adder.insert(position, sourceRegion);
	};

	const add = function (sourceRegion: JQueryTab.JQueriable) {
		return adder.add(sourceRegion);
	};

	//remove
	const remove = function (...positions: JQueryTab.TabItemPosition[]) {
		return remover.remove(positions);
	};

	//move
	const exchangeTabItem = function (fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		mover.exchangeTabItem(fromPosition, toPosition);
	};

	const moveTabItemBefore = function (fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		mover.moveTabItemBefore(fromPosition, toPosition);
	};

	const moveTabItemAfter = function (fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		mover.moveTabItemAfter(fromPosition, toPosition);
	};

	const moveTabItemFirst = function (fromPosition: JQueryTab.TabItemPosition) {
		mover.moveTabItemFirst(fromPosition);
	};

	const moveTabItemLast = function (fromPosition: JQueryTab.TabItemPosition) {
		mover.moveTabItemLast(fromPosition);
	};

	const moveTabItemPrevious = function (fromPosition: JQueryTab.TabItemPosition) {
		mover.moveTabItemPrevious(fromPosition);
	};

	const moveTabItemNext = function (fromPosition: JQueryTab.TabItemPosition) {
		mover.moveTabItemNext(fromPosition);
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
		switchTo, switchPrevious, switchNext, switchFirst, switchLast,
		addTabItem, insertTabItem, add, insert, remove,
		exchangeTabItem, moveTabItemBefore, moveTabItemAfter,
		moveTabItemFirst, moveTabItemLast, moveTabItemPrevious, moveTabItemNext
	};

	return controller;
}

export default generateController;
