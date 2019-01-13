import Getter from "./getter";
declare class Mover {
    private readonly getter;
    private readonly containers;
    private readonly context;
    constructor(getter: Getter, containers: JQueryTab.Containers, context: JQueryTab.Context);
    private _parseFromToPositions;
    private _reorderElement;
    moveTabItemBefore(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition): void;
    moveTabItemAfter(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition): void;
    moveTabItemFirst(fromPosition: JQueryTab.TabItemPosition): void;
    moveTabItemLast(fromPosition: JQueryTab.TabItemPosition): void;
    exchangeTabItem(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition): void;
}
export default Mover;
