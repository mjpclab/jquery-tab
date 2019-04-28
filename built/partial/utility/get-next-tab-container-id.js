var NUMBER_MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
var currentTabberContainerId = -1;
function getNextTabContainerId() {
    currentTabberContainerId = (currentTabberContainerId + 1) % NUMBER_MAX_SAFE_INTEGER;
    return currentTabberContainerId;
}
export default getNextTabContainerId;
