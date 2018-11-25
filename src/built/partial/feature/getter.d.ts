declare class Getter {
    private readonly containers;
    private readonly context;
    private readonly options;
    constructor(containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions);
    getCount(): number;
    getCurrentIndex(): number;
    getCurrentName(): string | undefined;
    getName(index: number): any;
    getIndexByName(name: string): number;
    positionToIndex(position: JQueryTab.TabItemPosition): number;
    normalizePosition(position: JQueryTab.TabItemPosition): JQueryTab.NormalizedTabItemPosition;
    isDisabled(position: JQueryTab.TabItemPosition): boolean | undefined;
    isEnabled(position: JQueryTab.TabItemPosition): boolean;
    isHidden(position: JQueryTab.TabItemPosition): boolean | undefined;
    isVisible(position: JQueryTab.TabItemPosition): boolean;
    getLabel(position: JQueryTab.TabItemPosition, $labelContainerLeaf?: JQuery<HTMLElement>): JQuery<HTMLElement>;
    getHeaderLabel(position: JQueryTab.TabItemPosition): JQuery<HTMLElement>;
    getFooterLabel(position: JQueryTab.TabItemPosition): JQuery<HTMLElement>;
    getHeaderFooterLabels(position: JQueryTab.TabItemPosition): JQuery<HTMLElement>;
    getPanel(position: JQueryTab.TabItemPosition): JQuery<HTMLElement>;
    getCurrentHeaderLabel(): JQuery<HTMLElement>;
    getCurrentFooterLabel(): JQuery<HTMLElement>;
    getCurrentHeaderFooterLabels(): JQuery<HTMLElement>;
    getCurrentPanel(): JQuery<HTMLElement>;
}
export default Getter;
