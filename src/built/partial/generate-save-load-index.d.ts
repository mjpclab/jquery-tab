declare function generateSaveLoadIndex(containers: JQueryTab.Containers, context: JQueryTab.Context, options: JQueryTab.NecessaryOptions): {
    saveIndex: (index: number) => void;
    loadIndex: () => number;
};
export default generateSaveLoadIndex;
