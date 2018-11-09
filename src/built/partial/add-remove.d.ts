import Getter from "./getter";
import SaveLoad from "./save-load";
import Switcher from './switcher';
declare class AddRemove {
    private readonly getter;
    private readonly saveLoad;
    private readonly switcher;
    private readonly containers;
    private readonly context;
    private readonly options;
    constructor(getter: Getter, saveLoad: SaveLoad, switcher: Switcher, containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions);
    private _switchIfInitial;
    insertTabItemWithoutSwitch(position: JQueryTab.TabItemPosition, tabItem: JQueryTab.TabItem): void;
    insertTabItem(position: JQueryTab.TabItemPosition, tabItem: JQueryTab.TabItem): void;
    addTabItemWithoutSwitch(tabItem: JQueryTab.TabItem): void;
    addTabItem(tabItem: JQueryTab.TabItem): void;
    insertWithoutSwitch(position: JQueryTab.TabItemPosition, sourceRegion: JQueryTab.JQueriable): void;
    insert(sourceRegion: JQueryTab.JQueriable, position: JQueryTab.TabItemPosition): void;
    addWithoutSwitch(sourceRegion: JQueryTab.JQueriable): void;
    add(sourceRegion: JQueryTab.JQueriable): void;
    remove(positions: JQueryTab.TabItemPosition[]): number | undefined;
}
export default AddRemove;
