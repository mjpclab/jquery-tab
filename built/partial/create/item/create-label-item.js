import $ from 'jquery';
import getLeafElement from '../../utility/get-leaf-element';
function createLabelItem(tabItem, options) {
    var $labelItem = $(options.labelItemTemplate)
        .addClass(options.labelItemClass)
        .addClass(options.inactiveLabelItemClass)
        .attr('tabindex', '0')
        .attr('role', 'tab');
    var $labelItemLeaf = getLeafElement($labelItem);
    $labelItemLeaf.append(tabItem.title);
    return { $labelItem: $labelItem, $labelItemLeaf: $labelItemLeaf };
}
export default createLabelItem;
