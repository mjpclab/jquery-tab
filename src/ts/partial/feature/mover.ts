import Getter from "./getter";

function exchangeElement($container: JQuery<HTMLElement>, fromIndex: number, toIndex: number) {
	const $children = $container.children();
	const $from = $children.eq(fromIndex);
	const $to = $children.eq(toIndex);
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

	exchangeTabItem(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition) {
		const {getter, context} = this;
		const {itemCount} = context;
		const {$headerLabelContainer, $panelContainer, $footerLabelContainer} = this.containers;

		let fromIndex = getter.positionToIndex(fromPosition);
		let toIndex = getter.positionToIndex(toPosition);

		if (fromIndex < 0 || fromIndex >= itemCount || toIndex < 0 || toIndex >= itemCount || fromIndex === toIndex) {
			return;
		}
		if (fromIndex > toIndex) {
			const tmpIndex = fromIndex;
			fromIndex = toIndex;
			toIndex = tmpIndex;
		}

		$headerLabelContainer && exchangeElement($headerLabelContainer, fromIndex, toIndex);
		$footerLabelContainer && exchangeElement($footerLabelContainer, fromIndex, toIndex);
		exchangeElement($panelContainer, fromIndex, toIndex);

		if (fromIndex === context.currentIndex) {
			context.currentIndex = toIndex;
		} else if (toIndex === context.currentIndex) {
			context.currentIndex = fromIndex;
		}
	}
}

export default Mover;
