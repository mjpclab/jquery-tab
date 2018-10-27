declare function generateSaveLoadIndex(containers: JQueryTab.Containers, options: JQueryTab.ExpandedOptions): {
    savePosition: (position: string | number) => void;
    loadPosition: () => string | number;
    parseHashPosition: () => number;
};
export default generateSaveLoadIndex;
