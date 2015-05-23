# jquery-tab
make flat html document that contains title and normal content turns into tab style.

# Usage:

html document:
``` html
	<div class="tab-container">
	  <h1>title</h1>
	  <p>content</p>
	  <p>content</p>
	
	  <h1>title</h1>
	  <p>content</p>
	  <p>content</p>
	</div>
```	

javascript code:
``` javascript
	$('.tab-container').tab({
		'fixedHeight':true,
	});
```

# Generated Html Structure
```
.tab-container
    .label-container
        .label-item
        .label-item
        .label-item
        .label-item
        ...
    .page-container
        .page-item
        .page-item
        .page-item
        .page-item
        ...
```