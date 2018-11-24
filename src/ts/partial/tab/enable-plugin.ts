import $ from 'jquery';
import applyDefaultRegion from './apply-default-region';
import registerPlugin from './register-plugin';

let enabled = false;

function enablePlugin(pluginName: keyof typeof $.fn) {
	registerPlugin(pluginName);
	if (!enabled) {
		enabled = true;
		applyDefaultRegion();
	}
}

export default enablePlugin;
