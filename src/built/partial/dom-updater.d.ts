import Getter from "./getter";
declare class DomUpdater {
    private readonly getter;
    private readonly containers;
    private readonly options;
    constructor(getter: Getter, containers: JQueryTab.Containers, options: JQueryTab.ExpandedOptions);
    updateActiveState(activeIndex: number): void;
    updateFixedHeight(): void;
}
export default DomUpdater;
