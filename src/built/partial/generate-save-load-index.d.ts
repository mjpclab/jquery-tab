declare function generateSaveLoadIndex(containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.ExpandedOptions): {
    saveIndex: (index: number) => void;
    loadIndex: () => number;
    parseHashIndex: () => number;
};
export default generateSaveLoadIndex;
