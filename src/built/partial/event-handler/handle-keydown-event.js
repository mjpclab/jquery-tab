import $ from 'jquery';
var UP = 'Up';
var DOWN = 'Down';
var LEFT = 'Left';
var RIGHT = 'Right';
var ARROW_UP = 'ArrowUp';
var ARROW_DOWN = 'ArrowDown';
var ARROW_LEFT = 'ArrowLeft';
var ARROW_RIGHT = 'ArrowRight';
var TAB = 'Tab';
var HOME = 'Home';
var END = 'End';
var SPACE = ' ';
var ENTER = 'Enter';
var ARROW_UP_CODE = 38;
var ARROW_DOWN_CODE = 40;
var ARROW_LEFT_CODE = 37;
var ARROW_RIGHT_CODE = 39;
var TAB_CODE = 9;
var HOME_CODE = 36;
var END_CODE = 35;
var SPACE_CODE = 32;
var ENTER_CODE = 13;
function handleKeydownEvent(tabItemSetter, switcher, containers, context, options) {
    if (!options.keyboardSwitch) {
        return;
    }
    var $labelContainers = $([]);
    var $headerLabelContainer = containers.$headerLabelContainer, $footerLabelContainer = containers.$footerLabelContainer;
    if ($headerLabelContainer) {
        $labelContainers = $labelContainers.add($headerLabelContainer);
    }
    if ($footerLabelContainer) {
        $labelContainers = $labelContainers.add($footerLabelContainer);
    }
    $labelContainers.keydown(function (e) {
        var switchResult;
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
        }
        else if (e.keyCode) {
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
