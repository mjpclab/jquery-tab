declare function generateGetters(containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    getCount: () => number;
    getCurrentIndex: () => number;
    getCurrentName: () => string | undefined;
    getName: (index: number) => string | undefined;
    getIndexByName: (name: string) => number;
    positionToIndex: (position: string | number) => number;
    parsePosition: (position: string | number) => {
        index: number;
        name: string | undefined;
    };
    isDisabled: (position: string | number) => boolean | undefined;
    isHidden: (position: string | number) => boolean | undefined;
    getHeaderLabel: (position: string | number) => JQuery<HTMLElement>;
    getFooterLabel: (position: string | number) => JQuery<HTMLElement>;
    getHeaderFooterLabels: (position: string | number) => JQuery<HTMLElement>;
    getPanel: (position: string | number) => JQuery<HTMLElement>;
    getCurrentHeaderLabel: () => JQuery<HTMLElement>;
    getCurrentFooterLabel: () => JQuery<HTMLElement>;
    getCurrentHeaderFooterLabels: () => JQuery<HTMLElement>;
    getCurrentPanel: () => JQuery<HTMLElement>;
};
export default generateGetters;
