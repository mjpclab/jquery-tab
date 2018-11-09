declare function generateAddRemove(fnPositionToIndex: JQueryTab.fnPositionToIndex, fnGetHeaderFooterLabels: JQueryTab.fnGetLabel, fnGetPanel: JQueryTab.fnGetPanel, fnSavePosition: JQueryTab.fnSavePosition, fnSwitchTo: JQueryTab.fnSwitchTo, fnSwitchPrevious: JQueryTab.fnSwitchNeighbor, fnSwitchNext: JQueryTab.fnSwitchNeighbor, containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    insertTabItemWithoutSwitch: (position: string | number, tabItem: JQueryTab.TabItem) => void;
    insertTabItem: (position: string | number, tabItem: JQueryTab.TabItem) => void;
    addTabItemWithoutSwitch: (tabItem: JQueryTab.TabItem) => void;
    addTabItem: (tabItem: JQueryTab.TabItem) => void;
    insert: (sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[], position: string | number) => void;
    insertWithoutSwitch: (position: string | number, sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[]) => void;
    add: (sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[]) => void;
    addWithoutSwitch: (sourceRegion: string | Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node> | (Element | Text | Comment | DocumentFragment | JQuery<JQuery.Node>)[]) => void;
    remove: (...positions: (string | number)[]) => number | undefined;
};
export default generateAddRemove;
