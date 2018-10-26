declare function generateGetters(containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    getCount: () => number;
    getCurrentIndex: () => number;
    getIndexByName: (name: string) => number;
    positionToIndex: (position: string | number) => number;
    parsePosition: (position: string | number) => {
        index: number;
        name: string | undefined;
    };
    isTabItemDisabled: (position: string | number) => boolean | undefined;
    isTabItemHidden: (position: string | number) => boolean | undefined;
    getHeaderLabel: (position: string | number) => JQuery<HTMLElement>;
    getFooterLabel: (position: string | number) => JQuery<HTMLElement>;
    getHeaderFooterLabels: (position: string | number) => JQuery<HTMLElement>;
    getPanel: (position: string | number) => JQuery<HTMLElement>;
    getCurrentHeaderLabel: () => JQuery<HTMLElement>;
    getCurrentFooterLabel: () => JQuery<HTMLElement>;
    getCurrentHeaderFooterLabels: () => JQuery<HTMLElement>;
    getCurrentPanel: () => JQuery<HTMLElement>;
    getTabItemName: (index: number) => string | undefined;
};
export default generateGetters;
