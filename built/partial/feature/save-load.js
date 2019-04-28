import $ from 'jquery';
var HASH_PREFIX = '#';
var RE_ESCAPE_CHARS = /[.?*+\\\(\)\[\]\{\}]/g;
function isValidPosition(position) {
    return position !== -1 && position !== undefined && position !== null && position !== '';
}
var SaveLoad = /** @class */ (function () {
    function SaveLoad(containers, options) {
        this.containers = containers;
        this.options = options;
        var $region = containers.$region;
        var statusFieldSelector = options.statusFieldSelector, statusHashTemplate = options.statusHashTemplate;
        var $statusFields = $region.find(statusFieldSelector);
        if (!$statusFields.length) {
            $statusFields = $(statusFieldSelector);
        }
        this.$statusFields = $statusFields;
        if (statusHashTemplate) {
            this.reStatusHash = new RegExp(statusHashTemplate.replace(RE_ESCAPE_CHARS, '\\$&') + '([-\\w]+)');
        }
    }
    SaveLoad.prototype.savePosition = function (position) {
        var reStatusHash = this.reStatusHash;
        var $tabContainer = this.containers.$tabContainer;
        var _a = this.options, statusHashTemplate = _a.statusHashTemplate, statusHashSeparator = _a.statusHashSeparator, fnSavePosition = _a.fnSavePosition;
        this.$statusFields.val(position);
        if (statusHashTemplate) {
            var hash = location.hash;
            var statusHash = statusHashTemplate + position;
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
    };
    SaveLoad.prototype.parseHashPosition = function () {
        var reStatusHash = this.reStatusHash;
        if (reStatusHash) {
            var searchResult = location.hash.match(reStatusHash);
            if (searchResult && searchResult[1]) {
                return searchResult[1];
            }
        }
        return -1;
    };
    SaveLoad.prototype.loadPosition = function () {
        var $statusFields = this.$statusFields;
        var $tabContainer = this.containers.$tabContainer;
        var _a = this.options, statusHashTemplate = _a.statusHashTemplate, fnLoadPosition = _a.fnLoadPosition, activePosition = _a.activePosition;
        var position = -1;
        $statusFields.each(function (i, statusField) {
            var status = $(statusField).val();
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
                if (typeof position === 'object') {
                    if (position.then) {
                        return position;
                    }
                }
                else {
                    return position;
                }
            }
        }
        if (isValidPosition(activePosition)) {
            return activePosition;
        }
        return 0;
    };
    return SaveLoad;
}());
export default SaveLoad;
