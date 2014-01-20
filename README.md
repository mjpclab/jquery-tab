jquery-tab
==========
make flat html document that contains title and normal content turns into tab style.

usage:
html document:

<code>
	<div class="container-for-flat-content">
	  <h1>title</h1>
	  <p>content</p>
	  <p>content</p>
	
	  <h1>title</h1>
	  <p>content</p>
	  <p>content</p>
	</div>
	
	javascript code:
	$('.container-for-flat-content').tab({
		'fixedHeight':true,
	});
</code>
