/// <reference types="jquery" />
import Getter from './getter';
import DomUpdater from './dom-updater';
import TabItemSetter from './tab-item-setter';
import Switcher from './switcher';
import Adder from './adder';
import Remover from './remover';
import Mover from './mover';
declare function generateController(getter: Getter, domUpdater: DomUpdater, tabItemSetter: TabItemSetter, switcher: Switcher, adder: Adder, remover: Remover, mover: Mover): {
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
    switchTo: (newPosition: string | number) => JQueryTab.SwitchResult;
    switchPrevious: (switchOptions?: JQueryTab.SwitchOptions | undefined) => JQueryTab.SwitchResult;
    switchNext: (switchOptions?: JQueryTab.SwitchOptions | undefined) => JQueryTab.SwitchResult;
    switchFirst: (switchOptions?: JQueryTab.SwitchOptions | undefined) => JQueryTab.SwitchResult;
    switchLast: (switchOptions?: JQueryTab.SwitchOptions | undefined) => JQueryTab.SwitchResult;
    addTabItem: (tabItem: JQueryTab.TabItem) => void;
    insertTabItem: (position: string | number, tabItem: JQueryTab.TabItem) => void;
    add: (sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[]) => void;
    insert: (position: string | number, sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[]) => void;
    remove: (...positions: (string | number)[]) => number | undefined;
    exchangeTabItem: (fromPosition: string | number, toPosition: string | number) => void;
    moveTabItemBefore: (fromPosition: string | number, toPosition: string | number) => void;
    moveTabItemAfter: (fromPosition: string | number, toPosition: string | number) => void;
    moveTabItemFirst: (fromPosition: string | number) => void;
    moveTabItemLast: (fromPosition: string | number) => void;
    moveTabItemPrevious: (fromPosition: string | number) => void;
    moveTabItemNext: (fromPosition: string | number) => void;
};
export default generateController;