import $ from 'jquery';
var UP = 'Up';
var DOWN = 'Down';
var LEFT = 'Left';
var RIGHT = 'Right';
var ARROW_UP = 'ArrowUp';
var ARROW_DOWN = 'ArrowDown';
var ARROW_LEFT = 'ArrowLeft';
var ARROW_RIGHT = 'ArrowRight';
var ARROW_UP_CODE = 38;
var ARROW_DOWN_CODE = 40;
var ARROW_LEFT_CODE = 37;
var ARROW_RIGHT_CODE = 39;
function handleKeypressEvent(tabItemSetter, switcher, containers, context) {
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
            }
        }
        if (switchResult) {
            tabItemSetter.setFocus(context.currentIndex, this);
            e.preventDefault();
        }
    });
}
export default handleKeypressEvent;
