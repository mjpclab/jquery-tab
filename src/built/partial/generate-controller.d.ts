import Getter from "./getter";
import DomUpdater from './dom-updater';
import TabItemSetter from './tab-item-setter';
import Switcher from "./switcher";
import AddRemove from './add-remove';
declare function generateController(getter: Getter, domUpdater: DomUpdater, tabItemSetter: TabItemSetter, switcher: Switcher, addRemove: AddRemove): {
    getCount: () => number;
    getCurrentIndex: () => number;
    getCurrentName: () => string | undefined;
    getName: (index: number) => any;
    getIndexByName: (name: string) => number;
    isDisabled: (position: string | number) => boolean | undefined;
    isEnabled: (position: string | number) => boolean;
    isHidden: (position: string | number) => boolean | undefined;
    isVisible: (position: string | number) => boolean;
    getHeaderLabel: (position: string | number) => JQuery<HTMLElement>;
    getFooterLabel: (position: string | number) => JQuery<HTMLElement>;
    getHeaderFooterLabels: (position: string | number) => JQuery<HTMLElement>;
    getPanel: (position: string | number) => JQuery<HTMLElement>;
    getCurrentHeaderLabel: () => JQuery<HTMLElement>;
    getCurrentFooterLabel: () => JQuery<HTMLElement>;
    getCurrentHeaderFooterLabels: () => JQuery<HTMLElement>;
    getCurrentPanel: () => JQuery<HTMLElement>;
    setName: (position: string | number, name: string) => void;
    setDisabled: (position: string | number, disabled?: boolean) => void;
    setEnabled: (position: string | number, enabled?: boolean) => void;
    setHidden: (position: string | number, hidden?: boolean) => void;
    setVisible: (position: string | number, visible?: boolean) => void;
    updateFixedHeight: () => void;
    switchTo: (newPosition: string | number) => {
        index: number;
        name: any;
    } | undefined;
    switchPrevious: (switchOptions?: JQueryTab.SwitchOptions | undefined) => {
        index: number;
        name: any;
    } | undefined;
    switchNext: (switchOptions?: JQueryTab.SwitchOptions | undefined) => {
        index: number;
        name: any;
    } | undefined;
    addTabItem: (tabItem: JQueryTab.TabItem) => void;
    insertTabItem: (position: string | number, tabItem: JQueryTab.TabItem) => void;
    add: (sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[]) => void;
    insert: (sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[], position: string | number) => void;
    remove: (...positions: (string | number)[]) => number | undefined;
};
export default generateController;
