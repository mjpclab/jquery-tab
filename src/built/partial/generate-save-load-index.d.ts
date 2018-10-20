declare function generateSaveLoadIndex(containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    savePosition: (position: string | number) => void;
    loadPosition: () => string | number;
    parseHashPosition: () => number;
};
export default generateSaveLoadIndex;
