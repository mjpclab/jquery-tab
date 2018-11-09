function generateUpdateFixedHeight(containers, options) {
    return function updateFixedHeader() {
        if (!options.fixedHeight) {
            return;
        }
        var maxHeight = 0;
        containers.$panelContainerLeaf.children().each(function (index, panelItem) {
            var panelHeight = panelItem.scrollHeight;
            if (panelHeight > maxHeight) {
                maxHeight = panelHeight;
            }
        }).height(maxHeight);
    };
}
export default generateUpdateFixedHeight;
