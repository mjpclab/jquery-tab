import $ from 'jquery';
var ARROW_UP = 'ArrowUp';
var ARROW_DOWN = 'ArrowDown';
var ARROW_LEFT = 'ArrowLeft';
var ARROW_RIGHT = 'ArrowRight';
var ARROW_UP_CODE = 38;
var ARROW_DOWN_CODE = 40;
var ARROW_LEFT_CODE = 37;
var ARROW_RIGHT_CODE = 39;
function handleKeypressEvent(switcher, containers, context) {
    var $labelContainers = $([]);
    var $headerLabelContainer = containers.$headerLabelContainer, $footerLabelContainer = containers.$footerLabelContainer;
    if ($headerLabelContainer) {
        $labelContainers = $labelContainers.add($headerLabelContainer);
    }
    if ($footerLabelContainer) {
        $labelContainers = $labelContainers.add($footerLabelContainer);
    }
    function setFocus(container) {
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
