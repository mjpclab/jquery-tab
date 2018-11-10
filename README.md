# jquery-tab
Make flat html document that contains title and normal content turns into tab style.

# Features
- no link element needed, still search engine friendly for original content
- options help to keep active tab item after page refresh or post back
- *name* could be used instead of *index* for individual tab item in some APIs
- vertical label mode
- nested tab
- ARIA attributes integrated

# Usage

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
`label-item` and `page-item` pair is a "tab item".

# Including CSS
jquery-tab provides default CSS styles if you don't want to make from scratch. Make sure CSS class name related options are not customized.

## Importing by module
```javascript
import 'jquery-tab/src/built/theme/gray'
import 'jquery-tab/src/built/theme/effect/fade' // optional fade effect when switching, must load after theme
```

## Use standalone CSS file
Copying or referencing CSS files from `dist/theme/` directory.

## Vertical labels
To use vertical labels, specify option `mode` to "vertical".  
Notice that vertical style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.
```javascript
$('.region').tab({
	mode: 'vertical'
});
```

# Specify options
There are two ways to specify options. By `data-` attribute and by `tab()` method.
## Specify options by `data-` attribute
Option names become html attribute prefixed with `data-` on region element. Words are always in lower case and separated by `-`. Only available for primitive option value.
```html
<div class="region" data-fixed-height="true">
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
	fixedHeight: true
});
```

# Auto enable jquery-tab
Region containers that has class `tab-region` will apply jquery-tab plugin automatically.

That would be convenient if using this class name with attribute options. Then no javascript code is needed in most cases:
```html
<div class="tab-region" data-fixed-height="true">
	......
</div>
```

# Deal with individual tab item
Tab item property can be specified as attribute on title element, in lower case, separate words by "-", with `data-` prefixed,
```html
<div class="region">
	<h1 data-tab-item-name="first-item">title 1</h1>
	<p>tab 1 content</p>
	<p>another tab 1 content</p>

	<h1 data-tab-item-disabled="true">title 2</h1>
	<p>tab 2 content</p>
	<p>another tab 2 content</p>
</div>
```
Supported properties:  
`tabItemName` (`data-tab-item-name`)  
The name should be a non-numeric string, otherwise in controller method parameters, it will be treated as a index.  
The name can only contains letters, digits, dashes and underlines.  
If names are duplicated in the same tab container, only first item will be recognized.

`tabItemDisabled` (`data-tab-item-disabled`)  
Specify if this tab item is disabled. A non-`false` value will be treated as disabled, even for empty string.

`tabItemHidden` (`data-tab-item-hidden`)  
Specify if this tab item is hidden. A non-`false` value will be treated as hidden, even for empty string.

# Options List
## Behavior
`triggerEvents`  
Determine the types of events triggered on label-item that will make the panel-item switched.
Multiple events can be specified separated by space. Default value is `click`.

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

`onBeforeSwitch(oldIndex, newIndex)`  
A callback before switching the tab. Returns `false` to cancel a switching attempt.

`onAfterSwitch(oldIndex, newIndex)`  
A callback after switching the tab.

## Tab item
`fnGetTabItemName($title, $content)`  
Customize the logic of getting tab item name when initializing.

`fnIsTabItemDisabled($title, $content)`  
Customize the logic of determining if a tab item is disabled when initializing.

`fnIsTabItemHidden($title, $content)`  
Customize the logic of determining if a tab item is hidden when initializing.

## Save/Load active Index
jquery-tab will load active index by priority of statusFieldSelector, statusHashTemplate, fnLoadIndex and activePosition.

`statusFieldSelector`  
A jQuery selector string or object to find a form field(normally hidden) to store active tab index, thus after form post back and keep the field value on server to the browser, the jquery-tab will automatically restore the active tab.

`statusHashTemplate`  
A key-value pair template to store active tab index in URL hash, e.g. `"tab="`.

`statusHashSeparator`  
Determine a separator between multiple hash items if there are more than 1 tab-container on the same page.

`fnSavePosition(name|index)`  
A callback function to customize how active index is saved, so that this index can be restored in the future, for example when refreshing the page.

`fnLoadPosition`  
A callback function to customize how active index is loaded.
The returned value is either a number/number of string which represents active tab index,
or a string represents active tab item name.

`activePosition`  
The default initial active position of the tab.
The value is either a number/number of string which represents active tab index,
or a string represents active tab item name.

## UI Options
### Title
`titleSelector`  
A jQuery selector string or object to pick up "title" element to be a label-item in label-container.

`fnGetTitleContent($title)`  
A callback to have an opportunity to change the html structure of label-item.

`keepTitleVisible`  
Show panel title again in the panel-item. Since panel title will be shown in label-container, normally it's unnecessary to be shown in panel-item again.

### Tab
`tabContainerTemplate`  
Tab container's template.

`tabContainerClass`  
CSS class for tab container. Default value is 'tab-container'.  
If `mode` is "horizontal", then also append class "`tabContainerClass`-horizontal".  
If `mode` is "vertical", then also append class "`tabContainerClass`-vertical".

### Label
`labelContainerTemplate`  
Label container's template.

`labelContainerClass`  
CSS class for label container. Default value is 'label-container'.  
if it is header label container, then also append class "`labelContainerClass`-header".  
if it is footer label container, then also append class "`labelContainerClass`-footer".

`showHeaderLabelContainer`  
If show label container before panel container. Default value is true.

`showFooterLabelContainer`  
If show label container after panel container. Default value is false.

`labelItemTemplate`  
Label item's template.

`labelItemClass`  
CSS class for label item. Default value is 'label-item'.  
If it is current active label item, then also append class "`labelItemClass`-active",
otherwise append class "`labelItemClass`-inactive".  
If tab item of the label is disabled, then also append class "`labelItemClass`-disabled".  
If tab item of the label is hidden, then also append class "`labelItemClass`-hidden".

### Panel
`panelContainerTemplate`  
Panel containers's template.

`panelContainerClass`  
CSS class for panel container. Default value is 'panel-container'.

`panelItemTemplate`  
Panel-item's template.

`panelItemClass`  
CSS class for panel item. Default value is 'panel-item'.  
If it is current active panel item, then also append class "`panelItemClass`-active",
otherwise append class "`panelItemClass`-inactive".
If tab item of the panel is disabled, then also append class "`panelItemClass`-disabled".
If tab item of the panel is hidden, then also append class "`panelItemClass`-hidden".

# The Controller
## Get Controller
Get tab controller from tab container element or original content region container:
``` javascript
var controller = $('.region').data('tab-controller');
var controller = $('.tab-container').data('tab-controller');
```

## Controller Methods
### States
`getCount()`  
Get the number of tab item.

`getCurrentIndex()`  
Get current active tab item index.

### Tab item
`getIndexByName(name)`  
Get tab item index by `name`. returns -1 if name not exists.

`getName(index)`  
Get tab item name by `index`.

`setName(name|index, newName)`  
set a new name for a specific tab item which its name is `name` or its index is `index`.

`isDisabled(name|index)`  
`isEnabled(name|index)`  
Check if a tab item is disabled.
Returns boolean type if tab item exists. Returns `undefined` otherwise.

`setDisabled(name|index, isDisabled=true)`  
`setEnabled(name|index, isEnabled=true)`  
Specify if a tab item is disabled.

`isHidden(name|index)`  
`isVisible(name|index)`  
Check if a tab item is hidden.
Returns boolean type if tab item exists. Returns `undefined` otherwise.

`setHidden(name|index, isHidden=true)`  
`setVisible(name|index, isVisible=true)`  
Specify if a tab item is hidden.

### DOM access
`getHeaderLabel(name|index)`    
`getFooterLabel(name|index)`  
`getHeaderFooterLabels(name|index)`    
Get the header/footer side label items by tab item `name` or `index`.

`getCurrentHeaderLabel()`  
`getCurrentFooterLabel()`  
`getCurrentHeaderFooterLabels()`  
Get current active header/footer label items.

`getPanel(name|index)`  
Get panel item by tab item `name` or `index`.

`getCurrentPanel()`  
Get current active panel item.

`updateFixedHeight()`  
When panel item's content is dynamically changed and becomes longer, use this method to update the height of the panel container.
Only available in height fixed mode by setting option `fixedHeight`.

### Switch
`switchTo(name|index)`  
Switch active(selected) tab item to the one which its name is `name` or its index is `index`.

`switchPrevious({includeDisabled?, includeHidden?, exclude?, loop?}?)`  
`switchNext({includeDisabled?, includeHidden?, exclude?, loop?}?)`  
Switch to previous/next tab item.
If `includeDisabled` is `true`, disabled tab item will not be skipped.  
If `includeHidden` is `true`, hidden tab item will not be skipped.  
Optional `exclude` is an array of tab item name or tab item index, which will be skipped when switching. Prior than `includeDisabled` and `includeHidden`.  
If `loop` is `true`, once current active tab item is the last item on the direction, will loop to the first item.

### Modify
`addTabItem({title, content, name?, disabled?, hidden?})`  
`insertTabItem(before-name|before-index, {title, content, name?, disabled?, hidden?})`  
Append/insert a new tab item to existing tab container. Both `title` and `content` can be text, HTML or jquery object.  
Optional `name` can be specified so that this item could be referenced by name besides by index later.  
Set optional `disabled` to `true` to mark this tab item is disabled.  
Set optional `hidden` to `true` to mark this tab item is hidden.

`add($region)`  
Parse and append another $region's structure to current tab. 

`insert(before-name|before-index, $region)`  
Parse and insert another $region's structure before tab item which its name is `before-name` or its index is `before-index`.

`remove(name|index, ...)`  
Remove one or more tab items by `name` or `index` and returns removed tab item count.

# Browser Compatibility
Feature | IE | Edge | Firefox | Chrome | Safari | Opera
--------|----|------|---------|--------|--------|------
basic | 6+ | 12+ | 1+ | 1+ | 1+ | 9+
vertical tab labels | 11+ | 12+ | 21+ | 28+ | 6.1+ | 12.10+
fade effect on switch | 10+ | 12+ | 4+ | 2+ | 4+ | 12.10+

As different jQuery version has different browser compatibility,
final compatibility are also affected by the jQuery version you are using.

# Upgrade Guide
- [Upgrade from 1.x to 2.x](./doc/upgrade-from-1.x-to-2.x.md)
- [Upgrade from 2.x to 3.x](./doc/upgrade-from-2.x-to-3.x.md)
