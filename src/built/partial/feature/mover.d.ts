import Getter from "./getter";
declare class Mover {
    private readonly getter;
    private readonly containers;
    private readonly context;
    constructor(getter: Getter, containers: JQueryTab.Containers, context: JQueryTab.Context);
    exchangeTabItem(fromPosition: JQueryTab.TabItemPosition, toPosition: JQueryTab.TabItemPosition): void;
}
export default Mover;
