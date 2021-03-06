import $ from 'jquery';
import Switcher from '../feature/switcher';
import TabItemSetter from '../feature/tab-item-setter';

const UP = 'Up';
const DOWN = 'Down';
const LEFT = 'Left';
const RIGHT = 'Right';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

const TAB = 'Tab';
const HOME = 'Home';
const END = 'End';
const SPACE = ' ';
const ENTER = 'Enter';

const ARROW_UP_CODE = 38;
const ARROW_DOWN_CODE = 40;
const ARROW_LEFT_CODE = 37;
const ARROW_RIGHT_CODE = 39;

const TAB_CODE = 9;
const HOME_CODE = 36;
const END_CODE = 35;
const SPACE_CODE = 32;
const ENTER_CODE = 13;

function handleKeydownEvent(
	tabItemSetter: TabItemSetter,
	switcher: Switcher,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	if (!options.keyboardSwitch) {
		return;
	}

	let $labelContainers = $([]);
	const {$headerLabelContainer, $footerLabelContainer} = containers;
	if ($headerLabelContainer) {
		$labelContainers = $labelContainers.add($headerLabelContainer);
	}
	if ($footerLabelContainer) {
		$labelContainers = $labelContainers.add($footerLabelContainer);
	}

	$labelContainers.keydown(function (e) {
		let switchResult: JQueryTab.SwitchResult;
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
					switchResult = switcher.switchTo($(e.target).index());
					break;
			}
		} else if (e.keyCode) {
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
					switchResult = switcher.switchTo($(e.target).index());
					break;
			}
		}

		if (switchResult) {
			tabItemSetter.setFocus(context.currentIndex, this);
			e.preventDefault();
		}

	});
}

export default handleKeydownEvent;
