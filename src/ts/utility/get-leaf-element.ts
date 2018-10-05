function getLeafElement($node: JQuery): JQuery {
	let $result = $node;
	let $deeper;
	while ($deeper = $result.children(), $deeper.length) {
		$result = $deeper;
	}
	return $result.eq(0);
}

export default getLeafElement;