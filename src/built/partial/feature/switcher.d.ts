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
    switchToWithoutSave(newPosition: JQueryTab.TabItemPosition): JQueryTab.NormalizedTabItemPosition | undefined;
    switchTo(newPosition: JQueryTab.TabItemPosition): JQueryTab.NormalizedTabItemPosition | undefined;
    private _switchNeighbor;
    switchPrevious(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.NormalizedTabItemPosition | undefined;
    switchNext(switchOptions?: JQueryTab.SwitchOptions): JQueryTab.NormalizedTabItemPosition | undefined;
}
export default Switcher;
