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
	'fixedHeight':true
	/*, other options */
});
```

# Generated Html Structure
```
.tab-container
	> .label-container
		> .label-item
		> .label-item
		> .label-item
		> .label-item
		> ...
	> .page-container
		> .page-item
		> .page-item
		> .page-item
		> .page-item
		> ...
```

# Options
`statusFieldSelector`
A jQuery selector to find a form (normally hidden) field to store active tab index, thus after form post back and keep the field value on server to the browser, the jquery-tab will automatically restore the active tab.

`statusHashTemplate`
A key-value pair template to store active tab index in URL hash, e.g. `"tab="`.

`statusHashSeparator`
Determine a separator between multiple hash items if there are more than 1 tab-container on the same page.

`fixedHeight`
Tab-container's height will be fixed to fit the longest page and will not change when tabs are switched.

`showTopLabel`
Show label-container on top of the tab.

`showBottomLabel`
Show label-container on bottom of the tab.

`titleSelector`
A jQuery selector to pick up "title" element to be a label-item in label-container.

`titleContentFilter`
A callback to have an opportunity to change the html structure of label-item.

`keepTitleVisible`
Show page title again in the page-item. Since page title will be shown in label-container, normally it's unnecessary to be shown in page-item again.

`containerTemplate`
Tab-container's template.

`labelContainerTemplate`
Label-container's template.

`labelItemTemplate`
Label-item's template.

`labelActiveClass`
CSS class for active label-item.

`labelInactiveClass`
CSS class for inactive label-item.

`pageContainerTemplate`
Page-containers's template.

`pageItemTemplate`
Page-item's template.

`pageActiveClass`
CSS class for active page-item.

`beforeSwitch(oldIndex, newIndex)`
A callback before switching the tab.

`afterSwitch(oldIndex, newIndex)`
A callback after switching the tab.
