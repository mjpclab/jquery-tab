import $ from 'jquery';
import Getter from './getter';
import SaveLoad from './save-load';
import Switcher from './switcher';

class Remover {
	private readonly getter: Getter;
	private readonly saveLoad: SaveLoad;
	private readonly switcher: Switcher;

	private readonly context: JQueryTab.Context;

	constructor(
		getter: Getter,
		saveLoad: SaveLoad,
		switcher: Switcher,
		context: JQueryTab.Context,
	) {
		this.getter = getter;
		this.saveLoad = saveLoad;
		this.switcher = switcher;

		this.context = context;
	}

	remove(positions: JQueryTab.TabItemPosition[]) {
		if (!positions.length) {
			return;
		}

		const {getter, saveLoad, switcher, context} = this;
		const removeIndecies = [];
		for (let i = 0, len = positions.length; i < len; i++) {
			const removeIndex = getter.positionToIndex(positions[i]);
			if (removeIndex >= 0 && removeIndex < context.itemCount && $.inArray(removeIndex, removeIndecies) === -1) {
				removeIndecies.push(removeIndex);
			}
		}
		if (!removeIndecies.length) {
			return;
		}
		removeIndecies.sort(function (prev, next) {
			return next - prev;
		});

		if (context.itemCount > 1 && $.inArray(context.currentIndex, removeIndecies) >= 0) {
			switcher.switchNext({exclude: removeIndecies}) ||
			switcher.switchPrevious({exclude: removeIndecies}) ||
			switcher.switchNext({includeDisabled: true, exclude: removeIndecies}) ||
			switcher.switchPrevious({includeDisabled: true, exclude: removeIndecies}) ||
			switcher.switchNext({includeHidden: true, exclude: removeIndecies}) ||
			switcher.switchPrevious({includeHidden: true, exclude: removeIndecies}) ||
			switcher.switchNext({includeDisabled: true, includeHidden: true, exclude: removeIndecies}) ||
			switcher.switchPrevious({includeDisabled: true, includeHidden: true, exclude: removeIndecies});
		}

		let currentIndexChanged = false;
		for (let i = 0, len = removeIndecies.length; i < len; i++) {
			const removeIndex = removeIndecies[i];
			const $labelItems = getter.getHeaderFooterLabels(removeIndex);
			const $panelItem = getter.getPanel(removeIndex);

			$labelItems.remove();
			$panelItem.remove();

			if (removeIndex < context.currentIndex) {
				context.currentIndex--;
				currentIndexChanged = true;
			}
			context.itemCount--;
		}

		if (context.itemCount === 0) {
			context.currentIndex = -1;
			context.currentName = undefined;
		}
		else if (currentIndexChanged && !context.currentName) {
			saveLoad.savePosition(context.currentIndex);
		}

		return removeIndecies.length;
	}
}

export default Remover;
