/// <reference path='public.d.ts' />

import $ from 'jquery';

import tablize from './partial/tablize';
import autoEnableTabs from './partial/auto-enable-tabs';

$.fn.tab = function (customOptions?: JQueryTab.Options) {
	this.each(function (index, region) {
		const $region = $(region);
		tablize($region, customOptions);
	});

	return this;
};

autoEnableTabs();

export default $;
