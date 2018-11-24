import $ from 'jquery';
import Switcher from '../feature/switcher';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

const ARROW_UP_CODE = 38;
const ARROW_DOWN_CODE = 40;
const ARROW_LEFT_CODE = 37;
const ARROW_RIGHT_CODE = 39;

function handleKeypressEvent(
	switcher: Switcher,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context
) {
	let $labelContainers = $([]);
	const {$headerLabelContainer, $footerLabelContainer} = containers;
	if ($headerLabelContainer) {
		$labelContainers = $labelContainers.add($headerLabelContainer);
	}
	if ($footerLabelContainer) {
		$labelContainers = $labelContainers.add($footerLabelContainer);
	}

	function setFocus(container: HTMLElement) {
		$(container).children().eq(context.currentIndex).focus();
	}

	$labelContainers.keydown(function (e) {
		if (e.key) {
			switch (e.key) {
				case ARROW_UP:
				case ARROW_LEFT:
					switcher.switchPrevious();
					setFocus(this);
					break;
				case ARROW_DOWN:
				case ARROW_RIGHT:
					switcher.switchNext();
					setFocus(this);
					break;
			}
		}
		else if (e.keyCode) {
			switch (e.keyCode) {
				case ARROW_UP_CODE:
				case ARROW_LEFT_CODE:
					switcher.switchPrevious();
					setFocus(this);
					break;
				case ARROW_DOWN_CODE:
				case ARROW_RIGHT_CODE:
					switcher.switchNext();
					setFocus(this);
					break;
			}
		}
	});
}

export default handleKeypressEvent;
