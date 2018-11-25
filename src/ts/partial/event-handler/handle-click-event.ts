import $ from 'jquery';
import TabItemSetter from '../feature/tab-item-setter';
import Switcher from '../feature/switcher';

function handleClickEvent(
	tabItemSetter: TabItemSetter,
	switcher: Switcher,
	containers: JQueryTab.Containers,
	context: JQueryTab.Context,
	options: JQueryTab.ExpandedOptions
) {
	const {
		triggerEvents,
		delayTriggerEvents,
		delayTriggerCancelEvents,
		delayTriggerLatency,
		disabledLabelItemClass,
		hiddenLabelItemClass
	} = options;
	const {
		$headerLabelContainerLeaf,
		$footerLabelContainerLeaf
	} = containers;

	//handle delay trigger event
	let delayTriggerTimeoutHandler: any;
	const startDelayTrigger = function (
		position: JQueryTab.TabItemPosition,
		$label: JQuery<HTMLElement>
	) {
		delayTriggerTimeoutHandler = setTimeout(function () {
			const switchResult = switcher.switchTo(position);
			if (switchResult === false) {  //explicitly cancelled
				$label.blur();
				tabItemSetter.setFocus(context.currentIndex, $label.parent());
			}
			delayTriggerTimeoutHandler = undefined;
		}, delayTriggerLatency);
	};

	const cancelDelayTrigger = function () {
		if (delayTriggerTimeoutHandler) {
			clearTimeout(delayTriggerTimeoutHandler);
			delayTriggerTimeoutHandler = undefined;
		}
	};

	const labelItemDelayClick = function (e: any) {
		if (e.currentTarget.parentNode !== e.delegateTarget) {
			return;
		}
		cancelDelayTrigger();
		const $label = $(e.currentTarget);
		const labelIndex = $label.index();
		if (
			labelIndex === context.currentIndex ||
			$label.hasClass(disabledLabelItemClass) ||
			$label.hasClass(hiddenLabelItemClass)
		) {
			return;
		}
		startDelayTrigger(labelIndex, $label);
	};
	const labelItemCancelDelayClick = function (e: any) {
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
	const labelItemClick = function (e: any) {
		if (e.currentTarget.parentNode !== e.delegateTarget) {
			return;
		}
		cancelDelayTrigger();
		const $label = $(e.currentTarget);
		const labelIndex = $label.index();
		if (
			labelIndex === context.currentIndex ||
			$label.hasClass(disabledLabelItemClass) ||
			$label.hasClass(hiddenLabelItemClass)
		) {
			return;
		}

		const switchResult = switcher.switchTo(labelIndex);
		if (switchResult === false) {  //explicitly cancelled
			$label.blur();
			tabItemSetter.setFocus(context.currentIndex, $label.parent());
		}
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

export default handleClickEvent;
