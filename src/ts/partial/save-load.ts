import $ from "jquery";

const HASH_PREFIX = '#';
const RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;

function isValidPosition(position: JQueryTab.TabItemPosition) {
	return position !== -1 && position !== undefined && position !== null && position !== '';
}

class SaveLoad {
	private readonly containers: JQueryTab.Containers;
	private readonly options: JQueryTab.ExpandedOptions;
	private readonly $statusFields: JQuery;
	private readonly reStatusHash?: RegExp;

	constructor(
		containers: JQueryTab.Containers,
		options: JQueryTab.ExpandedOptions
	) {
		this.containers = containers;
		this.options = options;

		const {$region} = containers;
		const {statusFieldSelector, statusHashTemplate} = options;

		let $statusFields = $region.find(statusFieldSelector);
		if (!$statusFields.length) {
			$statusFields = $(statusFieldSelector);
		}
		this.$statusFields = $statusFields;

		if (statusHashTemplate) {
			this.reStatusHash = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '([-\\w]+)');
		}
	}

	savePosition(position: JQueryTab.TabItemPosition) {
		const {reStatusHash} = this;
		const {$tabContainer} = this.containers;
		const {statusHashTemplate, statusHashSeparator, fnSavePosition} = this.options;

		this.$statusFields.val(position);

		if (statusHashTemplate) {
			let hash = location.hash;
			const statusHash = statusHashTemplate + position;
			if (hash.indexOf(statusHashTemplate) >= 0 && reStatusHash) {
				hash = hash.replace(reStatusHash, statusHash);
			}
			else {
				if (hash !== HASH_PREFIX) {
					if (hash.length) {
						hash += statusHashSeparator;
					}
					else {
						hash = HASH_PREFIX;
					}
				}

				hash += statusHash;
			}

			location.replace(hash);
		}

		if (fnSavePosition) {
			fnSavePosition.call($tabContainer, position);
		}
	}

	parseHashPosition() {
		const {reStatusHash} = this;
		if (reStatusHash) {
			const searchResult = location.hash.match(reStatusHash);
			if (searchResult && searchResult[1]) {
				return searchResult[1];
			}
		}
		return -1;
	}

	loadPosition() {
		const {$statusFields} = this;
		const {$tabContainer} = this.containers;
		const {statusHashTemplate, fnLoadPosition, activePosition} = this.options;

		let position: JQueryTab.TabItemPosition = -1;
		$statusFields.each(function (i, statusField) {
			const status = $(statusField).val() as string | number;
			if (typeof status === 'number' || status.length) {
				position = status;
				return false;
			}
		});
		if (isValidPosition(position)) {
			return position;
		}

		if (statusHashTemplate) {
			position = this.parseHashPosition();
			if (isValidPosition(position)) {
				return position;
			}
		}

		if (fnLoadPosition) {
			position = fnLoadPosition.call($tabContainer);
			if (isValidPosition(position)) {
				return position;
			}
		}

		if (isValidPosition(activePosition)) {
			return activePosition;
		}

		return 0;
	}

}

export default SaveLoad;
