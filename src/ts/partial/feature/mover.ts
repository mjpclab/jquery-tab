import Getter from "./getter";

type FnMoveElement = ($container: JQuery<HTMLElement>, fromIndex: number, toIndex: number) => void;

function _extractElement($container: JQuery<HTMLElement>, fromIndex: number, toIndex: number) {
	const $children = $container.children();
	const $from = $children.eq(fromIndex);
	const $to = $children.eq(toIndex);
	return {$from, $to};
}

function moveElementBefore($container: JQuery<HTMLElement>, fromIndex: number, toIndex: number) {
	const {$from, $to} = _extractElement($container, fromIndex, toIndex);

	$from.insertBefore($to);
}

function moveElementAfter($container: JQuery<HTMLElement>, fromIndex: number, toIndex: number) {
	const {$from, $to} = _extractElement($container, fromIndex, toIndex);

	$from.insertAfter($to);
}

function exchangeElement($container: JQuery<HTMLElement>, fromIndex: number, toIndex: number) {
	const {$from, $to} = _extractElement($container, fromIndex, toIndex);

	$from.insertAfter($to);
	//use .children() again to get the latest order
	$to.insertBefore($container.children().eq(fromIndex));
}

class Mover {
	private readonly getter: Getter;

	private readonly containers: JQueryTab.Containers;
	private readonly context: JQueryTab.Context;

	constructor(
		getter: Getter,
		containers: JQueryTab.Containers,
		context: JQueryTab.Context,
	) {
		this.getter = getter;
		this.containers = containers;
		this.context = context;
	}

	private _parseFromToPositions(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		const {getter, context} = this;
		const {itemCount} = context;

		let fromIndex = getter.positionToIndex(fromPosition);
		let toIndex = getter.positionToIndex(toPosition);

		if (fromIndex < 0 || fromIndex >= itemCount || toIndex < 0 || toIndex >= itemCount || fromIndex === toIndex) {
			return;
		}

		return {fromIndex, toIndex}
	}

	private _reorderElement(fnMoveElement: FnMoveElement, fromIndex: number, toIndex: number) {
		const {$headerLabelContainer, $panelContainer, $footerLabelContainer} = this.containers;
		$headerLabelContainer && fnMoveElement($headerLabelContainer, fromIndex, toIndex);
		$footerLabelContainer && fnMoveElement($footerLabelContainer, fromIndex, toIndex);
		fnMoveElement($panelContainer, fromIndex, toIndex);
	}

	moveTabItemBefore(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		const indexes = this._parseFromToPositions(fromPosition, toPosition);
		if (!indexes) {
			return;
		}
		let {fromIndex, toIndex} = indexes;

		const {context} = this;
		if (fromIndex === toIndex - 1) {
			return;
		}

		this._reorderElement(moveElementBefore, fromIndex, toIndex);

		if (fromIndex === context.currentIndex) {
			context.currentIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
		} else if (fromIndex < context.currentIndex && toIndex > context.currentIndex) {
			context.currentIndex--;
		} else if (fromIndex > context.currentIndex && toIndex <= context.currentIndex) {
			context.currentIndex++;
		}
	}

	moveTabItemAfter(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		const indexes = this._parseFromToPositions(fromPosition, toPosition);
		if (!indexes) {
			return;
		}
		let {fromIndex, toIndex} = indexes;

		const {context} = this;
		if (fromIndex === toIndex + 1) {
			return;
		}

		this._reorderElement(moveElementAfter, fromIndex, toIndex);

		if (fromIndex === context.currentIndex) {
			context.currentIndex = fromIndex < toIndex ? toIndex : toIndex + 1;
		} else if (fromIndex < context.currentIndex && toIndex >= context.currentIndex) {
			context.currentIndex--;
		} else if (fromIndex > context.currentIndex && toIndex < context.currentIndex) {
			context.currentIndex++;
		}
	}

	moveTabItemFirst(fromPosition: JQueryTab.TabItemPosition) {
		this.moveTabItemBefore(fromPosition, 0);
	}

	moveTabItemLast(fromPosition: JQueryTab.TabItemPosition) {
		this.moveTabItemAfter(fromPosition, this.context.itemCount - 1);
	}

	moveTabItemPrevious(fromPosition: JQueryTab.TabItemPosition) {
		const fromIndex = this.getter.positionToIndex(fromPosition);
		if (fromIndex <= 0 || fromIndex >= this.context.itemCount) {
			return;
		}
		this.moveTabItemBefore(fromIndex, fromIndex - 1);
	}

	moveTabItemNext(fromPosition: JQueryTab.TabItemPosition) {
		const fromIndex = this.getter.positionToIndex(fromPosition);
		if (fromIndex < 0 || fromIndex >= this.context.itemCount - 1) {
			return;
		}
		this.moveTabItemAfter(fromIndex, fromIndex + 1);
	}

	exchangeTabItem(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		const indexes = this._parseFromToPositions(fromPosition, toPosition);
		if (!indexes) {
			return;
		}
		let {fromIndex, toIndex} = indexes;

		const {context} = this;
		if (fromIndex > toIndex) {
			const tmpIndex = fromIndex;
			fromIndex = toIndex;
			toIndex = tmpIndex;
		}

		if (fromIndex + 1 === toIndex) {
			this._reorderElement(moveElementAfter, fromIndex, toIndex);
		} else {
			this._reorderElement(exchangeElement, fromIndex, toIndex);
		}

		if (fromIndex === context.currentIndex) {
			context.currentIndex = toIndex;
		} else if (toIndex === context.currentIndex) {
			context.currentIndex = fromIndex;
		}
	}

}

export default Mover;
