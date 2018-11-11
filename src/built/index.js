/// <reference path='public.d.ts' />
import $ from 'jquery';
import normalizeOptions from './utility/normalize-options';
import tablize from './partial/tablize';
import autoEnableTabs from './partial/auto-enable-tabs';
$.fn.tab = function (options) {
    var normalizedOptions = normalizeOptions(options);
    this.each(function (index, region) {
        tablize($(region), normalizedOptions);
    });
    return this;
};
autoEnableTabs();
export default $;
