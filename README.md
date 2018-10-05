# jquery-tab
make flat html document that contains title and normal content turns into tab style.

# Usage:

html document:
``` html
<div class="region">
	<h1>title 1</h1>
	<p>tab 1 content</p>
	<p>another tab 1 content</p>

	<h1>title 2</h1>
	<p>tab 2 content</p>
	<p>another tab 2 content</p>
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
	> .panel-container
		> .panel-item
		> .panel-item
		> .panel-item
		> .panel-item
		> ...
```

# Including CSS
jquery-tab provides default CSS styles if you don't want to make it yourself.

## Importing by module
Importing default theme which contains layout style and skin style:
```javascript
import 'jquery-tab/src/built/theme/gray'
```

## Use standalone CSS file
Copying or referencing CSS files from `dist/theeme/` directory.

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
Determine the types of events triggered on label-item that will make the panel-item switched.
Default value is `click`.

`delayTriggerEvents`  
Specify events on label-item that will trigger panel switch after delay a small piece of time.
Quite useful if you want to keep hover a little time before switching.

`delayTriggerCancelEvents`  
Specify events on label-item that will cancel delay switching.

`delayTriggerLatency`  
Specify how long (milliseconds) need to wait before trigger the delayed switching events.

`fixedHeight`  
Tab-container's height will be fixed to fit the longest panel and will not change when tabs are switched.

`createEmptyTab`  
Determine if still create tab container when there is no tab item found.
Would be useful if you want to create empty tab container first, and add tab items dynamically.

`fnShowPanelItem`  
Define the behavior of showing an panel-item when switched to it.
Must be a function like `func($panelItem) {}`. Parameter `$panelItem` will be the current panel-item's jQuery object.
The default behavior is calling the jQuery object's `show()`.

`fnHidePanelItem`  
Define the behavior of hiding an panel-item when switched to other panel.
Must be a function like `func($panelItem) {}`. Parameter `$panelItem` will be the current panel-item's jQuery object.
The default behavior is calling the jQuery object's `hide()`.

`onBeforeSwitch(oldIndex, newIndex)`  
A callback before switching the tab.

`onAfterSwitch(oldIndex, newIndex)`  
A callback after switching the tab.

## Save/Load active Index
jquery-tab will load active index by priority of statusFieldSelector, statusHashTemplate, fnLoadIndex and activeIndex.

`statusFieldSelector`  
A jQuery selector string or object to find a form field(normally hidden) to store active tab index, thus after form post back and keep the field value on server to the browser, the jquery-tab will automatically restore the active tab.

`statusHashTemplate`  
A key-value pair template to store active tab index in URL hash, e.g. `"tab="`.

`statusHashSeparator`  
Determine a separator between multiple hash items if there are more than 1 tab-container on the same page.

`fnSaveIndex(index)`  
A callback function to customize how active index is saved, so that this index can be restored in the future, for example when refreshing the page.

`fnLoadIndex`  
A callback function to customize how active index is loaded. The return value will be treated as active index. 

`activeIndex`  
The default initial active index of the tab.

## UI Options
### Title
`titleSelector`  
A jQuery selector string or object to pick up "title" element to be a label-item in label-container.

`titleContentFilter`  
A callback to have an opportunity to change the html structure of label-item.

`keepTitleVisible`  
Show panel title again in the panel-item. Since panel title will be shown in label-container, normally it's unnecessary to be shown in panel-item again.

### Tab
`tabContainerTemplate`  
Tab container's template.

`tabContainerClass`  
CSS class for tab container. Default value is 'tab-container'.

### Label
`labelContainerTemplate`  
Label container's template.

`labelContainerClass`  
CSS class for label container. Default value is 'label-container'.

`showHeaderLabelContainer`  
If show label container before panel container. Default value is true.

`showFooterLabelContainer`  
If show label container after panel container. Default value is false.

`headerLabelContainerClass`  
Header label container element's class name. Default value is 'header-container'.

`footerLabelContainerClass`  
Footer label container element's class name. Default value is 'footer-container'.

`labelItemTemplate`  
Label item's template.

`labelItemClass`  
CSS class for bottom label item. Default value is 'label-item'.

`labelItemActiveClass`  
CSS class for active label item. Default value is 'label-active'.

`labelItemInactiveClass`  
CSS class for inactive label item. Default value is 'label-inactive'.

### Panel
`panelContainerTemplate`  
Panel containers's template.

`panelContainerClass`  
CSS class for panel container. Default value is 'panel-container'.

`panelItemTemplate`  
Panel-item's template.

`panelItemClass`  
CSS class for panel item. Default value is 'panel-item'.

`panelItemActiveClass`  
CSS class for active panel item. Default value is 'panel-active'.

`panelItemInactiveClass`  
CSS class for inactive panel item. Default value is 'panel-inactive'.

# the Controller
## Get Controller
Get tab controller from tab container element or original content region container:
``` javascript
var controller = $('.region').data('tab-controller');
var controller = $('.tab-container').data('tab-controller');
```

## Controller Methods
`getCount()`  
Get the number of panels.

`getCurrentIndex()`  
Get current active panel Index.

`getHeaderLabel(index)`  
Get the header side label item by `index`.

`getFooterLabel(index)`  
Get the footer side label item by `index`.

`getHeaderFooterLabels(index)`  
Get the header and footer side label item by `index`.

`getPanel(index)`  
Get panel item by `index`.

`updateFixedHeight()`  
When panel item's content is dynamically changed and becomes longer, use this method to update the height of the panel container.
Only available in height fixed mode by setting option `fixedHeight`.

`switchTo(index)`  
Switch active(selected) panel item by `index`.

`addTabItem(title, content)`  
Append a new tab item to existing tab container. Both `title` and `content` can be text, HTML or jquery object.

`insertTabItem(title, content, index)`  
Insert a new tab item to existing tab container, before the panel which current index is `index`. Both `title` and `content` can be text, HTML or jquery object.

`add($region)`  
Parse and append another $region's structure to current tab. 

`insert($region, index)`  
Parse and insert another $region's structure to current tab at position `index`.

`remove(index)`  
Remove a panel from `index` and return it's panel item.
