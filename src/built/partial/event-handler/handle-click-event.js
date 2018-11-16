import $ from "jquery";
function hahdleClickEvent(switcher, containers, context, options) {
    var triggerEvents = options.triggerEvents, delayTriggerEvents = options.delayTriggerEvents, delayTriggerCancelEvents = options.delayTriggerCancelEvents, delayTriggerLatency = options.delayTriggerLatency, disabledLabelItemClass = options.disabledLabelItemClass, hiddenLabelItemClass = options.hiddenLabelItemClass;
    var $headerLabelContainerLeaf = containers.$headerLabelContainerLeaf, $footerLabelContainerLeaf = containers.$footerLabelContainerLeaf;
    //handle delay trigger event
    var delayTriggerTimeoutHandler;
    var startDelayTrigger = function (position) {
        delayTriggerTimeoutHandler = setTimeout(function () {
            switcher.switchTo(position);
            delayTriggerTimeoutHandler = undefined;
        }, delayTriggerLatency);
    };
    var cancelDelayTrigger = function () {
        if (delayTriggerTimeoutHandler) {
            clearTimeout(delayTriggerTimeoutHandler);
            delayTriggerTimeoutHandler = undefined;
        }
    };
    var labelItemDelayClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        cancelDelayTrigger();
        var $label = $(e.currentTarget);
        var labelIndex = $label.index();
        if (labelIndex === context.currentIndex ||
            $label.hasClass(disabledLabelItemClass) ||
            $label.hasClass(hiddenLabelItemClass)) {
            return;
        }
        startDelayTrigger(labelIndex);
    };
    var labelItemCancelDelayClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        var $label = $(e.currentTarget);
        var labelIndex = $label.index();
        if (labelIndex === context.currentIndex) {
            return;
        }
        cancelDelayTrigger();
    };
    if (delayTriggerEvents) {
        if ($headerLabelContainerLeaf) {
            $headerLabelContainerLeaf.on(delayTriggerEvents, '*', labelItemDelayClick);
        }
        if ($footerLabelContainerLeaf) {
            $footerLabelContainerLeaf.on(delayTriggerEvents, '*', labelItemDelayClick);
        }
        if (delayTriggerCancelEvents) {
            if ($headerLabelContainerLeaf) {
                $headerLabelContainerLeaf.on(delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
            }
            if ($footerLabelContainerLeaf) {
                $footerLabelContainerLeaf.on(delayTriggerCancelEvents, '*', labelItemCancelDelayClick);
            }
        }
    }
    //handle trigger event
    var labelItemClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        cancelDelayTrigger();
        var $label = $(e.currentTarget);
        var labelIndex = $label.index();
        if (labelIndex === context.currentIndex ||
            $label.hasClass(disabledLabelItemClass) ||
            $label.hasClass(hiddenLabelItemClass)) {
            return;
        }
        switcher.switchTo(labelIndex);
    };
    if (triggerEvents) {
        if ($headerLabelContainerLeaf) {
            $headerLabelContainerLeaf.on(triggerEvents, '*', labelItemClick);
        }
        if ($footerLabelContainerLeaf) {
            $footerLabelContainerLeaf.on(triggerEvents, '*', labelItemClick);
        }
    }
}
export default hahdleClickEvent;
