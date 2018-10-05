/// <reference path='index.d.ts' />

import $ from 'jquery';

import generateTab from './partial/generate-tab';
import autoEnableTabs from './partial/auto-enable-tabs';

$.fn.tab = function (customOptions?: JQueryTab.Options) {
	this.each(function (index, region) {
		const $region = $(region);
		generateTab($region, customOptions);
	});

	return this;
};

autoEnableTabs();

export default $;
