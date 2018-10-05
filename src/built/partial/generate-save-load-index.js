import $ from "jquery";
const RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
function generateSaveLoadIndex(containers, context, options) {
    const { $region, $tabContainer } = containers;
    const { statusFieldSelector, statusHashTemplate, statusHashSeparator, fnSaveIndex, fnLoadIndex, activeIndex } = options;
    let $statusFields = $region.find(statusFieldSelector);
    if (!$statusFields.length) {
        $statusFields = $(statusFieldSelector);
    }
    let RE_STATUS_HASH;
    let RE_STATUS_HASH_DIGITS;
    if (statusHashTemplate) {
        RE_STATUS_HASH = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '-?\\d+');
        RE_STATUS_HASH_DIGITS = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '(-?\\d+)');
    }
    const saveIndex = function saveIndex(index) {
        $statusFields.val(index);
        if (statusHashTemplate) {
            let hash = location.hash;
            const statusHash = statusHashTemplate + index;
            if (hash.indexOf(statusHashTemplate) > -1) {
                hash = hash.replace(RE_STATUS_HASH, statusHash);
            }
            else {
                if (hash.length) {
                    hash += statusHashSeparator;
                }
                hash += statusHash;
            }
            location.hash = hash;
        }
        if (fnSaveIndex) {
            fnSaveIndex.call($tabContainer, index);
        }
    };
    const parseHashIndex = function () {
        const searchResult = location.hash.match(RE_STATUS_HASH_DIGITS);
        if (searchResult && searchResult[1]) {
            return parseInt(searchResult[1]);
        }
        return -1;
    };
    const loadIndex = function () {
        const { itemCount } = context;
        let index = -1;
        if (itemCount === 0) {
            return index;
        }
        $statusFields.each(function () {
            const status = $(this).val();
            if (typeof status === 'number') {
                index = status;
                return false;
            }
            else if (status.length) {
                const intStatus = parseInt(status);
                if (isFinite(intStatus) && !isNaN(intStatus)) {
                    index = parseInt(status);
                    return false;
                }
            }
        });
        if ((index === -1 || isNaN(index)) && statusHashTemplate) {
            index = parseHashIndex();
        }
        if ((index === -1 || isNaN(index)) && fnLoadIndex) {
            index = parseInt(fnLoadIndex.call($tabContainer));
        }
        if (index === -1 || isNaN(index)) {
            index = Number(activeIndex) || 0;
        }
        if (index < 0) {
            index = 0;
        }
        else if (index >= itemCount) {
            index = itemCount - 1;
        }
        return index;
    };
    return { saveIndex, loadIndex, parseHashIndex };
}
export default generateSaveLoadIndex;
