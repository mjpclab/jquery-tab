declare class SaveLoad {
    private readonly containers;
    private readonly options;
    private readonly $statusFields;
    private readonly reStatusHash?;
    constructor(containers: JQueryTab.Containers, options: JQueryTab.ExpandedOptions);
    savePosition(position: JQueryTab.TabItemPosition): void;
    parseHashPosition(): string | -1;
    loadPosition(): JQueryTab.TabItemPosition | JQuery.Thenable<JQueryTab.TabItemPosition>;
}
export default SaveLoad;
