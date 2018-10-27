declare function generateSaveLoadIndex(containers: JQueryTab.Containers, options: JQueryTab.ExpandedOptions): {
    savePosition: (position: string | number) => void;
    loadPosition: () => string | number;
    parseHashPosition: () => string | -1;
};
export default generateSaveLoadIndex;
