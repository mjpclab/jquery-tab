import Getter from "./getter";
declare class TabItemSetter {
    private readonly getter;
    private readonly options;
    constructor(getter: Getter, options: JQueryTab.ExpandedOptions);
    setName(position: JQueryTab.TabItemPosition, name: string): void;
    setDisabled(position: JQueryTab.TabItemPosition, disabled: boolean): void;
    setEnabled(position: JQueryTab.TabItemPosition, enabled: boolean): void;
    setHidden(position: JQueryTab.TabItemPosition, hidden: boolean): void;
    setVisible(position: JQueryTab.TabItemPosition, visible: boolean): void;
}
export default TabItemSetter;
