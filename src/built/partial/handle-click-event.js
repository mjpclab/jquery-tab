import $ from "jquery";
function hahdleClickEvent(fnSwitchTo, containers, context, options) {
    const { triggerEvents, delayTriggerEvents, delayTriggerCancelEvents, delayTriggerLatency } = options;
    const { $headerLabelContainerLeaf, $footerLabelContainerLeaf } = containers;
    //handle delay trigger event
    let delayTriggerTimeoutHandler;
    const startDelayTrigger = function (labelIndex) {
        delayTriggerTimeoutHandler = setTimeout(function () {
            fnSwitchTo(labelIndex);
            delayTriggerTimeoutHandler = undefined;
        }, delayTriggerLatency);
    };
    const cancelDelayTrigger = function () {
        if (delayTriggerTimeoutHandler) {
            clearTimeout(delayTriggerTimeoutHandler);
            delayTriggerTimeoutHandler = undefined;
        }
    };
    const labelItemDelayClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        cancelDelayTrigger();
        const $label = $(e.currentTarget);
        const labelIndex = $label.index();
        if (labelIndex === context.currentIndex) {
            return;
        }
        startDelayTrigger(labelIndex);
    };
    const labelItemCancelDelayClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        const $label = $(e.currentTarget);
        const labelIndex = $label.index();
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
    const labelItemClick = function (e) {
        if (e.currentTarget.parentNode !== e.delegateTarget) {
            return;
        }
        cancelDelayTrigger();
        const $label = $(e.currentTarget);
        const labelIndex = $label.index();
        if (labelIndex === context.currentIndex) {
            return;
        }
        fnSwitchTo(labelIndex);
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
