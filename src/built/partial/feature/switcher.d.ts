import Getter from './getter';
import DomUpdater from './dom-updater';
import SaveLoad from './save-load';
declare class Switcher {
    private readonly getter;
    private readonly domUpdater;
    private readonly saveLoad;
    private readonly containers;
    private readonly context;
    private readonly options;
    constructor(getter: Getter, domUpdater: DomUpdater, saveLoad: SaveLoad, containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions);
    switchToWithoutSave(newPosition: JQueryTab.TabItemPosition): JQueryTab.SwitchResult;
    switchTo(newPosition: JQueryTab.TabItemPosition): JQueryTab.SwitchResult;
    private _switchNeighbor;
    switchPrevious(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult;
    switchNext(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult;
    switchFirst(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult;
    switchLast(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.SwitchResult;
}
export default Switcher;
