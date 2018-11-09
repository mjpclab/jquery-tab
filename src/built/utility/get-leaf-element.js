function getLeafElement($node) {
    var $result = $node;
    var $deeper;
    while ($deeper = $result.children(), $deeper.length) {
        $result = $deeper;
    }
    return $result.eq(0);
}
export default getLeafElement;
