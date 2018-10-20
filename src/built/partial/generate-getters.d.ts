declare function generateGetters(containers: JQueryTab.Containers, context: JQueryTab.Context): {
    getCount: () => number;
    getCurrentIndex: () => number;
    getIndexByName: (name: string) => number;
    PositionToIndex: (position: string | number) => number;
    getHeaderLabel: (position: string | number) => JQuery<HTMLElement>;
    getFooterLabel: (position: string | number) => JQuery<HTMLElement>;
    getHeaderFooterLabels: (position: string | number) => JQuery<HTMLElement>;
    getPanel: (position: string | number) => JQuery<HTMLElement>;
    getCurrentHeaderLabel: () => JQuery<HTMLElement>;
    getCurrentFooterLabel: () => JQuery<HTMLElement>;
    getCurrentHeaderFooterLabels: () => JQuery<HTMLElement>;
    getCurrentPanel: () => JQuery<HTMLElement>;
    getName: (index: number) => string | undefined;
};
export default generateGetters;
