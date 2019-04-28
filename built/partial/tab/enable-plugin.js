import applyDefaultRegion from './apply-default-region';
import registerPlugin from './register-plugin';
var enabled = false;
function enablePlugin(pluginName) {
    registerPlugin(pluginName);
    if (!enabled) {
        enabled = true;
        applyDefaultRegion();
    }
}
export default enablePlugin;
