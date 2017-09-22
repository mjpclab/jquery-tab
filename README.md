# jquery-tab
make flat html document that contains title and normal content turns into tab style.

# Usage:

html document:
``` html
<div class="region">
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
$('.region').tab({
	fixedHeight: true
	/*, other options */
});
```

# Generated Html Structure
```
.region > .tab-container
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

# Including CSS
jquery-tab provides default CSS styles if you don't want to make layout yourself. It also provides default skin.

## Use CSS bundled version
For module environment, importing module `jquery-tab/with-css` instead of `jquery-tab`.
For global variable mode, referencing the '-with-css' bundle file.

## Use standalone CSS file
Copying or referencing source CSS files under `src/css/` directory.

## Vertical labels
To use vertical labels style from default CSS, set `tabContainerClass` to 'tab-container-vert'.
Notice that this style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.
```javascript
$('.region').tab({
	tabContainerClass: 'tab-container-vert'
});
```

# Specify options
There are two ways to specify options. By `data-` attribute and by `tab()` method.
## Specify options by `data-` attribute
Option names become html attribute prefixed with `data-`. Words are always in lower case and separated by `-`. Only available for primitive option value.
```html
<div class="region" data-active-index="1">
	......
</div>
```
```javascript
$('.region').tab();
```
## Specify options by `tab()` method
Option names are in camel case.
```javascript
$('.region').tab({
	activeIndex: 1
});
```

# Auto enable jquery-tab
Region containers that has class `tab-region` will apply jquery-tab plugin automatically.

That would be convenient if using this class name with attribute options. Then no javascript code is needed in most cases:
```html
<div class="tab-region" data-active-index="1">
	......
</div>
```

# Options List
## Behavior Options
`triggerEvents`  
Determine the types of events triggered on label-item that will make the page-item switched.
Default value is `click`.

`delayTriggerEvents`  
Specify events on label-item that will trigger page switch after delay a small piece of time.
Quite useful if you want to keep hover a little time before switching.

`delayTriggerCancelEvents`  
Specify events on label-item that will cancel delay switching.

`delayTriggerLatency`  
Specify how long (milliseconds) need to wait before trigger the delayed switching events.

`statusFieldSelector`  
A jQuery selector string or object to find a form (normally hidden) field to store active tab index, thus after form post back and keep the field value on server to the browser, the jquery-tab will automatically restore the active tab.

`statusHashTemplate`  
A key-value pair template to store active tab index in URL hash, e.g. `"tab="`.

`statusHashSeparator`  
Determine a separator between multiple hash items if there are more than 1 tab-container on the same page.

`fixedHeight`  
Tab-container's height will be fixed to fit the longest page and will not change when tabs are switched.

`activeIndex`  
The default initial active index of the tab. Will be ignored if it can get value from `statusFieldSelector` or `statusHashTemplate`.

`createEmptyTab`  
Determine if still create tab container when there is no tab item found.
Would be useful if you want to create empty tab container first, and add tab items dynamically.

`fnShowPageItem`  
Define the behavior of showing an page-item when switched to it.
Must be a function like `func($pageItem) {}`. Parameter `$pageItem` will be the current page-item's jQuery object.
The default behavior is calling the jQuery object's `show()`.

`fnHidePageItem`  
Define the behavior of hiding an page-item when switched to other page.
Must be a function like `func($pageItem) {}`. Parameter `$pageItem` will be the current page-item's jQuery object.
The default behavior is calling the jQuery object's `hide()`.

`onBeforeSwitch(oldIndex, newIndex)`  
A callback before switching the tab.

`onAfterSwitch(oldIndex, newIndex)`  
A callback after switching the tab.

## UI Options
### Title
`titleSelector`  
A jQuery selector string or object to pick up "title" element to be a label-item in label-container.

`titleContentFilter`  
A callback to have an opportunity to change the html structure of label-item.

`keepTitleVisible`  
Show page title again in the page-item. Since page title will be shown in label-container, normally it's unnecessary to be shown in page-item again.

### Tab
`tabContainerTemplate`  
Tab container's template.

`tabContainerClass`  
CSS class for tab container.

### Label
`labelContainerTemplate`  
Label container's template.

`labelContainerClass`  
CSS class for label container.

`showHeaderLabelContainer`  
If show label container before tab page. Default value is true.

`showFooterLabelContainer`  
If show label container after tab page. Default value is false.

`headerLabelContainerClass`  
Header label container element's class name. Default value is 'header-container'.

`footerLabelContainerClass`  
Footer label container element's class name. Default value is 'footer-container'.

`labelItemTemplate`  
Label item's template.

`labelItemClass`  
CSS class for bottom label item.

`labelItemActiveClass`  
CSS class for active label item.

`labelItemInactiveClass`  
CSS class for inactive label item.

### Page
`pageContainerTemplate`  
Page containers's template.

`pageContainerClass`  
CSS class for page container.

`pageItemTemplate`  
Page-item's template.

`pageItemClass`  
CSS class for page item.

`pageItemActiveClass`  
CSS class for active page item.

`pageItemInactiveClass`  
CSS class for inactive page item.

# the Controller
## Get Controller
Get tab controller from tab container element or original content region container:
``` javascript
var controller = $('.region').data('tab-controller');
var controller = $('.tab-container').data('tab-controller');
```

## Controller Methods
`getCount()`  
Get the number of pages.

`getCurrentIndex()`  
Get current active tab Index.

`getTopLabel(index)`  
Get the top side label item by `index`.

`getBottomLabel(index)`  
Get the bottom side label item by `index`.

`getTopBottomLabels(index)`  
Get the top and bottom side label item by `index`.

`getPage(index)`  
Get page item by `index`.

`updateFixedHeight()`  
When page item's content is dynamically changed and becomes longer, use this method to update the height of the page container.
Only available in height fixed mode by setting option `fixedHeight`.

`switchTo(index)`  
Switch active(selected) page item by `index`.

`addTabPage(title, content)`  
Append a new tab page to existing tab container. Both `title` and `content` can be text, HTML or jquery object.

`insertTabPage(title, content, index)`  
Insert a new tab page to existing tab container, before the page which current index is `index`. Both `title` and `content` can be text, HTML or jquery object.

`add($container)`  
Parse and append another $container's structure to current tab. 

`insert($container, index)`
Parse and insert another $container's structure to current tab at position `index`.

`remove(index)`  
Remove a page from `index` and return it's page item.
