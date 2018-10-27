import $ from "jquery";
const HASH_PREFIX = '#';
const RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
function isValidPosition(position) {
    return position !== -1 && position !== undefined && position !== null && position !== '';
}
function generateSaveLoadIndex(containers, options) {
    const { $region, $tabContainer } = containers;
    const { statusFieldSelector, statusHashTemplate, statusHashSeparator, fnSavePosition, fnLoadPosition, activePosition } = options;
    let $statusFields = $region.find(statusFieldSelector);
    if (!$statusFields.length) {
        $statusFields = $(statusFieldSelector);
    }
    let RE_STATUS_HASH;
    if (statusHashTemplate) {
        RE_STATUS_HASH = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '([-\\w]+)');
    }
    const savePosition = function saveIndex(position) {
        $statusFields.val(position);
        if (statusHashTemplate) {
            let hash = location.hash;
            const statusHash = statusHashTemplate + position;
            if (hash.indexOf(statusHashTemplate) > -1) {
                hash = hash.replace(RE_STATUS_HASH, statusHash);
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
    };
    const parseHashPosition = function () {
        const searchResult = location.hash.match(RE_STATUS_HASH);
        if (searchResult && searchResult[1]) {
            return parseInt(searchResult[1]);
        }
        return -1;
    };
    const loadPosition = function () {
        let position = -1;
        $statusFields.each(function () {
            const status = $(this).val();
            if (typeof status === 'number' || status.length) {
                position = status;
                return false;
            }
        });
        if (isValidPosition(position)) {
            return position;
        }
        if (statusHashTemplate) {
            position = parseHashPosition();
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
    };
    return { savePosition, loadPosition, parseHashPosition };
}
export default generateSaveLoadIndex;
