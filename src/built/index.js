/// <reference path='public.d.ts' />
import $ from 'jquery';
import generateTab from './partial/generate-tab';
import autoEnableTabs from './partial/auto-enable-tabs';
$.fn.tab = function (customOptions) {
    this.each(function (index, region) {
        const $region = $(region);
        generateTab($region, customOptions);
    });
    return this;
};
autoEnableTabs();
export default $;
