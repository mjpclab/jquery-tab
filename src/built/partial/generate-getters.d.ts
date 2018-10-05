declare function generateGetters(containers: JQueryTab.Containers, context: JQueryTab.Context): {
    getCount: () => number;
    getCurrentIndex: () => number;
    getLabel: ($container: JQuery<HTMLElement>, index: number) => JQuery<HTMLElement>;
    getHeaderLabel: (index: number) => JQuery<HTMLElement>;
    getFooterLabel: (index: number) => JQuery<HTMLElement>;
    getHeaderFooterLabels: (index: number) => JQuery<HTMLElement>;
    getPanel: (index: number) => JQuery<HTMLElement>;
};
export default generateGetters;
