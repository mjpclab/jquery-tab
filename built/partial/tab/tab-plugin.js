import $ from 'jquery';
import normalizeOptions from '../utility/normalize-options';
import tablize from './tablize';
function tabPlugin(options) {
    var normalizedOptions = normalizeOptions(options);
    this.each(function (index, region) {
        tablize($(region), normalizedOptions);
    });
    return this;
}
export default tabPlugin;
