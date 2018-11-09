import $ from "jquery";
var HASH_PREFIX = '#';
var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
function isValidPosition(position) {
    return position !== -1 && position !== undefined && position !== null && position !== '';
}
function generateSaveLoadIndex(containers, options) {
    var $region = containers.$region, $tabContainer = containers.$tabContainer;
    var statusFieldSelector = options.statusFieldSelector, statusHashTemplate = options.statusHashTemplate, statusHashSeparator = options.statusHashSeparator, fnSavePosition = options.fnSavePosition, fnLoadPosition = options.fnLoadPosition, activePosition = options.activePosition;
    var $statusFields = $region.find(statusFieldSelector);
    if (!$statusFields.length) {
        $statusFields = $(statusFieldSelector);
    }
    var RE_STATUS_HASH;
    if (statusHashTemplate) {
        RE_STATUS_HASH = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '([-\\w]+)');
    }
    var savePosition = function saveIndex(position) {
        $statusFields.val(position);
        if (statusHashTemplate) {
            var hash = location.hash;
            var statusHash = statusHashTemplate + position;
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
    var parseHashPosition = function () {
        var searchResult = location.hash.match(RE_STATUS_HASH);
        if (searchResult && searchResult[1]) {
            return searchResult[1];
        }
        return -1;
    };
    var loadPosition = function () {
        var position = -1;
        $statusFields.each(function () {
            var status = $(this).val();
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
    return { savePosition: savePosition, loadPosition: loadPosition, parseHashPosition: parseHashPosition };
}
export default generateSaveLoadIndex;
